namespace pxsim {
    export class RefImage extends RefObject {
        _width: number;
        _height: number;
        _bpp: number;
        data: Uint8Array;
        isStatic = true;
        revision: number;

        constructor(w: number, h: number, bpp: number) {
            super();
            this.revision = 0;
            this.data = new Uint8Array(w * h)
            this._width = w
            this._height = h
            this._bpp = bpp
        }

        scan(mark: (path: string, v: any) => void) { }
        gcKey() { return "Image" }
        gcSize() { return 4 + (this.data.length + 3 >> 3) }
        gcIsStatic() { return this.isStatic }

        pix(x: number, y: number) {
            return (x | 0) + (y | 0) * this._width
        }

        inRange(x: number, y: number) {
            return 0 <= (x | 0) && (x | 0) < this._width &&
                0 <= (y | 0) && (y | 0) < this._height;
        }

        color(c: number): number {
            return c & 0xff
        }

        clamp(x: number, y: number) {
            x |= 0
            y |= 0

            if (x < 0) x = 0
            else if (x >= this._width)
                x = this._width - 1

            if (y < 0) y = 0
            else if (y >= this._height)
                y = this._height - 1

            return [x, y]
        }

        makeWritable() {
            this.revision++;
            this.isStatic = false
        }

        toDebugString() {
            return this._width + "x" + this._height
        }
    }
}

namespace pxsim.BitmapMethods {
    export function XX(x: number) { return (x << 16) >> 16 }
    export function YY(x: number) { return x >> 16 }

    export function __buffer(img: RefImage): RefBuffer { 
        return new RefBuffer(img.data)  // no clone for now
    }
    
    export function width(img: RefImage) { return img._width }

    export function height(img: RefImage) { return img._height }

    export function isMono(img: RefImage) { return img._bpp == 1 }

    export function isStatic(img: RefImage) { return img.gcIsStatic() }

    export function revision(img: RefImage) { return img.revision }

    export function setPixel(img: RefImage, x: number, y: number, c: number) {
        img.makeWritable()
        if (img.inRange(x, y))
            img.data[img.pix(x, y)] = img.color(c)
    }

    export function getPixel(img: RefImage, x: number, y: number) {
        if (img.inRange(x, y))
            return img.data[img.pix(x, y)]
        return 0
    }

    export function fill(img: RefImage, c: number) {
        img.makeWritable()
        img.data.fill(img.color(c))
    }

    export function fillRect(img: RefImage, x: number, y: number, w: number, h: number, c: number) {
        if (w == 0 || h == 0 || x >= img._width || y >= img._height || x + w - 1 < 0 || y + h - 1 < 0)
            return;
        img.makeWritable()
        let [x2, y2] = img.clamp(x + w - 1, y + h - 1);
        [x, y] = img.clamp(x, y)
        let p = img.pix(x, y)
        w = x2 - x + 1
        h = y2 - y + 1
        let d = img._width - w
        c = img.color(c)
        while (h-- > 0) {
            for (let i = 0; i < w; ++i)
                img.data[p++] = c
            p += d
        }
    }

    export function _fillRect(img: RefImage, xy: number, wh: number, c: number) {
        fillRect(img, XX(xy), YY(xy), XX(wh), YY(wh), c)
    }

    export function mapRect(img: RefImage, x: number, y: number, w: number, h: number, c: RefBuffer) {
        if (c.data.length < 16)
            return
        img.makeWritable()
        let [x2, y2] = img.clamp(x + w - 1, y + h - 1);
        [x, y] = img.clamp(x, y)
        let p = img.pix(x, y)
        w = x2 - x + 1
        h = y2 - y + 1
        let d = img._width - w

        while (h-- > 0) {
            for (let i = 0; i < w; ++i) {
                img.data[p] = c.data[img.data[p]]
                p++
            }
            p += d
        }
    }

    export function _mapRect(img: RefImage, xy: number, wh: number, c: RefBuffer) {
        mapRect(img, XX(xy), YY(xy), XX(wh), YY(wh), c)
    }

