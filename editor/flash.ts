const imul = (Math as any).imul;
const timeoutMessage = "timeout";
const membase = 0x20000000;
const loadAddr = membase;
const dataAddr = 0x20002000;
const stackAddr = 0x20001000;
const FULL_FLASH_TIMEOUT = 100000; // 100s
const PARTIAL_FLASH_TIMEOUT = 60000; // 60s

const flashPageBIN = new Uint32Array([
    0xbe00be00, // bkpt - LR is set to this
    0x2502b5f0, 0x4c204b1f, 0xf3bf511d, 0xf3bf8f6f, 0x25808f4f, 0x002e00ed,
    0x2f00595f, 0x25a1d0fc, 0x515800ed, 0x2d00599d, 0x2500d0fc, 0xf3bf511d,
    0xf3bf8f6f, 0x25808f4f, 0x002e00ed, 0x2f00595f, 0x2501d0fc, 0xf3bf511d,
    0xf3bf8f6f, 0x599d8f4f, 0xd0fc2d00, 0x25002680, 0x00f60092, 0xd1094295,
    0x511a2200, 0x8f6ff3bf, 0x8f4ff3bf, 0x2a00599a, 0xbdf0d0fc, 0x5147594f,
    0x2f00599f, 0x3504d0fc, 0x46c0e7ec, 0x4001e000, 0x00000504,
])

// void computeHashes(uint32_t *dst, uint8_t *ptr, uint32_t pageSize, uint32_t numPages)
const computeChecksums2 = new Uint32Array([
    0x4c27b5f0, 0x44a52680, 0x22009201, 0x91004f25, 0x00769303, 0x24080013,
    0x25010019, 0x40eb4029, 0xd0002900, 0x3c01407b, 0xd1f52c00, 0x468c0091,
    0xa9044665, 0x506b3201, 0xd1eb42b2, 0x089b9b01, 0x23139302, 0x9b03469c,
    0xd104429c, 0x2000be2a, 0x449d4b15, 0x9f00bdf0, 0x4d149e02, 0x49154a14,
    0x3e01cf08, 0x2111434b, 0x491341cb, 0x405a434b, 0x4663405d, 0x230541da,
    0x4b10435a, 0x466318d2, 0x230541dd, 0x4b0d435d, 0x2e0018ed, 0x6002d1e7,
    0x9a009b01, 0x18d36045, 0x93003008, 0xe7d23401, 0xfffffbec, 0xedb88320,
    0x00000414, 0x1ec3a6c8, 0x2f9be6cc, 0xcc9e2d51, 0x1b873593, 0xe6546b64,
])

let startTime = 0
function log(msg: string) {
    let now = Date.now()
    if (!startTime) startTime = now
    now -= startTime
    let ts = ("00000" + now).slice(-5)
    pxt.debug(`dap ${ts}: ${msg}`)
}
const logV = /webusbdbg=1/.test(window.location.href) ? log : (msg: string) => { }

function murmur3_core(data: Uint8Array) {
    let h0 = 0x2F9BE6CC;
    let h1 = 0x1EC3A6C8;

    for (let i = 0; i < data.length; i += 4) {
        let k = pxt.HF2.read32(data, i) >>> 0
        k = imul(k, 0xcc9e2d51);
        k = (k << 15) | (k >>> 17);
        k = imul(k, 0x1b873593);

        h0 ^= k;
        h1 ^= k;
        h0 = (h0 << 13) | (h0 >>> 19);
        h1 = (h1 << 13) | (h1 >>> 19);
        h0 = (imul(h0, 5) + 0xe6546b64) >>> 0;
        h1 = (imul(h1, 5) + 0xe6546b64) >>> 0;
    }
    return [h0, h1]
}

class DAPWrapper implements pxt.packetio.PacketIOWrapper {
    familyID: number;
    private dap: DapJS.DAP;
    private cortexM: DapJS.CortexM
    private cmsisdap: any;
    private flashing = false;
    private flashAborted = false;
    private readSerialId = 0;
    private pbuf = new pxt.U.PromiseBuffer<Uint8Array>();
    private pageSize = 1024;
    private numPages = 256;
    private usesCODAL = false;
    private forceFullFlash = /webusbfullflash=1/.test(window.location.href);
    private useJACDAC = true;

    onSerial = (buf: Uint8Array, isStderr: boolean) => { };
    onCustomEvent = (type: string, payload: Uint8Array) => { };

