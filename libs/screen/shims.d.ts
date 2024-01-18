// Auto-generated. Do not edit.


declare interface SImage {
    /**
     * Get the width of the image
     */
    //% property shim=ImageMethods::width
    width: int32;

    /**
     * Get the height of the image
     */
    //% property shim=ImageMethods::height
    height: int32;

    /**
     * True if the image is monochromatic (black and white)
     */
    //% property shim=ImageMethods::isMono
    isMono: boolean;

    /**
     * Sets all pixels in the current image from the other image, which has to be of the same size and
     * bpp.
     */
    //% shim=ImageMethods::copyFrom
    copyFrom(from: SImage): void;

    /**
     * Set pixel color
     */
    //% shim=ImageMethods::setPixel
    setPixel(x: int32, y: int32, c: int32): void;

    /**
     * Get a pixel color
     */
    //% shim=ImageMethods::getPixel
    getPixel(x: int32, y: int32): int32;

    /**
     * Fill entire image with a given color
     */
    //% shim=ImageMethods::fill
    fill(c: int32): void;

    /**
     * Copy row(s) of pixel from image to buffer (8 bit per pixel).
     */
    //% shim=ImageMethods::getRows
    getRows(x: int32, dst: Buffer): void;

    /**
     * Copy row(s) of pixel from buffer to image.
     */
    //% shim=ImageMethods::setRows
    setRows(x: int32, src: Buffer): void;

    /**
     * Return a copy of the current image
     */
    //% shim=ImageMethods::clone
    clone(): SImage;

    /**
     * Flips (mirrors) pixels horizontally in the current image
     */
    //% shim=ImageMethods::flipX
    flipX(): void;

    /**
     * Flips (mirrors) pixels vertically in the current image
     */
    //% shim=ImageMethods::flipY
    flipY(): void;

    /**
     * Returns a transposed image (with X/Y swapped)
     */
    //% shim=ImageMethods::transposed
    transposed(): SImage;

    /**
     * Every pixel in image is moved by (dx,dy)
     */
    //% shim=ImageMethods::scroll
    scroll(dx: int32, dy: int32): void;

    /**
     * Stretches the image horizontally by 100%
     */
    //% shim=ImageMethods::doubledX
    doubledX(): SImage;

    /**
     * Stretches the image vertically by 100%
     */
    //% shim=ImageMethods::doubledY
    doubledY(): SImage;

    /**
     * Replaces one color in an image with another
     */
    //% shim=ImageMethods::replace
    replace(from: int32, to: int32): void;

    /**
     * Stretches the image in both directions by 100%
     */
    //% shim=ImageMethods::doubled
    doubled(): SImage;

    /**
     * Draw given image on the current image
     */
    //% shim=ImageMethods::drawImage
    drawImage(from: SImage, x: int32, y: int32): void;

    /**
     * Draw given image with transparent background on the current image
     */
    //% shim=ImageMethods::drawTransparentImage
    drawTransparentImage(from: SImage, x: int32, y: int32): void;

    /**
     * Check if the current image "collides" with another
     */
    //% shim=ImageMethods::overlapsWith
    overlapsWith(other: SImage, x: int32, y: int32): boolean;
}
declare namespace simage {

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

// Auto-generated. Do not edit. Really.
