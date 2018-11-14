/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

interface Math {
    imul(x: number, y: number): number;
}
namespace pxt.editor {
    import UF2 = pxtc.UF2;

    const pageSize = 1024;
    const numPages = 256;
    const timeoutMessage = "timeout";

    function murmur3_core(data: Uint8Array) {
        let h0 = 0x2F9BE6CC;
        let h1 = 0x1EC3A6C8;

        for (let i = 0; i < data.length; i += 4) {
            let k = HF2.read32(data, i) >>> 0
            k = Math.imul(k, 0xcc9e2d51);
            k = (k << 15) | (k >>> 17);
            k = Math.imul(k, 0x1b873593);

            h0 ^= k;
            h1 ^= k;
            h0 = (h0 << 13) | (h0 >>> 19);
            h1 = (h1 << 13) | (h1 >>> 19);
            h0 = (Math.imul(h0, 5) + 0xe6546b64) >>> 0;
            h1 = (Math.imul(h1, 5) + 0xe6546b64) >>> 0;
        }
        return [h0, h1]
    }

    class DAPWrapper {
        cortexM: DapJS.CortexM
        packetIo: HF2.PacketIO;
        cmsisdap: any;
        flashing = true;
        pbuf = new U.PromiseBuffer<Uint8Array>();
        private useSerial = true;

        constructor(h: HF2.PacketIO) {
            this.packetIo = h;

            h.onData = buf => {
                // console.log("RD: " + pxt.Util.toHex(buf))
                this.pbuf.push(buf);
            }

            this.allocDAP()

            const readSerial = () => {
                if (!this.useSerial) {
                    return
                }

                if (this.flashing) {
                    setTimeout(readSerial, 300)
                    return
                }

                this.cmsisdap.cmdNums(0x83, [])
                    .then((r: number[]) => {
                        const len = r[1]
                        let str = ""
                        for (let i = 2; i < len + 2; ++i) {
                            str += String.fromCharCode(r[i])
                        }
                        if (str.length > 0) {
                            U.nextTick(readSerial)
                            window.postMessage({
                                type: 'serial',
                                id: 'n/a', // TODO
                                data: str
                            }, "*")
                            // console.log("SERIAL: " + str)
                        } else
                            setTimeout(readSerial, 50)
                    }, (err: any) => {
                        setTimeout(readSerial, 1000)
                    })
            }

            readSerial()
        }

        private allocDAP() {
            /*
            let sendMany = (cmds: Uint8Array[]) => {
                return h.talksAsync(cmds.map(c => ({ cmd: 0, data: c })));
            }

            if (!h.talksAsync)
                sendMany = null;
            */

            let dev = new DapJS.DAP({
                write: writeAsync,
                close: this.disconnectAsync,
                read: readAsync,
                //sendMany: sendMany
            });
            this.cmsisdap = (dev as any).dap;
            this.cortexM = new DapJS.CortexM(dev);

            let h = this.packetIo
            let pbuf = this.pbuf

            function writeAsync(data: ArrayBuffer) {
                // console.log("WR: " + pxt.Util.toHex(new Uint8Array(data)));
                return h.sendPacketAsync(new Uint8Array(data));
            }

            function readAsync() {
                return pbuf.shiftAsync();
            }
        }

        reconnectAsync(first: boolean) {
            // configure serial at 115200
            let p = Promise.resolve();
            if (!first) {
                p = this.packetIo.reconnectAsync()
                    .then(() => this.allocDAP());
            }

            return p
                .then(() => this.cortexM.init())
                .then(() => {
                    return this.cmsisdap.cmdNums(0x82, [0x00, 0xC2, 0x01, 0x00])
                        .then(() => { this.useSerial = true }, (err: any) => { this.useSerial = false; });
                });
        }

        disconnectAsync() {
            return this.packetIo.disconnectAsync();
        }
    }

    let packetIoPromise: Promise<pxt.HF2.PacketIO>;
    function initPacketIOAsync(): Promise<pxt.HF2.PacketIO> {
        if (!packetIoPromise) {
            packetIoPromise = pxt.HF2.mkPacketIOAsync()
                .catch(err => {
                    packetIoPromise = null;
                    return Promise.reject(err);
                });
            return packetIoPromise;
        } else {
            let packetIo: pxt.HF2.PacketIO;
            return packetIoPromise
                .then((io) => {
                    packetIo = io;
                    return io.reconnectAsync();
                })
                .then(() => packetIo);
        }
    }

