/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    import UF2 = pxtc.UF2;

    function hf2Async() {
        return pxt.HF2.mkPacketIOAsync()
            .then(h => {
                let w = new Ev3Wrapper(h)
                return w.reconnectAsync(true)
                    .then(() => w)
            })
    }

    let noHID = false

    let initPromise: Promise<Ev3Wrapper>
    function initAsync() {
        if (initPromise)
            return initPromise


        pxt.BrowserUtils.loadScriptAsync(pxt.webConfig.commitCdnUrl + "dapjs.js")

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
    }

    initExtensionsAsync = function(opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
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
