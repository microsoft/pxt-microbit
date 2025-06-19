/// <reference path="../node_modules/pxt-core/localtypings/pxteditor.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

import { FieldGestures } from "./field_gestures";
import { FieldPinPicker } from "./field_pinPicker";

pxt.editor.initFieldExtensionsAsync = function (opts: pxt.editor.FieldExtensionOptions): Promise<pxt.editor.FieldExtensionResult> {
    pxt.debug('loading pxt-microbit field editors...')
    const res: pxt.editor.FieldExtensionResult = {
        fieldEditors: [
            {
                selector: "gestures",
                editor: FieldGestures
            },
            {
                selector: "pinpicker",
                editor: FieldPinPicker
            }
        ]
    };
    return Promise.resolve<pxt.editor.FieldExtensionResult>(res);
}