    let previousDapWrapper: DAPWrapper;
    function dapAsync() {
        if (previousDapWrapper)
            return previousDapWrapper.reconnectAsync(false) // Always fully reconnect to handle device unplugged mid-session
                .then(() => previousDapWrapper);
        return Promise.resolve()
            .then(() => {
                if (previousDapWrapper) {
                    return previousDapWrapper.disconnectAsync()
                        .finally(() => {
                            previousDapWrapper = null;
                        });
                }
                return Promise.resolve();
            })
            .then(() => initPacketIOAsync())
            .then(h => {
                let w = new DAPWrapper(h)
                previousDapWrapper = w;
                return w.reconnectAsync(true)
                    .then(() => {
                        return w
                    })
            })
    }

    function canHID(): boolean {
        let r = false
        if (pxt.usb.isEnabled) {
            r = true
        } else if (U.isNodeJS) {
            r = true
        } else {
            const forceHexDownload = /forceHexDownload/i.test(window.location.href);
            const isUwp = !!(window as any).Windows;
            if (Cloud.isLocalHost() && Cloud.localToken && !forceHexDownload || isUwp)
                r = true
        }
        return r;
    }

    function initAsync() {
        if (canHID()) {
            return dapAsync();
        } else {
            return Promise.reject(new Error("no HID"))
        }
    }

    function pageAlignBlocks(blocks: UF2.Block[], pageSize: number) {
        U.assert(pageSize % 256 == 0)
        let res: UF2.Block[] = []
        for (let i = 0; i < blocks.length;) {
            let b0 = blocks[i]
            let newbuf = new Uint8Array(pageSize)
            let startPad = b0.targetAddr & (pageSize - 1)
            let newAddr = b0.targetAddr - startPad
            for (; i < blocks.length; ++i) {
                let b = blocks[i]
                if (b.targetAddr + b.payloadSize > newAddr + pageSize)
                    break
                U.memcpy(newbuf, b.targetAddr - newAddr, b.data, 0, b.payloadSize)
            }
            let bb = U.flatClone(b0)
            bb.data = newbuf
            bb.targetAddr = newAddr
            bb.payloadSize = pageSize
            res.push(bb)
        }
        return res
    }

    const flashPageBINquick = new Uint32Array([
        0xbe00be00, // bkpt - LR is set to this
        0x2480b5f0, 0x00e42300, 0x58cd58c2, 0xd10342aa, 0x42a33304, 0xbdf0d1f8,
        0x4b162502, 0x509d4a16, 0x2d00591d, 0x24a1d0fc, 0x511800e4, 0x3cff3c09,
        0x591e0025, 0xd0fc2e00, 0x509c2400, 0x2c00595c, 0x2401d0fc, 0x509c2580,
        0x595c00ed, 0xd0fc2c00, 0x00ed2580, 0x002e2400, 0x5107590f, 0x2f00595f,
        0x3404d0fc, 0xd1f742ac, 0x50992100, 0x2a00599a, 0xe7d0d0fc, 0x4001e000,
        0x00000504,
    ])

