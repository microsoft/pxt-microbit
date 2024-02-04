namespace microcode {
    export class Borders {
        constructor(
            public top: number,
            public bottom: number,
            public left: number,
            public right: number
        ) {}
    }

    export class ButtonStyle {
        constructor(
            public fill: number,
            public borders: Borders,
            public shadow: boolean
        ) {}
    }

    export namespace ButtonStyles {
        export const ShadowedWhite = new ButtonStyle(
            1,
            new Borders(1, 12, 1, 1),
            true
        )
        export const LightShadowedWhite = new ButtonStyle(
            1,
            new Borders(1, 11, 1, 1),
            true
        )
        export const FlatWhite = new ButtonStyle(
            1,
            new Borders(1, 1, 1, 1),
            false
        )
        /*
        export const RectangleWhite = new ButtonStyle(
            1,
            new Borders(0, 0, 0, 0),
            false
        )
        */
        export const BorderedPurple = new ButtonStyle(
            11,
            new Borders(12, 12, 12, 12),
            false
        )
        export const RedBorderedWhite = new ButtonStyle(
            1,
            new Borders(2, 2, 2, 2),
            false
        )
        export const Transparent = new ButtonStyle(
            0,
            new Borders(0, 0, 0, 0),
            false
        )
    }

    export function borderLeft(style: ButtonStyle) {
        return style.borders.left ? 1 : 0
    }

    export function borderTop(style: ButtonStyle) {
        return style.borders.top ? 1 : 0
    }

    export function borderRight(style: ButtonStyle) {
        return style.borders.right ? 1 : 0
    }

    export function borderBottom(style: ButtonStyle) {
        return style.borders.bottom ? 1 : 0
    }

    export function borderWidth(style: ButtonStyle) {
        return borderLeft(style) + borderRight(style)
    }

    export function borderHeight(style: ButtonStyle) {
        return borderTop(style) + borderBottom(style)
    }

    export class ButtonBase implements IComponent, ISizable, IPlaceable {
        public icon: Sprite
        private xfrm_: Affine
        private style: ButtonStyle

        constructor(x: number, y: number, style: ButtonStyle, parent: Affine) {
            this.xfrm_ = new Affine()
            this.xfrm.localPos.x = x
            this.xfrm.localPos.y = y
            this.style = style
            this.xfrm.parent = parent
        }

        public get xfrm() {
            return this.xfrm_
        }
        public get width() {
            return this.bounds.width
        }
        public get height() {
            return this.bounds.height
        }

        public get bounds() {
            // Returns bounds in local space
            return Bounds.GrowXY(
                this.icon.bounds,
                borderLeft(this.style),
                borderTop(this.style)
            )
        }

        public get rootXfrm(): Affine {
            let xfrm = this.xfrm
            while (xfrm.parent) {
                xfrm = xfrm.parent
            }
            return xfrm
        }

        public buildSprite(img: SImage) {
            this.icon = new Sprite({
                parent: this,
                img,
            })
            this.icon.xfrm.parent = this.xfrm
        }

        public getImage() {
            return this.icon.image
        }

        public occlusions(bounds: Bounds) {
            return this.icon.occlusions(bounds)
        }

        public setVisible(visible: boolean) {
            this.icon.invisible = !visible
            if (!visible) {
                this.hover(false)
            }
        }

        public visible() {
            return !this.icon.invisible
        }

        public hover(hov: boolean) {}
        public update() {}

        isOffScreenX(): boolean {
            return this.icon.isOffScreenX()
        }

        draw() {
            this.drawStyle()
            this.drawIcon()
        }

        private drawIcon() {
            this.icon.draw()
        }

        private drawStyle() {
            if (this.style.fill)
                Screen.fillBoundsXfrm(
                    this.xfrm,
                    this.icon.bounds,
                    this.style.fill
                )
            if (this.style.borders)
                Screen.outlineBoundsXfrm4(
                    this.xfrm,
                    this.icon.bounds,
                    1,
                    this.style.borders
                )
            if (this.style.shadow) {
                Screen.setPixelXfrm(
                    this.xfrm,
                    this.icon.bounds.left - 1,
                    this.icon.bounds.bottom,
                    this.style.borders.bottom
                )
                Screen.setPixelXfrm(
                    this.xfrm,
                    this.icon.bounds.right + 1,
                    this.icon.bounds.bottom,
                    this.style.borders.bottom
                )
            }
        }
    }

    export class Button extends ButtonBase {
        private iconId: string | SImage
        private _ariaId: string
        public onClick?: (button: Button) => void

        public get ariaId(): string {
            return (
                this._ariaId ||
                (typeof this.iconId === "string" ? <string>this.iconId : "")
            )
        }

        public set ariaId(value: string) {
            this._ariaId = value
        }

        reportAria(force = false) {
            const msg: accessibility.TileAccessibilityMessage = {
                type: "tile",
                value: this.ariaId,
                force,
            }
            accessibility.setLiveContent(msg)
        }

        constructor(opts: {
            parent?: IPlaceable
            style?: ButtonStyle
            icon: string | SImage
            ariaId?: string
            x: number
            y: number
            onClick?: (button: Button) => void
        }) {
            super(
                opts.x,
                opts.y,
                opts.style || ButtonStyles.Transparent,
                opts.parent && opts.parent.xfrm
            )
            this.iconId = opts.icon
            this._ariaId = opts.ariaId
            this.onClick = opts.onClick
            this.buildSprite(this.image_())
        }

        public getIcon() {
            return this.iconId
        }

        private image_() {
            return typeof this.iconId == "string"
                ? icons.get(this.iconId)
                : this.iconId
        }
        public setIcon(iconId: string, img?: SImage) {
            this.iconId = iconId
            if (img) this.icon.setImage(img)
            else this.buildSprite(this.image_())
        }

        public clickable() {
            return this.visible() && this.onClick != null
        }

        public click() {
            if (!this.visible()) {
                return
            }
            if (this.onClick) {
                this.onClick(this)
            }
        }
    }
}
