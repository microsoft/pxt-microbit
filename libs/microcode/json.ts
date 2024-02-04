namespace microcode {
    function ruleDefnFromJson(obj: any): RuleDefn {
        const extractField = (t: string) => (s: string) => {
            let hasField = s.indexOf("(")
            if (hasField >= 0) {
                const elem = s.substr(0, hasField)
                if (Object.keys(tilesDB[t]).indexOf(elem) >= 0) {
                    const tile = tilesDB[t][elem]
                    const field = tile.fieldEditor.deserialize(
                        s.substr(hasField + 1, s.length - 2 - hasField)
                    )
                    const newOne = tile.getNewInstance(field)
                    return newOne
                } else {
                    return undefined
                }
            } else {
                return Object.keys(tilesDB[t]).indexOf(s) >= 0
                    ? tilesDB[t][s]
                    : undefined
            }
        }
        const defn = new RuleDefn()
        const parseTile = (single: string, name: string) => {
            if (Array.isArray(obj[single])) {
                const tiles: any[] = obj[single]
                return <any>tiles.map(extractField(name)).filter(t => !!t)
            }
            return []
        }
        if (typeof obj === "string") {
            obj = JSON.parse(obj)
        }

        defn.sensors = parseTile("S", "sensors")
        defn.actuators = parseTile("A", "actuators")
        defn.filters = parseTile("F", "filters")
        defn.modifiers = parseTile("M", "modifiers")
        return defn
    }

    function pageDefnFromJson(obj: any): PageDefn {
        if (typeof obj === "string") {
            obj = JSON.parse(obj)
        }
        const defn = new PageDefn()
        if (Array.isArray(obj["R"])) {
            const rules: any[] = obj["R"]
            defn.rules = rules.map(ruleDefnFromJson)
        }
        return defn
    }

    function progDefnFromJson(obj: any): ProgramDefn {
        if (typeof obj === "string") {
            obj = JSON.parse(obj)
        }
        const defn = new ProgramDefn()
        if (obj && obj["P"] && Array.isArray(obj["P"])) {
            const pages: any[] = obj["P"]
            defn.pages = pages.map(pageDefnFromJson)
        }
        return defn
    }
}
