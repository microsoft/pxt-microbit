namespace microcode {
    export class Sprite implements IComponent, IPlaceable, ISizable {
        private xfrm_: Affine
        image: SImage
        invisible: boolean

        public get xfrm() {
            return this.xfrm_
        }
        public get width() {
            return this.image.width
        }
        public get height() {
            return this.image.height
        }
        public get hitbox() {
            return Bounds.FromSprite(this)
        }

        public get bounds() {
            let b = new Bounds({
                left: 0,
                top: 0,
                width: this.width,
                height: this.height,
            })
            return b.translate(
                new Vec2(-(this.width >> 1), -(this.height >> 1))
            )
        }

        constructor(opts: { parent?: IPlaceable; img: SImage }) {
            this.xfrm_ = new Affine()
            this.xfrm_.parent = opts.parent && opts.parent.xfrm
            this.image = opts.img
        }

        update() { }

        public setImage(img: SImage) {
            this.image = img
        }

        public bindXfrm(xfrm: Affine) {
            this.xfrm_ = xfrm
        }

        public occlusions(bounds: Bounds) {
            return Occlusions.FromSprite(this, bounds)
        }

        public isOffScreenX(): boolean {
            const p = this.xfrm.worldPos
            return (
                p.x + (this.width >> 1) < Screen.LEFT_EDGE ||
                p.x - (this.width >> 1) > Screen.RIGHT_EDGE
            )
        }
        draw() {
            if (this.invisible) {
                return
            }
            Screen.drawTransparentImageXfrm(
                this.xfrm,
                this.image,
                -(this.image.width >> 1),
                -(this.image.height >> 1)
            )
        }
    }

    const _pos: Vec2 = new Vec2(0, 0)
}
