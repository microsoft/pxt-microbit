namespace microcode {
    export interface INavigator {
        clear: () => void
        addButtons: (btns: Button[]) => void
        move: (dir: CursorDir) => Button
        getCurrent: () => Button
        screenToButton: (x: number, y: number) => Button
        initialCursor: (row: number, col: number) => Button
        updateAria: () => void
    }

    export const BACK_BUTTON_ERROR_KIND = "back_button"
    export const FORWARD_BUTTON_ERROR_KIND = "forward_button"
    export class NavigationError {
        kind: string
        constructor(kind: string) {
            this.kind = kind
        }
    }

    // ragged rows of buttons
    export class RowNavigator implements INavigator {
        protected buttonGroups: Button[][]
        protected row: number
        protected col: number

        constructor() {
            this.buttonGroups = []
        }

        public clear() {
            this.buttonGroups = []
        }

        public getRow() {
            return this.row
        }

        public addButtons(btns: Button[]) {
            this.buttonGroups.push(btns)
        }

        public screenToButton(x: number, y: number): Button {
            const p = new Vec2(x, y)
            for (let row = 0; row < this.buttonGroups.length; row++) {
                const buttons = this.buttonGroups[row]
                const target = buttons.find(btn =>
                    Bounds.Translate(btn.bounds, btn.xfrm.worldPos).contains(p)
                )
                if (target) {
                    this.row = row
                    this.col = buttons.indexOf(target)
                    return target
                }
            }
            return undefined
        }

        public move(dir: CursorDir) {
            this.makeGood()
            switch (dir) {
                case CursorDir.Up: {
                    if (this.row == 0)
                        throw new NavigationError(BACK_BUTTON_ERROR_KIND)
                    this.row--
                    // because the column in new row may be out of bounds
                    this.makeGood()
                    break
                }

                case CursorDir.Down: {
                    if (this.row == this.buttonGroups.length - 1)
                        throw new NavigationError(FORWARD_BUTTON_ERROR_KIND)
                    this.row++
                    // because the column in new row may be out of bounds
                    this.makeGood()
                    break
                }

                case CursorDir.Left: {
                    if (this.col == 0) {
                        if (this.row > 0) {
                            this.row--
                        } else {
                            this.row = this.buttonGroups.length - 1
                        }
                        this.col = this.buttonGroups[this.row].length - 1
                    } else this.col--
                    break
                }

                case CursorDir.Right: {
                    if (this.col == this.buttonGroups[this.row].length - 1) {
                        if (this.row < this.buttonGroups.length - 1) {
                            this.row++
                        } else {
                            this.row = 0
                        }
                        this.col = -1
                    }
                    this.col++
                    break
                }

                case CursorDir.Back: {
                    if (this.col > 0) this.col = 0
                    else if (this.row > 0) this.row--
                    else return undefined
                    break
                }
            }
            const btn = this.buttonGroups[this.row][this.col]
            this.reportAria(btn)
            return btn
        }

        public updateAria() {
            this.reportAria(this.getCurrent())
        }

        protected reportAria(btn: Button) {
            if (btn) btn.reportAria(true)
        }

        public getCurrent(): Button {
            return this.buttonGroups[this.row][this.col]
        }

        protected makeGood() {
            if (this.row >= this.buttonGroups.length)
                this.row = this.buttonGroups.length - 1
            if (this.col >= this.buttonGroups[this.row].length)
                this.col = this.buttonGroups[this.row].length - 1
        }

        public initialCursor(row: number = 0, col: number = 0) {
            const rows = this.buttonGroups.length
            while (row < 0) row = (row + rows) % rows
            const cols = this.buttonGroups[row].length
            while (col < 0) col = (col + cols) % cols
            this.row = row
            this.col = col
            return this.buttonGroups[row][col]
        }
    }

    // this adds accessibility for rule
    export class RuleRowNavigator extends RowNavigator {
        private rules: RuleDefn[]

        constructor() {
            super()
            this.rules = []
        }

        /* overrides */
        public clear() {
            super.clear()
            this.rules = []
        }

        public addRule(rule: RuleDefn) {
            this.rules.push(rule)
        }

        public atRuleStart() {
            return this.row >= 1 && this.col == 0
        }

        protected reportAria(ret: Button) {
            if (!ret) {
                return
            }

            let accessibilityMessage: accessibility.AccessibilityMessage
            if (this.row > 0 && this.col == 0) {
                const ruleDef = this.rules[this.row - 1]

                const whens = ruleDef.sensors
                    .concat(ruleDef.filters)
                    .map(s => tidToString(s))

                const dos: string[] = ruleDef.actuators
                    .concat(ruleDef.modifiers.map(t => getTid(t)))
                    .map(s => tidToString(s))

                accessibilityMessage = <accessibility.RuleAccessibilityMessage>{
                    type: "rule",
                    whens,
                    dos,
                }
            } else {
                accessibilityMessage = <accessibility.TileAccessibilityMessage>{
                    type: "tile",
                    value: (ret ? ret.ariaId : "") || "",
                    force: true,
                }
            }
            accessibility.setLiveContent(accessibilityMessage)
        }
    }

    // mostly a matrix, except for last row, which may be ragged
    // also supports delete button
    // add support for aria
    export class PickerNavigator implements INavigator {
        protected deleteButton: Button
        protected row: number
        protected col: number

        constructor(private picker: Picker) {}

        private get width() {
            return this.picker.width
        }
        private get length() {
            return this.picker.group.defs.length
        }

        get hasDelete() {
            return !!this.deleteButton
        }

        moveToIndex(index: number) {
            assert(index < this.length, "index out of bounds")
            this.row = Math.idiv(index, this.width)
            this.col = index % this.width
            this.reportAria()
            return this.picker.group.getButtonAtIndex(index)
        }

        private height() {
            return Math.ceil(this.length / this.width)
        }

        private currentRowWidth() {
            assert(this.row >= 0, "row out of bounds")
            return this.row < this.height() - 1
                ? this.width
                : this.length - this.width * (this.height() - 1)
        }

        public initialCursor(row: number = 0, col: number = 0): Button {
            this.row = row
            this.col = col
            const btn = this.getCurrent()
            if (btn) {
                this.reportAria()
                return undefined // TODO
            }
            return undefined
        }

        clear() {
            this.deleteButton = undefined
        }

        addButtons(btns: ButtonBase[]) {}

        addDelete(btn: Button) {
            this.deleteButton = btn
        }

        getCurrent() {
            // console.log(`row: ${this.row}, col: ${this.col}`)
            if (this.row == -1) {
                return this.deleteButton
            } else {
                const index = this.row * this.width + this.col
                if (index < this.length)
                    return this.picker.group.getButtonAtIndex(index)
            }
            return undefined
        }

        screenToButton(x: number, y: number): Button {
            const p = new Vec2(x, y)
            const btn = this.deleteButton
            if (
                btn &&
                Bounds.Translate(btn.bounds, btn.xfrm.worldPos).contains(p)
            )
                return btn
            const np = this.picker.group.getButtonAtScreen(x, y)
            if (np) {
                this.row = np.y
                this.col = np.x
                if (this.col >= this.currentRowWidth())
                    this.col = this.currentRowWidth() - 1
                return this.getCurrent()
            }
            return undefined
        }

        move(dir: CursorDir) {
            switch (dir) {
                case CursorDir.Up: {
                    if (this.row == -1 || (!this.deleteButton && this.row == 0))
                        throw new NavigationError(BACK_BUTTON_ERROR_KIND)
                    if (this.row > 0) this.row--
                    else if (this.deleteButton) this.row = -1
                    break
                }
                case CursorDir.Down: {
                    if (this.row < this.height() - 1) {
                        this.row++
                        if (this.col >= this.currentRowWidth()) {
                            this.col = this.currentRowWidth() - 1
                        }
                    } else throw new NavigationError(FORWARD_BUTTON_ERROR_KIND)
                    break
                }
                case CursorDir.Left: {
                    if (this.col > 0) this.col--
                    else if (this.row > 0) {
                        this.row--
                        this.col = this.width - 1
                    } else if (this.deleteButton) {
                        this.row = -1
                    }
                    break
                }
                case CursorDir.Right: {
                    if (this.row == -1) {
                        this.row = 0
                        this.col = 0
                    } else if (this.col < this.currentRowWidth() - 1) this.col++
                    else if (this.row < this.height() - 1) {
                        this.row++
                        this.col = 0
                    }
                    break
                }
            }
            this.reportAria()
            return this.getCurrent()
        }

        public updateAria() {
            this.reportAria()
        }

        protected reportAria() {
            if (this.row == -1) {
                accessibility.setLiveContent(<
                    accessibility.TextAccessibilityMessage
                >{
                    type: "text",
                    value: "delete_tile",
                    force: true,
                })
            }
        }
    }

    // accessibility for LEDs
    export class LEDNavigator extends PickerNavigator {
        constructor(picker: Picker) {
            super(picker)
            this.row = 2
            this.col = 2
        }
        protected reportAria() {
            super.reportAria()
            if (this.row == -1) return
            const on = true // TODO: btn.getIcon() == "solid_red"
            accessibility.setLiveContent(<
                accessibility.LEDAccessibilityMessage
            >{
                type: "led",
                on,
                x: this.col,
                y: this.row,
                force: true,
            })
        }
    }

    // accessibility for melody
    export class MelodyNavigator extends PickerNavigator {
        constructor(picker: Picker) {
            super(picker)
            this.row = 2
            this.col = 2
        }
        protected reportAria() {
            super.reportAria()
            if (this.row == -1) return
            const on = true // TODO btn.getIcon() === "note_on"
            const index = this.hasDelete ? this.row - 1 : this.row
            accessibility.setLiveContent(<
                accessibility.NoteAccessibilityMessage
            >{
                type: "note",
                on,
                index,
                force: true,
            })
        }
    }
}
