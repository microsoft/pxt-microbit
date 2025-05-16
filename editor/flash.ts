const imul = (Math as any).imul;
const timeoutMessage = "timeout";
const membase = 0x20000000;
const loadAddr = membase;
const dataAddr = 0x20002000;
const stackAddr = 0x20001000;
const FULL_FLASH_TIMEOUT = 100000; // 100s
const PARTIAL_FLASH_TIMEOUT = 60000; // 60s
const CONNECTION_CHECK_TIMEOUT = 2000; // 2s
const RETRY_DAP_CMD_TIMEOUT = 50; // .05s

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
const setBaudRateOnConnection = !/webusbbaud=0/.test(window.location.href)
const resetOnConnection = !/webusbreset=0/.test(window.location.href)

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

function bufferConcat(a: Uint8Array, b: Uint8Array) {
    const r = new Uint8Array(a.length + b.length)
    r.set(a, 0)
    r.set(b, a.length)
    return r
}

class DAPWrapper implements pxt.packetio.PacketIOWrapper {
    private initialized = false
    familyID: number;
    private dap: DapJS.DAP;
    private cortexM: DapJS.CortexM
    private flashAborted = false;
    private connectionId = 0;
    private pbuf = new pxt.U.PromiseBuffer<Uint8Array>();
    private pageSize = 1024;
    private numPages = 256;

    private usesCODAL: boolean = undefined;
    // we don't know yet if jacdac was compiled in the hex
    private jacdacInHex: boolean = undefined
    private forceFullFlash = /webusbfullflash=1/.test(window.location.href);

    onSerial = (buf: Uint8Array, isStderr: boolean) => { };
    onCustomEvent = (type: string, payload: Uint8Array) => { };

    constructor(public readonly io: pxt.packetio.PacketIO) {
        this.familyID = 0x0D28; // this is the microbit vendor id, not quite UF2 family id
        this.io.onDeviceConnectionChanged = async (connect) => {
            log(`device connection changed`);
            await this.disconnectAsync()
            // we don't know what's being connected
            this.usesCODAL = undefined
            this.jacdacInHex = undefined

            if (!connect) return;
            await this.reconnectAsync()
        }

        this.io.onData = buf => {
            // console.log("RD: " + pxt.Util.toHex(buf))
            this.pbuf.push(buf);
        }

        this.allocDAP();
    }

    icon = "xicon microbit";

    private pendingSerial: Uint8Array
    private lastPendingSerial: number

    private processSerialLine(line: Uint8Array) {
        if (this.onSerial) {
            try {
                // catch encoding bugs
                this.onSerial(line, false)
            }
            catch (err) {
                log(`serial decoding error: ${err.message}`);
                pxt.tickEvent("hid.flash.serial.decode.error");
                console.error({ err, line })
            }
        }
    }

    private async readSerial(): Promise<number> {
        let buf = await this.dapCmdNums(0x83)
        const len = buf[1]
        // concat received data with previous data
        if (len) {
            buf = buf.slice(2, 2 + len)
            if (this.pendingSerial) buf = bufferConcat(this.pendingSerial, buf)
            let ptr = 0
            let beg = 0
            while (ptr < buf.length) {
                if (buf[ptr] == 10 || buf[ptr] == 13) {
                    ptr++;
                    // eat \r\n
                    while (ptr < buf.length && (buf[ptr] == 10 || buf[ptr] == 13))
                        ptr++;
                    const line = buf.slice(beg, ptr)
                    if (line.length)
                        this.processSerialLine(line);
                    beg = ptr
                }
                else
                    ptr++
            }
            buf = buf.slice(beg)
            this.pendingSerial = buf.length ? buf : null
            if (this.pendingSerial) {
                this.lastPendingSerial = Date.now()
                //logV(`pending serial ${this.pendingSerial.length}`)
            }
        } else if (this.pendingSerial) {
            const d = Date.now() - this.lastPendingSerial
            if (d > 500) {
                this.processSerialLine(this.pendingSerial)
                this.pendingSerial = null
                this.lastPendingSerial = undefined
            }
        }
        return len
    }

