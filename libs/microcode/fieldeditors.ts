namespace microcode {
    export function getFieldEditor(tile: Tile): FieldEditor {
        if (tile instanceof ModifierEditor) return tile.fieldEditor
        return undefined
    }

    class FieldEditor {
        init(): any {
            return undefined
        }
        clone(field: any): any {
            return undefined
        }
        editor(
            field: any,
            picker: Picker,
            onHide: () => void,
            onDelete?: () => void
        ): void {}
        toImage(field: any): SImage {
            return undefined
        }
        toBuffer(field: any): Buffer {
            return undefined
        }
        fromBuffer(buf: BufferReader): any {
            return undefined
        }
    }

    export class ModifierEditor {
        constructor(public tid: number) {
            this.firstInstance = false
        }
        fieldEditor: FieldEditor
        firstInstance: boolean
        getField(): any {
            return null
        }
        getIcon(): string | SImage {
            return null
        }
        getNewInstance(field: any = null): ModifierEditor {
            return null
        }
        serviceCommandArg(): Buffer {
            return null
        }
    }

    class IconFieldEditor extends FieldEditor {
        init() {
            return img`
        . . . . .
        . 1 . 1 .
        . . . . . 
        1 . . . 1
        . 1 1 1 .
        `
        }
        clone(img: SImage) {
            return img.clone()
        }
        editor(
            field: any,
            picker: Picker,
            onHide: () => void,
            onDelete?: () => void
        ) {
            iconEditor(field, picker, onHide, onDelete)
        }
        toImage(field: any) {
            return icondb.renderMicrobitLEDs(field)
        }
        toBuffer(img: SImage) {
            const ret = Buffer.create(4)
            for (let index = 0; index < 25; index++) {
                let byte = index >> 3
                let bit = index & 7
                let col = index % 5
                let row = Math.idiv(index, 5)
                ret[byte] |= img.getPixel(col, row) << bit
            }
            return ret
        }
        fromBuffer(br: BufferReader) {
            const buf = br.readBuffer(4)
            const img = image.create(5, 5)
            for (let index = 0; index < 25; index++) {
                let byte = index >> 3
                let bit = index & 7
                let col = index % 5
                let row = Math.idiv(index, 5)
                img.setPixel(col, row, (buf[byte] >> bit) & 1)
            }
            return img
        }
    }

    export class IconEditor extends ModifierEditor {
        field: SImage
        constructor(field: SImage = null) {
            super(Tid.TID_MODIFIER_ICON_EDITOR)
            this.fieldEditor = new IconFieldEditor()
            this.field = this.fieldEditor.clone(
                field ? field : this.fieldEditor.init()
            )
        }

        getField() {
            return this.field
        }

        getIcon(): string | SImage {
            return this.firstInstance
                ? getIcon(Tid.TID_MODIFIER_ICON_EDITOR)
                : this.fieldEditor.toImage(this.field)
        }

        getNewInstance(field: any = null) {
            return new IconEditor(field ? field : this.field.clone())
        }

        serviceCommandArg() {
            const buf = Buffer.create(5)
            for (let col = 0; col < 5; ++col) {
                let v = 0
                for (let row = 0; row < 5; ++row) {
                    if (this.field.getPixel(col, row)) v |= 1 << row
                }
                buf[col] = v
            }
            return buf
        }
    }

    export interface Melody {
        notes: string
        tempo: number
    }

    export const MELODY_LENGTH = 4
    export const NUM_NOTES = 5

    //export const noteNames = ["C", "D", "E", "F", "G", "A", "B", "C", "D"]

    function setNote(buf: Buffer, offset: number, note: string) {
        const noteToFreq: { [note: string]: number } = {
            "0": 261.63, // C4
            "1": 293.66, // D4
            "2": 329.63, // E4
            "3": 349.23, // F4
            "4": 392.0, // G4
            "5": 440.0, // A4
            "6": 493.88, // B4
            "7": 523.25, // C5
            "8": 587.33, // D5
        }

        const period = 1000000 / (note !== "." ? noteToFreq[note] : 1000)
        const duty = note === "." ? 0 : (period * 0.5) / 2
        const duration = 250
        buf.setNumber(NumberFormat.UInt16LE, offset + 0, period)
        buf.setNumber(NumberFormat.UInt16LE, offset + 2, duty)
        buf.setNumber(NumberFormat.UInt16LE, offset + 4, duration)
    }

    class MelodyFieldEditor extends FieldEditor {
        init() {
            return { notes: `0240`, tempo: 120 }
        }
        clone(melody: Melody) {
            return { notes: melody.notes.slice(0), tempo: melody.tempo }
        }
        editor(
            field: any,
            picker: Picker,
            onHide: () => void,
            onDelete?: () => void
        ) {
            melodyEditor(field, picker, onHide, onDelete)
        }
        toImage(field: any) {
            return icondb.melodyToImage(field)
        }
        toBuffer(melody: Melody) {
            const buf = Buffer.create(3)
            buf.setUint8(0, melody.tempo)
            // convert the melody notes into list of integers
            const notes = melody.notes.split("")
            // fill the buffer with the notes, 4 bits for each note
            for (let i = 0; i < MELODY_LENGTH; i++) {
                const byte = i >> 1
                const bit = (i & 1) << 2
                if (notes[i] != ".") {
                    const note = (parseInt(notes[i]) || 0) + 1
                    buf.setUint8(
                        byte + 1,
                        buf.getUint8(byte + 1) | (note << bit)
                    )
                }
            }
            return buf
        }
        fromBuffer(br: BufferReader) {
            const buf = br.readBuffer(3)
            const tempo = buf[0]
            let notes = ""
            // read the notes from the buffer
            for (let i = 0; i < MELODY_LENGTH; i++) {
                const byte = i >> 1
                const bit = (i & 1) << 2
                const note = (buf[byte + 1] >> bit) & 0xf
                notes += note == 0 ? "." : (note - 1).toString()
            }
            return { tempo, notes }
        }
    }

    export class MelodyEditor extends ModifierEditor {
        field: Melody
        constructor(field: Melody = null) {
            super(Tid.TID_MODIFIER_MELODY_EDITOR)
            this.firstInstance = false
            this.fieldEditor = new MelodyFieldEditor()
            this.field = this.fieldEditor.clone(
                field ? field : this.fieldEditor.init()
            )
        }

        getField() {
            return this.field
        }

        getIcon(): string | SImage {
            return this.firstInstance
                ? getIcon(Tid.TID_MODIFIER_MELODY_EDITOR)
                : this.fieldEditor.toImage(this.field)
        }

        getNewInstance(field: any = null) {
            return new MelodyEditor(
                field ? field : this.fieldEditor.clone(this.field)
            )
        }

        serviceCommandArg() {
            const buf = Buffer.create(6 * 8)
            for (let i = 0; i < MELODY_LENGTH; i++) {
                setNote(buf, i * 6, this.field.notes[i])
            }
            return buf
        }
    }

    let iconEditorTile: ModifierEditor = undefined
    let melodyEditorTile: ModifierEditor = undefined
    export function getEditor(tid: Tid): ModifierEditor {
        if (tid == Tid.TID_MODIFIER_ICON_EDITOR) {
            if (!iconEditorTile) {
                iconEditorTile = new IconEditor()
                iconEditorTile.firstInstance = true
            }
            return iconEditorTile
        } else if (tid == Tid.TID_MODIFIER_MELODY_EDITOR) {
            if (!melodyEditorTile) {
                melodyEditorTile = new MelodyEditor()
                melodyEditorTile.firstInstance = true
            }
            return melodyEditorTile
        }
        return undefined
    }

    function iconEditor(
        image5x5: SImage,
        picker: Picker,
        onHide: () => void,
        onDelete?: () => void
    ) {
        const getColor = (col: number, row: number) => {
            return image5x5.getPixel(col, row) ? "solid_red" : "solid_black"
        }

        // TODO: replace this with a function from index to colo
        let defs: PickerButtonDef[] = []
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                defs.push({
                    icon: getColor(col, row),
                })
            }
        }
        picker.setGroup(defs)

        const red = icons.get("solid_red")
        const black = icons.get("solid_black")

        picker.show(
            {
                width: 5,
                title: accessibility.ariaToTooltip(TID_MODIFIER_ICON_EDITOR),
                onClick: (index: number) => {
                    let row = Math.idiv(index, 5)
                    let col = index % 5
                    const on = image5x5.getPixel(col, row)
                    image5x5.setPixel(col, row, on ? 0 : 1)
                    defs[index].icon = getColor(col, row)
                    picker.draw()
                },
                onHide,
                onDelete,
                navigator: () => new LEDNavigator(picker),
                style: ButtonStyles.Transparent,
            },
            false
        )
    }

    function melodyEditor(
        melody: Melody,
        picker: Picker,
        onHide: () => void,
        onDelete?: () => void
    ) {
        const getIcon = (col: number, row: number) => {
            const note_icon =
                melody.notes[col] === "."
                    ? "note_off"
                    : parseInt(melody.notes[col]) === NUM_NOTES - 1 - row
                    ? "note_on"
                    : "note_off"
            return note_icon
        }

        let defs: PickerButtonDef[] = []
        for (let row = 0; row < NUM_NOTES; row++) {
            for (let col = 0; col < MELODY_LENGTH; col++) {
                defs.push({
                    icon: getIcon(col, row),
                })
            }
        }
        picker.setGroup(defs)

        picker.show(
            {
                width: MELODY_LENGTH,
                title: accessibility.ariaToTooltip(TID_MODIFIER_MELODY_EDITOR),
                onClick: index => {
                    let row = Math.idiv(index, MELODY_LENGTH)
                    let col = index % MELODY_LENGTH
                    if (getIcon(col, row) !== "note_on") {
                        const note = (NUM_NOTES - 1 - row).toString()
                        const buf = Buffer.create(6)
                        setNote(buf, 0, note)
                    }
                    melody.notes =
                        melody.notes.slice(0, col) +
                        (getIcon(col, row) === "note_on"
                            ? "."
                            : (NUM_NOTES - 1 - row).toString()) +
                        melody.notes.slice(col + 1)
                    for (row = 0; row < NUM_NOTES; row++) {
                        defs[row * MELODY_LENGTH + col].icon = getIcon(col, row)
                    }
                    picker.draw()
                    picker.navigator.updateAria()
                },
                onHide,
                onDelete,
                navigator: () => new MelodyNavigator(picker),
                style: ButtonStyles.Transparent,
            },
            false
        )
    }
}
