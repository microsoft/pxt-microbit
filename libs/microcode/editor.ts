namespace microcode {
    const TOOLBAR_HEIGHT = 17
    const TOOLBAR_MARGIN = 2

    //% shim=TD_NOOP
    function connectJacdac() {
        const buf = Buffer.fromUTF8(JSON.stringify({ type: "connect" }))
        control.simmessages.send("usb", buf)
    }

    //% shim=TD_NOOP
    function editorSkipBack(editor: Editor, skipBack: boolean) {
        if (!skipBack) editor.back()
    }

    //% shim=TD_NOOP
    function editorSkipForward(editor: Editor, skipBack: boolean) {
        if (!skipBack) editor.forward()
    }

    export function diskSlots() {
        return ["disk1", "disk2", "disk3"]
    }

    export class Editor extends Scene {
        navigator: RuleRowNavigator
        private progdef: ProgramDefn
        private currPage: number
        private diskBtn: Button
        private connectBtn: Button
        private pageBtn: Button
        public pageEditor: PageEditor
        public cursor: Cursor
        private _changed: boolean
        private hudroot: Placeable
        private scrollroot: Placeable
        public picker: Picker
        public rendering = false
        private dirty = false

        constructor(app: App) {
            super(app, "editor")
            this.color = 6
        }

        public changed() {
            this._changed = true
        }

        public nonEmptyPages(): number[] {
            return this.progdef.pages
                .map((p, i) =>
                    p.rules.length > 1 ||
                    (p.rules.length === 1 && !p.rules[0].isEmpty())
                        ? i
                        : -1
                )
                .filter(i => i > -1)
        }

        public ruleWidth() {
            let w = 0
            const rules = this.pageEditor.ruleEditors
            for (const rule of rules) {
                w = Math.max(w, rule.innerWidth)
            }
            return w + 24
        }

        public pageHeight() {
            const rules = this.pageEditor.ruleEditors
            return (
                TOOLBAR_HEIGHT +
                TOOLBAR_MARGIN +
                PageEditor.MARGIN +
                PageEditor.RULE_MARGIN * (rules.length - 1) +
                icondb.rule_arrow.height * rules.length
            )
        }

        public renderPage(p: number) {
            this.switchToPage(p)
            this.update()
            this.dirty = true
            this.draw()
        }

        public saveAndCompileProgram() {
            this.app.save(SAVESLOT_AUTO, this.progdef)
        }

        private pickDiskSLot() {
            const btns: PickerButtonDef[] = diskSlots().map(slot => {
                return {
                    icon: slot,
                }
            })
            this.picker.setGroup(btns)
            this.picker.show({
                title: accessibility.ariaToTooltip("disk"),
                onClick: index => {
                    this.app.save(btns[index].icon, this.progdef)
                },
            })
        }

        private pickPage() {
            const btns: PickerButtonDef[] = PAGE_IDS().map(pageId => {
                return {
                    icon: getIcon(pageId) as string,
                }
            })
            this.picker.setGroup(btns)
            this.picker.show({
                onClick: index => {
                    this.switchToPage(index)
                },
            })
        }

        public switchToPage(index: number, startRow = 1, startCol = 1) {
            if (index < 0 || index >= this.progdef.pages.length) {
                return
            }
            this.currPage = index
            this.pageBtn.setIcon(getIcon(PAGE_IDS()[this.currPage]) as string)
            this.pageEditor = new PageEditor(
                this,
                this.scrollroot,
                this.progdef.pages[this.currPage]
            )
            this.scrollroot.xfrm.localPos = new Vec2(
                Screen.LEFT_EDGE,
                Screen.TOP_EDGE + TOOLBAR_HEIGHT + 2
            )
            this.rebuildNavigator()
            this.snapCursorTo(this.navigator.initialCursor(startRow, startCol))
        }

        public snapCursorTo(btn: Button) {
            const w = btn.xfrm.worldPos
            this.cursor.snapTo(w.x, w.y, btn.ariaId, btn.bounds)
            btn.reportAria(true)
            this.dirty = true
        }

        public hoverCursorTo(btn: Button) {
            const w = btn.xfrm.worldPos
            this.cursor.snapTo(w.x, w.y, btn.ariaId, btn.bounds)
            btn.reportAria(false)
            this.dirty = true
        }

        private moveTo(target: Button) {
            if (target) {
                this.cursor.moveTo(
                    target.xfrm.worldPos,
                    target.ariaId,
                    target.bounds
                )
                this.dirty = true
            }
        }
        private scrollAndMove(dir: CursorDir, skipBack = false) {
            try {
                const target = this.cursor.move(dir)
                this.scrollAndMoveButton(target)
            } catch (e) {
                if (dir === CursorDir.Up && e.kind === BACK_BUTTON_ERROR_KIND) {
                    editorSkipBack(this, skipBack)
                } else if (
                    dir == CursorDir.Down &&
                    e.kind == FORWARD_BUTTON_ERROR_KIND
                ) {
                    editorSkipForward(this, skipBack)
                } else throw e
            }
        }

        private scrollAndMoveButton(target: Button) {
            if (!target) {
                return
            }

            if (target.xfrm.root === this.hudroot.xfrm) {
                this.moveTo(target)
                return
            }

            const occBounds = new Bounds({
                left: Screen.LEFT_EDGE,
                top: Screen.TOP_EDGE + TOOLBAR_HEIGHT + TOOLBAR_MARGIN,
                width: Screen.WIDTH,
                height: Screen.HEIGHT - (TOOLBAR_HEIGHT + TOOLBAR_MARGIN),
            })
            const occ = target.occlusions(occBounds)

            if (occ.has && !this.picker.visible) {
                // don't scroll if picker is visible
                const xocc = occ.left ? occ.left : -occ.right
                const yocc = occ.top ? occ.top : -occ.bottom
                Vec2.TranslateToRef(
                    this.scrollroot.xfrm.localPos,
                    new Vec2(xocc, yocc),
                    this.scrollroot.xfrm.localPos
                )
            }
            this.moveTo(target)
        }

        /* override */ startup() {
            const makeOnEvent = (id: number, dir: CursorDir) => {
                control.onEvent(ControllerButtonEvent.Pressed, id, () =>
                    this.scrollAndMove(dir)
                )
            }

            super.startup()
            makeOnEvent(controller.right.id, CursorDir.Right)
            makeOnEvent(controller.left.id, CursorDir.Left)
            makeOnEvent(controller.up.id, CursorDir.Up)
            makeOnEvent(controller.down.id, CursorDir.Down)
            if (!Options.menuProfiling)
                control.onEvent(
                    ControllerButtonEvent.Pressed,
                    controller.menu.id,
                    () => {
                        // go back to home screen
                        this.app.popScene()
                        this.app.pushScene(new Home(this.app))
                    }
                )
            this.hudroot = new Placeable()
            this.hudroot.xfrm.localPos = new Vec2(0, Screen.TOP_EDGE)
            this.scrollroot = new Placeable()
            this.scrollroot.xfrm.localPos = new Vec2(
                Screen.LEFT_EDGE,
                Screen.TOP_EDGE + TOOLBAR_HEIGHT + TOOLBAR_MARGIN
            )
            this.cursor = new Cursor()
            this.picker = new Picker(this.cursor)
            this.currPage = 0
            this.diskBtn = new Button({
                parent: this.hudroot,
                style: ButtonStyles.BorderedPurple,
                icon: icondb.disk,
                ariaId: "disk",
                x: Screen.LEFT_EDGE + 12,
                y: 8,
                onClick: () => this.pickDiskSLot(),
            })
            this.connectBtn = new Button({
                parent: this.hudroot,
                style: ButtonStyles.BorderedPurple,
                icon: icondb.microbit_logo_btn,
                ariaId: "connect",
                x: Screen.LEFT_EDGE + 36,
                y: 8,
                onClick: () => connectJacdac(),
            })
            this.pageBtn = new Button({
                parent: this.hudroot,
                style: ButtonStyles.BorderedPurple,
                icon: getIcon(PAGE_IDS()[this.currPage]),
                x: Screen.RIGHT_EDGE - 12,
                y: 8,
                onClick: () => this.pickPage(),
            })
            this.progdef = this.app.load(SAVESLOT_AUTO)
            if (!this.progdef) {
                // onboarding experience
                // load first sample if this is the first program being loaded
                this.progdef = ProgramDefn.fromBuffer(
                    new BufferReader(samples(true)[1].source)
                )
                this.app.save(SAVESLOT_AUTO, this.progdef)
            }
            this.configureP1Keys()
            this.configureP2Keys()
        }

        private configureP1Keys() {
            const forward = () => {
                this.cursor.click()
                this.dirty = true
            }
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.A.id,
                forward
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.A.id + keymap.PLAYER_OFFSET,
                forward
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.B.id,
                () => this.back()
            )
        }

        private nextPage(startRow = 1, startCol = 1) {
            this.switchToPage(
                (this.currPage + 1) % this.progdef.pages.length,
                startRow,
                startCol
            )
        }

        private prevPage(startRow = 1, startCol = 1) {
            this.switchToPage(
                (this.currPage + this.progdef.pages.length - 1) %
                    this.progdef.pages.length,
                startRow,
                startCol
            )
        }

        private configureP2Keys() {
            // P2 bindings
            const nextPage = () => this.nextPage()
            const prevPage = () => this.prevPage()
            // page up, page down
            control.onEvent(
                ControllerButtonEvent.Pressed,
                ControllerButton.Up + keymap.PLAYER_OFFSET,
                nextPage
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                ControllerButton.Down + keymap.PLAYER_OFFSET,
                prevPage
            )
            // next, prev page
            control.onEvent(
                ControllerButtonEvent.Pressed,
                ControllerButton.Left + keymap.PLAYER_OFFSET,
                prevPage
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                ControllerButton.Right + keymap.PLAYER_OFFSET,
                nextPage
            )
        }

        back() {
            if (!this.cursor.cancel()) {
                if (this.navigator.getRow() == 0) {
                    if (this.currPage > 0) {
                        this.prevPage(0, -1)
                    } else {
                        this.app.popScene()
                        this.app.pushScene(new Home(this.app))
                        // back to home screen from editor, stop jacscript by running empty program
                    }
                } else {
                    if (this.navigator.atRuleStart()) {
                        const target = this.navigator.initialCursor(0, 0)
                        this.moveTo(target)
                    } else this.scrollAndMove(CursorDir.Back)
                }
            }
            this.dirty = true
        }

        forward() {
            if (!this.picker.visible) this.nextPage(0, -1)
        }

        protected handleClick(x: number, y: number) {
            const target = this.cursor.navigator.screenToButton(
                x - Screen.HALF_WIDTH,
                y - Screen.HALF_HEIGHT
            )
            if (target) {
                this.snapCursorTo(target)
                target.click()
            } else if (this.picker.visible) {
                this.picker.hide()
            }
        }

        protected handleMove(x: number, y: number) {
            const target = this.cursor.navigator.screenToButton(
                x - Screen.HALF_WIDTH,
                y - Screen.HALF_HEIGHT
            )
            if (target) {
                this.hoverCursorTo(target)
            }
        }

        protected handleWheel(dx: number, dy: number) {
            if (dy < 0) {
                this.scrollAndMove(CursorDir.Up, true)
            } else if (dy > 0) {
                this.scrollAndMove(CursorDir.Down)
            }
        }

        /* override */ shutdown() {
            this.progdef = undefined
            this.navigator.clear()
        }

        /* override */ activate() {
            super.activate()
            this.pageBtn.setIcon(tidToString(PAGE_IDS()[this.currPage]))
            if (!this.pageEditor) {
                this.switchToPage(this.currPage)
            }
            this.saveAndCompileProgram()
        }

        public addButtons(btns: Button[]) {
            this.navigator.addButtons(btns)
        }

        private rebuildNavigator() {
            if (this.picker.visible) return

            if (this.navigator) {
                this.navigator.clear()
            } else this.navigator = new RuleRowNavigator()

            this.navigator.addButtons(
                this.connectBtn.visible()
                    ? [this.diskBtn, this.connectBtn, this.pageBtn]
                    : [this.diskBtn, this.pageBtn]
            )

            this.pageEditor.addToNavigator()

            this.cursor.navigator = this.navigator
        }

        update() {
            if (this.pageEditor) {
                this.pageEditor.update()
            }
            if (this._changed) {
                this._changed = false
                this.rebuildNavigator()
            }
            // TODO: need this anymore???
            this.cursor.update()
        }

        draw() {
            if (this.dirty) {
                Screen.image.fill(this.color)
                if (!this.backgroundCaptured) {
                    this.drawBackground()
                    this.drawEditor()
                    this.drawNav()
                }
                this.picker.draw()
                if (!this.rendering) this.cursor.draw()
                this.dirty = false
            }
        }

        private drawEditor() {

            if (this.pageEditor) this.pageEditor.draw()
        }

        private drawBackground() {
            let x = Screen.LEFT_EDGE - (this.currPage << 4)
            while (x < Screen.RIGHT_EDGE) {
                Screen.drawTransparentImage(
                    editorBackground,
                    x,
                    Screen.TOP_EDGE
                )
                x += editorBackground.width
            }
        }

        private drawNav() {
            // if dot matrix is visible, then we're connected to some Jacdac bus
            // TODO: move cursor to next button when visible?
            if (!this.rendering) {
                this.diskBtn.draw()
                const wasVisible = this.connectBtn.visible()
                this.connectBtn.setVisible(
                    true // jdc.numServiceInstances(jacs.ServiceClass.DotMatrix) == 0
                )
                if (wasVisible !== this.connectBtn.visible()) this.changed()
                if (this.connectBtn.visible()) this.connectBtn.draw()
            }
            this.pageBtn.draw()
        }
    }

    export class PageEditor implements IComponent, IPlaceable {
        private xfrm_: Affine
        public ruleEditors: RuleEditor[]

        //% blockCombine block="xfrm" callInDebugger
        public get xfrm() {
            return this.xfrm_
        }

        constructor(
            private editor: Editor,
            parent: IPlaceable,
            private pagedef: PageDefn
        ) {
            this.xfrm_ = new Affine()
            this.xfrm_.parent = parent.xfrm
            this.ruleEditors = pagedef.rules.map(
                (ruledef, index) => new RuleEditor(editor, this, ruledef, index)
            )
            this.ensureFinalEmptyRule()
            this.layout()
        }

        private ensureFinalEmptyRule() {
            if (this.ruleEditors) {
                this.trimRules()
                const ruledefn = new RuleDefn()
                this.ruleEditors.push(
                    new RuleEditor(
                        this.editor,
                        this,
                        ruledefn,
                        this.ruleEditors.length
                    )
                )
                this.pagedef.rules.push(ruledefn)
            }
        }

        private trimRules() {
            if (!this.ruleEditors.length) {
                return
            }
            let last = this.ruleEditors[this.ruleEditors.length - 1]
            while (last.isEmpty()) {
                this.ruleEditors.pop()
                this.pagedef.rules.pop()
                if (!this.ruleEditors.length) {
                    return
                }
                last = this.ruleEditors[this.ruleEditors.length - 1]
            }
        }

        public static MARGIN = 10
        public static RULE_MARGIN = 3
        public layout() {
            if (!this.ruleEditors) return
            this.ruleEditors.forEach(rule => {
                rule.layout()
            })
            let left = PageEditor.MARGIN
            let top = PageEditor.MARGIN
            this.ruleEditors.forEach((rule, index) => {
                if (index) {
                    top += this.ruleEditors[index - 1].bounds.height >> 1
                    top += rule.bounds.height >> 1
                    top += PageEditor.RULE_MARGIN
                }
                rule.xfrm.localPos.x = left
                rule.xfrm.localPos.y = top
            })
            // Make all rules the same width
            let maxRuleWidth = 0
            this.ruleEditors.forEach(rule => {
                maxRuleWidth = Math.max(maxRuleWidth, rule.bounds.width)
            })
            this.ruleEditors.forEach(rule => {
                rule.bounds.width = maxRuleWidth
            })
        }

        public addToNavigator() {
            this.ruleEditors.forEach(rule => {
                this.editor.navigator.addRule(rule.ruledef)
                this.editor.addButtons(rule.getRuleButtons())
            })
        }

        public changed() {
            this.ensureFinalEmptyRule()
            this.layout()
            this.editor.changed()
        }

        public deleteRuleAt(index: number) {
            const rule = this.ruleEditors[index]
            this.pagedef.deleteRuleAt(index)
            this.ruleEditors.splice(index, 1)
            this.ruleEditors.forEach((rule, index) => (rule.index = index))
            this.changed()
            this.editor.saveAndCompileProgram()
        }

        public insertRuleAt(index: number) {
            const newRule = this.pagedef.insertRuleAt(index)
            if (newRule) {
                this.editor.saveAndCompileProgram()
                const rules: RuleEditor[] = []
                for (let i = 0; i < index; ++i) {
                    rules.push(this.ruleEditors[i])
                }
                rules.push(new RuleEditor(this.editor, this, newRule, index))
                for (let i = index; i < this.ruleEditors.length; ++i) {
                    rules.push(this.ruleEditors[i])
                }
                this.ruleEditors = rules
                this.ruleEditors.forEach((rule, index) => (rule.index = index))
                this.changed()
            }
        }

        update() {
            this.ruleEditors.forEach(rule => rule.update())
        }

        draw() {
            control.enablePerfCounter()
            this.ruleEditors.forEach(rule => rule.draw())
        }
    }
}