    constructor(public readonly io: pxt.packetio.PacketIO) {
        this.familyID = 0x0D28; // this is the microbit vendor id, not quite UF2 family id
        this.io.onDeviceConnectionChanged = (connect) => {
            log(`device connection changed`);
            this.disconnectAsync()
                .then(() => connect && this.reconnectAsync());
        }

        this.io.onData = buf => {
            // console.log("RD: " + pxt.Util.toHex(buf))
            this.pbuf.push(buf);
        }

        this.allocDAP();
    }

    icon = "usb";

    private startReadSerial() {
        const rid = this.readSerialId;
        log(`start read serial ${rid}`)
        const readSerial = async () => {
            try {
                while (true) {
                    if (rid != this.readSerialId) break

                    const r = await this.dapCmdNums(0x83)
                    if (rid != this.readSerialId) break

                    const len = r[1]
                    const hasData = len > 0
                    if (hasData && this.onSerial)
                        this.onSerial(r.slice(2, len + 2), false)

                    await this.jacdacProcess(hasData)
                }

                log(`stopped serial reader ${rid}`)
            } catch (err) {
                log(`read error: ${err.message}`);
                if (rid != this.readSerialId) {
                    log(`stopped serial reader ${rid}`)
                } else {
                    this.disconnectAsync(); // force disconnect
                }
            }
        }

        readSerial();
    }

    private stopSerialAsync() {
        log(`cancelling serial reader ${this.readSerialId}`)
        this.readSerialId++;
        return Promise.delay(200);
    }

    private allocDAP() {
        log(`alloc dap`);
        const h = this.io;
        this.dap = new DapJS.DAP({
            write: data => h.sendPacketAsync(new Uint8Array(data)),
            close: this.disconnectAsync,
            read: () => this.recvPacketAsync(),
            //sendMany: sendMany
        });
        this.cmsisdap = (this.dap as any).dap;
        this.cortexM = new DapJS.CortexM(this.dap);
    }

    get binName() {
        return (this.usesCODAL ? "mbcodal-" : "mbdal-") + pxtc.BINARY_HEX;
    }

    async reconnectAsync(): Promise<void> {
        log(`reconnect`)
        this.flashAborted = false;

        function stringResponse(buf: Uint8Array) {
            return pxt.U.uint8ArrayToString(buf.slice(2, 2 + buf[1]))
        }

        await this.stopSerialAsync()

        this.allocDAP(); // clean dap apis

        await this.io.reconnectAsync()

        // before calling into dapjs, we use our dapCmdNums() a few times, which which will make sure the responses
        // to commends from previous sessions (if any) are flushed
        const info = await this.dapCmdNums(0x00, 0x04) // info
        log(`daplink version: ${stringResponse(info)}`)

        const r = await this.dapCmdNums(0x80)
        this.usesCODAL = r[2] == 57 && r[3] == 57 && r[5] >= 51;
        if (!this.usesCODAL)
            this.useJACDAC = false;
        log(`bin name: ${this.binName} v:${stringResponse(r)}`);

        const baud = new Uint8Array(5)
        baud[0] = 0x82 // set baud
        pxt.HF2.write32(baud, 1, 115200)
        await this.dapCmd(baud)
        // setting the baud rate on serial may reset NRF (depending on daplink version), so delay after
        await Promise.delay(200);

        // only init after setting baud rate, in case we got reset
        await this.cortexM.init()

        const res = await this.readWords(0x10000010, 2);
        this.pageSize = res[0]
        this.numPages = res[1]
        log(`page size ${this.pageSize}, num pages ${this.numPages}`);

        await this.checkStateAsync(true);
        await this.jacdacSetup();

        this.startReadSerial();
    }

    private async checkStateAsync(resume?: boolean): Promise<void> {
        const states = ["reset", "lockup", "sleeping", "halted", "running"]
        try {
            const state = await this.cortexM.getState();
            log(`cortex state: ${states[state]}`)
            if (resume && state == DapJS.CoreState.TARGET_HALTED)
                await this.cortexM.resume();
        } catch (e) {
            log(`cortex state failed`)
            console.debug(e)
        }
    }

    private checkAborted() {
        if (this.flashAborted)
            throw new Error(lf("Download cancelled"));
    }

    disconnectAsync() {
        log(`disconnect`)
        this.flashAborted = true;
        return this.stopSerialAsync()
            .then(() => this.io.disconnectAsync());
    }