    // doesn't check if data is already there - for timing
    const flashPageBIN = new Uint32Array([
        0xbe00be00, // bkpt - LR is set to this
        0x2402b5f0, 0x4a174b16, 0x2480509c, 0x002500e4, 0x2e00591e, 0x24a1d0fc,
        0x511800e4, 0x2c00595c, 0x2400d0fc, 0x2480509c, 0x002500e4, 0x2e00591e,
        0x2401d0fc, 0x595c509c, 0xd0fc2c00, 0x00ed2580, 0x002e2400, 0x5107590f,
        0x2f00595f, 0x3404d0fc, 0xd1f742ac, 0x50992100, 0x2a00599a, 0xbdf0d0fc,
        0x4001e000, 0x00000504,
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
        pxt.log(`HID ${ts}: ${msg}`)
    }

    const membase = 0x20000000
    const loadAddr = membase
    const dataAddr = 0x20002000
    const stackAddr = 0x20001000

    export const bufferConcat = (bufs: Uint8Array[]) => {
        let len = 0;
        for (const b of bufs) {
            len += b.length;
        }
        const r = new Uint8Array(len);
        len = 0;
        for (const b of bufs) {
            r.set(b, len);
            len += b.length;
        }
        return r;
    };

    function fullVendorCommandFlashAsync(resp: pxtc.CompileResult, wrap: DAPWrapper): Promise<void> {
        const chunkSize = 62;
        let aborted = false;

        return Promise.resolve()
            .then(() => {
                return wrap.cmsisdap.cmdNums(0x8A /* DAPLinkFlash.OPEN */, [1]);
            })
            .then((res) => {
                const hexUint8 = U.stringToUint8Array(resp.outfiles[pxtc.BINARY_HEX]);
                const hexArray: number[] = Array.prototype.slice.call(hexUint8);

                const sendPages = (offset: number = 0): Promise<void> => {
                    const end = Math.min(hexArray.length, offset + chunkSize);
                    const nextPage = hexArray.slice(offset, end);
                    nextPage.unshift(nextPage.length);
                    return wrap.cmsisdap.cmdNums(0x8C /* DAPLinkFlash.WRITE */, nextPage)
                        .then(() => {
                            if (!aborted && end < hexArray.length) {
                                return sendPages(end);
                            }
                            return Promise.resolve();
                        });
                }

                return sendPages();
            })
            .then((res) => {
                return wrap.cmsisdap.cmdNums(0x8B /* DAPLinkFlash.CLOSE */, []);
            })
            .timeout(60000, timeoutMessage)
            .catch((e) => {
                aborted = true;
                return wrap.cmsisdap.cmdNums(0x89 /* DAPLinkFlash.RESET */, [])
                    .catch((e2: any) => {
                        // Best effort reset, no-op if there's an error
                    })
                    .then(() => {
                        return Promise.reject(e);
                    });
            });
    }

    function quickHidFlashAsync(resp: pxtc.CompileResult, wrap: DAPWrapper): Promise<void> {
        let logV = (msg: string) => { }
        //let logV = log
        let aborted = false;

        const runFlash = (b: UF2.Block, dataAddr: number) => {
            const cmd = wrap.cortexM.prepareCommand();

            cmd.halt();

            cmd.writeCoreRegister(DapJS.CortexReg.PC, loadAddr + 4 + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.LR, loadAddr + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.SP, stackAddr);

            cmd.writeCoreRegister(0, b.targetAddr);
            cmd.writeCoreRegister(1, dataAddr);

            return Promise.resolve()
                .then(() => {
                    logV("setregs")
                    return cmd.go()
                })
                .then(() => {
                    logV("dbg en")
                    // starts the program
                    return wrap.cortexM.debug.enable()
                })
        }

        let checksums: Uint8Array
        return getFlashChecksumsAsync(wrap)
            .then(buf => {
                checksums = buf;
                log("write code");
                return wrap.cortexM.memory.writeBlock(loadAddr, flashPageBIN);
            })
            .then(() => {
                log("convert");
                // TODO this is seriously inefficient (130ms on a fast machine)
                let uf2 = UF2.newBlockFile();
                UF2.writeHex(uf2, resp.outfiles[pxtc.BINARY_HEX].split(/\r?\n/));
                let bytes = U.stringToUint8Array(UF2.serializeFile(uf2));
                let parsed = UF2.parseFile(bytes);

                let aligned = pageAlignBlocks(parsed, pageSize);
                log(`initial: ${aligned.length} pages`);
                aligned = onlyChanged(aligned, checksums);
                log(`incremental: ${aligned.length} pages`);

                return Promise.mapSeries(U.range(aligned.length),
                    i => {
                        if (aborted) return Promise.resolve();
                        let b = aligned[i];
                        if (b.targetAddr >= 0x10000000)
                            return Promise.resolve();

                        logV("about to write at 0x" + b.targetAddr.toString(16));

                        let writeBl = Promise.resolve();

                        let thisAddr = (i & 1) ? dataAddr : dataAddr + pageSize;
                        let nextAddr = (i & 1) ? dataAddr + pageSize : dataAddr;

                        if (i == 0) {
                            let u32data = new Uint32Array(b.data.length / 4);
                            for (let i = 0; i < b.data.length; i += 4)
                                u32data[i >> 2] = HF2.read32(b.data, i);
                            writeBl = wrap.cortexM.memory.writeBlock(thisAddr, u32data);
                        }

                        return writeBl
                            .then(() => runFlash(b, thisAddr))
                            .then(() => {
                                let next = aligned[i + 1];
                                if (!next)
                                    return Promise.resolve();
                                logV("write next");
                                let buf = new Uint32Array(next.data.buffer);
                                return wrap.cortexM.memory.writeBlock(nextAddr, buf);
                            })
                            .then(() => {
                                logV("wait");
                                return wrap.cortexM.waitForHalt(500);
                            })
                            .then(() => {
                                logV("done block");
                            });
                    })
                    .then(() => {
                        log("flash done");
                        pxt.tickEvent("hid.flash.done");
                        return wrap.cortexM.reset(false);
                    })
                    .then(() => {
                        wrap.flashing = false;
                    });
            })
            .timeout(25000, timeoutMessage)
            .catch((e) => {
                aborted = true;
                return Promise.reject(e);
            });
    }

    function flashAsync(resp: pxtc.CompileResult, d: pxt.commands.DeployOptions = {}): Promise<void> {
        startTime = 0
        let wrap: DAPWrapper
        log("init")

        d.showNotification(U.lf("Downloading..."));
        pxt.tickEvent("hid.flash.start");
        return Promise.resolve()
            .then(() => {
                if (previousDapWrapper) {
                    previousDapWrapper.flashing = true;
                    return Promise.delay(100);
                }
                return Promise.resolve();
            })
            .then(initAsync)
            .then(w => {
                wrap = w
                log("reset");
                return wrap.cortexM.init()
                    .then(() => wrap.cortexM.reset(true))
                    .catch(e => {
                        log("trying re-connect");
                        return wrap.reconnectAsync(false)
                            .then(() => wrap.cortexM.reset(true));
                    });
            })
            .then(() => wrap.cortexM.memory.readBlock(0x10001014, 1, pageSize))
            .then(v => {
                if (HF2.read32(v, 0) != 0x3C000) {
                    pxt.tickEvent("hid.flash.uicrfail");
                    return fullVendorCommandFlashAsync(resp, wrap);
                }
                return quickHidFlashAsync(resp, wrap);
            })
            .catch(e => {
                if (e.type === "devicenotfound" && d.reportDeviceNotFoundAsync) {
                    pxt.tickEvent("hid.flash.devicenotfound");
                    return d.reportDeviceNotFoundAsync("/device/windows-app/troubleshoot", resp);
                } else if (e.message === timeoutMessage) {
                    pxt.tickEvent("hid.flash.timeout");
                    return previousDapWrapper.reconnectAsync(true)
                        .catch((e) => {
                            // Best effort disconnect; at this point we don't even know the state of the device
                            pxt.reportException(e);
                        })
                        .then(() => {
                            return resp.confirmAsync({
                                header: lf("Something went wrong..."),
                                body: lf("One-click download took too long. Please disconnect your {0} from your computer and reconnect it, then manually download your program using drag and drop.", pxt.appTarget.appTheme.boardName || lf("device")),
                                disagreeLbl: lf("Ok"),
                                hideAgree: true
                            });
                        })
                        .then(() => {
                            return pxt.commands.saveOnlyAsync(resp);
                        });
                } else if (e.isUserError) {
                    d.reportError(e.message);
                    return Promise.resolve();
                } else {
                    pxt.tickEvent("hid.flash.unknownerror");
                    return resp.confirmAsync({
                        header: U.lf("Something went wrong..."),
                        body: U.lf("Please manually download your program to your device using drag and drop. One-click download might work afterwards."),
                        disagreeLbl: lf("Ok"),
                        hideAgree: true
                    })
                        .then(() => {
                            return pxt.commands.saveOnlyAsync(resp);
                        });
                }
            });
    }

    function getFlashChecksumsAsync(wrap: DAPWrapper) {
        log("getting existing flash checksums")
        let pages = numPages
        return wrap.cortexM.runCode(computeChecksums2, loadAddr, loadAddr + 1, 0xffffffff, stackAddr, true,
            dataAddr, 0, pageSize, pages)
            .then(() => wrap.cortexM.memory.readBlock(dataAddr, pages * 2, pageSize))
    }

    function onlyChanged(blocks: UF2.Block[], checksums: Uint8Array) {
        return blocks.filter(b => {
            let idx = b.targetAddr / pageSize
            U.assert((idx | 0) == idx)
            U.assert(b.data.length == pageSize)
            if (idx * 8 + 8 > checksums.length)
                return true // out of range?
            let c0 = HF2.read32(checksums, idx * 8)
            let c1 = HF2.read32(checksums, idx * 8 + 4)
            let ch = murmur3_core(b.data)
            if (c0 == ch[0] && c1 == ch[1])
                return false
            return true
        })
    }

    function uwpDeployCoreAsync(resp: pxtc.CompileResult, d: pxt.commands.DeployOptions = {}): Promise<void> {
        // Go straight to flashing
        return flashAsync(resp, d);
    }

    function deployCoreAsync(resp: pxtc.CompileResult, d: pxt.commands.DeployOptions = {}): Promise<void> {
        return pxt.usb.isPairedAsync()
            .then(isPaired => {
                if (isPaired) {
                    // Already paired from earlier in the session or from previous session
                    return flashAsync(resp, d);
                }

                // try bluetooth if device is paired
                if (pxt.webBluetooth.isPaired())
                    return pxt.webBluetooth.flashAsync(resp, d)
                        .catch(e => pxt.commands.saveOnlyAsync(resp));

                // No device paired, prompt user
                return pxt.commands.saveOnlyAsync(resp);
            });
    }

    /**
     *       <block type="device_show_leds">
        <field name="LED00">FALSE</field>
        <field name="LED10">FALSE</field>
        <field name="LED20">FALSE</field>
        <field name="LED30">FALSE</field>
        <field name="LED40">FALSE</field>
        <field name="LED01">FALSE</field>
        <field name="LED11">FALSE</field>
        <field name="LED21">FALSE</field>
        <field name="LED31">TRUE</field>
        <field name="LED41">FALSE</field>
        <field name="LED02">FALSE</field>
        <field name="LED12">FALSE</field>
        <field name="LED22">FALSE</field>
        <field name="LED32">FALSE</field>
        <field name="LED42">FALSE</field>
        <field name="LED03">FALSE</field>
        <field name="LED13">TRUE</field>
        <field name="LED23">FALSE</field>
        <field name="LED33">FALSE</field>
        <field name="LED43">FALSE</field>
        <field name="LED04">FALSE</field>
        <field name="LED14">FALSE</field>
        <field name="LED24">FALSE</field>
        <field name="LED34">FALSE</field>
        <field name="LED44">FALSE</field>
      </block>

      to
    <block type="device_show_leds">
        <field name="LEDS">`
        # # # # #
        . . . . #
        . . . . .
        . . . . #
        . . . . #
        `
        </field>
      </block>
     */

    function patchBlocks(pkgTargetVersion: string, dom: Element) {
        // is this a old script?
        if (pxt.semver.majorCmp(pkgTargetVersion || "0.0.0", "1.0.0") >= 0) return;

        // showleds
        const nodes = U.toArray(dom.querySelectorAll("block[type=device_show_leds]"))
            .concat(U.toArray(dom.querySelectorAll("block[type=device_build_image]")))
            .concat(U.toArray(dom.querySelectorAll("shadow[type=device_build_image]")))
            .concat(U.toArray(dom.querySelectorAll("block[type=device_build_big_image]")))
            .concat(U.toArray(dom.querySelectorAll("shadow[type=device_build_big_image]")));
        nodes.forEach(node => {
            // don't rewrite if already upgraded, eg. field LEDS already present
            if (U.toArray(node.children).filter(child => child.tagName == "field" && "LEDS" == child.getAttribute("name"))[0])
                return;
            // read LEDxx value and assmebly into a new field
            const leds: string[][] = [[], [], [], [], []];
            U.toArray(node.children)
                .filter(child => child.tagName == "field" && /^LED\d+$/.test(child.getAttribute("name")))
                .forEach(lednode => {
                    let n = lednode.getAttribute("name");
                    let col = parseInt(n[3]);
                    let row = parseInt(n[4]);
                    leds[row][col] = lednode.innerHTML == "TRUE" ? "#" : ".";
                    // remove node
                    node.removeChild(lednode);
                });
            // add new field
            const f = node.ownerDocument.createElement("field");
            f.setAttribute("name", "LEDS");
            const s = '`\n' + leds.map(row => row.join('')).join('\n') + '\n`';
            f.appendChild(node.ownerDocument.createTextNode(s));
            node.insertBefore(f, null);
        });

        // radio
        /*
  <block type="radio_on_packet" x="174" y="120">
    <mutation callbackproperties="receivedNumber" renamemap="{}"></mutation>
    <field name="receivedNumber">receivedNumber</field>
  </block>
  <block type="radio_on_packet" disabled="true" x="127" y="263">
    <mutation callbackproperties="receivedString,receivedNumber" renamemap="{&quot;receivedString&quot;:&quot;name&quot;,&quot;receivedNumber&quot;:&quot;value&quot;}"></mutation>
    <field name="receivedString">name</field>
    <field name="receivedNumber">value</field>
  </block>
  <block type="radio_on_packet" disabled="true" x="162" y="420">
    <mutation callbackproperties="receivedString" renamemap="{}"></mutation>
    <field name="receivedString">receivedString</field>
  </block>

  converts to

  <block type="radio_on_number" x="196" y="208">
    <field name="HANDLER_receivedNumber" id="DCy(W;1)*jLWQUpoy4Mm" variabletype="">receivedNumber</field>
  </block>
  <block type="radio_on_value" x="134" y="408">
    <field name="HANDLER_name" id="*d-Jm^MJXO]Djs(dTR*?" variabletype="">name</field>
    <field name="HANDLER_value" id="A6HQjH[k^X43o3h775+G" variabletype="">value</field>
  </block>
  <block type="radio_on_string" x="165" y="583">
    <field name="HANDLER_receivedString" id="V9KsE!h$(iO?%W:[32CV" variabletype="">receivedString</field>
  </block>
  */
        const varids: pxt.Map<string> = {};

        function addField(node: Element, renameMap: pxt.Map<string>, name: string) {
            const f = node.ownerDocument.createElement("field");
            f.setAttribute("name", "HANDLER_" + name)
            f.setAttribute("id", varids[renameMap[name] || name]);
            f.appendChild(node.ownerDocument.createTextNode(name));
            node.appendChild(f);
        }

        U.toArray(dom.querySelectorAll("variable")).forEach(node => varids[node.innerHTML] = node.getAttribute("id"));
        U.toArray(dom.querySelectorAll("block[type=radio_on_packet]"))
            .forEach(node => {
                const mutation = node.querySelector("mutation");
                if (!mutation) return;
                const renameMap = JSON.parse(node.getAttribute("renamemap") || "{}");
                const props = mutation.getAttribute("callbackproperties");

                if (props) {
                    const parts = props.split(",");

                    // It's tempting to generate radio_on_number if parts.length === 0 but
                    // that would create a variable named "receivedNumber" and possibly shadow
                    // an existing variable in the user's program. It's safer to stick to the
                    // old block.
                    if (parts.length === 1) {
                        if (parts[0] === "receivedNumber") {
                            node.setAttribute("type", "radio_on_number");
                            node.removeChild(node.querySelector("field[name=receivedNumber]"));
                            addField(node, renameMap, "receivedNumber");
                        }
                        else if (parts[0] === "receivedString") {
                            node.setAttribute("type", "radio_on_string");
                            node.removeChild(node.querySelector("field[name=receivedString]"));
                            addField(node, renameMap, "receivedString");
                        }
                        else {
                            return;
                        }
                        node.removeChild(mutation);
                    }
                    else if (parts.length === 2 && parts.indexOf("receivedNumber") !== -1 && parts.indexOf("receivedString") !== -1) {
                        node.setAttribute("type", "radio_on_value");
                        node.removeChild(node.querySelector("field[name=receivedNumber]"));
                        node.removeChild(node.querySelector("field[name=receivedString]"));
                        addField(node, renameMap, "name");
                        addField(node, renameMap, "value");
                        node.removeChild(mutation);
                    }
                }
            })


        // device_random now refers to randomRange() so we need to add the missing lower bound argument
        U.toArray(dom.querySelectorAll("block[type=device_random]"))
            .concat(U.toArray(dom.querySelectorAll("shadow[type=device_random]")))
            .forEach(node => {
                if (getValue(node, "min")) return;
                const v = node.ownerDocument.createElement("value");
                v.setAttribute("name", "min");
                addNumberShadow(v);
                node.appendChild(v);
            });

        /*
        <block type="math_arithmetic">
            <field name="OP">DIVIDE</field>
            <value name="A">
                <shadow type="math_number"><field name="NUM">0</field></shadow>
                <block type="math_number"><field name="NUM">2</field></block>
            </value>
            <value name="B">
                <shadow type="math_number"><field name="NUM">1</field></shadow>
                <block type="math_number"><field name="NUM">3</field></block>
            </value>
        </block>
        */
        U.toArray(dom.querySelectorAll("block[type=math_arithmetic]"))
            .concat(U.toArray(dom.querySelectorAll("shadow[type=math_arithmetic]")))
            .forEach(node => {
                const op = getField(node, "OP");
                if (!op || op.textContent.trim() !== "DIVIDE") return;

                // Convert to integer division
                /*
                <block type="math_js_op">
                    <mutation op-type="infix"></mutation>
                    <field name="OP">idiv</field>
                    <value name="ARG0">
                        <shadow type="math_number"><field name="NUM">0</field></shadow>
                    </value>
                    <value name="ARG1">
                        <shadow type="math_number"><field name="NUM">0</field></shadow>
                    </value>
                </block>
                */

                node.setAttribute("type", "math_js_op");
                op.textContent = "idiv";

                const mutation = node.ownerDocument.createElement("mutation");
                mutation.setAttribute("op-type", "infix");
                // mutation has to be first or Blockly will drop the second argument
                node.insertBefore(mutation, node.firstChild);

                const a = getValue(node, "A");
                if (a) a.setAttribute("name", "ARG0");

                const b = getValue(node, "B");
                if (b) b.setAttribute("name", "ARG1");
            });

        renameField(dom, "math_number_minmax", "NUM", "SLIDER");
        renameField(dom, "device_note", "note", "name");
    }

    function renameField(dom: Element, blockType: string, oldName: string, newName: string) {
        U.toArray(dom.querySelectorAll(`block[type=${blockType}]`))
            .concat(U.toArray(dom.querySelectorAll(`shadow[type=${blockType}]`)))
            .forEach(node => {
                const thefield = getField(node, oldName);
                if (thefield) {
                    thefield.setAttribute("name", newName);
                }
            });
    }

    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug('loading microbit target extensions...')

        function cantImportAsync(project: pxt.editor.IProjectView) {
            // this feature is support in v0 only
            return project.showModalDialogAsync({
                header: lf("Can't import microbit.co.uk scripts..."),
                body: lf("Importing microbit.co.uk programs is not supported in this editor anymore. Please open this script in the https://makecode.microbit.org/v0 editor."),
                buttons: [
                    {
                        label: lf("Go to the old editor"),
                        url: `https://makecode.microbit.org/v0`
                    }
                ]
            }).then(() => project.openHome())
        }

        if (!Math.imul)
            Math.imul = function (a, b) {
                const ah = (a >>> 16) & 0xffff;
                const al = a & 0xffff;
                const bh = (b >>> 16) & 0xffff;
                const bl = b & 0xffff;
                // the shift by 0 fixes the sign on the high part
                // the final |0 converts the unsigned value into a signed value
                return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
            };

        const res: pxt.editor.ExtensionResult = {
            hexFileImporters: [{
                id: "blockly",
                canImport: data => data.meta.cloudId == "microbit.co.uk" && data.meta.editor == "blockly",
                importAsync: (project, data) => {
                    pxt.tickEvent('import.legacyblocks.redirect');
                    return cantImportAsync(project);
                }
            }, {
                id: "td",
                canImport: data => data.meta.cloudId == "microbit.co.uk" && data.meta.editor == "touchdevelop",
                importAsync: (project, data) => {
                    pxt.tickEvent('import.legacytd.redirect');
                    return cantImportAsync(project);
                }
            }]
        };

        pxt.usb.setFilters([{
            vendorId: 0x0D28,
            productId: 0x0204,
            classCode: 0xff,
            subclassCode: 0x03
        }])

        const isUwp = !!(window as any).Windows;
        if (isUwp)
            pxt.commands.deployCoreAsync = uwpDeployCoreAsync;
        else if (canHID() || pxt.webBluetooth.hasPartialFlash())
            pxt.commands.deployCoreAsync = deployCoreAsync;

        res.blocklyPatch = patchBlocks;
        res.showUploadInstructionsAsync = showUploadInstructionsAsync;
        res.webUsbPairDialogAsync = webUsbPairDialogAsync;
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }

