namespace microcode {
    export class Home extends CursorScene {
        samplesBtn: Button
        editBtn: Button
        diskBtn: Button

        constructor(app: App) {
            super(app)
        }

        /* override */ startup() {
            super.startup()

            this.editBtn = new Button({
                parent: null,
                style: ButtonStyles.Transparent,
                icon: "edit_program",
                ariaId: "C0",
                x: -50,
                y: 30,
                onClick: () => {
                    this.app.popScene()
                    this.app.pushScene(new Editor(this.app))
                },
            })

            this.samplesBtn = new Button({
                parent: null,
                style: ButtonStyles.Transparent,
                icon: "smiley_buttons",
                ariaId: "C1",
                x: 0,
                y: 30,
                onClick: () => {
                    this.app.popScene()
                    this.app.pushScene(new SamplesGallery(this.app))
                },
            })

            this.diskBtn = new Button({
                parent: null,
                style: ButtonStyles.Transparent,
                icon: "largeDisk",
                ariaId: "load",
                x: 50,
                y: 30,
                onClick: () => {
                    this.pickDiskSLot()
                },
            })

            const btns: Button[] = [this.editBtn, this.samplesBtn, this.diskBtn]

            this.navigator.addButtons(btns)
            // handle menu?
        }

        private pickDiskSLot() {
            const btns: PickerButtonDef[] = diskSlots().map(slot => {
                return {
                    icon: slot,
                }
            })
            this.picker.setGroup(btns)
            this.picker.show({
                title: accessibility.ariaToTooltip("load"),
                onClick: index => {
                    let buf = settings.readBuffer(btns[index].icon)
                    if (!buf) {
                        // handles case where nothing is in slot
                        buf = Buffer.create(6)
                        for (let i = 0; i < 5; ++i) buf[i] = Tid.END_OF_PAGE
                        buf[5] = Tid.END_OF_PROG
                    }
                    settings.writeBuffer(SAVESLOT_AUTO, buf)
                    this.app.popScene()
                    this.app.pushScene(new Editor(this.app))
                },
            })
        }

        /* override */ activate() {
            super.activate()
            this.color = 15
            docs.setup(this.app)
        }

        private drawVersion() {
            const font = image.font5
            Screen.print(
                microcode.VERSION,
                Screen.RIGHT_EDGE - font.charWidth * microcode.VERSION.length,
                Screen.BOTTOM_EDGE - font.charHeight - 1,
                0xb,
                font
            )
        }

        private yOffset = -Screen.HEIGHT >> 1
        draw() {
            Screen.fillRect(
                Screen.LEFT_EDGE,
                Screen.TOP_EDGE,
                Screen.WIDTH,
                Screen.HEIGHT,
                0xc
            )
            this.yOffset = Math.min(0, this.yOffset + 2)
            const t = control.millis()
            const dy = this.yOffset == 0 ? (Math.idiv(t, 800) & 1) - 1 : 0
            const margin = 2
            const OFFSET = (Screen.HEIGHT >> 1) - wordLogo.height - margin
            const y = Screen.TOP_EDGE + OFFSET + dy
            Screen.drawTransparentImage(
                wordLogo,
                Screen.LEFT_EDGE + ((Screen.WIDTH - wordLogo.width) >> 1) + dy,
                y + this.yOffset
            )
            Screen.drawTransparentImage(
                microbitLogo,
                Screen.LEFT_EDGE +
                    ((Screen.WIDTH - microbitLogo.width) >> 1) +
                    dy,
                y - wordLogo.height + this.yOffset + margin
            )
            if (!this.yOffset) {
                const tagline = resolveTooltip("tagline")
                Screen.print(
                    tagline,
                    Screen.LEFT_EDGE +
                        ((Screen.WIDTH + wordLogo.width) >> 1) +
                        dy -
                        microcode.font.charWidth * tagline.length,
                    Screen.TOP_EDGE +
                        OFFSET +
                        wordLogo.height +
                        dy +
                        this.yOffset +
                        1,
                    0xb,
                    microcode.font
                )
            }

            this.samplesBtn.draw()
            this.editBtn.draw()
            this.diskBtn.draw()
            this.drawVersion()
            super.draw()
        }
    }
}