    reflashAsync(resp: pxtc.CompileResult): Promise<void> {
        log("reflash")
        startTime = 0
        pxt.tickEvent("hid.flash.start");
        this.flashAborted = false;
        this.flashing = true;
        return (this.io.isConnected() ? Promise.resolve() : this.io.reconnectAsync())
            .then(() => this.stopSerialAsync())
            .then(() => this.cortexM.init())
            .then(() => this.cortexM.reset(true))
            .then(() => this.checkStateAsync())
            .then(() => this.readUICR())
            .then(uicr => {
                // shortcut, do a full flash
                if (uicr != 0 || this.forceFullFlash) {
                    pxt.tickEvent("hid.flash.uicrfail");
                    return this.fullVendorCommandFlashAsync(resp);
                }
                // check flash checksums
                return this.computeFlashChecksum(resp)
                    .then(chk => {
                        // let's do a quick flash!
                        if (chk.quick)
                            return this.quickHidFlashAsync(chk.changed);
                        else
                            return this.fullVendorCommandFlashAsync(resp);
                    });
            })
            .then(() => this.checkStateAsync(true))
            .finally(() => { this.flashing = false })
        // don't disconnect here
        // the micro:bit will automatically disconnect and reconnect
        // via the webusb events
    }

    private recvPacketAsync() {
        if (this.io.recvPacketAsync)
            return this.io.recvPacketAsync()
        else
            return this.pbuf.shiftAsync()
    }

    private dapCmd(buf: Uint8Array) {
        return this.io.sendPacketAsync(buf)
            .then(() => this.recvPacketAsync())
            .then(resp => {
                if (resp[0] != buf[0]) {
                    const msg = `bad dapCmd response: ${buf[0]} -> ${resp[0]}`
                    // in case we got an invalid response, try to get another response, in case the current
                    // response is a left-over from previous communications
                    log(msg + "; retrying")
                    return this.recvPacketAsync()
                        .then(resp => {
                            if (resp[0] == buf[0])
                                return resp
                            throw new Error(msg)
                        }, err => {
                            throw new Error(msg)
                        })
                }
                return resp
            })
    }

    private dapCmdNums(...nums: number[]) {
        return this.dapCmd(new Uint8Array(nums))
    }

    private fullVendorCommandFlashAsync(resp: pxtc.CompileResult): Promise<void> {
        log("full flash")

        const chunkSize = 62;
        let sentPages = 0;
        return Promise.resolve()
            .then(() => this.dapCmdNums(0x8A /* DAPLinkFlash.OPEN */, 1))
            .then((res) => {
                log(`daplinkflash open: ${pxt.U.toHex(res)}`)
                if (res[1] !== 0)
                    throw new Error(lf("Download failed, please try again"));
                const binFile = resp.outfiles[this.binName];
                log(`bin file ${this.binName} in ${Object.keys(resp.outfiles).join(', ')}, ${binFile?.length || -1}b`)
                const hexUint8 = pxt.U.stringToUint8Array(binFile);
                log(`hex ${hexUint8?.byteLength || -1}b, ~${(hexUint8.byteLength / chunkSize) | 0} chunks of ${chunkSize}b`)

                const sendPages = (offset: number = 0): Promise<void> => {
                    const end = Math.min(hexUint8.length, offset + chunkSize);
                    const nextPageData = hexUint8.slice(offset, end);
                    const cmdData = new Uint8Array(2 + nextPageData.length)
                    cmdData[0] = 0x8C /* DAPLinkFlash.WRITE */
                    cmdData[1] = nextPageData.length
                    cmdData.set(nextPageData, 2)
                    if (sentPages % 128 == 0) // reduce logging
                        log(`next page ${sentPages}: [${offset.toString(16)}, ${end.toString(16)}] (${Math.ceil((hexUint8.length - end) / 1000)}kb left)`)
                    return this.dapCmd(cmdData)
                        .then(() => {
                            this.checkAborted()
                            if (end < hexUint8.length) {
                                sentPages++;
                                return sendPages(end);
                            }
                            return Promise.resolve()
                        });
                }

                return sendPages();
            })
            .then(() => {
                log(`close`)
                return this.dapCmdNums(0x8B /* DAPLinkFlash.CLOSE */);
            })
            .then(res => {
                log(`daplinkclose: ${pxt.U.toHex(res)}`)
                return this.dapCmdNums(0x89 /* DAPLinkFlash.RESET */);
            })
            .then((res) => {
                log(`daplinkreset: ${pxt.U.toHex(res)}`)
                log(`full flash done`);
            })
            .timeout(FULL_FLASH_TIMEOUT, timeoutMessage)
            .catch((e) => {
                log(`error: abort`)
                this.flashAborted = true;
                return this.resetAndThrowAsync(e);
            });
    }

