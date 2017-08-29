/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    import UF2 = pxtc.UF2;

    const pageSize = 1024;

    class DAPWrapper {
        cortexM: DapJS.CortexM

        constructor(h: HF2.PacketIO) {
            let pbuf = new U.PromiseBuffer<Uint8Array>()

            let sendMany = (cmds: Uint8Array[]) => {
                return h.talksAsync(cmds.map(c => ({ cmd: 0, data: c })))
            }

            if (!h.talksAsync)
                sendMany = null

            let dev = new DapJS.DAP({
                write: writeAsync,
                close: closeAsync,
                read: readAsync,
                sendMany: sendMany
            })
            this.cortexM = new DapJS.CortexM(dev)
            let id = 0


            h.onData = buf => {
                pbuf.push(buf)
            }

            function writeAsync(data: ArrayBuffer) {
                //if (id++ == 13)
                //    debugger
                h.sendPacketAsync(new Uint8Array(data))
                return Promise.resolve()
            }

            function readAsync() {
                return pbuf.shiftAsync()
            }

            function closeAsync() {
                return h.disconnectAsync()
            }
        }

        reconnectAsync(first: boolean) {
            const showNumAsync = (addr: number) => {
                return this.cortexM.memory.read32(addr)
                    .then(buf => {
                        console.log(`at ${addr}: 0x${buf.toString(16)}`)
                    })
            }

            return this.cortexM.init()
            /*
                .then(() => this.cortexM.memory.readBlock(0x0, 100, pageSize))
                .then(buf => {
                    console.log("buf: " + U.toHex(buf))
                })
                .then(() => {
                    throw new Error("blah")   
                })
                */
        }
    }

    function hf2Async() {
        return pxt.HF2.mkPacketIOAsync()
            .then(h => {
                let w = new DAPWrapper(h)
                return w.reconnectAsync(true)
                    .then(() => w)
            })
    }

    let noHID = false

    let initPromise: Promise<DAPWrapper>
    function initAsync() {
        if (initPromise)
            return initPromise

        let canHID = false
        if (U.isNodeJS) {
            canHID = true
        } else {
            const forceHexDownload = /forceHexDownload/i.test(window.location.href);
            if (Cloud.isLocalHost() && Cloud.localToken && !forceHexDownload)
                canHID = true
        }

        if (noHID)
            canHID = false

        if (canHID) {
            initPromise = hf2Async()
                .catch(err => {
                    initPromise = null
                    noHID = true
                    return Promise.reject(err)
                })
        } else {
            noHID = true
            initPromise = Promise.reject(new Error("no HID"))
        }

        return initPromise
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

    let startTime = 0
    function log(msg: string) {
        let now = Date.now()
        if (!startTime) startTime = now
        now -= startTime
        let ts = ("00000" + now).slice(-5)
        console.log(`HID ${ts}: ${msg}`)
    }

    export function deployCoreAsync(resp: pxtc.CompileResult, isCli = false): Promise<void> {
        let saveHexAsync = () => {
            if (isCli) {
                return Promise.resolve()
            } else {
                return pxt.commands.saveOnlyAsync(resp)
            }
        }

        if (noHID) return saveHexAsync()

        let wrap: DAPWrapper

        log("init")

        let logV = (msg: string) => { }
        //let logV = log
        
        let membase = 0x20000000
        let loadAddr = membase
        let dataAddr = 0x20002000

        const runFlash = (b: UF2.Block, dataAddr: number) => {
            const cmd = wrap.cortexM.prepareCommand();

            cmd.halt();

            cmd.writeCoreRegister(DapJS.CortexReg.PC, loadAddr + 4 + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.LR, loadAddr + 1);
            cmd.writeCoreRegister(DapJS.CortexReg.SP, 0x20001000);

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

        return initAsync()
            .then(w => {
                wrap = w
                log("reset")
                return wrap.cortexM.reset(true)
            })
            .then(() => {
                log("write code")
                return wrap.cortexM.memory.writeBlock(loadAddr, flashPageBIN)
            })
            .then(() => {
                log("convert")
                // TODO this is seriously inefficient
                let uf2 = UF2.newBlockFile()
                UF2.writeHex(uf2, resp.outfiles[pxtc.BINARY_HEX].split(/\r?\n/))
                let bytes = U.stringToUint8Array(UF2.serializeFile(uf2))
                let parsed = UF2.parseFile(bytes)

                let aligned = pageAlignBlocks(parsed, pageSize)


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
                            let u32data = new Uint32Array(b.data.buffer) // assumes little endian
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
                        return wrap.cortexM.reset(false)
                    })
            })
            .catch(e => {
                // if we failed to initalize, retry
                if (noHID)
                    return saveHexAsync()
                else
                    return Promise.reject(e)
            })
    }

    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug('loading microbit target extensions...')
        const res: pxt.editor.ExtensionResult = {
            hexFileImporters: [{
                id: "blockly",
                canImport: data => data.meta.cloudId == "microbit.co.uk" && data.meta.editor == "blockly",
                importAsync: (project, data) => project.createProjectAsync({
                    filesOverride: {
                        "main.blocks": data.source
                    }, name: data.meta.name
                })
            }, {
                    id: "td",
                    canImport: data => data.meta.cloudId == "microbit.co.uk" && data.meta.editor == "touchdevelop",
                    importAsync: (project, data) =>
                        project.createProjectAsync({
                            filesOverride: { "main.blocks": "", "main.ts": "  " },
                            name: data.meta.name
                        })
                            .then(() => project.convertTouchDevelopToTypeScriptAsync(data.source))
                            .then(text => project.overrideTypescriptFile(text))
                }]
        };
        pxt.commands.deployCoreAsync = deployCoreAsync;
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }

}