    export function equals(img: RefImage, other: RefImage) {
        if (!other || img._bpp != other._bpp || img._width != other._width || img._height != other._height) {
            return false;
        }
        let imgData = img.data;
        let otherData = other.data;
        let len = imgData.length;
        for (let i = 0; i < len; i++) {
            if (imgData[i] != otherData[i]) {
                return false;
            }
        }
        return true;
    }

    export function getRows(img: RefImage, x: number, dst: RefBuffer) {
        x |= 0
        if (!img.inRange(x, 0))
            return

        let dp = 0
        let len = Math.min(dst.data.length, (img._width - x) * img._height)
        let sp = x
        let hh = 0
        while (len--) {
            if (hh++ >= img._height) {
                hh = 1
                sp = ++x
            }
            dst.data[dp++] = img.data[sp]
            sp += img._width
        }
    }

    export function setRows(img: RefImage, x: number, src: RefBuffer) {
        x |= 0
        if (!img.inRange(x, 0))
            return

        let sp = 0
        let len = Math.min(src.data.length, (img._width - x) * img._height)
        let dp = x
        let hh = 0
        while (len--) {
            if (hh++ >= img._height) {
                hh = 1
                dp = ++x
            }
            img.data[dp] = src.data[sp++]
            dp += img._width
        }
    }

    export function clone(img: RefImage) {
        let r = new RefImage(img._width, img._height, img._bpp)
        r.data.set(img.data)
        return r
    }

    export function flipX(img: RefImage) {
        img.makeWritable()
        const w = img._width
        const h = img._height
        for (let i = 0; i < h; ++i) {
            img.data.subarray(i * w, (i + 1) * w).reverse()
        }
    }


    export function flipY(img: RefImage) {
        img.makeWritable()
        const w = img._width
        const h = img._height
        const d = img.data
        for (let i = 0; i < w; ++i) {
            let top = i
            let bot = i + (h - 1) * w
            while (top < bot) {
                let c = d[top]
                d[top] = d[bot]
                d[bot] = c
                top += w
                bot -= w
            }
        }
    }

    export function transposed(img: RefImage) {
        const w = img._width
        const h = img._height
        const d = img.data
        const r = new RefImage(h, w, img._bpp)
        const n = r.data
        let src = 0

        for (let i = 0; i < h; ++i) {
            let dst = i
            for (let j = 0; j < w; ++j) {
                n[dst] = d[src++]
                dst += w
            }
        }

        return r
    }

    export function copyFrom(img: RefImage, from: RefImage) {
        if (img._width != from._width || img._height != from._height ||
            img._bpp != from._bpp)
            return;
        img.data.set(from.data)
    }

    export function scroll(img: RefImage, dx: number, dy: number) {
        img.makeWritable()
        dx |= 0
        dy |= 0
        if (dx != 0) {
            const img2 = clone(img)
            img.data.fill(0)
            drawTransparentBitmap(img, img2, dx, dy)
        } else if (dy < 0) {
            dy = -dy
            if (dy < img._height)
                img.data.copyWithin(0, dy * img._width)
            else
                dy = img._height
            img.data.fill(0, (img._height - dy) * img._width)
        } else if (dy > 0) {
            if (dy < img._height)
                img.data.copyWithin(dy * img._width, 0)
            else
                dy = img._height
            img.data.fill(0, 0, dy * img._width)
        }
        // TODO implement dx
    }

    export function replace(img: RefImage, from: number, to: number) {
        to &= 0xf;
        const d = img.data
        for (let i = 0; i < d.length; ++i)
            if (d[i] == from) d[i] = to
    }

    export function doubledX(img: RefImage) {
        const w = img._width
        const h = img._height
        const d = img.data
        const r = new RefImage(w * 2, h, img._bpp)
        const n = r.data
        let dst = 0

        for (let src = 0; src < d.length; ++src) {
            let c = d[src]
            n[dst++] = c
            n[dst++] = c
        }

        return r
    }

