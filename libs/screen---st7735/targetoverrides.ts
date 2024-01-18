/**
 * Tagged image literal converter
 */
//% shim=@f4 helper=image::ofBuffer blockIdentity="sprites._createImageShim"
//% groups=["0.","1#","2T","3t","4N","5n","6G","7g","8","9","aAR","bBP","cCp","dDO","eEY","fFW"]
function img(lits: any, ...args: any[]): Image { return null }

// set palette before creating screen, so the JS version has the right BPP
image.setPalette(hex`__palette`)
//% whenUsed
const screen = _screen_internal.createScreen();

namespace image {
    //% shim=pxt::setPalette
    export function setPalette(buf: Buffer) { }
}

namespace _screen_internal {
    //% shim=pxt::updateScreen
    function updateScreen(img: Image): void { }
    //% shim=pxt::updateStats
    function updateStats(msg: string): void { }

    //% parts="screen"
    export function createScreen() {
        const img = image.create(
            control.getConfigValue(DAL.CFG_DISPLAY_WIDTH, 160),
            control.getConfigValue(DAL.CFG_DISPLAY_HEIGHT, 128))

        control.__screen.setupUpdate(() => updateScreen(img))
        control.EventContext.onStats = function (msg: string) {
            updateStats(msg);
        }

        return img as ScreenImage;
    }
}