    private startReadSerial(connectionId: number) {
        const startTime = Date.now();
        log(`start read serial ${connectionId}`)
        const readSerialLoop = async () => {
            try {
                let numSer = 0
                let numEv = 0
                while (connectionId === this.connectionId) {
                    numSer = await this.readSerial()
                    // we need to read jacdac in a tight loop
                    // so we don't miss any event
                    if (this.xchgAddr)
                        numEv = await this.jacdacProcess()
                    else
                        numEv = 0

                    // no data on either side, wait as little as possible
                    // the browser will eventually throttle this call
                    // https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#reasons_for_delays_longer_than_specified
                    if (!numSer && !numEv)
                        await pxt.U.delay(0)
                }
                log(`stopped serial reader ${connectionId}`)
            } catch (err) {
                log(`serial error ${connectionId}: ${err.message}`);
                console.error(err)
                if (connectionId != this.connectionId) {
                    log(`stopped serial reader ${connectionId}`)
                } else {
                    pxt.tickEvent("hid.flash.serial.error");
                    const timeRunning = Date.now() - startTime
                    await this.disconnectAsync(); // force disconnect
                    // if we've been running for a while, try reconnecting
                    if (timeRunning > 1000) {
                        log(`auto-reconnect`)
                        try {
                            await this.reconnectAsync();
                        } catch (e) {
                            if (e.type === "devicenotfound")
                                return
                            throw e
                        }
                    }
                }
            }
            finally {
                this.pendingSerial = undefined
                this.lastPendingSerial = undefined
            }
        }

        readSerialLoop();
    }

    private stopReadersAsync() {
        log(`cancelling connection ${this.connectionId}`)
        this.connectionId++;
        return pxt.Util.delay(200);
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
        this.cortexM = new DapJS.CortexM(this.dap);
    }

    get binName() {
        return `${this.devVariant}-${pxtc.BINARY_HEX}`;
    }

    get devVariant() {
        if (this.usesCODAL === undefined)
            console.warn('try to access codal information before it is computed')
        return this.usesCODAL ? "mbcodal" : "mbdal";
    }

    unsupportedParts() {
        if (this.usesCODAL === undefined)
            console.warn('try to access codal information before it is computed')
        if (!this.usesCODAL) {
            return ["logotouch", "builtinspeaker", "microphone", "flashlog", "v2"]
        }
        return [];
    }

    isConnected(): boolean {
        return this.io.isConnected() && this.initialized
    }

    isConnecting(): boolean {
        return this.io.isConnecting() || (this.io.isConnected() && !this.initialized)
    }

    private async getBaudRate() {
        const readSerialSettings = new Uint8Array([0x81])  // get serial settings
        const serialSettings = await this.dapCmd(readSerialSettings)
        const baud = (serialSettings[4] << 24) + (serialSettings[3] << 16) + (serialSettings[2] << 8) + serialSettings[1]
        return baud
    }

    private async setBaudRate() {
        const currentBaudRate = await this.getBaudRate()
        if (currentBaudRate === 115200) {
            log(`baud rate already set to 115200`)
            return
        }
        log(`set baud rate to 115200`)
        const baud = new Uint8Array(5)
        baud[0] = 0x82 // set baud
        pxt.HF2.write32(baud, 1, 115200)
        await this.dapCmd(baud)
        // setting the baud rate on serial may reset NRF (depending on daplink version), so delay after
        await pxt.Util.delay(200);
    }

    private async readPageSize() {
        const res = await this.readWords(0x10000010, 2);
        this.pageSize = res[0]
        this.numPages = res[1]
        log(`page size ${this.pageSize}, num pages ${this.numPages}`);
    }

