type color = number

namespace bitmaps {
    export function repeatY(count: number, image: Bitmap) {
        let arr = [image]
        while (--count > 0)
            arr.push(image)
        return concatY(arr)
    }

    export function concatY(images: Bitmap[]) {
        let w = 0
        let h = 0
        for (let img of images) {
            w = Math.max(img.width, w)
            h += img.height
        }
        let r = bitmaps.create(w, h)
        let y = 0
        for (let img of images) {
            let x = (w - img.width) >> 1
            r.drawBitmap(img, x, y)
            y += img.height
        }
        return r
    }
}


//% snippet='bmp` `'
//% pySnippet='bmp(""" """)'
interface Bitmap {
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
    rotated(deg: number): Bitmap;

    /**
     * Scale and copy a row of pixels from a texture.
     */
    //% helper=imageBlitRow
    blitRow(dstX: number, dstY: number, from: Bitmap, fromX: number, fromH: number): void;

    /**
     * Copy an image from a source rectangle to a destination rectangle, stretching or
     * compressing to fit the dimensions of the destination rectangle, if necessary.
     */
    //% helper=imageBlit
    blit(xDst: number, yDst: number, wDst: number, hDst: number, src: Bitmap, xSrc: number, ySrc: number, wSrc: number, hSrc: number, transparent: boolean, check: boolean): boolean;
}

namespace helpers {
    //% shim=BitmapMethods::_drawLine
    function _drawLine(img: Bitmap, xy: number, wh: number, c: color): void { }

    //% shim=BitmapMethods::_fillRect
    function _fillRect(img: Bitmap, xy: number, wh: number, c: color): void { }

    //% shim=BitmapMethods::_mapRect
    function _mapRect(img: Bitmap, xy: number, wh: number, m: Buffer): void { }

    //% shim=BitmapMethods::_drawIcon
    function _drawIcon(img: Bitmap, icon: Buffer, xy: number, c: color): void { }

    //% shim=BitmapMethods::_fillCircle
    declare function _fillCircle(img: Bitmap, cxy: number, r: number, c: color): void;

    //% shim=BitmapMethods::_blitRow
    declare function _blitRow(img: Bitmap, xy: number, from: Bitmap, xh: number): void;

    //% shim=BitmapMethods::_blit
    declare function _blit(img: Bitmap, src: Bitmap, args: number[]): boolean;

    //% shim=BitmapMethods::_fillTriangle
    declare function _fillTriangle(img: Bitmap, args: number[]): void;

    //% shim=BitmapMethods::_fillPolygon4
    declare function _fillPolygon4(img: Bitmap, args: number[]): void;

    function pack(x: number, y: number) {
        return (Math.clamp(-30000, 30000, x | 0) & 0xffff) | (Math.clamp(-30000, 30000, y | 0) << 16)
    }

    let _blitArgs: number[];

    export function imageBlit(img: Bitmap, xDst: number, yDst: number, wDst: number, hDst: number, src: Bitmap, xSrc: number, ySrc: number, wSrc: number, hSrc: number, transparent: boolean, check: boolean): boolean {
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

    export function imageBlitRow(img: Bitmap, dstX: number, dstY: number, from: Bitmap, fromX: number, fromH: number): void {
        _blitRow(img, pack(dstX, dstY), from, pack(fromX, fromH))
    }

    export function imageDrawIcon(img: Bitmap, icon: Buffer, x: number, y: number, c: color): void {
        _drawIcon(img, icon, pack(x, y), c)
    }
    export function imageFillRect(img: Bitmap, x: number, y: number, w: number, h: number, c: color): void {
        _fillRect(img, pack(x, y), pack(w, h), c)
    }
    export function imageMapRect(img: Bitmap, x: number, y: number, w: number, h: number, m: Buffer): void {
        _mapRect(img, pack(x, y), pack(w, h), m)
    }
    export function imageDrawLine(img: Bitmap, x: number, y: number, w: number, h: number, c: color): void {
        _drawLine(img, pack(x, y), pack(w, h), c)
    }
    export function imageDrawRect(img: Bitmap, x: number, y: number, w: number, h: number, c: color): void {
        if (w == 0 || h == 0) return
        w--
        h--
        imageDrawLine(img, x, y, x + w, y, c)
        imageDrawLine(img, x, y, x, y + h, c)
        imageDrawLine(img, x + w, y + h, x + w, y, c)
        imageDrawLine(img, x + w, y + h, x, y + h, c)
    }

    export function imageDrawCircle(img: Bitmap, cx: number, cy: number, r: number, col: number) {
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

    export function imageFillCircle(img: Bitmap, cx: number, cy: number, r: number, col: number) {
        _fillCircle(img, pack(cx, cy), r, col);
    }

    export function imageFillTriangle(img: Bitmap, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, col: number) {
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

    export function imageFillPolygon4(img: Bitmap, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, col: number) {
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
    export function imageRotated(img: Bitmap, deg: number) {
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
}