    function getField(parent: Element, name: string) {
        return getFieldOrValue(parent, name, true);
    }

    function getValue(parent: Element, name: string) {
        return getFieldOrValue(parent, name, false);
    }

    function getFieldOrValue(parent: Element, name: string, isField: boolean) {
        const nodeType = isField ? "field" : "value";
        for (let i = 0; i < parent.children.length; i++) {
            const child = parent.children.item(i);
            if (child.tagName === nodeType && child.getAttribute("name") === name) {
                return child;
            }
        }
        return undefined;
    }

    function addNumberShadow(valueNode: Element) {
        const s = valueNode.ownerDocument.createElement("shadow");
        s.setAttribute("type", "math_number");

        const f = valueNode.ownerDocument.createElement("field");
        f.setAttribute("name", "NUM");
        f.textContent = "0";

        s.appendChild(f);
        valueNode.appendChild(s);
    }

    function webUsbPairDialogAsync(confirmAsync: (options: any) => Promise<number>): Promise<number> {
        const boardName = pxt.appTarget.appTheme.boardName || "???";
        const docUrl = pxt.appTarget.appTheme.usbDocs;
        const htmlBody = `
        <div class="ui grid stackable">
            <div class="column five wide" style="background-color: #FFFFCE;">
                <div class="ui header">${lf("First time here?")}</div>
                <strong style="font-size:small">${lf("You must have version 0249 or above of the firmware")}</strong>
                <div style="justify-content: center;display: flex;padding: 1rem;">
                    <img class="ui image" src="./static/download/firmware.png" style="height:100px;" />
                </div>
                <a href="${docUrl}/webusb/troubleshoot" target="_blank">${lf("Check your firmware version here and update if needed")}</a>
            </div>
            <div class="column eleven wide">
                <div class="ui grid">
                    <div class="row">
                        <div class="column">
                            <div class="ui two column grid padded">
                                <div class="column">
                                    <div class="ui">
                                        <div class="image">
                                            <img class="ui medium rounded image" src="./static/download/connect.png" style="margin-bottom:1rem;" />
                                        </div>
                                        <div class="content">
                                            <div class="description">
                                                <span class="ui purple circular label">1</span>
                                                <strong>${lf("Connect the {0} to your computer with a USB cable", boardName)}</strong>
                                                <br />
                                                <span style="font-size:small">${lf("Use the microUSB port on the top of the {0}", boardName)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="ui">
                                        <div class="image">
                                            <img class="ui medium rounded image" src="./static/download/pair.png" style="margin-bottom:1rem;" />
                                        </div>
                                        <div class="content">
                                            <div class="description">
                                                <span class="ui purple circular label">2</span>
                                                <strong>${lf("Pair your {0}", boardName)}</strong>
                                                <br />
                                                <span style="font-size:small">${lf("Click 'Pair device' below and select <strong>BBC micro:bit CMSIS-DAP</strong> or <strong>DAPLink CMSIS-DAP</strong> from the list")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        const buttons: any[] = [];
        if (docUrl) {
            buttons.push({
                label: lf("Help"),
                icon: "help",
                className: "lightgrey",
                url: `${docUrl}/webusb`
            });
        }

        return confirmAsync({
            header: lf("Pair device for one-click downloads"),
            htmlBody,
            hasCloseIcon: true,
            agreeLbl: lf("Pair device"),
            agreeIcon: "usb",
            hideCancel: true,
            className: 'downloaddialog',
            buttons
        });
    }

    function showUploadInstructionsAsync(fn: string, url: string, confirmAsync: (options: any) => Promise<number>) {
        const boardName = Util.htmlEscape(pxt.appTarget.appTheme.boardName || "???");
        const boardDriveName = Util.htmlEscape(pxt.appTarget.appTheme.driveDisplayName || pxt.appTarget.compile.driveName || "???");

        // https://msdn.microsoft.com/en-us/library/cc848897.aspx
        // "For security reasons, data URIs are restricted to downloaded resources.
        // Data URIs cannot be used for navigation, for scripting, or to populate frame or iframe elements"
        const userDownload = pxt.BrowserUtils.isBrowserDownloadWithinUserContext();
        const downloadAgain = !pxt.BrowserUtils.isIE() && !pxt.BrowserUtils.isEdge();
        const docUrl = pxt.appTarget.appTheme.usbDocs;

        const body =
            userDownload
                ? lf("Click 'Download' to open the {0} app.", pxt.appTarget.appTheme.boardName || "")
                : undefined;
        const htmlBody = !userDownload ?
            `<div class="ui grid stackable">
            <div class="column sixteen wide">
                <div class="ui grid">
                    <div class="row">
                        <div class="column">
                            <div class="ui two column grid padded">
                                <div class="column">
                                    <div class="ui">
                                        <div class="image">
                                            <img class="ui medium rounded image" src="./static/download/connect.png" style="margin-bottom:1rem;" />
                                        </div>
                                        <div class="content">
                                            <div class="description">
                                                <span class="ui purple circular label">1</span>
                                                <strong>${lf("Connect the {0} to your computer with a USB cable", boardName)}</strong>
                                                <br />
                                                <span style="font-size:small">${lf("Use the microUSB port on the top of the {0}", boardName)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="ui">
                                        <div class="image">
                                            <img class="ui medium rounded image" src="./static/download/transfer.png" style="margin-bottom:1rem;" />
                                        </div>
                                        <div class="content">
                                            <div class="description">
                                                <span class="ui purple circular label">2</span>
                                                <strong>${lf("Move the .hex file to the {0}", boardName)}</strong>
                                                <br />
                                                <span style="font-size:small">${lf("Locate the downloaded .hex file and drag it to the <strong>{0}</strong> drive", boardDriveName)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>` : undefined;

        const buttons: any[] = [];

        if (downloadAgain) {
            buttons.push({
                label: userDownload ? lf("Download") : fn,
                icon: "download",
                class: `${userDownload ? "primary" : "lightgrey"}`,
                url,
                fileName: fn
            });
        }

        if (docUrl) {
            buttons.push({
                label: lf("Help"),
                icon: "help",
                className: "lightgrey",
                url: docUrl
            });
        }

        return confirmAsync({
            header: lf("Download to your {0}", pxt.appTarget.appTheme.boardName),
            body,
            htmlBody,
            hasCloseIcon: true,
            hideCancel: true,
            hideAgree: true,
            className: 'downloaddialog',
            buttons
            //timeout: 20000
        }).then(() => { });
    }
}