    export function doubledY(img: RefImage) {
        const w = img._width
        const h = img._height
        const d = img.data
        const r = new RefImage(w, h * 2, img._bpp)
        const n = r.data

        let src = 0
        let dst0 = 0
        let dst1 = w
        for (let i = 0; i < h; ++i) {
            for (let j = 0; j < w; ++j) {
                let c = d[src++]
                n[dst0++] = c
                n[dst1++] = c
            }
            dst0 += w
            dst1 += w
        }

        return r
    }


    export function doubled(img: RefImage) {
        return doubledX(doubledY(img))
    }

    function drawImageCore(img: RefImage, from: RefImage, x: number, y: number, clear: boolean, check: boolean) {
        x |= 0
        y |= 0

        const w = from._width
        let h = from._height
        const sh = img._height
        const sw = img._width

        if (x + w <= 0) return false
        if (x >= sw) return false
        if (y + h <= 0) return false
        if (y >= sh) return false

        if (clear)
            fillRect(img, x, y, from._width, from._height, 0)
        else if (!check)
            img.makeWritable()

        const len = x < 0 ? Math.min(sw, w + x) : Math.min(sw - x, w)
        const fdata = from.data
        const tdata = img.data

        for (let p = 0; h--; y++ , p += w) {
            if (0 <= y && y < sh) {
                let dst = y * sw
                let src = p
                if (x < 0)
                    src += -x
                else
                    dst += x
                for (let i = 0; i < len; ++i) {
                    const v = fdata[src++]
                    if (v) {
                        if (check) {
                            if (tdata[dst])
                                return true
                        } else {
                            tdata[dst] = v
                        }
                    }
                    dst++
                }
            }
        }

        return false
    }

    export function drawBitmap(img: RefImage, from: RefImage, x: number, y: number) {
        drawImageCore(img, from, x, y, true, false)
    }

    export function drawTransparentBitmap(img: RefImage, from: RefImage, x: number, y: number) {
        drawImageCore(img, from, x, y, false, false)
    }

    export function overlapsWith(img: RefImage, other: RefImage, x: number, y: number) {
        return drawImageCore(img, other, x, y, false, true)
    }

    function drawLineLow(img: RefImage, x0: number, y0: number, x1: number, y1: number, c: number) {
        let dx = x1 - x0;
        let dy = y1 - y0;
        let yi = img._width;
        if (dy < 0) {
            yi = -yi;
            dy = -dy;
        }
        let D = 2 * dy - dx;
        dx <<= 1;
        dy <<= 1;
        c = img.color(c);
        let ptr = img.pix(x0, y0)
        for (let x = x0; x <= x1; ++x) {
            img.data[ptr] = c
            if (D > 0) {
                ptr += yi;
                D -= dx;
            }
            D += dy;
            ptr++;
        }
    }

    function drawLineHigh(img: RefImage, x0: number, y0: number, x1: number, y1: number, c: number) {
        let dx = x1 - x0;
        let dy = y1 - y0;
        let xi = 1;
        if (dx < 0) {
            xi = -1;
            dx = -dx;
        }
        let D = 2 * dx - dy;
        dx <<= 1;
        dy <<= 1;
        c = img.color(c);
        let ptr = img.pix(x0, y0);
        for (let y = y0; y <= y1; ++y) {
            img.data[ptr] = c;
            if (D > 0) {
                ptr += xi;
                D -= dy;
            }
            D += dx;
            ptr += img._width;
        }
    }

    export function _drawLine(img: RefImage, xy: number, wh: number, c: number) {
        drawLine(img, XX(xy), YY(xy), XX(wh), YY(wh), c)
    }