    private resetAndThrowAsync(e: any) {
        log(`reset on error`)
        console.debug(e)
        // reset any pending daplink
        return this.dapCmdNums(0x89 /* DAPLinkFlash.RESET */)
            .catch((e2: any) => {
                // Best effort reset, no-op if there's an error
            })
            .then(() => this.cortexM.reset(false))
            .catch((e2: any) => {
                // Best effort reset, no-op if there's an error
            })
            .then(() => {
                throw e;
            });
    }

    private readUICR() {
        return this.readWords(0x10001014, 1)
            .then(v => {
                const uicr = v[0] & 0xff;
                log(`uicr: ${uicr.toString(16)} (${v[0].toString(16)})`);
                return uicr;
            });
    }

    private computeFlashChecksum(resp: pxtc.CompileResult) {
        const binFile = resp.outfiles[this.binName];
        if (!binFile)
            throw new Error(`unable to find ${this.binName} in outfiles ${Object.keys(resp.outfiles).join(', ')}`);

        return this.getFlashChecksumsAsync()
            .then(checksums => {
                log(`checksums ${pxt.Util.toHex(checksums)}`);
                // TODO this is seriously inefficient (130ms on a fast machine)
                const uf2 = ts.pxtc.UF2.newBlockFile();
                ts.pxtc.UF2.writeHex(uf2, binFile.split(/\r?\n/));
                const bytes = pxt.U.stringToUint8Array(ts.pxtc.UF2.serializeFile(uf2));
                const parsed = ts.pxtc.UF2.parseFile(bytes);

                const aligned = DAPWrapper.pageAlignBlocks(parsed, this.pageSize);
                const changed = DAPWrapper.onlyChanged(aligned, checksums, this.pageSize);
                const quick = changed.length < aligned.length / 2;
                log(`pages: ${aligned.length}, changed ${changed.length}, ${quick ? "quick" : "full"}`);
                return {
                    quick,
                    changed
                }
            });
    }

    private quickHidFlashAsync(changed: ts.pxtc.UF2.Block[]): Promise<void> {
        log("quick flash")
        const runFlash = (b: ts.pxtc.UF2.Block, dataAddr: number) => {
            const cmd = this.cortexM.prepareCommand();

            cmd.halt();

            cmd.writeCoreRegister(DapJS.CortexReg.PC, loadAddr + 4 + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.LR, loadAddr + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.SP, stackAddr);

            cmd.writeCoreRegister(0, b.targetAddr);
            cmd.writeCoreRegister(1, dataAddr);
            cmd.writeCoreRegister(2, this.pageSize >> 2);

            return Promise.resolve()
                .then(() => {
                    logV("setregs")
                    return cmd.go()
                })
                .then(() => {
                    // starts the program
                    logV(`cortex.debug.enable`)
                    return this.cortexM.debug.enable()
                })
        }

        return Promise.resolve()
            .then(() => this.cortexM.memory.writeBlock(loadAddr, flashPageBIN))
            .then(() => Promise.mapSeries(pxt.U.range(changed.length),
                i => {
                    this.checkAborted();
                    let b = changed[i];
                    if (b.targetAddr >= 0x10000000) {
                        log(`target address ${b.targetAddr.toString(16)} > 0x10000000`)
                        return Promise.resolve();
                    }

                    log("about to write at 0x" + b.targetAddr.toString(16));

                    let writeBl = Promise.resolve();

                    let thisAddr = (i & 1) ? dataAddr : dataAddr + this.pageSize;
                    let nextAddr = (i & 1) ? dataAddr + this.pageSize : dataAddr;

                    if (i == 0) {
                        let u32data = new Uint32Array(b.data.length / 4);
                        for (let i = 0; i < b.data.length; i += 4)
                            u32data[i >> 2] = pxt.HF2.read32(b.data, i);
                        writeBl = this.cortexM.memory.writeBlock(thisAddr, u32data);
                    }

                    return writeBl
                        .then(() => runFlash(b, thisAddr))
                        .then(() => {
                            let next = changed[i + 1];
                            if (!next)
                                return Promise.resolve();
                            logV("write next");
                            let buf = new Uint32Array(next.data.buffer);
                            return this.cortexM.memory.writeBlock(nextAddr, buf);
                        })
                        .then(() => {
                            logV("wait");
                            return this.cortexM.waitForHalt(500);
                        })
                        .then(() => {
                            logV("done block");
                        });
                }))
            .then(() => {
                log("quick flash done");
                pxt.tickEvent("hid.flash.done");
                return this.cortexM.reset(false);
            })
            .then(() => this.checkStateAsync(true))
            .timeout(PARTIAL_FLASH_TIMEOUT, timeoutMessage)
            .catch((e) => {
                this.flashAborted = true;
                return this.resetAndThrowAsync(e);
            });
    }

