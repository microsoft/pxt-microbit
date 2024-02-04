namespace microcode {

    export interface IComponent {
        update: () => void
        draw: () => void
    }

    export interface IPlaceable {
        xfrm: Affine
    }

    export interface ISizable {
        width: number
        height: number
    }

    export class Placeable implements IPlaceable {
        private xfrm_: Affine
        //% blockCombine block="xfrm" callInDebugger
        public get xfrm() {
            return this.xfrm_
        }
        constructor(parent?: IPlaceable) {
            this.xfrm_ = new Affine()
            this.xfrm_.parent = parent && parent.xfrm
        }
    }
}