    export function drawLine(img: RefImage, x0: number, y0: number, x1: number, y1: number, c: number) {
        x0 |= 0
        y0 |= 0
        x1 |= 0
        y1 |= 0

        if (x1 < x0) {
            drawLine(img, x1, y1, x0, y0, c);
            return;
        }

        let w = x1 - x0;
        let h = y1 - y0;

        if (h == 0) {
            if (w == 0)
                setPixel(img, x0, y0, c);
            else
                fillRect(img, x0, y0, w + 1, 1, c);
            return;
        }

        if (w == 0) {
            if (h > 0)
                fillRect(img, x0, y0, 1, h + 1, c);
            else
                fillRect(img, x0, y1, 1, -h + 1, c);
            return;
        }

        if (x1 < 0 || x0 >= img._width)
            return;
        if (x0 < 0) {
            y0 -= (h * x0 / w) | 0;
            x0 = 0;
        }
        if (x1 >= img._width) {
            let d = (img._width - 1) - x1;
            y1 += (h * d / w) | 0;
            x1 = img._width - 1
        }

        if (y0 < y1) {
            if (y0 >= img._height || y1 < 0)
                return;
            if (y0 < 0) {
                x0 -= (w * y0 / h) | 0;
                y0 = 0;
            }
            if (y1 >= img._height) {
                let d = (img._height - 1) - y1;
                x1 += (w * d / h) | 0;
                y1 = img._height
            }
        } else {
            if (y1 >= img._height || y0 < 0)
                return;
            if (y1 < 0) {
                x1 -= (w * y1 / h) | 0;
                y1 = 0;
            }
            if (y0 >= img._height) {
                let d = (img._height - 1) - y0;
                x0 += (w * d / h) | 0;
                y0 = img._height
            }
        }

        img.makeWritable()

        if (h < 0) {
            h = -h;
            if (h < w)
                drawLineLow(img, x0, y0, x1, y1, c);
            else
                drawLineHigh(img, x1, y1, x0, y0, c);
        } else {
            if (h < w)
                drawLineLow(img, x0, y0, x1, y1, c);
            else
                drawLineHigh(img, x0, y0, x1, y1, c);
        }
    }

    export function drawIcon(img: RefImage, icon: RefBuffer, x: number, y: number, color: number) {
        const src: Uint8Array = icon.data
        if (!bitmap.isValidImage(icon))
            return
        if (src[1] != 1)
            return // only mono
        let width = bitmap.bufW(src)
        let height = bitmap.bufH(src)
        let byteH = bitmap.byteHeight(height, 1)

        x |= 0
        y |= 0
        const destHeight = img._height
        const destWidth = img._width

        if (x + width <= 0) return
        if (x >= destWidth) return
        if (y + height <= 0) return
        if (y >= destHeight) return

        img.makeWritable()

        let srcPointer = 8
        color = img.color(color)
        const screen = img.data

        for (let i = 0; i < width; ++i) {
            let destX = x + i
            if (0 <= destX && destX < destWidth) {
                let destIndex = destX + y * destWidth
                let srcIndex = srcPointer
                let destY = y
                let destEnd = Math.min(destHeight, height + y)
                if (y < 0) {
                    srcIndex += ((-y) >> 3)
                    destY += ((-y) >> 3) * 8
                    destIndex += (destY - y) * destWidth
                }
                let mask = 0x01
                let srcByte = src[srcIndex++]
                while (destY < destEnd) {
                    if (destY >= 0 && (srcByte & mask)) {
                        screen[destIndex] = color
                    }
                    mask <<= 1
                    if (mask == 0x100) {
                        mask = 0x01
                        srcByte = src[srcIndex++]
                    }
                    destIndex += destWidth
                    destY++
                }
            }
            srcPointer += byteH
        }
    }

    export function _drawIcon(img: RefImage, icon: RefBuffer, xy: number, color: number) {
        drawIcon(img, icon, XX(xy), YY(xy), color)
    }

    export function fillCircle(img: RefImage, cx: number, cy: number, r: number, c: number) {
        let x = r - 1;
        let y = 0;
        let dx = 1;
        let dy = 1;
        let err = dx - (r << 1);
        while (x >= y) {
            fillRect(img, cx + x, cy - y, 1, 1 + (y << 1), c);
            fillRect(img, cx + y, cy - x, 1, 1 + (x << 1), c);
            fillRect(img, cx - x, cy - y, 1, 1 + (y << 1), c);
            fillRect(img, cx - y, cy - x, 1, 1 + (x << 1), c);
            if (err <= 0) {
                y++;
                err += dy;
                dy += 2;
            }
            if (err > 0) {
                x--;
                dx += 2;
                err += dx - (r << 1);
            }
        }
    }

