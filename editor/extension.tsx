/// <reference path="../node_modules/pxt-core/localtypings/pxtarget.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtblocks.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtcompiler.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtlib.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />
/// <reference path="dapjs.d.ts" />
import * as dialogs from "./dialogs";
import * as flash from "./flash";
import * as patch from "./patch";

pxt.editor.initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
    pxt.debug('loading microbit target extensions...')

    const manyAny = Math as any;
    if (!manyAny.imul)
        manyAny.imul = function (a: number, b: number): number {
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
                return dialogs.cantImportAsync(project);
            }
        }, {
            id: "td",
            canImport: data => data.meta.cloudId == "microbit.co.uk" && data.meta.editor == "touchdevelop",
            importAsync: (project, data) => {
                pxt.tickEvent('import.legacytd.redirect');
                return dialogs.cantImportAsync(project);
            }
        }]
    };

    pxt.usb.setFilters([{
        vendorId: 0x0D28,
        productId: 0x0204,
        classCode: 0xff,
        subclassCode: 0x03
    }])

    res.mkPacketIOWrapper = flash.mkPacketIOWrapper;
    res.blocklyPatch = patch.patchBlocks;
    res.renderBrowserDownloadInstructions = dialogs.renderBrowserDownloadInstructions;
    res.renderUsbPairDialog = dialogs.renderUsbPairDialog;
    return Promise.resolve<pxt.editor.ExtensionResult>(res);
}