    private getFlashChecksumsAsync() {
        log("flash checksums")
        let pages = this.numPages
        return this.cortexM.runCode(computeChecksums2, loadAddr, loadAddr + 1, 0xffffffff, stackAddr, true,
            dataAddr, 0, this.pageSize, pages)
            .then(() => this.cortexM.memory.readBlock(dataAddr, pages * 2, this.pageSize))
    }

    private readWords(addr: number, numWords: number) {
        return this.cortexM.memory.readBlock(addr, numWords, this.pageSize)
            // assume browser is little-endian
            .then(u8 => new Uint32Array(u8.buffer))
    }

    private writeWords(addr: number, buf: Uint32Array) {
        return this.cortexM.memory.writeBlock(addr, buf)
    }

    private readBytes(addr: number, numBytes: number) {
        return this.cortexM.memory.readBlock(addr, (numBytes + 3) >> 2, this.pageSize)
            .then(u8 => u8.length == numBytes ? u8 : u8.slice(0, numBytes))
    }

    static onlyChanged(blocks: ts.pxtc.UF2.Block[], checksums: Uint8Array, pageSize: number) {
        return blocks.filter(b => {
            let idx = b.targetAddr / pageSize
            pxt.U.assert((idx | 0) == idx)
            pxt.U.assert(b.data.length == pageSize)
            if (idx * 8 + 8 > checksums.length)
                return true // out of range?
            let c0 = pxt.HF2.read32(checksums, idx * 8)
            let c1 = pxt.HF2.read32(checksums, idx * 8 + 4)
            let ch = murmur3_core(b.data)
            if (c0 == ch[0] && c1 == ch[1])
                return false
            return true
        })
    }

    static pageAlignBlocks(blocks: ts.pxtc.UF2.Block[], pageSize: number) {
        pxt.U.assert(pageSize % 256 == 0)
        let res: ts.pxtc.UF2.Block[] = []
        for (let i = 0; i < blocks.length;) {
            let b0 = blocks[i]
            let newbuf = new Uint8Array(pageSize)
            for (let i = 0; i < newbuf.length; ++i)
                newbuf[i] = 0xff
            let startPad = b0.targetAddr & (pageSize - 1)
            let newAddr = b0.targetAddr - startPad
            for (; i < blocks.length; ++i) {
                let b = blocks[i]
                if (b.targetAddr + b.payloadSize > newAddr + pageSize)
                    break
                pxt.U.memcpy(newbuf, b.targetAddr - newAddr, b.data, 0, b.payloadSize)
            }
            let bb = pxt.U.flatClone(b0)
            bb.data = newbuf
            bb.targetAddr = newAddr
            bb.payloadSize = pageSize
            res.push(bb)
        }
        return res
    }

    //
    // jacdac stuff starts here
    //

    private irqn: number
    private xchgAddr: number = null
    private lastXchg: number
    private currSend: SendItem
    private sendQ: SendItem[] = []
    private lastSend: number

    sendCustomEventAsync(type: string, buf: Uint8Array): Promise<void> {
        if (type == "jacdac") {
            if (this.xchgAddr == null)
                return Promise.resolve()
            if (buf.length & 3) {
                const tmp = new Uint8Array((buf.length + 3) & ~3)
                tmp.set(buf)
                buf = tmp
            }
            return new Promise<void>(resolve => {
                this.sendQ.push({
                    buf,
                    cb: resolve
                })
            })
        }
        return Promise.reject(new Error("invalid custom event type"))
    }

    private writeWord(addr: number, val: number) {
        return this.cortexM.memory.write32(addr, val)
    }