    async reconnectAsync(): Promise<void> {
        log(`reconnect`)
        this.initialized = false
        this.flashAborted = false;
        this.io.onConnectionChanged()

        function stringResponse(buf: Uint8Array) {
            return pxt.U.uint8ArrayToString(buf.slice(2, 2 + buf[1]))
        }

        await this.stopReadersAsync()
        const connectionId = this.connectionId

        this.allocDAP(); // clean dap apis

        await this.io.reconnectAsync()

        await this.clearCommandsAsync()

        // halt before reading from dap
        // to avoid interference from data logger
        await this.cortexM.halt()

        const info = await this.getDaplinkVersionAsync(); // info
        const daplinkVersion = stringResponse(info);
        log(`daplink version: ${daplinkVersion}`);

        const r = await this.dapCmdNums(0x80)
        this.usesCODAL = r[2] == 57 && r[3] == 57 && r[5] >= 51;
        const binVersion = stringResponse(r);
        log(`bin name: ${this.binName} v:${binVersion}`);

        pxt.tickEvent("hid.flash.connect", { codal: this.usesCODAL ? 1 : 0, daplink: daplinkVersion, bin: binVersion });

        if (setBaudRateOnConnection)
            await this.setBaudRate()
        // only init after setting baud rate, in case we got reset
        await this.cortexM.init()
        if (resetOnConnection) {
            log(`reset cortex`)
            await this.cortexM.reset(true)
        }

        await this.readPageSize()
        // jacdac needs to run to set the xchg address
        await this.checkStateAsync(true);
        await this.initJacdac(connectionId)

        this.initialized = true
        this.io.onConnectionChanged()
        // start jacdac, serial async
        this.startReadSerial(connectionId)
    }

    private async clearCommandsAsync() {
        try {
            await pxt.Util.promiseTimeout(CONNECTION_CHECK_TIMEOUT, (async () => {
                // before calling into dapjs, push through a few commands to make sure the responses
                // to commands from previous sessions (if any) are flushed. Count of 5 is arbitrary.
                for (let i = 0; i < 5; i++) {
                    try {
                        await this.getDaplinkVersionAsync();
                    } catch (e) { }
                }
            })());
        } catch (e) {
            const errOut = new Error(e);
            (errOut as any).type = "inittimeout";
            throw errOut;
        }
    }

