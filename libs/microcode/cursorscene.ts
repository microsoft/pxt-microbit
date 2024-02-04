namespace microcode {
    export class CursorScene extends Scene {
        navigator: INavigator
        public cursor: Cursor
        public picker: Picker

        constructor(app: App) {
            super(app, "scene")
            this.color = 11
        }

        protected moveCursor(dir: CursorDir) {
            try {
                this.moveTo(this.cursor.move(dir))
            } catch (e) {
                if (dir === CursorDir.Up && e.kind === BACK_BUTTON_ERROR_KIND)
                    this.back()
                else if (
                    dir === CursorDir.Down &&
                    e.kind === FORWARD_BUTTON_ERROR_KIND
                )
                    return
                else throw e
            }
        }

        protected moveTo(target: Button) {
            if (!target) return
            this.cursor.moveTo(
                target.xfrm.worldPos,
                target.ariaId,
                target.bounds
            )
        }

        /* override */ startup() {
            super.startup()
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.right.id,
                () => this.moveCursor(CursorDir.Right)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.up.id,
                () => this.moveCursor(CursorDir.Up)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.down.id,
                () => this.moveCursor(CursorDir.Down)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.left.id,
                () => this.moveCursor(CursorDir.Left)
            )

            // click
            const click = () => this.cursor.click()
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.A.id,
                click
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.A.id + keymap.PLAYER_OFFSET,
                click
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.B.id,
                () => this.back()
            )

            this.cursor = new Cursor()
            this.picker = new Picker(this.cursor)
            this.navigator = new RowNavigator()
            this.cursor.navigator = this.navigator
        }

        back() {
            if (!this.cursor.cancel()) this.moveCursor(CursorDir.Back)
        }

        protected handleClick(x: number, y: number) {
            const target = this.cursor.navigator.screenToButton(
                x - Screen.HALF_WIDTH,
                y - Screen.HALF_HEIGHT
            )
            if (target) {
                this.moveTo(target)
                target.click()
            } else if (this.picker.visible) {
                this.picker.hide()
            }
        }

        protected handleMove(x: number, y: number) {
            const btn = this.cursor.navigator.screenToButton(
                x - Screen.HALF_WIDTH,
                y - Screen.HALF_HEIGHT
            )
            if (btn) {
                const w = btn.xfrm.worldPos
                this.cursor.snapTo(w.x, w.y, btn.ariaId, btn.bounds)
                btn.reportAria(true)
            }
        }

        /* override */ shutdown() {
            this.navigator.clear()
        }

        /* override */ activate() {
            super.activate()
            const btn = this.navigator.initialCursor(0, 0)
            if (btn) {
                const w = btn.xfrm.worldPos
                this.cursor.snapTo(w.x, w.y, btn.ariaId, btn.bounds)
                btn.reportAria(true)
            }
        }

        /* override */ update() {
            this.cursor.update()
        }

        /* override */ draw() {
            this.picker.draw()
            this.cursor.draw()
        }
    }
}
