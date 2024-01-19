namespace pxsim {
    function htmlColorToUint32(hexColor: string) {
        const ca = new Uint8ClampedArray(4)
        const v = parseInt(hexColor.replace(/#/, ""), 16)
        ca[0] = (v >> 16) & 0xff;
        ca[1] = (v >> 8) & 0xff;
        ca[2] = (v >> 0) & 0xff;
        ca[3] = 0xff; // alpha
        // convert to uint32 using target endian
        return new Uint32Array(ca.buffer)[0]
    }

    function UInt32ToRGB(col: number): number[] {
        const ui = new Uint32Array(1);
        ui[0] = col;
        const ca = new Uint8ClampedArray(ui.buffer);
        return [ca[0], ca[1], ca[2]];
    }

    export class ScreenState {
        width = 0
        height = 0
        screen: Uint32Array
        palette: Uint32Array
        lastImage: RefImage
        lastImageFlushTime = 0
        changed = true
        stats: string;
        brightness = 255;
        onChange = () => { }

        constructor(paletteSrc: string[], w = 0, h = 0) {
            if (!paletteSrc) paletteSrc = ["#000000", "#ffffff"]
            this.palette = new Uint32Array(paletteSrc.length);
            this.setPaletteFromHtmlColors(paletteSrc);
            if (w) {
                this.width = w
                this.height = h
                this.screen = new Uint32Array(this.width * this.height)
                this.screen.fill(this.palette[0])
            }
        }

        setScreenBrightness(b: number) {
            this.brightness = b | 0;
        }

        paletteToUint8Array() {
            const out = new Uint8Array(this.palette.length * 3);
            for (let i = 0; i < this.palette.length; ++i) {
                const [r, g, b] = UInt32ToRGB(this.palette[i]);
                const s = 3 * i;
                out[s] = r;
                out[s + 1] = g;
                out[s + 2] = b;
            }
            return out;
        }

        setPaletteFromHtmlColors(src: string[]) {
            for (let i = 0; i < this.palette.length; ++i) {
                this.palette[i] = htmlColorToUint32(src[i])
            }
        }

        setPalette(buf: RefBuffer) {
            const ca = new Uint8ClampedArray(4)
            const rd = new Uint32Array(ca.buffer)
            const src = buf.data as Uint8Array
            if (48 != src.length)
                pxsim.pxtrt.panic(pxsim.PXT_PANIC.PANIC_SCREEN_ERROR);

            this.palette = new Uint32Array((src.length / 3) | 0)
            for (let i = 0; i < this.palette.length; ++i) {
                const p = i * 3
                ca[0] = src[p + 0]
                ca[1] = src[p + 1]
                ca[2] = src[p + 2]
                ca[3] = 0xff // alpha
                // convert to uint32 using target endian
                this.palette[i] = rd[0]
            }
        }

        bpp() {
            return this.palette.length > 2 ? 4 : 1
        }

        didChange() {
            let res = this.changed
            this.changed = false
            return res
        }

        maybeForceUpdate() {
            if (Date.now() - this.lastImageFlushTime > 200) {
                this.showImage(null)
            }
        }

        showImage(img: RefImage) {
            runtime.startPerfCounter(0)
            if (!img)
                img = this.lastImage

            if (!img)
                return

            if (this.width == 0) {
                this.width = img._width
                this.height = img._height

                this.screen = new Uint32Array(this.width * this.height)
            }

            this.lastImageFlushTime = Date.now()
            this.lastImage = img
            this.changed = true

            const src = img.data
            const dst = this.screen
            if (this.width != img._width || this.height != img._height || src.length != dst.length)
                U.userError("wrong size")
            const p = this.palette
            const mask = p.length - 1
            for (let i = 0; i < src.length; ++i) {
                dst[i] = p[src[i] & mask]
            }

            this.onChange()
            runtime.stopPerfCounter(0)
        }

        updateStats(stats: string) {
            this.stats = stats;
            const b = (board() as any);
            if (b && b.updateStats) {
                b.updateStats();
            }
        }

        bindToSvgImage(lcd: SVGImageElement) {
            const screenCanvas = document.createElement("canvas");
            screenCanvas.width = this.width
            screenCanvas.height = this.height

            const ctx = screenCanvas.getContext("2d")
            ctx.imageSmoothingEnabled = false
            const imgdata = ctx.getImageData(0, 0, this.width, this.height)
            const arr = new Uint32Array(imgdata.data.buffer)

            const flush = function () {
                requested = false
                ctx.putImageData(imgdata, 0, 0)
                lcd.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", screenCanvas.toDataURL());
            }

            let requested = false;
            this.onChange = () => {
                arr.set(this.screen)
                // paint rect
                runtime.queueDisplayUpdate();
                if (!requested) {
                    requested = true
                    window.requestAnimationFrame(flush)
                }
            }
        }

        setupScreenStatusBar(barHeight: number) {
            // TODO
        }
        updateScreenStatusBar(img: RefImage) {
            // TODO
        }
    }

    export interface ScreenBoard extends CommonBoard {
        screenState: ScreenState;
    }

    export function getScreenState() {
        return (board() as ScreenBoard).screenState
    }
}