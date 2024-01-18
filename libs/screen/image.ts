type color = number

namespace simage {
    export function repeatY(count: number, image: SImage) {
        let arr = [image]
        while (--count > 0)
            arr.push(image)
        return concatY(arr)
    }

    export function concatY(images: SImage[]) {
        let w = 0
        let h = 0
        for (let img of images) {
            w = Math.max(img.width, w)
            h += img.height
        }
        let r = simage.create(w, h)
        let y = 0
        for (let img of images) {
            let x = (w - img.width) >> 1
            r.drawImage(img, x, y)
            y += img.height
        }
        return r
    }
}


//% snippet='img` `'
//% pySnippet='img(""" """)'
//% fixedInstances
interface SImage {
    /**
     * Draw an icon (monochromatic image) using given color
     */
    //% helper=imageDrawIcon
    drawIcon(icon: Buffer, x: number, y: number, c: color): void;

    /**
     * Fill a rectangle
     */
    //% helper=imageFillRect
    fillRect(x: number, y: number, w: number, h: number, c: color): void;

    /**
     * Draw a line
     */
    //% helper=imageDrawLine
    drawLine(x0: number, y0: number, x1: number, y1: number, c: color): void;

    /**
     * Draw an empty rectangle
     */
    //% helper=imageDrawRect
    drawRect(x: number, y: number, w: number, h: number, c: color): void;

    /**
     * Draw a circle
     */
    //% helper=imageDrawCircle
    drawCircle(cx: number, cy: number, r: number, c: color): void;

    /**
     * Fills a circle
     */
    //% helper=imageFillCircle
    fillCircle(cx: number, cy: number, r: number, c: color): void;

    /**
     * Fills a triangle
     */
    //% helper=imageFillTriangle
    fillTriangle(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, col: number): void;

    /**
     * Fills a 4-side-polygon
     */
    //% helper=imageFillPolygon4
    fillPolygon4(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, col: number): void;

    /**
     * Returns an image rotated by -90, 0, 90, 180, 270 deg clockwise
     */
    //% helper=imageRotated
    rotated(deg: number): SImage;

    /**
     * Scale and copy a row of pixels from a texture.
     */
    //% helper=imageBlitRow
    blitRow(dstX: number, dstY: number, from: SImage, fromX: number, fromH: number): void;

    /**
     * Copy an image from a source rectangle to a destination rectangle, stretching or
     * compressing to fit the dimensions of the destination rectangle, if necessary.
     */
    //% helper=imageBlit
    blit(xDst: number, yDst: number, wDst: number, hDst: number, src: SImage, xSrc: number, ySrc: number, wSrc: number, hSrc: number, transparent: boolean, check: boolean): boolean;
}

interface ScreenImage extends SImage {
    /**
     * Sets the screen backlight brightness (10-100)
     */
    //% helper=setScreenBrightness
    setBrightness(deg: number): SImage;

    /**
     * Gets current screen backlight brightness (0-100)
     */
    //% helper=screenBrightness
    brightness(): number;
}

// pxt compiler currently crashes on non-functions in helpers namespace; will fix
namespace _helpers_workaround {
    export let brightness = 100
}

namespace helpers {
    //% shim=ImageMethods::_drawLine
    function _drawLine(img: SImage, xy: number, wh: number, c: color): void { }

    //% shim=ImageMethods::_fillRect
    function _fillRect(img: SImage, xy: number, wh: number, c: color): void { }

    //% shim=ImageMethods::_mapRect
    function _mapRect(img: SImage, xy: number, wh: number, m: Buffer): void { }

    //% shim=ImageMethods::_drawIcon
    function _drawIcon(img: SImage, icon: Buffer, xy: number, c: color): void { }

    //% shim=ImageMethods::_fillCircle
    declare function _fillCircle(img: SImage, cxy: number, r: number, c: color): void;

    //% shim=ImageMethods::_blitRow
    declare function _blitRow(img: SImage, xy: number, from: SImage, xh: number): void;

    //% shim=ImageMethods::_blit
    declare function _blit(img: SImage, src: SImage, args: number[]): boolean;

    //% shim=ImageMethods::_fillTriangle
    declare function _fillTriangle(img: SImage, args: number[]): void;

    //% shim=ImageMethods::_fillPolygon4
    declare function _fillPolygon4(img: SImage, args: number[]): void;

    function pack(x: number, y: number) {
        return (Math.clamp(-30000, 30000, x | 0) & 0xffff) | (Math.clamp(-30000, 30000, y | 0) << 16)
    }

    let _blitArgs: number[];