    export function _fillCircle(img: RefImage, cxy: number, r: number, c: number) {
        fillCircle(img, XX(cxy), YY(cxy), r, c);
    }

    interface LineGenState {
        x: number;
        y: number;
        x0: number;
        y0: number;
        x1: number;
        y1: number;
        W: number;
        H: number;
        dx: number;
        dy: number;
        yi: number;
        xi: number;
        D: number;
        nextFuncIndex: number;
    }
    interface ValueRange {
        min: number;
        max: number;
    }

    function nextYRange_Low(x: number, line: LineGenState, yRange: ValueRange) {
        while (line.x === x && line.x <= line.x1 && line.x < line.W) {
            if (0 <= line.x) {
                if (line.y < yRange.min) yRange.min = line.y;
                if (line.y > yRange.max) yRange.max = line.y
            }
            if (line.D > 0) {
                line.y += line.yi;
                line.D -= line.dx;
            }
            line.D += line.dy;
            ++line.x;
        }
    }

    function nextYRange_HighUp(x: number, line: LineGenState, yRange: ValueRange) {
        while (line.x == x && line.y >= line.y1 && line.x < line.W) {
            if (0 <= line.x) {
                if (line.y < yRange.min) yRange.min = line.y;
                if (line.y > yRange.max) yRange.max = line.y;
            }
            if (line.D > 0) {
                line.x += line.xi;
                line.D += line.dy;
            }
            line.D += line.dx;
            --line.y;
        }
    }

    function nextYRange_HighDown(x: number, line: LineGenState, yRange: ValueRange) {
        while (line.x == x && line.y <= line.y1 && line.x < line.W) {
            if (0 <= line.x) {
                if (line.y < yRange.min) yRange.min = line.y;
                if (line.y > yRange.max) yRange.max = line.y;
            }
            if (line.D > 0) {
                line.x += line.xi;
                line.D -= line.dy;
            }
            line.D += line.dx;
            ++line.y;
        }
    }

    function initYRangeGenerator(X0: number, Y0: number, X1: number, Y1: number): LineGenState {
        const line: LineGenState = {
            x: X0,
            y: Y0,
            x0: X0,
            y0: Y0,
            x1: X1,
            y1: Y1,
            W: 0,
            H: 0,
            dx: X1 - X0,
            dy: Y1 - Y0,
            yi: 0,
            xi: 0,
            D: 0,
            nextFuncIndex: 0,
        };

        if ((line.dy < 0 ? -line.dy : line.dy) < line.dx) {
            line.yi = 1;
            if (line.dy < 0) {
                line.yi = -1;
                line.dy = -line.dy;
            }
            line.D = 2 * line.dy - line.dx;
            line.dx = line.dx << 1;
            line.dy = line.dy << 1;

            line.nextFuncIndex = 0;
            return line;
        } else {
            line.xi = 1;
            if (line.dy < 0) {
                line.D = 2 * line.dx + line.dy;
                line.dx = line.dx << 1;
                line.dy = line.dy << 1;

                line.nextFuncIndex = 1;
                return line;
            } else {
                line.D = 2 * line.dx - line.dy;
                line.dx = line.dx << 1;
                line.dy = line.dy << 1;

                line.nextFuncIndex = 2;
                return line;
            }
        }
    }

