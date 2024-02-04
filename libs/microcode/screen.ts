namespace microcode {
    export class Screen {
        private static image_: SImage

        public static WIDTH = screen.width
        public static HEIGHT = screen.height
        public static HALF_WIDTH = screen.width >> 1
        public static HALF_HEIGHT = screen.height >> 1
        public static LEFT_EDGE = -Screen.HALF_WIDTH
        public static RIGHT_EDGE = Screen.HALF_WIDTH
        public static TOP_EDGE = -Screen.HALF_HEIGHT
        public static BOTTOM_EDGE = Screen.HALF_HEIGHT
        public static BOUNDS = new Bounds({
            left: Screen.LEFT_EDGE,
            top: Screen.TOP_EDGE,
            width: Screen.WIDTH,
            height: Screen.HEIGHT,
        })

        private static updateBounds() {
            Screen.WIDTH = Screen.image_.width
            Screen.HEIGHT = Screen.image_.height
            Screen.HALF_WIDTH = Screen.WIDTH >> 1
            Screen.HALF_HEIGHT = Screen.HEIGHT >> 1
            Screen.LEFT_EDGE = -Screen.HALF_WIDTH
            Screen.RIGHT_EDGE = Screen.HALF_WIDTH
            Screen.TOP_EDGE = -Screen.HALF_HEIGHT
            Screen.BOTTOM_EDGE = Screen.HALF_HEIGHT
            Screen.BOUNDS = new Bounds({
                left: Screen.LEFT_EDGE,
                top: Screen.TOP_EDGE,
                width: Screen.WIDTH,
                height: Screen.HEIGHT,
            })
        }

        public static x(v: number) {
            return v + Screen.HALF_WIDTH
        }
        public static y(v: number) {
            return v + Screen.HALF_HEIGHT
        }
        public static pos(v: Vec2) {
            return new Vec2(Screen.x(v.x), Screen.y(v.y))
        }
        public static get image(): SImage {
            if (!Screen.image_) {
                Screen.image_ = screen
                Screen.updateBounds()
            }
            return Screen.image_
        }
        public static resetScreenImage() {
            Screen.image_ = screen
            Screen.updateBounds()
        }

        public static setImageSize(width: number, height: number) {
            Screen.image_ = image.create(width, height)
            Screen.updateBounds()
        }

        public static drawTransparentImage(from: SImage, x: number, y: number) {
            Screen.image.drawTransparentImage(from, Screen.x(x), Screen.y(y))
        }

        public static drawTransparentImageXfrm(
            xfrm: Affine,
            from: SImage,
            x: number,
            y: number
        ) {
            const w = xfrm.worldPos
            Screen.image.drawTransparentImage(
                from,
                Screen.x(x + w.x),
                Screen.y(y + w.y)
            )
        }

        public static drawLine(
            x0: number,
            y0: number,
            x1: number,
            y1: number,
            c: number
        ) {
            control.assert(c !== 0, "ERROR_NOT_INTEGER")
            Screen.image.drawLine(
                Screen.x(x0),
                Screen.y(y0),
                Screen.x(x1),
                Screen.y(y1),
                c
            )
        }

        public static drawLineXfrm(
            xfrm: Affine,
            x0: number,
            y0: number,
            x1: number,
            y1: number,
            c: number
        ) {
            control.assert(c !== 0, "ERROR_NOT_INTEGER")
            const w = xfrm.worldPos
            Screen.drawLine(x0 + w.x, y0 + w.y, x1 + w.x, y1 + w.y, c)
        }

        public static drawLineShaded(
            x0: number,
            y0: number,
            x1: number,
            y1: number,
            shader: (x: number, y: number) => number
        ) {
            let sx0 = Screen.x(x0)
            let sy0 = Screen.y(y0)
            let sx1 = Screen.x(x1)
            let sy1 = Screen.y(y1)

            for (let x = sx0, tx = x0; x <= sx1; x++, tx++) {
                for (let y = sy0, ty = y0; y <= sy1; y++, ty++) {
                    const c = shader(tx, ty)
                    if (c) {
                        Screen.image.setPixel(x, y, c)
                    }
                }
            }
        }

        public static drawRect(
            x: number,
            y: number,
            width: number,
            height: number,
            c: number
        ) {
            control.assert(c !== 0, "ERROR_NOT_INTEGER")
            Screen.image.drawRect(Screen.x(x), Screen.y(y), width, height, c)
        }

        public static drawRectXfrm(
            xfrm: Affine,
            x: number,
            y: number,
            width: number,
            height: number,
            c: number
        ) {
            control.assert(c !== 0, "ERROR_NOT_INTEGER")
            const w = xfrm.worldPos
            Screen.drawRect(x + w.x, y + w.y, width, height, c)
        }

        public static fillRect(
            x: number,
            y: number,
            width: number,
            height: number,
            c: number
        ) {
            control.assert(c !== 0, "ERROR_NOT_INTEGER")
            Screen.image.fillRect(Screen.x(x), Screen.y(y), width, height, c)
        }

        public static fillRectXfrm(
            xfrm: Affine,
            x: number,
            y: number,
            width: number,
            height: number,
            c: number
        ) {
            control.assert(c !== 0, "ERROR_NOT_INTEGER")
            const w = xfrm.worldPos
            Screen.fillRect(x + w.x, y + w.y, width, height, c)
        }

        public static fillBoundsXfrm(xfrm: Affine, bounds: Bounds, c: number) {
            control.assert(c !== 0, "ERROR_NOT_INTEGER")
            Screen.fillRectXfrm(
                xfrm,
                bounds.left,
                bounds.top,
                bounds.width,
                bounds.height,
                c
            )
        }

        public static drawBoundsXfrm(xfrm: Affine, bounds: Bounds, c: number) {
            control.assert(c !== 0, "ERROR_NOT_INTEGER")
            Screen.drawRectXfrm(
                xfrm,
                bounds.left,
                bounds.top,
                bounds.width,
                bounds.height,
                c
            )
        }

        // Draws a rounded outline rectangle of the bounds.
        public static outlineBoundsXfrm(
            xfrm: Affine,
            bounds: Bounds,
            dist: number,
            c: number
        ) {
            if (!c) return

            const w = xfrm.worldPos
            const left = bounds.left + w.x
            const top = bounds.top + w.y
            const right = bounds.right + w.x
            const bottom = bounds.bottom + w.y

            // Left
            Screen.drawLine(left - dist, top, left - dist, bottom, c)
            // Right
            Screen.drawLine(right + dist, top, right + dist, bottom, c)
            // Top
            Screen.drawLine(left, top - dist, right, top - dist, c)
            // Bottom
            Screen.drawLine(left, bottom + dist, right, bottom + dist, c)

            // Connect corners
            if (dist > 1) {
                // Left-Top
                Screen.drawLine(left - dist, top, left, top - dist, c)
                // Right-Top
                Screen.drawLine(right + dist, top, right, top - dist, c)
                // Left-Bottom
                Screen.drawLine(left - dist, bottom, left, bottom + dist, c)
                // Right-Bottom
                Screen.drawLine(right + dist, bottom, right, bottom + dist, c)
            }
        }

        // Draws a rounded outline rectangle of the bounds.
        public static outlineBoundsXfrm4(
            xfrm: Affine,
            bounds: Bounds,
            dist: number,
            colors: { top: number; left: number; right: number; bottom: number }
        ) {
            // no borders!
            if (!colors.top && !colors.left && !colors.right && !colors.bottom)
                return

            const w = xfrm.worldPos
            const left = bounds.left + w.x
            const top = bounds.top + w.y
            const right = bounds.right + w.x
            const bottom = bounds.bottom + w.y

            // Left
            if (colors.left)
                Screen.drawLine(
                    left - dist,
                    top,
                    left - dist,
                    bottom,
                    colors.left
                )
            // Right
            if (colors.right)
                Screen.drawLine(
                    right + dist,
                    top,
                    right + dist,
                    bottom,
                    colors.right
                )
            // Top
            if (colors.top)
                Screen.drawLine(left, top - dist, right, top - dist, colors.top)
            // Bottom
            if (colors.bottom)
                Screen.drawLine(
                    left,
                    bottom + dist,
                    right,
                    bottom + dist,
                    colors.bottom
                )

            // Connect corners
            if (dist > 1) {
                // Left-Top
                if (colors.left)
                    Screen.drawLine(
                        left - dist,
                        top,
                        left,
                        top - dist,
                        colors.left
                    )
                // Right-Top
                if (colors.right)
                    Screen.drawLine(
                        right + dist,
                        top,
                        right,
                        top - dist,
                        colors.right
                    )
                // Left-Bottom
                if (colors.left)
                    Screen.drawLine(
                        left - dist,
                        bottom,
                        left,
                        bottom + dist,
                        colors.left
                    )
                // Right-Bottom
                if (colors.right)
                    Screen.drawLine(
                        right + dist,
                        bottom,
                        right,
                        bottom + dist,
                        colors.right
                    )
            }
        }

        public static setPixel(x: number, y: number, c: number) {
            if (c) {
                Screen.image.setPixel(Screen.x(x), Screen.y(y), c)
            }
        }

        public static setPixelXfrm(
            xfrm: Affine,
            x: number,
            y: number,
            c: number
        ) {
            control.assert(c !== 0, "ERROR_NOT_INTEGER")
            const w = xfrm.worldPos
            Screen.setPixel(x + w.x, y + w.y, c)
        }

        public static print(
            text: string,
            x: number,
            y: number,
            color?: number,
            font?: simage.Font,
            offsets?: texteffects.TextEffectState[]
        ) {
            control.assert(color !== 0, "ERROR_NOT_INTEGER")
            Screen.image.print(
                text,
                Screen.x(x),
                Screen.y(y),
                color,
                font,
                offsets
            )
        }
    }
}
