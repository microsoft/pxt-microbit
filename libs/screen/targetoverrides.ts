/**
 * Tagged image literal converter
 */
//% shim=@f4 helper=image::ofBuffer blockIdentity="images._spriteImage"
//% groups=["0.","1#","2T","3t","4N","5n","6G","7g","8","9","aAR","bBP","cCp","dDO","eEY","fFW"]
function img(lits: any, ...args: any[]): Image { return null }

// set palette before creating screen, so the JS version has the right BPP
image.setPalette(hex`__palette`)
let screen = image.create(_screen_internal.getScreenWidth(160), _screen_internal.getScreenHeight(120)) as ScreenImage

namespace image {
    //% shim=pxt::setPalette
    export function setPalette(buf: Buffer) { }
}

namespace _screen_internal {
    //% shim=pxt::updateScreen
    function updateScreen(img: Image): void { }
    //% shim=pxt::updateStats
    function updateStats(msg: string): void { }

    //% shim=TD_ID
    export function getScreenWidth(defl: number) {
        return 160 // control.getConfigValue(DAL.CFG_ARCADE_SCREEN_WIDTH, defl)
    }

    //% shim=TD_ID
    export function getScreenHeight(defl: number) {
        return 120 // control.getConfigValue(DAL.CFG_ARCADE_SCREEN_HEIGHT, defl)
    }

    control.__screen.setupUpdate(() => updateScreen(screen))
    // control.EventContext.onStats = function (msg: string) {
    //     updateStats(msg);
    // }
}