    export function fillTriangle(img: RefImage, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, c: number) {
        if (x1 < x0) {
            [x1, x0] = [x0, x1];
            [y1, y0] = [y0, y1];
        }
        if (x2 < x1) {
            [x2, x1] = [x1, x2];
            [y2, y1] = [y1, y2];
        }
        if (x1 < x0) {
            [x1, x0] = [x0, x1];
            [y1, y0] = [y0, y1];
        }

        const lines: LineGenState[] = [
            initYRangeGenerator(x0, y0, x2, y2),
            initYRangeGenerator(x0, y0, x1, y1),
            initYRangeGenerator(x1, y1, x2, y2)
        ];

        lines[0].W = lines[1].W = lines[2].W = width(img);
        lines[0].H = lines[1].H = lines[2].H = height(img);

        type FP_NEXT = (x: number, line: LineGenState, yRange: ValueRange) => void;
        const nextFuncList: FP_NEXT[] = [
            nextYRange_Low,
            nextYRange_HighUp,
            nextYRange_HighDown
        ];
        const fpNext0 = nextFuncList[lines[0].nextFuncIndex];
        const fpNext1 = nextFuncList[lines[1].nextFuncIndex];
        const fpNext2 = nextFuncList[lines[2].nextFuncIndex];

        const yRange= {
            min: lines[0].H,
            max: -1
        };

        for (let x = lines[1].x0; x <= lines[1].x1; x++) {
            yRange.min = lines[0].H; yRange.max = -1;
            fpNext0(x, lines[0], yRange);
            fpNext1(x, lines[1], yRange);
            fillRect(img, x, yRange.min, 1, yRange.max - yRange.min + 1, c);
        }

        fpNext2(lines[2].x0, lines[2], yRange);

        for (let x = lines[2].x0 + 1; x <= lines[2].x1; x++) {
            yRange.min = lines[0].H; yRange.max = -1;
            fpNext0(x, lines[0], yRange);
            fpNext2(x, lines[2], yRange);
            fillRect(img, x, yRange.min, 1, yRange.max - yRange.min + 1, c);
        }
    }

    export function _fillTriangle(img: RefImage, args: RefCollection) {
        fillTriangle(
            img,
            args.getAt(0) | 0,
            args.getAt(1) | 0,
            args.getAt(2) | 0,
            args.getAt(3) | 0,
            args.getAt(4) | 0,
            args.getAt(5) | 0,
            args.getAt(6) | 0,
        );
    }

    export function fillPolygon4(img: RefImage, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, c: number) {
        const lines: LineGenState[]= [
            (x0 < x1) ? initYRangeGenerator(x0, y0, x1, y1) : initYRangeGenerator(x1, y1, x0, y0),
            (x1 < x2) ? initYRangeGenerator(x1, y1, x2, y2) : initYRangeGenerator(x2, y2, x1, y1),
            (x2 < x3) ? initYRangeGenerator(x2, y2, x3, y3) : initYRangeGenerator(x3, y3, x2, y2),
            (x0 < x3) ? initYRangeGenerator(x0, y0, x3, y3) : initYRangeGenerator(x3, y3, x0, y0)
        ];

        lines[0].W = lines[1].W = lines[2].W = lines[3].W = width(img);
        lines[0].H = lines[1].H = lines[2].H = lines[3].H = height(img);

        let minX = Math.min(Math.min(x0, x1), Math.min(x2, x3));
        let maxX = Math.min(Math.max(Math.max(x0, x1), Math.max(x2, x3)), lines[0].W - 1);

        type FP_NEXT = (x: number, line: LineGenState, yRange: ValueRange) => void;
        const nextFuncList: FP_NEXT[] = [
            nextYRange_Low,
            nextYRange_HighUp,
            nextYRange_HighDown
        ];

        const fpNext0 = nextFuncList[lines[0].nextFuncIndex];
        const fpNext1 = nextFuncList[lines[1].nextFuncIndex];
        const fpNext2 = nextFuncList[lines[2].nextFuncIndex];
        const fpNext3 = nextFuncList[lines[3].nextFuncIndex];

        const yRange: ValueRange = {
            min: lines[0].H,
            max: -1
        };

        for (let x = minX; x <= maxX; x++) {
            yRange.min = lines[0].H; yRange.max = -1;
            fpNext0(x, lines[0], yRange);
            fpNext1(x, lines[1], yRange);
            fpNext2(x, lines[2], yRange);
            fpNext3(x, lines[3], yRange);
            fillRect(img, x,yRange.min, 1, yRange.max - yRange.min + 1, c);
        }
    }

