/**
 * Tagged image literal converter
 */
//% shim=@f4 helper=image::ofBuffer blockIdentity="images._spriteImage"
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

    //% shim=pxt::updateScreenStatusBar
    function updateScreenStatusBar(img: Image): void { return }
    //% shim=pxt::setupScreenStatusBar
    function setupScreenStatusBar(barHeight: number): void { return }

    //% shim=TD_ID
    function getScreenWidth(defl: number) {
        return control.getConfigValue(DAL.CFG_ARCADE_SCREEN_WIDTH, defl)
    }

    //% shim=TD_ID
    function getScreenHeight(defl: number) {
        return control.getConfigValue(DAL.CFG_ARCADE_SCREEN_HEIGHT, defl)
    }

    export function createScreen() {
        const img = image.create(getScreenWidth(160), getScreenHeight(120));
        setupScreenStatusBar(8);

        const status = image.create(160, 8)
        updateScreenStatusBar(status) // clear the status area

        control.__screen.setupUpdate(() => updateScreen(img))
        control.EventContext.onStats = function (msg: string) {
            status.fill(0)
            status.print(msg, 2, 2, 1, image.font5)
            updateScreenStatusBar(status)
            updateStats(msg);
        }

        return img as ScreenImage;
    }

}