    private async getDaplinkVersionAsync() {
        return await this.dapCmdNums(0x00, 0x04);
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
            pxt.tickEvent("hid.checkstate.error")
            console.debug(e)
        }
    }

    private checkAborted() {
        if (this.flashAborted)
            throw new Error(lf("Download cancelled"));
    }

    async disconnectAsync() {
        log(`disconnect`)
        this.flashAborted = true;
        this.initialized = false;
        await this.stopReadersAsync();
        await this.io.disconnectAsync();
    }

    async reflashAsync(
        resp: pxtc.CompileResult,
        progressCallback?: (percentageComplete: number) => void
    ): Promise<void> {
        pxt.tickEvent("hid.flash.start");

        log("reflash")
        startTime = 0
        // JACDAC_WEBUSB is defined in microsoft/pxt-jacdac/pxt.json
        const codalJson = resp.outfiles["codal.json"]
        this.jacdacInHex = codalJson && !!pxt.Util.jsonTryParse(codalJson)?.definitions?.JACDAC_WEBUSB;
        this.flashAborted = false;
        if (!this.io.isConnected()) {
            await this.io.reconnectAsync();
        }

        await this.stopReadersAsync();
        await this.clearCommandsAsync()
        await this.cortexM.init();
        await this.cortexM.reset(true);
        await this.checkStateAsync();
        const uicr = await this.readUICR();

        pxt.tickEvent("hid.flash.uicr", { uicr });
        // shortcut, do a full flash
        if (uicr != 0 || this.forceFullFlash) {
            pxt.tickEvent("hid.flash.uicrfail");
            await this.fullVendorCommandFlashAsync(resp, progressCallback);
        } else {
            // check flash checksums
            const chk = await this.computeFlashChecksum(resp);
            pxt.tickEvent("hid.flash.checksum", { quick: chk.quick ? 1 : 0, changed: chk.changed ? chk.changed.length : 0 });
            if (chk.quick) {
                // let's do a quick flash!
                await this.quickHidFlashAsync(chk.changed, progressCallback);
            } else {
                await this.fullVendorCommandFlashAsync(resp, progressCallback);
            }
        }

        await this.checkStateAsync(true);
        pxt.tickEvent("hid.flash.success");
        // don't disconnect here
        // the micro:bit will automatically disconnect and reconnect
        // via the webusb events
    }

    private recvPacketAsync(timeout?: number) {
        if (this.io.recvPacketAsync)
            return this.io.recvPacketAsync(timeout);
        else
            return this.pbuf.shiftAsync(timeout);
    }

    private async dapCmd(buf: Uint8Array) {
        await this.io.sendPacketAsync(buf);
        const resp = await this.recvPacketAsync();
        if (resp[0] != buf[0]) {
            pxt.tickEvent('hid.flash.cmderror', { req: buf[0], resp: resp[0] });
            const msg = `bad dapCmd response: ${buf[0]} -> ${resp[0]}`

            // in case we got an invalid response, try to get another response, in case the current
            // response is a left-over from previous communications
            log(msg + "; retrying");
            try {
                // Add in a timeout, as this can stall if device thinks communication is complete.
                const secondTryResp = await this.recvPacketAsync(RETRY_DAP_CMD_TIMEOUT);
                if (secondTryResp[0] === buf[0]) {
                    log(msg + "; retry success");
                    return secondTryResp;
                }
            } catch (e) {
                pxt.tickEvent('hid.flash.cmderror.retryfailed', { req: buf[0], resp: resp[0] });
                log(e);
            }
            throw new Error(`retry failed ${msg}`);
        }
        return resp;
    }

    private dapCmdNums(...nums: number[]) {
        return this.dapCmd(new Uint8Array(nums))
    }

    private async fullVendorCommandFlashAsync(
        resp: pxtc.CompileResult,
        progressCallback?: (percentageComplete: number) => void
    ): Promise<void> {
        log("full flash")
        pxt.tickEvent("hid.flash.full.start");

        const start = Date.now();
        const chunkSize = 62;
        let sentPages = 0;
        try {
            await pxt.Util.promiseTimeout(
                FULL_FLASH_TIMEOUT,
                (async () => {
                    const dapOpenRes = await this.dapCmdNums(0x8A /* DAPLinkFlash.OPEN */, 1);
                    log(`daplinkflash open: ${pxt.U.toHex(dapOpenRes)}`);
                    if (dapOpenRes[1] !== 0) {
                        pxt.tickEvent('hid.flash.full.error.open', { res: dapOpenRes[1] });
                        throw new Error(lf("Download failed, please try again"));
                    }
                    const binFile = this.getBinFile(resp);
                    log(`bin file ${this.binName} in ${Object.keys(resp.outfiles).join(', ')}, ${binFile?.length || -1}b`);
                    const hexUint8 = pxt.U.stringToUint8Array(binFile);
                    log(`hex ${hexUint8?.byteLength || -1}b, ~${(hexUint8.byteLength / chunkSize) | 0} chunks of ${chunkSize}b`);

                    let offset = 0;

                    while (offset < hexUint8.length) {
                        const end = Math.min(hexUint8.length, offset + chunkSize);
                        const nextPageData = hexUint8.slice(offset, end);
                        const cmdData = new Uint8Array(2 + nextPageData.length);
                        cmdData[0] = 0x8C; /* DAPLinkFlash.WRITE */
                        cmdData[1] = nextPageData.length;
                        cmdData.set(nextPageData, 2);
                        if (sentPages % 128 == 0) { // reduce logging
                            progressCallback(offset / hexUint8.length);
                            log(`next page ${sentPages}: [${offset.toString(16)}, ${end.toString(16)}] (${Math.ceil((hexUint8.length - end) / 1000)}kb left)`);
                        }
                        await this.dapCmd(cmdData);
                        this.checkAborted();
                        sentPages++;
                        offset = end;
                    }

                    log("close");
                    const closeRes = await this.dapCmdNums(0x8B /* DAPLinkFlash.CLOSE */);
                    log(`daplinkclose: ${pxt.U.toHex(closeRes)}`);
                    const resetRes = await this.dapCmdNums(0x89 /* DAPLinkFlash.RESET */);
                    log(`daplinkreset: ${pxt.U.toHex(resetRes)}`);
                    log(`full flash done after ${Date.now() - start}ms`);
                    pxt.tickEvent("hid.flash.full.success");
                })(),
                timeoutMessage
            )
        } catch (e) {
            log(`error: abort`);
            pxt.tickEvent("hid.flash.full.error");
            this.flashAborted = true;
            return this.resetAndThrowAsync(e);
        };
    }

    private async resetAndThrowAsync(e: any) {
        log(`reset on error`);
        pxt.tickEvent("hid.flash.reset");
        console.debug(e);
        // reset any pending daplink
        try {
            await this.dapCmdNums(0x89 /* DAPLinkFlash.RESET */);
        } catch (e) {
            // Best effort reset, no-op if there's an error
        }
        try {
            await this.cortexM.reset(false);
        } catch (e) {
            // Best effort reset, no-op if there's an error
        }
        throw e;
    }

    private async readUICR() {
        const v = await this.readWords(0x10001014, 1);
        const uicr = v[0] & 0xff;
        log(`uicr: ${uicr.toString(16)} (${v[0].toString(16)})`);
        return uicr;
    }

    private getBinFile(resp: pxtc.CompileResult) {
        const multiVariantBinFile = resp.outfiles[this.binName];
        if (multiVariantBinFile)
            return multiVariantBinFile;

        const dvBin = resp.builtVariants?.find(el => el === this.devVariant) && resp.outfiles[pxtc.BINARY_HEX];
        if (dvBin)
            return resp.outfiles[pxtc.BINARY_HEX];

        throw new Error(`unable to find ${this.binName} in outfiles ${Object.keys(resp.outfiles).join(', ')}`);
    }

    private async computeFlashChecksum(resp: pxtc.CompileResult) {
        const binFile = this.getBinFile(resp);

        const checksums = await this.getFlashChecksumsAsync();
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
    }

    private async quickHidFlashAsync(
        changed: ts.pxtc.UF2.Block[],
        progressCallback?: (percentageComplete: number) => void
    ): Promise<void> {
        log("quick flash")
        pxt.tickEvent("hid.flash.quick.start");

        const start = Date.now();
        const runFlash = async (b: ts.pxtc.UF2.Block, dataAddr: number) => {
            const cmd = this.cortexM.prepareCommand();

            cmd.halt();

            cmd.writeCoreRegister(DapJS.CortexReg.PC, loadAddr + 4 + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.LR, loadAddr + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.SP, stackAddr);

            cmd.writeCoreRegister(0, b.targetAddr);
            cmd.writeCoreRegister(1, dataAddr);
            cmd.writeCoreRegister(2, this.pageSize >> 2);

            logV("setregs");
            await cmd.go();
            // starts the program
            logV(`cortex.debug.enable`);
            return this.cortexM.debug.enable();
        }

        const quickHidFlashCoreAsync = async () => {
            await this.cortexM.memory.writeBlock(loadAddr, flashPageBIN);
            for (let i = 0; i < changed.length; i++) {
                this.checkAborted();
                let b = changed[i];
                if (b.targetAddr >= 0x10000000) {
                    log(`target address 0x${b.targetAddr.toString(16)} > 0x10000000`);
                    continue;
                }

                log(`about to write at 0x${b.targetAddr.toString(16)}`);
                progressCallback(i / changed.length);

                const thisAddr = (i & 1) ? dataAddr : dataAddr + this.pageSize;
                const nextAddr = (i & 1) ? dataAddr + this.pageSize : dataAddr;

                if (i == 0) {
                    const u32data = new Uint32Array(b.data.length / 4);
                    for (let i = 0; i < b.data.length; i += 4)
                        u32data[i >> 2] = pxt.HF2.read32(b.data, i);
                    await this.cortexM.memory.writeBlock(thisAddr, u32data);
                }

                await runFlash(b, thisAddr);
                const next = changed[i + 1];
                if (next) {
                    logV("write next");
                    const buf = new Uint32Array(next.data.buffer);
                    await this.cortexM.memory.writeBlock(nextAddr, buf);
                }
                logV("wait");
                await this.cortexM.waitForHalt(500);
                logV("done block");
            }

            log(`quick flash done after ${Date.now() - start}ms`);
            await this.cortexM.reset(false);
            pxt.tickEvent("hid.flash.quick.success");
            await this.checkStateAsync(true);
        }

        try {
            await pxt.Util.promiseTimeout(
                PARTIAL_FLASH_TIMEOUT,
                quickHidFlashCoreAsync(),
                timeoutMessage
            );
        } catch (e) {
            pxt.tickEvent("hid.flash.quick.error");
            this.flashAborted = true;
            return this.resetAndThrowAsync(e);
        }
    }

    private async getFlashChecksumsAsync() {
        log("flash checksums");
        let pages = this.numPages;
        await this.cortexM.runCode(
            computeChecksums2,
            loadAddr,
            loadAddr + 1,
            0xffffffff,
            stackAddr,
            true,
            dataAddr,
            0,
            this.pageSize,
            pages
        );
        return this.cortexM.memory.readBlock(
            dataAddr,
            pages * 2,
            this.pageSize
        );
    }

    private async readWords(addr: number, numWords: number) {
        const u8 = await this.cortexM.memory.readBlock(addr, numWords, this.pageSize);
        // assume browser is little-endian
        return new Uint32Array(u8.buffer);
    }

    private writeWords(addr: number, buf: Uint32Array) {
        return this.cortexM.memory.writeBlock(addr, buf)
    }

    private async readBytes(addr: number, numBytes: number) {
        const u8 = await this.cortexM.memory.readBlock(addr, (numBytes + 3) >> 2, this.pageSize);
        return u8.length == numBytes ? u8 : u8.slice(0, numBytes);
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

    private async findJacdacXchgAddr(cid: number): Promise<number> {
        const memStart = 0x2000_0000
        const memStop = memStart + 128 * 1024
        const addr = (await this.readWords(memStop - 4, 1))[0]
        if (cid != this.connectionId) return null
        if (memStart <= addr && addr < memStop) {
            const buf = await this.readWords(addr, 2)
            if (buf[0] == 0x786D444A && buf[1] == 0xB0A6C0E9)
                return addr
        }
        return null
    }

    /**
     * Sniff Jacdac exchange address
     * @returns
     */
    private async initJacdac(connectionId: number) {
        this.xchgAddr = null
        this.irqn = undefined
        this.lastXchg = undefined
        if (!this.usesCODAL) {
            log(`jacdac: CODAL disabled`)
            return
        }
        if (this.jacdacInHex === false) {
            log(`jacdac: jacdac not compiled in`)
            return
        }

        try {
            // allow jacdac to boot
            const now = pxt.U.now()
            await pxt.Util.delay(1000)
            let xchgRetry = 0
            let xchg: number
            while (xchg == null && xchgRetry++ < 3) {
                log(`jacdac: finding xchg address (retry ${xchgRetry})`)
                if (xchgRetry > 0)
                    await pxt.Util.delay(500); // wait for the program to start and setup memory correctly
                if (connectionId != this.connectionId) return;
                xchg = await this.findJacdacXchgAddr(connectionId)
            }
            log(`jacdac: exchange address 0x${xchg ? xchg.toString(16) : "?"}; ${xchgRetry} retries; ${(pxt.U.now() - now) | 0}ms`)
            if (xchg == null) {
                log("jacdac: xchg address not found")
                this.jacdacInHex = false
                pxt.tickEvent("hid.flash.jacdac.error.missingxchg");
                return
            }

            if (connectionId != this.connectionId) return;
            const info = await this.readBytes(xchg, 16)
            if (info[12 + 2] != 0xff) {
                log("jacdac: invalid memory; try power-cycling the micro:bit")
                pxt.tickEvent("hid.flash.jacdac.error.invalidmemory");
                console.debug({ info, xchg })
                return
            }

            // make sure connection is not outdated
            if (connectionId != this.connectionId) return;
            // clear initial lock
            await this.writeWord(xchg + 12, 0)
            // allow serial thread to use jacdac
            this.irqn = info[8]
            this.xchgAddr = xchg
            log(`jacdac: exchange address 0x${this.xchgAddr.toString(16)}; irqn=${this.irqn}`)
            pxt.tickEvent("hid.flash.jacdac.connected");
        } catch (e) {
            if (connectionId != this.connectionId) {
                log(`jacdac: setup aborted`)
                return;
            } else throw e
        }
    }

    private async triggerIRQ() {
        const addr = 0xE000E200 + (this.irqn >> 5) * 4
        await this.writeWord(addr, 1 << (this.irqn & 31))
    }

    private async jacdacProcess(): Promise<number> {
        const now = Date.now()
        if (this.lastXchg && now - this.lastXchg > 50) {
            logV("slow xchg: " + (now - this.lastXchg) + "ms")
        }
        this.lastXchg = now

        let numev = 0
        // TODO only read say 32 bytes first, and more if needed
        let inp = await this.readBytes(this.xchgAddr + 12, 256)
        if (inp[2]) {
            await this.writeWord(this.xchgAddr + 12, 0)
            await this.triggerIRQ()
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
                await this.triggerIRQ()
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

        return numev
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
