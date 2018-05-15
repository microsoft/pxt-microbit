/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

interface Math {
    imul(x: number, y: number): number;
}
namespace pxt.editor {
    import UF2 = pxtc.UF2;

    const pageSize = 1024;
    const numPages = 256;

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

        constructor(h: HF2.PacketIO) {
            this.packetIo = h;
            let pbuf = new U.PromiseBuffer<Uint8Array>();

            let sendMany = (cmds: Uint8Array[]) => {
                return h.talksAsync(cmds.map(c => ({ cmd: 0, data: c })));
            }

            if (!h.talksAsync)
                sendMany = null;

            let dev = new DapJS.DAP({
                write: writeAsync,
                close: this.disconnectAsync,
                read: readAsync,
                sendMany: sendMany
            });
            this.cortexM = new DapJS.CortexM(dev);

            h.onData = buf => {
                pbuf.push(buf);
            }

            function writeAsync(data: ArrayBuffer) {
                return h.sendPacketAsync(new Uint8Array(data));
            }

            function readAsync() {
                return pbuf.shiftAsync();
            }
        }

        reconnectAsync(first: boolean) {
            if (!first)
                return this.packetIo.reconnectAsync()
                    .then(() => this.cortexM.init())
            else
                return this.cortexM.init();
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
            return Promise.resolve(previousDapWrapper)
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
                    .then(() => w)
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

    export function deployCoreAsync(resp: pxtc.CompileResult): Promise<void> {
        let saveHexAsync = () => {
            return pxt.commands.saveOnlyAsync(resp)
        }

        startTime = 0
        let wrap: DAPWrapper
        log("init")
        let logV = (msg: string) => { }
        //let logV = log

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

        pxt.tickEvent("hid.flash.start");
        return initAsync()
            .then(w => {
                wrap = w
                log("reset")
                return wrap.cortexM.reset(true)
                    .catch(e => {
                        log("trying re-connect")
                        return wrap.reconnectAsync(false)
                            .then(() => wrap.cortexM.reset(true))
                    })
            })
            .then(() => wrap.cortexM.memory.readBlock(0x10001014, 1, pageSize))
            .then(v => {
                if (HF2.read32(v, 0) != 0x3C000) {
                    pxt.tickEvent("hid.flash.uicrfail");
                    U.userError(U.lf("Please flash any MakeCode hex file using drag and drop. Flashing from app will work afterwards."))
                }
            })
            .then(() => getFlashChecksumsAsync(wrap))
            .then(buf => {
                checksums = buf
                log("write code")
                return wrap.cortexM.memory.writeBlock(loadAddr, flashPageBIN)
            })
            .then(() => {
                log("convert")
                // TODO this is seriously inefficient (130ms on a fast machine)
                let uf2 = UF2.newBlockFile()
                UF2.writeHex(uf2, resp.outfiles[pxtc.BINARY_HEX].split(/\r?\n/))
                let bytes = U.stringToUint8Array(UF2.serializeFile(uf2))
                let parsed = UF2.parseFile(bytes)

                let aligned = pageAlignBlocks(parsed, pageSize)
                log(`initial: ${aligned.length} pages`)
                aligned = onlyChanged(aligned, checksums)
                log(`incremental: ${aligned.length} pages`)

                return Promise.mapSeries(U.range(aligned.length),
                    i => {
                        let b = aligned[i]
                        if (b.targetAddr >= 0x10000000)
                            return Promise.resolve()

                        logV("about to write at 0x" + b.targetAddr.toString(16))

                        let writeBl = Promise.resolve()

                        let thisAddr = (i & 1) ? dataAddr : dataAddr + pageSize
                        let nextAddr = (i & 1) ? dataAddr + pageSize : dataAddr

                        if (i == 0) {
                            let u32data = new Uint32Array(b.data.length / 4)
                            for (let i = 0; i < b.data.length; i += 4)
                                u32data[i >> 2] = HF2.read32(b.data, i)
                            writeBl = wrap.cortexM.memory.writeBlock(thisAddr, u32data)
                        }

                        return writeBl
                            .then(() => runFlash(b, thisAddr))
                            .then(() => {
                                let next = aligned[i + 1]
                                if (!next)
                                    return Promise.resolve()
                                logV("write next")
                                let buf = new Uint32Array(next.data.buffer)
                                return wrap.cortexM.memory.writeBlock(nextAddr, buf)
                            })
                            .then(() => {
                                logV("wait")
                                return wrap.cortexM.waitForHalt(500)
                            })
                            .then(() => {
                                logV("done block")
                            })
                    })
                    .then(() => {
                        log("flash done")
                        pxt.tickEvent("hid.flash.done");
                        return wrap.cortexM.reset(false)
                    })
            })
            .catch(e => {
                // TODO: (microbit master)
                if (e.type === "devicenotfound") { //&& d.reportDeviceNotFoundAsync) {
                    pxt.tickEvent("hid.flash.devicenotfound");
                    //return d.reportDeviceNotFoundAsync("/device/windows-app/troubleshoot", resp);
                    return undefined;
                } else {
                    return saveHexAsync()
                }
            })
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
            .concat(U.toArray(dom.querySelectorAll("block[type=device_build_big_image]")))
        nodes.forEach(node => {
            const leds: string[][] = [[], [], [], [], []];
            U.toArray(node.querySelectorAll("field[name^=LED]"))
                .forEach(lednode => {
                    let n = lednode.getAttribute("name");
                    let col = parseInt(n[3]);
                    let row = parseInt(n[4]);
                    leds[row][col] = lednode.innerHTML == "TRUE" ? "#" : ".";
                });
            node.innerHTML = "";
            const f = node.ownerDocument.createElement("field");
            f.setAttribute("name", "LEDS");
            const s = '`\n' + leds.map(row => row.join('')).join('\n') + '\n`';
            f.appendChild(node.ownerDocument.createTextNode(s));
            node.appendChild(f);
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

        function addField(node: Element, name: string) {
            const f = node.ownerDocument.createElement("field");
            f.setAttribute("name","HANDLER_" + name)
            f.setAttribute("id", varids[name]);
            f.appendChild(node.ownerDocument.createTextNode(name));
            node.appendChild(f);
        }

        U.toArray(dom.querySelectorAll("variable")).forEach(node => varids[node.innerHTML] = node.getAttribute("id"));
        U.toArray(dom.querySelectorAll("block[type=radio_on_packet]"))
            .forEach(node => {
                const mutation = node.querySelector("mutation");
                if (!mutation) return;
                const renameMap = JSON.parse(node.getAttribute("renamemap") || "{}");
                switch (mutation.getAttribute("callbackproperties")) {
                    case "receivedNumber":
                        node.setAttribute("type", "radio_on_number");
                        node.removeChild(node.querySelector("field[name=receivedNumber]"));
                        addField(node, "receivedNumber");
                        break;
                    case "receivedString,receivedNumber":
                        node.setAttribute("type", "radio_on_value");
                        node.removeChild(node.querySelector("field[name=receivedNumber]"));
                        node.removeChild(node.querySelector("field[name=receivedString]"));
                        addField(node, "name");
                        addField(node, "value");
                        break;
                    case "receivedString":
                        node.setAttribute("type", "radio_on_string");
                        node.removeChild(node.querySelector("field[name=receivedString]"));
                        addField(node, "receivedString");
                        break;
                }
                node.removeChild(mutation);
            })
    }

    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug('loading microbit target extensions...')

        if (!Math.imul)
            Math.imul = (a, b) => {
                var ah = (a >>> 16) & 0xffff;
                var al = a & 0xffff;
                var bh = (b >>> 16) & 0xffff;
                var bl = b & 0xffff;
                // the shift by 0 fixes the sign on the high part
                // the final |0 converts the unsigned value into a signed value
                return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
            };

        const res: pxt.editor.ExtensionResult = {
            hexFileImporters: [{
                id: "blockly",
                canImport: data => data.meta.cloudId == "microbit.co.uk" && data.meta.editor == "blockly",
                importAsync: (project, data) => project.createProjectAsync({
                    filesOverride: {
                        "main.blocks": data.source
                    }, name: data.meta.name
                })
            }]
        };

        pxt.usb.setFilters([{
            vendorId: 0x0D28,
            productId: 0x0204,
            classCode: 0xff,
            subclassCode: 0x03
        }])

        if (canHID())
            pxt.commands.deployCoreAsync = deployCoreAsync;

        res.blocklyPatch = patchBlocks;
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }

}
