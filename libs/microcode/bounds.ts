namespace microcode {
    export class Bounds {
        public width: number
        public height: number
        public left: number
        public top: number
        //% blockCombine block="right" callInDebugger
        public get right() {
            return this.left + this.width - 1
        }
        public set right(val: number) {
            this.width = val - this.left + 1
        }
        //% blockCombine block="bottom" callInDebugger
        public get bottom() {
            return this.top + this.height - 1
        }
        public set bottom(val: number) {
            this.height = val - this.top + 1
        }
        public get topLeft() {
            return new Vec2(this.left, this.top)
        }
        public get topRight() {
            return new Vec2(this.right, this.top)
        }
        public get bottomLeft() {
            return new Vec2(this.left, this.bottom)
        }
        public get bottomRight() {
            return new Vec2(this.right, this.bottom)
        }

        constructor(opts?: {
            width: number
            height: number
            left: number
            top: number
        }) {
            opts = opts || { width: 0, height: 0, left: 0, top: 0 }
            this.width = opts.width
            this.height = opts.height
            this.left = opts.left
            this.top = opts.top
        }

        public clone(): Bounds {
            return new Bounds({
                left: this.left,
                top: this.top,
                width: this.width,
                height: this.height,
            })
        }

        public copyFrom(other: Bounds) {
            this.left = other.left
            this.top = other.top
            this.width = other.width
            this.height = other.height
        }

        public set(x: number, y: number, w: number, h: number) {
            this.left = x
            this.top = y
            this.width = w
            this.height = h
        }

        public static Grow(box: Bounds, amount = 1): Bounds {
            const b = box.clone()
            b.grow(amount)
            return b
        }

        public static GrowXY(box: Bounds, x: number, y: number): Bounds {
            const b = box.clone()
            b.growxy(x, y)
            return b
        }

        public grow(amount = 1): this {
            this.top -= amount
            this.left -= amount
            this.width += amount * 2
            this.height += amount * 2
            return this
        }

        public growxy(x: number, y: number): this {
            this.top -= x
            this.left -= y
            this.width += x * 2
            this.height += y * 2
            return this
        }

        public static Translate(box: Bounds, p: Vec2): Bounds {
            return new Bounds({
                left: box.left + p.x,
                top: box.top + p.y,
                width: box.width,
                height: box.height,
            })
        }

        public translate(p: Vec2): this {
            this.left += p.x
            this.top += p.y
            return this
        }

        public static Intersects(a: Bounds, b: Bounds): boolean {
            if (b.contains(a.topLeft)) {
                return true
            }
            if (b.contains(a.topRight)) {
                return true
            }
            if (b.contains(a.bottomLeft)) {
                return true
            }
            if (b.contains(a.bottomRight)) {
                return true
            }
            if (a.contains(b.topLeft)) {
                return true
            }
            if (a.contains(b.topRight)) {
                return true
            }
            if (a.contains(b.bottomLeft)) {
                return true
            }
            if (a.contains(b.bottomRight)) {
                return true
            }
            return false
        }

        public contains(p: Vec2): boolean {
            return (
                p.x >= this.left &&
                p.x <= this.right &&
                p.y >= this.top &&
                p.y <= this.bottom
            )
        }

        public add(other: Bounds): this {
            this.left = Math.min(this.left, other.left)
            this.top = Math.min(this.top, other.top)
            this.right = Math.max(this.right, other.right)
            this.bottom = Math.max(this.bottom, other.bottom)
            return this
        }

        public static FromImage(i: SImage): Bounds {
            let left = i.width
            let top = i.height
            let right = 0
            let bottom = 0

            for (let c = 0; c < i.width; c++) {
                for (let r = 0; r < i.height; r++) {
                    if (i.getPixel(c, r)) {
                        left = Math.min(left, c)
                        top = Math.min(top, r)
                        right = Math.max(right, c)
                        bottom = Math.max(bottom, r)
                    }
                }
            }

            const width = right - left
            const height = bottom - top

            return new Bounds({ width, height, left, top })
        }

        public static FromSprite(k: Sprite): Bounds {
            return Bounds.FromImage(k.image)
                .translate(new Vec2(-(k.width >> 1), -(k.height >> 1)))
                .translate(k.xfrm.worldPos)
        }

        public drawRect(color: number) {
            const top = this.top
            const left = this.left
            const right = this.right
            const bottom = this.bottom
            Screen.drawLine(left, top, right, top, color)
            Screen.drawLine(left, bottom, right, bottom, color)
            Screen.drawLine(left, top, left, bottom, color)
            Screen.drawLine(right, top, right, bottom, color)
        }

        public fillRect(color: number) {
            Screen.fillRect(this.left, this.top, this.width, this.height, color)
        }

        public toString() {
            return `Bounds(l:${this.left},t:${this.top},w:${this.width},h:${this.height},r:${this.right},b:${this.bottom})`
        }
    }

    export class Occlusions {
        public get has(): boolean {
            return !!this.left || !!this.top || !!this.right || !!this.bottom
        }

        constructor(
            public left: number,
            public top: number,
            public right: number,
            public bottom: number
        ) {}

        public static FromSprite(s: Sprite, bounds: Bounds): Occlusions {
            const w = s.xfrm.worldPos
            const left = w.x - (s.width >> 1)
            const top = w.y - (s.height >> 1)
            const right = w.x + (s.width >> 1)
            const bottom = w.y + (s.height >> 1)
            return new Occlusions(
                bounds.left > left ? bounds.left - left : 0,
                bounds.top > top ? bounds.top - top : 0,
                bounds.right < right ? right - bounds.right : 0,
                bounds.bottom < bottom ? bottom - bounds.bottom : 0
            )
        }
    }
}
