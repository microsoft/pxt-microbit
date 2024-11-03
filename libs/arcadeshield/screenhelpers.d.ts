declare namespace __screenhelpers {
    //% shim=pxt::displayPresent
    function displayPresent(): boolean;
    //% shim=pxt::setPalette
    function setPalette(buf: Buffer): void;
    //% shim=pxt::displayWidth
    function displayWidth(): number;
    //% shim=pxt::displayHeight
    function displayHeight(): number;
    //% shim=pxt::setScreenBrightness
    function setScreenBrightness(b: number): void;
    //% shim=pxt::updateScreen
    function updateScreen(bmp: Bitmap): void;
}
