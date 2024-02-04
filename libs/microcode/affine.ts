namespace microcode {
    /**
     * An Affine represents a euclidean transformation on a Vec2.
     * At the moment this class only supports translation, but if needed it could easily include:
     * - Rotation
     * - Scaling
     * - Skew (less common)
     * Affine transformations can be chained thru the `parent` property, in which case `worldPos` will report the composed value.
     */
    export class Affine {
        private localPos_: Vec2
        private parent_: Affine

        //% blockCombine block="worldPos" callInDebugger
        public get worldPos() {
            return this.computeWorldPos()
        }

        //% blockCombine block="localPos" callInDebugger
        public get localPos(): Vec2 {
            return this.localPos_
        }
        public set localPos(v: Vec2) {
            this.localPos_.copyFrom(v)
        }

        //% blockCombine block="parent" callInDebugger
        public get parent() {
            return this.parent_
        }
        public set parent(p: Affine) {
            this.parent_ = p
        }

        //% blockCombine block="root" callInDebugger
        public get root() {
            let node = this.parent
            while (node && node.parent) {
                node = node.parent
            }
            return node
        }

        constructor() {
            this.localPos_ = new Vec2()
        }

        public copyFrom(src: Affine): this {
            this.localPos.copyFrom(src.localPos)
            return this
        }

        public clone(): Affine {
            const aff = new Affine()
            aff.copyFrom(this)
            return aff
        }

        private computeWorldPos(): Vec2 {
            const pos = new Vec2()
            pos.copyFrom(this.localPos_)
            let parent = this.parent_
            while (parent) {
                Vec2.TranslateToRef(pos, parent.localPos, pos)
                parent = parent.parent
            }
            return pos
        }

        public transformToRef(v: Vec2, ref: Vec2): Vec2 {
            return Vec2.TranslateToRef(v, this.worldPos, ref)
        }
    }
}
