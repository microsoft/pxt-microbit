/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    import UF2 = pxtc.UF2;

    const pageSize = 1024;

    class DAPWrapper {
        cortexM: DapJS.CortexM

        constructor(h: HF2.PacketIO) {
            let pbuf = new U.PromiseBuffer<Uint8Array>()
            let dev = new DapJS.DAP({
                write: writeAsync,
                close: closeAsync,
                read: readAsync
            })
            this.cortexM = new DapJS.CortexM(dev)

            h.onData = buf => {
                pbuf.push(buf)
            }

            function writeAsync(data: ArrayBuffer) {
                return h.sendPacketAsync(new Uint8Array(data))
            }

            function readAsync() {
                return pbuf.shiftAsync()
            }

            function closeAsync() {
                return h.disconnectAsync()
            }
        }

        reconnectAsync(first: boolean) {
            return this.cortexM.init()
                .then(() => this.cortexM.memory.read32(0))
                .then(buf => {
                    console.log("at0: " + buf.toString(16))
                })
                .then(() => this.cortexM.halt())
                .then(() => this.cortexM.waitForHalt())
                .then(() => this.cortexM.memory.readBlock(0x20000000, 100, pageSize))
                .then(buf => {
                    console.log("buf: " + U.toHex(buf))
                })
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

    export function deployCoreAsync(resp: pxtc.CompileResult, isCli = false) {
        let saveUF2Async = () => {
            if (isCli) {
                return Promise.resolve()
            } else {
                return pxt.commands.saveOnlyAsync(resp)
            }
        }

        if (noHID) return saveUF2Async()

        return initAsync()
            .then(() => {
                // TODO
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
