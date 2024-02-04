namespace microcode {
    export interface Constraints {
        provides?: number[]
        requires?: number[]
        only?: (string | number)[]
        allow?: (string | number)[]
        disallow?: (string | number)[]
    }

    export function mergeConstraints(src: Constraints, dst: Constraints) {
        if (!src) {
            return
        }
        if (src.provides) {
            src.provides.forEach(item => dst.provides.push(item))
        }
        if (src.requires) {
            src.requires.forEach(item => dst.requires.push(item))
        }
        if (src.only) {
            src.only.forEach(item => dst.only.push(item))
        }
        if (src.allow) {
            src.allow.forEach(item => dst.allow.push(item))
        }
        if (src.disallow) {
            src.disallow.forEach(item => dst.disallow.push(item))
        }
    }

    export function isCompatibleWith(
        src: Constraints,
        c: Constraints
    ): boolean {
        if (!src) return true
        if (src.requires) {
            let compat = false
            src.requires.forEach(
                req => (compat = compat || c.provides.some(pro => pro === req))
            )
            if (!compat) return false
        }
        return true
    }

    export function filterModifierCompat(
        tile: Tile,
        category: string | number,
        c: Constraints
    ): boolean {
        const tid = getTid(tile)
        const only = c.only.some(cat => cat === category || cat === tid)
        if (only) return true
        if (c.only.length) return false

        const allows = c.allow.some(cat => cat === category || cat === tid)
        if (!allows) return false

        const disallows = !c.disallow.some(
            cat => cat === category || cat === tid
        )
        if (!disallows) return false

        return true
    }

    export type Tile = number | ModifierEditor

    export function getTid(tile: Tile): number {
        if (tile instanceof ModifierEditor) return tile.tid
        return tile
    }

    export function getIcon(tile: Tile) {
        if (tile instanceof ModifierEditor) return tile.getIcon()
        return tidToString(tile)
    }

    export type RuleRep = { [name: string]: Tile[] }
    export class RuleDefn {
        sensors: number[]
        filters: number[]
        actuators: number[]
        modifiers: Tile[]

        constructor() {
            this.sensors = []
            this.filters = []
            this.actuators = []
            this.modifiers = []
        }

        get sensor() {
            if (this.sensors.length == 0) return Tid.TID_SENSOR_START_PAGE
            return this.sensors[0]
        }

        public getRuleRep(): RuleRep {
            return {
                sensors: this.sensors,
                filters: this.filters,
                actuators: this.actuators,
                modifiers: this.modifiers,
            }
        }

        public isEmpty(): boolean {
            return this.sensors.length === 0 && this.actuators.length === 0
        }

        public toBuffer(bw: BufferWriter) {
            if (this.isEmpty()) return
            bw.writeByte(this.sensor)
            this.filters.forEach(filter => bw.writeByte(filter))
            this.actuators.forEach(act => bw.writeByte(act))
            this.modifiers.forEach(mod => {
                bw.writeByte(getTid(mod))
                const fieldEditor = getFieldEditor(mod)
                if (fieldEditor) {
                    bw.writeBuffer(
                        fieldEditor.toBuffer((mod as ModifierEditor).getField())
                    )
                }
            })
        }

        public static fromBuffer(br: BufferReader) {
            const defn = new RuleDefn()
            assert(!br.eof())
            const sensorEnum = br.readByte()
            assert(isSensor(sensorEnum))
            defn.sensors.push(sensorEnum)
            assert(!br.eof())
            while (isFilter(br.peekByte())) {
                const filterEnum = br.readByte()
                defn.filters.push(filterEnum)
                assert(!br.eof())
            }
            assert(!br.eof())
            if (!isActuator(br.peekByte())) {
                return defn
            }
            assert(!br.eof())
            const actuatorEnum = br.readByte()
            defn.actuators.push(actuatorEnum)
            assert(!br.eof())
            while (isModifier(br.peekByte())) {
                const modifierEnum = br.readByte()
                const modifier = getEditor(modifierEnum)
                if (modifier instanceof ModifierEditor) {
                    const field = modifier.fieldEditor.fromBuffer(br)
                    const newOne = modifier.getNewInstance(field)
                    defn.modifiers.push(<any>newOne)
                } else {
                    defn.modifiers.push(modifierEnum)
                }
                assert(!br.eof())
            }
            return defn
        }
    }

    export class PageDefn {
        rules: RuleDefn[]

        constructor() {
            this.rules = []
        }

        public trim() {
            while (
                this.rules.length &&
                this.rules[this.rules.length - 1].isEmpty()
            ) {
                this.rules.pop()
            }
        }

        public deleteRuleAt(index: number) {
            if (index >= 0 && index < this.rules.length) {
                this.rules.splice(index, 1)
            }
        }

        public insertRuleAt(index: number) {
            if (index >= 0 && index < this.rules.length) {
                const newRule = new RuleDefn()
                // STS Array.splice doesn't support insert :(
                // this.rules.splice(index, 0, new RuleDefn());
                const newRules: RuleDefn[] = []
                for (let i = 0; i < index; ++i) {
                    newRules.push(this.rules[i])
                }
                newRules.push(newRule)
                for (let i = index; i < this.rules.length; ++i) {
                    newRules.push(this.rules[i])
                }
                this.rules = newRules
                return newRule
            }
            return undefined
        }

        public toBuffer(bw: BufferWriter) {
            this.rules.forEach(rule => rule.toBuffer(bw))
            bw.writeByte(Tid.END_OF_PAGE)
        }

        public static fromBuffer(br: BufferReader) {
            const defn = new PageDefn()
            assert(!br.eof())
            while (br.peekByte() != Tid.END_OF_PAGE) {
                defn.rules.push(RuleDefn.fromBuffer(br))
                assert(!br.eof())
            }
            br.readByte()
            return defn
        }
    }

    export function PAGE_IDS() {
        return [
            Tid.TID_MODIFIER_PAGE_1,
            Tid.TID_MODIFIER_PAGE_2,
            Tid.TID_MODIFIER_PAGE_3,
            Tid.TID_MODIFIER_PAGE_4,
            Tid.TID_MODIFIER_PAGE_5,
        ]
    }

    export class ProgramDefn {
        pages: PageDefn[]

        constructor() {
            this.pages = PAGE_IDS().map(id => new PageDefn())
        }

        public trim() {
            this.pages.map(page => page.trim())
        }

        public toBuffer() {
            const bw = new BufferWriter()
            const magic = Buffer.create(4)
            magic.setNumber(NumberFormat.UInt32LE, 0, 0x3e92f825)
            bw.writeBuffer(magic)
            this.pages.forEach(page => page.toBuffer(bw))
            bw.writeByte(Tid.END_OF_PROG)
            console.log(`toBuffer: ${bw.length}b`)
            return bw.buffer
        }

        public static fromBuffer(br: BufferReader) {
            const defn = new ProgramDefn()
            assert(!br.eof())
            const magic = br.readBuffer(4)
            if (magic.getNumber(NumberFormat.UInt32LE, 0) != 0x3e92f825) {
                console.log("bad magic")
                return defn
            }
            defn.pages = []
            assert(!br.eof())
            while (br.peekByte() != Tid.END_OF_PROG) {
                defn.pages.push(PageDefn.fromBuffer(br))
                assert(!br.eof())
            }
            br.readByte()
            return defn
        }
    }

    function mkConstraints(): Constraints {
        const c: Constraints = {
            provides: [],
            only: [],
            requires: [],
            allow: [],
            disallow: [],
        }
        return c
    }

    export class Language {
        public static getTileSuggestions(
            rule: RuleDefn,
            name: string,
            index: number
        ): Tile[] {
            // based on the name, we have a range of tiles to choose from
            const [lower, upper] = ranges[name]
            let all: Tile[] = []
            for (let i = lower; i <= upper; ++i) {
                const ed = getEditor(i)
                if (ed) all.push(ed)
                else all.push(i)
            }
            all = all
                .filter((tile: Tile) => isVisible(tile))
                .sort((t1, t2) => priority(t1) - priority(t2))

            if (name === "sensors" || name === "actuators") return all

            // Collect existing tiles up to index.
            let existing: Tile[] = []
            const ruleRep = rule.getRuleRep()
            for (let i = 0; i < index; ++i) {
                existing.push(ruleRep[name][i])
            }

            // Return empty set if the last existing tile is a "terminal".
            if (existing.length) {
                const last = existing[existing.length - 1]
                if (
                    isTerminal(last) ||
                    (name === "filters" && isTerminal(rule.sensors[0])) ||
                    (name === "modifiers" && isTerminal(rule.actuators[0]))
                ) {
                    return []
                }
            }

            // Collect the built-up constraints.
            const collect = mkConstraints()
            if (name === "modifiers" && rule.actuators.length) {
                const src = getConstraints(rule.actuators[0])
                mergeConstraints(src, collect)
            }
            if (rule.sensors.length) {
                const src = getConstraints(rule.sensors[0])
                mergeConstraints(src, collect)
            }

            existing.forEach(tile => {
                const src = getConstraints(tile)
                mergeConstraints(src, collect)
            })

            return all.filter(tile => {
                const src = getConstraints(tile)
                const cat = getCategory(tile)
                return (
                    isCompatibleWith(src, collect) &&
                    filterModifierCompat(tile, cat, collect)
                )
            })
        }

        public static ensureValid(rule: RuleDefn) {
            // TODO: Handle more cases. ex:
            // - filters not valid for new sensor
            // - modifiers not valid for new sensor or actuator
            if (!rule.sensors.length) {
                rule.filters = []
            }
            if (!rule.actuators.length) {
                rule.modifiers = []
            }
        }
    }
}
