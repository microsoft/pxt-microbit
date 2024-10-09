// Auto-generated. Do not edit.


declare interface Bitmap {
    /**
     * Get underlying buffer
     */
    //% property shim=BitmapMethods::__buffer
    __buffer: Buffer;

    /**
     * Get the width of the bitmap
     */
    //% property shim=BitmapMethods::width
    width: int32;

    /**
     * Get the height of the bitmap
     */
    //% property shim=BitmapMethods::height
    height: int32;

    /**
     * True if the bitmap is monochromatic (black and white)
     */
    //% property shim=BitmapMethods::isMono
    isMono: boolean;

    /**
     * Sets all pixels in the current bitmap from the other bitmap, which has to be of the same size and
     * bpp.
     */
    //% shim=BitmapMethods::copyFrom
    copyFrom(from: Bitmap): void;

    /**
     * Set pixel color
     */
    //% shim=BitmapMethods::setPixel
    setPixel(x: int32, y: int32, c: int32): void;

    /**
     * Get a pixel color
     */
    //% shim=BitmapMethods::getPixel
    getPixel(x: int32, y: int32): int32;

    /**
     * Fill entire bitmap with a given color
     */
    //% shim=BitmapMethods::fill
    fill(c: int32): void;

    /**
     * Copy row(s) of pixel from bitmap to buffer (8 bit per pixel).
     */
    //% shim=BitmapMethods::getRows
    getRows(x: int32, dst: Buffer): void;

    /**
     * Copy row(s) of pixel from buffer to bitmap.
     */
    //% shim=BitmapMethods::setRows
    setRows(x: int32, src: Buffer): void;

    /**
     * Return a copy of the current bitmap
     */
    //% shim=BitmapMethods::clone
    clone(): Bitmap;

    /**
     * Flips (mirrors) pixels horizontally in the current bitmap
     */
    //% shim=BitmapMethods::flipX
    flipX(): void;

    /**
     * Flips (mirrors) pixels vertically in the current bitmap
     */
    //% shim=BitmapMethods::flipY
    flipY(): void;

    /**
     * Returns a transposed bitmap (with X/Y swapped)
     */
    //% shim=BitmapMethods::transposed
    transposed(): Bitmap;

    /**
     * Every pixel in bitmap is moved by (dx,dy)
     */
    //% shim=BitmapMethods::scroll
    scroll(dx: int32, dy: int32): void;

    /**
     * Stretches the bitmap horizontally by 100%
     */
    //% shim=BitmapMethods::doubledX
    doubledX(): Bitmap;

    /**
     * Stretches the bitmap vertically by 100%
     */
    //% shim=BitmapMethods::doubledY
    doubledY(): Bitmap;

    /**
     * Replaces one color in an bitmap with another
     */
    //% shim=BitmapMethods::replace
    replace(from: int32, to: int32): void;

    /**
     * Stretches the bitmap in both directions by 100%
     */
    //% shim=BitmapMethods::doubled
    doubled(): Bitmap;

    /**
     * Draw given bitmap on the current bitmap
     */
    //% shim=BitmapMethods::drawBitmap
    drawBitmap(from: Bitmap, x: int32, y: int32): void;

    /**
     * Draw given bitmap with transparent background on the current bitmap
     */
    //% shim=BitmapMethods::drawTransparentBitmap
    drawTransparentBitmap(from: Bitmap, x: int32, y: int32): void;

    /**
     * Check if the current bitmap "collides" with another
     */
    //% shim=BitmapMethods::overlapsWith
    overlapsWith(other: Bitmap, x: int32, y: int32): boolean;
}
declare namespace bitmaps {

    /**
     * Create new bitmap with given content
     */
    //% shim=bitmaps::ofBuffer
    function ofBuffer(buf: Buffer): Bitmap;

    /**
     * Create new empty (transparent) bitmap
     */
    //% shim=bitmaps::create
    function create(width: int32, height: int32): Bitmap;

    /**
     * Double the size of an icon
     */
    //% shim=bitmaps::doubledIcon
    function doubledIcon(icon: Buffer): Buffer;
}

// Auto-generated. Do not edit. Really.
