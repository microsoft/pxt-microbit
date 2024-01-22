// Auto-generated. Do not edit.


declare interface SImage {
    /**
     * Get the width of the image
     */
    //% property shim=SImageMethods::width
    width: int32;

    /**
     * Get the height of the image
     */
    //% property shim=SImageMethods::height
    height: int32;

    /**
     * True if the image is monochromatic (black and white)
     */
    //% property shim=SImageMethods::isMono
    isMono: boolean;

    /**
     * Sets all pixels in the current image from the other image, which has to be of the same size and
     * bpp.
     */
    //% shim=SImageMethods::copyFrom
    copyFrom(from: SImage): void;

    /**
     * Set pixel color
     */
    //% shim=SImageMethods::setPixel
    setPixel(x: int32, y: int32, c: int32): void;

    /**
     * Get a pixel color
     */
    //% shim=SImageMethods::getPixel
    getPixel(x: int32, y: int32): int32;

    /**
     * Fill entire image with a given color
     */
    //% shim=SImageMethods::fill
    fill(c: int32): void;

    /**
     * Copy row(s) of pixel from image to buffer (8 bit per pixel).
     */
    //% shim=SImageMethods::getRows
    getRows(x: int32, dst: Buffer): void;

    /**
     * Copy row(s) of pixel from buffer to image.
     */
    //% shim=SImageMethods::setRows
    setRows(x: int32, src: Buffer): void;

    /**
     * Return a copy of the current image
     */
    //% shim=SImageMethods::clone
    clone(): SImage;

    /**
     * Flips (mirrors) pixels horizontally in the current image
     */
    //% shim=SImageMethods::flipX
    flipX(): void;

    /**
     * Flips (mirrors) pixels vertically in the current image
     */
    //% shim=SImageMethods::flipY
    flipY(): void;

    /**
     * Returns a transposed image (with X/Y swapped)
     */
    //% shim=SImageMethods::transposed
    transposed(): SImage;

    /**
     * Every pixel in image is moved by (dx,dy)
     */
    //% shim=SImageMethods::scroll
    scroll(dx: int32, dy: int32): void;

    /**
     * Stretches the image horizontally by 100%
     */
    //% shim=SImageMethods::doubledX
    doubledX(): SImage;

    /**
     * Stretches the image vertically by 100%
     */
    //% shim=SImageMethods::doubledY
    doubledY(): SImage;

    /**
     * Replaces one color in an image with another
     */
    //% shim=SImageMethods::replace
    replace(from: int32, to: int32): void;

    /**
     * Stretches the image in both directions by 100%
     */
    //% shim=SImageMethods::doubled
    doubled(): SImage;

    /**
     * Draw given image on the current image
     */
    //% shim=SImageMethods::drawImage
    drawImage(from: SImage, x: int32, y: int32): void;

    /**
     * Draw given image with transparent background on the current image
     */
    //% shim=SImageMethods::drawTransparentImage
    drawTransparentImage(from: SImage, x: int32, y: int32): void;

    /**
     * Check if the current image "collides" with another
     */
    //% shim=SImageMethods::overlapsWith
    overlapsWith(other: SImage, x: int32, y: int32): boolean;
}
declare namespace image {

    /**
     * Create new empty (transparent) image
     */
    //% shim=image::create
    function create(width: int32, height: int32): SImage;

    /**
     * Create new image with given content
     */
    //% shim=image::ofBuffer
    function ofBuffer(buf: Buffer): SImage;

    /**
     * Double the size of an icon
     */
    //% shim=image::doubledIcon
    function doubledIcon(icon: Buffer): Buffer;
}
declare namespace pins {

    /**
     * Get a pin by configuration id (DAL.CFG_PIN...)
     */
    //% shim=pins::pinByCfg
    function pinByCfg(key: int32): DigitalInOutPin;

    /**
     * Create a new zero-initialized buffer.
     * @param size number of bytes in the buffer
     */
    //% shim=pins::createBuffer
    function createBuffer(size: int32): Buffer;

    /**
     * Get the duration of the last pulse in microseconds. This function should be called from a
     * ``onPulsed`` handler.
     */
    //% help=pins/pulse-duration blockGap=8
    //% blockId=pins_pulse_duration block="pulse duration (µs)"
    //% weight=19 shim=pins::pulseDuration
    function pulseDuration(): int32;
}

// Auto-generated. Do not edit. Really.