    export function _fillPolygon4(img: RefImage, args: RefCollection) {
        fillPolygon4(
            img,
            args.getAt(0) | 0,
            args.getAt(1) | 0,
            args.getAt(2) | 0,
            args.getAt(3) | 0,
            args.getAt(4) | 0,
            args.getAt(5) | 0,
            args.getAt(6) | 0,
            args.getAt(7) | 0,
            args.getAt(8) | 0,
        );
    }

    export function _blitRow(img: RefImage, xy: number, from: RefImage, xh: number) {
        blitRow(img, XX(xy), YY(xy), from, XX(xh), YY(xh))
    }

    export function blitRow(img: RefImage, x: number, y: number, from: RefImage, fromX: number, fromH: number) {
        x |= 0
        y |= 0
        fromX |= 0
        fromH |= 0
        if (!img.inRange(x, 0) || !img.inRange(fromX, 0) || fromH <= 0)
            return
        let fy = 0
        let stepFY = ((from._width << 16) / fromH) | 0
        let endY = y + fromH
        if (endY > img._height)
            endY = img._height
        if (y < 0) {
            fy += -y * stepFY
            y = 0
        }
        while (y < endY) {
            img.data[img.pix(x, y)] = from.data[from.pix(fromX, fy >> 16)]
            y++
            fy += stepFY
        }
    }

    export function _blit(img: RefImage, src: RefImage, args: RefCollection): boolean {
        return blit(img, src, args);
    }

    export function blit(dst: RefImage, src: RefImage, args: RefCollection): boolean {
        const xDst = args.getAt(0) as number;
        const yDst = args.getAt(1) as number;
        const wDst = args.getAt(2) as number;
        const hDst = args.getAt(3) as number;
        const xSrc = args.getAt(4) as number;
        const ySrc = args.getAt(5) as number;
        const wSrc = args.getAt(6) as number;
        const hSrc = args.getAt(7) as number;
        const transparent = args.getAt(8) as number;
        const check = args.getAt(9) as number;

        const xSrcStep = ((wSrc << 16) / wDst) | 0;
        const ySrcStep = ((hSrc << 16) / hDst) | 0;

        const xDstClip = Math.abs(Math.min(0, xDst));
        const yDstClip = Math.abs(Math.min(0, yDst));
        const xDstStart = xDst + xDstClip;
        const yDstStart = yDst + yDstClip;
        const xDstEnd = Math.min(dst._width, xDst + wDst);
        const yDstEnd = Math.min(dst._height, yDst + hDst);

        const xSrcStart = Math.max(0, (xSrc << 16) + xDstClip * xSrcStep);
        const ySrcStart = Math.max(0, (ySrc << 16) + yDstClip * ySrcStep);
        const xSrcEnd = Math.min(src._width, xSrc + wSrc) << 16;
        const ySrcEnd = Math.min(src._height, ySrc + hSrc) << 16;

        if (!check)
            dst.makeWritable();

        for (let yDstCur = yDstStart, ySrcCur = ySrcStart; yDstCur < yDstEnd && ySrcCur < ySrcEnd; ++yDstCur, ySrcCur += ySrcStep) {
            const ySrcCurI = ySrcCur >> 16;
            for (let xDstCur = xDstStart, xSrcCur = xSrcStart; xDstCur < xDstEnd && xSrcCur < xSrcEnd; ++xDstCur, xSrcCur += xSrcStep) {
                const xSrcCurI = xSrcCur >> 16;
                const cSrc = getPixel(src, xSrcCurI, ySrcCurI);
                if (check && cSrc) {
                    const cDst = getPixel(dst, xDstCur, yDstCur);
                    if (cDst) {
                        return true;
                    }
                    continue;
                }
                if (!transparent || cSrc) {
                    setPixel(dst, xDstCur, yDstCur, cSrc);
                }
            }
        }
        return false;
    }
}


namespace pxsim.bitmap {
    export function byteHeight(h: number, bpp: number) {
        if (bpp == 1)
            return h * bpp + 7 >> 3
        else
            return ((h * bpp + 31) >> 5) << 2
    }

