/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

pxt.editor.initFieldExtensionsAsync = function (opts: pxt.editor.FieldExtensionOptions): Promise<pxt.editor.FieldExtensionResult> {
    pxt.debug('loading pxt-microbit field editors...')
    const res: pxt.editor.FieldExtensionResult = {
        fieldEditors: []
    };
    return Promise.resolve<pxt.editor.FieldExtensionResult>(res);
}