    private async findJacdacXchgAddr() {
        const memStart = 0x2000_0000
        const memStop = memStart + 128 * 1024
        const checkSize = 1024

        let p0 = 0x20006000
        let p1 = 0x20006000 + checkSize

        const check = async (addr: number) => {
            if (addr < memStart)
                return null
            if (addr + checkSize > memStop)
                return null
            const buf = await this.readWords(addr, checkSize >> 2)
            for (let i = 0; i < buf.length; ++i) {
                if (buf[i] == 0x786D444A && buf[i + 1] == 0xB0A6C0E9)
                    return addr + (i << 2)
            }
            return 0
        }

        while (true) {
            const a0 = await check(p0)
            if (a0) return a0
            const a1 = await check(p1)
            if (a1) return a1
            if (a0 === null && a1 === null)
                return null
            p0 -= checkSize
            p1 += checkSize
        }
    }

    private async jacdacSetup() {
        this.xchgAddr = null
        if (!this.useJACDAC)
            return
        await Promise.delay(700); // wait for the program to start and setup memory correctly
        const xchg = await this.findJacdacXchgAddr()
        if (xchg == null)
            return
        const info = await this.readBytes(xchg, 16)
        this.irqn = info[8]
        if (info[12 + 2] != 0xff) {
            console.error("invalid memory; try power-cycling the micro:bit")
            return
        }
        this.xchgAddr = xchg
        // clear initial lock
        await this.writeWord(xchg + 12, 0)
        log(`jacdac exchange address: 0x${xchg.toString(16)}; irqn=${this.irqn}`)
    }

    private async triggerIRQ(irqn: number) {
        const addr = 0xE000E200 + (irqn >> 5) * 4
        await this.writeWord(addr, 1 << (irqn & 31))
    }

    private async jacdacProcess(hadSerial: boolean) {
        if (this.xchgAddr == null) {
            if (!hadSerial)
                await this.dapDelay(5000)
            return
        }

        const now = Date.now()
        if (this.lastXchg && now - this.lastXchg > 50) {
            log("slow xchg: " + (now - this.lastXchg) + "ms")
        }
        this.lastXchg = now

        let numev = 0
        // TODO only read say 32 bytes first, and more if needed
        let inp = await this.readBytes(this.xchgAddr + 12, 256)
        if (inp[2]) {
            await this.writeWord(this.xchgAddr + 12, 0)
            await this.triggerIRQ(this.irqn)
            inp = inp.slice(0, inp[2] + 12)
            this.onCustomEvent("jacdac", inp)
            numev++
        }

        let sendFree = false
        if (this.currSend) {
            const send = await this.readBytes(this.xchgAddr + 12 + 256, 4)
            if (!send[2]) {
                this.currSend.cb()
                this.currSend = null
                sendFree = true
                numev++
            }
        }

        if (!this.currSend && this.sendQ.length) {
            if (!sendFree) {
                const send = await this.readBytes(this.xchgAddr + 12 + 256, 4)
                if (!send[2])
                    sendFree = true
            }
            if (sendFree) {
                this.currSend = this.sendQ.shift()
                const bbody = this.currSend.buf.slice(4)
                await this.writeWords(this.xchgAddr + 12 + 256 + 4, new Uint32Array(bbody.buffer))
                const bhead = this.currSend.buf.slice(0, 4)
                await this.writeWords(this.xchgAddr + 12 + 256, new Uint32Array(bhead.buffer))
                await this.triggerIRQ(this.irqn)
                this.lastSend = Date.now()
                numev++
            } else {
                if (this.lastSend) {
                    const d = Date.now() - this.lastSend
                    if (d > 50) {
                        this.lastSend = 0
                        console.error("failed to send packet fast enough")
                    }
                }
            }
        }

        if (numev == 0 && !hadSerial)
            await this.dapDelay(5000)
    }

    private dapDelay(micros: number) {
        if (micros > 0xffff)
            throw new Error("too large delay")
        const cmd = new Uint8Array([0x09, 0, 0])
        pxt.HF2.write16(cmd, 1, micros)
        return this.dapCmd(cmd)
    }
}

interface SendItem {
    buf: Uint8Array
    cb: () => void
}

export function mkDAPLinkPacketIOWrapper(io: pxt.packetio.PacketIO): pxt.packetio.PacketIOWrapper {
    pxt.log(`packetio: mk wrapper dap wrapper`)
    return new DAPWrapper(io);
}