    export function imageBlit(img: SImage, xDst: number, yDst: number, wDst: number, hDst: number, src: SImage, xSrc: number, ySrc: number, wSrc: number, hSrc: number, transparent: boolean, check: boolean): boolean {
        _blitArgs = _blitArgs || [];
        _blitArgs[0] = xDst | 0;
        _blitArgs[1] = yDst | 0;
        _blitArgs[2] = wDst | 0;
        _blitArgs[3] = hDst | 0;
        _blitArgs[4] = xSrc | 0;
        _blitArgs[5] = ySrc | 0;
        _blitArgs[6] = wSrc | 0;
        _blitArgs[7] = hSrc | 0;
        _blitArgs[8] = transparent ? 1 : 0;
        _blitArgs[9] = check ? 1 : 0;
        return _blit(img, src, _blitArgs);
    }

    export function imageBlitRow(img: SImage, dstX: number, dstY: number, from: SImage, fromX: number, fromH: number): void {
        _blitRow(img, pack(dstX, dstY), from, pack(fromX, fromH))
    }

    export function imageDrawIcon(img: SImage, icon: Buffer, x: number, y: number, c: color): void {
        _drawIcon(img, icon, pack(x, y), c)
    }
    export function imageFillRect(img: SImage, x: number, y: number, w: number, h: number, c: color): void {
        _fillRect(img, pack(x, y), pack(w, h), c)
    }
    export function imageMapRect(img: SImage, x: number, y: number, w: number, h: number, m: Buffer): void {
        _mapRect(img, pack(x, y), pack(w, h), m)
    }
    export function imageDrawLine(img: SImage, x: number, y: number, w: number, h: number, c: color): void {
        _drawLine(img, pack(x, y), pack(w, h), c)
    }
    export function imageDrawRect(img: SImage, x: number, y: number, w: number, h: number, c: color): void {
        if (w == 0 || h == 0) return
        w--
        h--
        imageDrawLine(img, x, y, x + w, y, c)
        imageDrawLine(img, x, y, x, y + h, c)
        imageDrawLine(img, x + w, y + h, x + w, y, c)
        imageDrawLine(img, x + w, y + h, x, y + h, c)
    }

    export function imageDrawCircle(img: SImage, cx: number, cy: number, r: number, col: number) {
        cx = cx | 0;
        cy = cy | 0;
        r = r | 0;
        // short cuts
        if (r < 0)
            return;

        // Bresenham's algorithm
        let x = 0
        let y = r
        let d = 3 - 2 * r

        while (y >= x) {
            img.setPixel(cx + x, cy + y, col)
            img.setPixel(cx - x, cy + y, col)
            img.setPixel(cx + x, cy - y, col)
            img.setPixel(cx - x, cy - y, col)
            img.setPixel(cx + y, cy + x, col)
            img.setPixel(cx - y, cy + x, col)
            img.setPixel(cx + y, cy - x, col)
            img.setPixel(cx - y, cy - x, col)
            x++
            if (d > 0) {
                y--
                d += 4 * (x - y) + 10
            } else {
                d += 4 * x + 6
            }
        }
    }

    export function imageFillCircle(img: SImage, cx: number, cy: number, r: number, col: number) {
        _fillCircle(img, pack(cx, cy), r, col);
    }

    export function imageFillTriangle(img: SImage, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, col: number) {
        _blitArgs = _blitArgs || [];
        _blitArgs[0] = x0;
        _blitArgs[1] = y0;
        _blitArgs[2] = x1;
        _blitArgs[3] = y1;
        _blitArgs[4] = x2;
        _blitArgs[5] = y2;
        _blitArgs[6] = col;
        _fillTriangle(img, _blitArgs);
    }

    export function imageFillPolygon4(img: SImage, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, col: number) {
        _blitArgs = _blitArgs || [];
        _blitArgs[0] = x0;
        _blitArgs[1] = y0;
        _blitArgs[2] = x1;
        _blitArgs[3] = y1;
        _blitArgs[4] = x2;
        _blitArgs[5] = y2;
        _blitArgs[6] = x3;
        _blitArgs[7] = y3;
        _blitArgs[8] = col;
        _fillPolygon4(img, _blitArgs);
    }

    /**
     * Returns an image rotated by 90, 180, 270 deg clockwise
     */
    export function imageRotated(img: SImage, deg: number) {
        if (deg == -90 || deg == 270) {
            let r = img.transposed();
            r.flipY();
            return r;
        } else if (deg == 180 || deg == -180) {
            let r = img.clone();
            r.flipX();
            r.flipY();
            return r;
        } else if (deg == 90) {
            let r = img.transposed();
            r.flipX();
            return r;
        } else {
            return null;
        }
    }

    //% shim=pxt::setScreenBrightness
    function _setScreenBrightness(brightness: number) { }

    export function setScreenBrightness(img: SImage, b: number) {
        b = Math.clamp(10, 100, b | 0);
        _helpers_workaround.brightness = b
        _setScreenBrightness(_helpers_workaround.brightness)
    }

    export function screenBrightness(img: SImage) {
        return _helpers_workaround.brightness
    }
}