    function isLegacyImage(buf: RefBuffer) {
        if (!buf || buf.data.length < 5)
            return false;

        if (buf.data[0] != 0xe1 && buf.data[0] != 0xe4)
            return false;

        const bpp = buf.data[0] & 0xf;
        const sz = buf.data[1] * byteHeight(buf.data[2], bpp)
        if (4 + sz != buf.data.length)
            return false;

        return true;
    }

    export function bufW(data: Uint8Array) {
        return data[2] | (data[3] << 8)
    }

    export function bufH(data: Uint8Array) {
        return data[4] | (data[5] << 8)
    }

    export function isValidImage(buf: RefBuffer) {
        if (!buf || buf.data.length < 5)
            return false;

        if (buf.data[0] != 0x87)
            return false

        if (buf.data[1] != 1 && buf.data[1] != 4)
            return false;

        const bpp = buf.data[1];
        const sz = bufW(buf.data) * byteHeight(bufH(buf.data), bpp)
        if (8 + sz != buf.data.length)
            return false;

        return true;
    }


    export function create(w: number, h: number) {
        // truncate decimal sizes
        w |= 0
        h |= 0
        return new RefImage(w, h, 4)
    }

    // TODO: move to image namespace
    export function ofBuffer(buf: RefBuffer): RefImage {
        const src: Uint8Array = buf.data

        let srcP = 4
        let w = 0, h = 0, bpp = 0

        if (isLegacyImage(buf)) {
            w = src[1]
            h = src[2]
            bpp = src[0] & 0xf;
            // console.log("using legacy image")
        } else if (isValidImage(buf)) {
            srcP = 8
            w = bufW(src)
            h = bufH(src)
            bpp = src[1]
        }

        if (w == 0 || h == 0)
            return null
        const r = new RefImage(w, h, bpp)
        const dst = r.data

        r.isStatic = buf.isStatic

        if (bpp == 1) {
            for (let i = 0; i < w; ++i) {
                let dstP = i
                let mask = 0x01
                let v = src[srcP++]
                for (let j = 0; j < h; ++j) {
                    if (mask == 0x100) {
                        mask = 0x01
                        v = src[srcP++]
                    }
                    if (v & mask)
                        dst[dstP] = 1
                    dstP += w
                    mask <<= 1
                }
            }
        } else if (bpp == 4) {
            for (let i = 0; i < w; ++i) {
                let dstP = i
                for (let j = 0; j < h >> 1; ++j) {
                    const v = src[srcP++]
                    dst[dstP] = v & 0xf
                    dstP += w
                    dst[dstP] = v >> 4
                    dstP += w
                }
                if (h & 1)
                    dst[dstP] = src[srcP++] & 0xf
                srcP = (srcP + 3) & ~3
            }
        }

        return r
    }

    export function toBuffer(img: RefImage): RefBuffer {
        let col = byteHeight(img._height, img._bpp)
        let sz = 8 + img._width * col
        let r = new Uint8Array(sz)
        r[0] = 0x87
        r[1] = img._bpp
        r[2] = img._width & 0xff
        r[3] = img._width >> 8
        r[4] = img._height & 0xff
        r[5] = img._height >> 8
        let dstP = 8
        const w = img._width
        const h = img._height
        const data = img.data
        for (let i = 0; i < w; ++i) {
            if (img._bpp == 4) {
                let p = i
                for (let j = 0; j < h; j += 2) {
                    r[dstP++] = ((data[p + w] & 0xf) << 4) | ((data[p] || 0) & 0xf)
                    p += 2 * w
                }
                dstP = (dstP + 3) & ~3
            } else if (img._bpp == 1) {
                let mask = 0x01
                let p = i
                for (let j = 0; j < h; j++) {
                    if (data[p])
                        r[dstP] |= mask
                    mask <<= 1
                    p += w
                    if (mask == 0x100) {
                        mask = 0x01
                        dstP++
                    }
                }
                if (mask != 0x01)
                    dstP++
            }
        }

        return new RefBuffer(r)
    }

    export function doubledIcon(buf: RefBuffer): RefBuffer {
        let img = ofBuffer(buf)
        if (!img)
            return null
        img = BitmapMethods.doubled(img)
        return toBuffer(img)
    }
}
