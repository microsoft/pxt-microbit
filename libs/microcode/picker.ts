namespace microcode {
    // TODO: functionalize the Picker to reduce memory pressure
    // 1. a function to get image from col, row
    // 2. a function to set image from col, row
    // 2. the number of rows and columns (supported ragged)

    export type PickerButtonDef = {
        icon: string
        ariaId?: string
    }

    export interface IPicker {
        size: number
        getPickerButtonDef(index: number): PickerButtonDef
    }

    // the picker group only needs to access the PickerButtonDefs list,
    // which should be functionalized to reduce memory pressure, no
    // need for buttons here
    class PickerGroup {
        public xfrm: Affine
        public bounds: Bounds
        private cell: Bounds

        constructor(public picker: Picker, public defs: PickerButtonDef[]) {
            this.xfrm = new Affine()
            this.xfrm.parent = picker.xfrm
        }

        // TODO: on click

        public buttonHeight() {
            return this.cell.height
        }

        public getButtonAtIndex(idx: number): Button {
            const def = this.defs[idx]
            const btn = new Button({
                parent: this.picker,
                style: this.picker.style,
                icon: def.icon,
                ariaId: def.ariaId,
                x: 0,
                y: 0,
                onClick: () => {
                    this.picker.onButtonClicked(idx)
                },
            })
            btn.xfrm.parent = this.xfrm
            this.setButtonCoords(idx, btn)
            return btn
        }

        public getButtonAtScreen(x: number, y: number): Vec2 {
            const p = new Vec2(x, y)
            const b = Bounds.Translate(this.bounds, this.xfrm.worldPos)
            if (!b.contains(p)) return undefined
            const row = Math.idiv(y - b.top, this.cell.height)
            const col = Math.idiv(x - b.left, this.cell.width)
            return new Vec2(col, row)
        }

        public layout(maxPerRow: number) {
            // first compute bounds of biggest button
            this.cell = new Bounds()
            this.defs.forEach(def => {
                const btn = new ButtonBase(
                    0,
                    0,
                    this.picker.style,
                    this.picker.xfrm
                )
                btn.buildSprite(icons.get(def.icon))
                this.cell.add(btn.bounds)
            })
            this.layoutDraw()
        }

        private setButtonCoords(idx: number, btn: ButtonBase) {
            btn.buildSprite(icons.get(this.defs[idx].icon))
            const row = Math.idiv(idx, this.picker.width)
            btn.xfrm.localPos.x =
                (this.cell.width >> 1) +
                (idx % this.picker.width) * this.cell.width +
                (idx % this.picker.width)
            btn.xfrm.localPos.y = row * this.cell.height
        }

        private layoutDraw(draw: boolean = false) {
            // matrix layout of buttons
            this.bounds = new Bounds()
            this.defs.forEach((def, idx) => {
                const btn = new ButtonBase(0, 0, this.picker.style, this.xfrm)
                this.setButtonCoords(idx, btn)
                this.bounds.add(Bounds.Translate(btn.bounds, btn.xfrm.localPos))
                if (draw) btn.draw()
            })
        }
        public draw() {
            this.layoutDraw(true)
        }
    }

    export class Picker implements IPlaceable {
        public group: PickerGroup
        private start: number
        public navigator: PickerNavigator
        public visible: boolean
        public style: ButtonStyle
        public width: number

        private xfrm_: Affine
        private prevState: CursorState
        private deleteBtn: Button
        private panel: Bounds
        private onClick: (index: number) => void
        private onHide: () => void
        private onDelete: () => void
        private hideOnClick: boolean
        private title: string

        public get xfrm() {
            return this.xfrm_
        }

        constructor(private cursor: Cursor) {
            this.xfrm_ = new Affine()
            this.group = undefined
            this.navigator = new PickerNavigator(this)
        }

        public setGroup(defs: PickerButtonDef[]) {
            this.group = new PickerGroup(this, defs)
        }

        public onButtonClicked(index: number) {
            const onClick = this.onClick
            if (this.hideOnClick) {
                this.cursor.cancelHandlerStack.pop()
                this.hide()
            }
            if (onClick) {
                onClick(index)
            }
        }

        private cancelClicked() {
            this.cursor.cancelHandlerStack.pop()
            this.hide()
        }

        show(
            opts: {
                width?: number
                title?: string
                onClick?: (index: number) => void
                onHide?: () => void
                onDelete?: () => void
                navigator?: () => PickerNavigator
                selected?: number
                style?: ButtonStyle
            },
            hideOnClick: boolean = true
        ) {
            this.start = opts.selected ? opts.selected : -1
            this.onClick = opts.onClick
            this.onHide = opts.onHide
            this.onDelete = opts.onDelete
            if (opts.navigator) {
                this.navigator.clear()
                this.navigator = opts.navigator()
            } else {
                this.navigator.clear()
                this.navigator = new PickerNavigator(this)
            }
            this.hideOnClick = hideOnClick
            this.title = opts.title
            this.style = opts.style || ButtonStyles.LightShadowedWhite
            this.width = opts.width || 5
            this.prevState = this.cursor.saveState()
            this.cursor.navigator = this.navigator
            this.cursor.cancelHandlerStack.push(() => this.cancelClicked())
            if (this.onDelete) {
                this.deleteBtn = new Button({
                    parent: this,
                    style: ButtonStyles.RedBorderedWhite,
                    icon: "delete",
                    x: 0,
                    y: 0,
                    onClick: () => {
                        this.hide()
                        this.onDelete()
                    },
                })
            }
            this.layout(this.width)
            this.visible = true
        }

        hide() {
            this.visible = false
            this.navigator.clear()
            this.cursor.restoreState(this.prevState)
            this.deleteBtn = undefined
            this.group = undefined
            if (this.onHide) {
                this.onHide()
            }
        }

        draw() {
            control.enablePerfCounter()
            if (!this.visible) return
            Screen.fillBoundsXfrm(this.xfrm, this.panel, 12)
            Screen.outlineBoundsXfrm(this.xfrm, this.panel, 1, 15)
            if (this.title) {
                const w = this.xfrm.worldPos
                Screen.print(
                    this.title,
                    w.x + this.panel.left + 2,
                    w.y + this.panel.top + 4,
                    1,
                    microcode.font
                )
            }
            if (this.group) this.group.draw()
            if (this.deleteBtn) this.deleteBtn.draw()
        }

        private layout(maxPerRow: number) {
            this.panel = new Bounds()
            const padding = 2
            let top = padding
            if (this.deleteBtn || this.title) {
                top += this.deleteBtn ? this.deleteBtn.height : HEADER
            }
            if (this.deleteBtn) {
                this.navigator.addDelete(this.deleteBtn)
            }
            if (this.group) {
                const group = this.group
                group.layout(maxPerRow)
                top += group.buttonHeight() >> 1
                group.xfrm.localPos.y = top
                this.panel.add(Bounds.Translate(group.bounds, new Vec2(0, top)))
                top += group.bounds.height
            }

            if (this.deleteBtn) {
                this.deleteBtn.xfrm.localPos.x =
                    this.panel.right - (this.deleteBtn.width >> 1) + 1
                this.deleteBtn.xfrm.localPos.y =
                    this.panel.top + (this.deleteBtn.height >> 1)
            }

            this.panel.grow(padding)
            this.xfrm.localPos.x = padding - (this.panel.width >> 1)
            this.xfrm.localPos.y = padding - (this.panel.height >> 1)

            if (this.start < 0) this.start = 0
            const btn = this.navigator.moveToIndex(this.start)
            this.cursor.moveTo(btn.xfrm.worldPos, btn.ariaId, btn.bounds)
        }
    }

    const HEADER = 16
}
