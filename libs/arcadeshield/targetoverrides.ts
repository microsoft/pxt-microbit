/**
 * Tagged image literal converter
 */
//% shim=@f4 helper=image::ofBuffer blockIdentity="sprites._createImageShim"
//% groups=["0.","1#","2T","3t","4N","5n","6G","7g","8","9","aAR","bBP","cCp","dDO","eEY","fFW"]
function img(lits: any, ...args: any[]): SImage { return null }

// set palette before creating screen, so the JS version has the right BPP
simage.setPalette(hex`000000ffffffff2121ff93c4ff8135fff609249ca378dc52003fad87f2ff8e2ec4a4839f5c406ce5cdc491463d000000`)

//% whenUsed
const screen = _screen_internal.createScreen();

namespace simage {
    //% shim=pxt::setPalette
    export function setPalette(buf: Buffer) { }
}

namespace _screen_internal {
    //% shim=pxt::updateScreen
    function updateScreen(img: SImage): void { }
    //% shim=pxt::updateStats
    function updateStats(msg: string): void { }

    //% parts="screen"
    export function createScreen() {
        const img = simage.create(
            160, // control.getConfigValue(DAL.CFG_DISPLAY_WIDTH, 160),
            128 // control.getConfigValue(DAL.CFG_DISPLAY_HEIGHT, 128))
        )
        control.__screen.setupUpdate(() => updateScreen(img))
        //control.EventContext.onStats = function (msg: string) {
        //    updateStats(msg);
        //}

        return img as ScreenImage;
    }
}
