/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    export function initExtensionsAsync(opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
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
                        }).then(() => project.convertTouchDevelopToTypeScriptAsync(data.source))
                        .then(text => this.textEditor.overrideFile(text))
                }]
        };
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }
}