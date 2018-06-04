/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

import { FieldGestures } from "./field_gestures";

pxt.editor.initFieldExtensionsAsync = function (opts: pxt.editor.FieldExtensionOptions): Promise<pxt.editor.FieldExtensionResult> {
    pxt.debug('loading pxt-microbit field editors...')
    const res: pxt.editor.FieldExtensionResult = {
        fieldEditors: [{
            selector: "gestures",
            editor: FieldGestures
        }]
    };
    return Promise.resolve<pxt.editor.FieldExtensionResult>(res);
}