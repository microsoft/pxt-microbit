namespace microcode {
    export class Sample {
        constructor(
            public readonly label: string,
            public readonly ariaId: string,
            public readonly icon: string,
            public readonly b64: string
        ) {}

        get source() {
            return Buffer.fromBase64(this.b64)
        }
    }

    type rawSampleList = {
        label: string
        ariaId?: string
        b64?: string
        // leave empty to hide sample
        icon?: string
    }[]

    //% shim=TD_NOOP
    function rawWebAppSamples(r: { s: rawSampleList }) {
        r.s = r.s.concat([
            {
                label: "first program",
                b64: "JfiSPgtJLKBAgegAC0kpowEBAQEBAA==",
            },
            {
                label: "flashing heart",
                ariaId: "N2",
                b64: "JfiSPg4soKpGRQCgQDkCAA4powEBAQEBAA==",
                icon: "flashing_heart",
            },
            {
                label: "counter",
                ariaId: "N14",
                b64: "JfiSPgtJMK2bEzOtEymlAQEBAQEA",
            },
            {
                label: "times table",
                b64: "JfiSPg1aMbGenxQwrgtJMK2uEzOtEymlAQEBAQEA",
            },
            {
                label: "double counter",
                b64: "JfiSPgoppAozrQtJMK2bEzOtC0oolwEKKaUKM64LSjGumxQzrgtJKJYBAQEBAA==",
            },
            {
                label: "pet hamster",
                ariaId: "N4",
                b64: "JfiSPgosoGADBwALTSygQIHoAKBgAwcAsp0LTSmjDVosoEABFwGgYAMHALKdDVoppwEBAQEBAA==",
                icon: "pet_hamster",
            },
            {
                label: "head or tail",
                ariaId: "N9",
                b64: "JfiSPg0wsZwNK7N4MTWzeAEAE04soL9+5wATTyygP8b4AQEBAQEBAA==",
                icon: "heads_tails",
            },
            {
                label: "rock, paper, scissors",
                ariaId: "N8",
                b64: "JfiSPg1aMLGdDVopqBNOLKAAAAAAoMA5BwATTyygAAAAAKA/xvgBE1AsoAAAAACgc5E1AQEBAQEBAA==",
                icon: "rock_paper_scissors",
            },
            {
                label: "hot potato",
                ariaId: "N7",
                b64: "JfiSPg5WVVUolw4soAAQAACgAAAAAAEKLKC/fucACimnAQEBAQA=",
                icon: "hot_potato",
            },
            {
                label: "clap lights",
                ariaId: "N10",
                b64: "JfiSPgosoP///wEKKaUSVyiXAQosoAAAAAAKKawSVyiWAQEBAQA=",
                icon: "clap_lights",
            },
            {
                label: "24 7 clap",
                ariaId: "N13",
                b64: "JfiSPgoppQowmwosoEqprQCgjDHPALISVzCtmw5WVFQolxNSUlJSUiiYAQopowozrQ5WViiWAQoppwosoL864ACgvzoHALIOVlYolgEBAQA=",
            },
            {
                label: "reaction time",
                ariaId: "N6",
                b64: "JfiSPgosoAAIAACgABAAAKAAIAAAsg5WVVVVVVUolwtJKJkLSiiYAQosoP///wEKKaULSSiYC0oomQEKLKBEPEEAoIh4ggCyDlYolgEKLKAEfUQAoII8IgCyDlYolgEBAA==",
                icon: "reaction_time",
            },
            {
                label: "chuck a duck",
                ariaId: "N5",
                b64: "JfiSPg1aLKAAEAAADVotmxFOLKDmeAcAEU4ppQEBAQEBAA==",
                icon: "teleport_duck",
            },
            {
                label: "zombie detector",
                b64: "JfiSPg4soAAQAACgQAEFAKARABABoAAAAAARTiiXC00omAEOLKCEEEAAoEopoAAOVCmmDlYolgEOLKC/OuAAoL86BwAOLZsBAQEA",
            },
            {
                label: "firefly",
                ariaId: "N11",
                b64: "JfiSPgosoAAQAAARMK2bDlMwrZsTUFIolw5UVFQolwEKLQowmwosoP/v/wEKKaUOUyiWAQEBAQA=",
                icon: "firefly",
            },
            {
                label: "railroad crossing",
                ariaId: "N12",
                b64: "JfiSPgtJNZsLSS+2u7ILSjWfC0ovuLuyC00vvLIBAQEBAQA=",
                icon: "railroad_crossing",
            },
            {
                label: "moves",
                b64: "JfiSPg1cLKAnpXQADVssoCml9AANXSygIYTwAA1eLKAnnZQADVosoC889AABAQEBAQA=",
            },
            {
                label: "coins",
                b64: "JfiSPgtJMJsLSjCtmxNQLKAecugBE1EsoC88dAATUiygvdbaAQEBAQEBAA==",
            },
            {
                label: "inchworm",
                b64: "JfiSPgo1mw5TUyiXAQo1nw5TUyiWAQEBAQA=",
            },
            {
                label: "head guess",
                b64: "JfiSPgoppQowsZ0KMZsNXDCxnQ1bMLGdDVsxrpsOVlZWViiXE04soOZ5BwATTyygL4TwAKAvvZQAoJ8QQgCyE1AsoCeldACgL6X0AKAvtPQAsgEKM64KKaMOVlYolgEBAQEA",
            },
            {
                label: "battery charger prank",
                b64: "JfiSPgosoE4p5QCgTimlALINWiiXAQosoE4p5QCgTinnAKBOOecAoM455wCyDlYolgEBAQEA",
            },
            {
                label: "green light red light",
                b64: "JfiSPgtNKJcRTyiYCiyg5VMnAKDkEwcAoPQXhwCyCimlAQowmw4trQtJMJsLSjCcE04soOVTJwCg5BMHAKD0F4cAshNPLKBRERUBAQ1aKacNWiygvzrgAKC/OgcAshFOKJYBAQEA",
            },
            {
                label: "crooked head or tail",
                b64: "JfiSPg0wsZ0NKagTTiygv37nABNPLKA/xvgBE1AsoD/G+AEBAQEBAQA=",
            },
            {
                label: "step counter",
                b64: "JfiSPg1aMK2bEzOtEymlAQEBAQEA",
            },
            {
                label: "clap counter",
                b64: "JfiSPhJXMK2bEzOtAQEBAQEA",
            },
            {
                label: "random counter",
                b64: "JfiSPgtJMJuxnwtJMRMzrQtKMa6bFF8soECB6AABAQEBAQA=",
            },
            {
                label: "slider levels",
                b64: "JfiSPhdOM5sXTzOcF1AznRdRM54XUjOfAQEBAQEA",
            },
            {
                label: "light levels",
                b64: "JfiSPg9OM5sPTzOcD1AznQ9RM54PUjOfAQEBAQEA",
            },
            {
                label: "magnet levels",
                b64: "JfiSPhZOM5sWTzOcFlAznRZRM54WUjOfAQEBAQEA",
            },
            {
                label: "count turns",
                b64: "JfiSPhhiMK2bGGMxrpsTM60UM64BAQEBAQA=",
            },
            {
                label: "key demo",
                b64: "JfiSPgosoAAQAAALSyygQIHoAAtMLKBAARcBAQEBAQEA",
            },
            {
                label: "robot shake",
                b64: "JfiSPgounQ1cNL4NWzTCDV00wMINXjTBwgEBAQEBAA==",
            },
            {
                label: "robot wake",
                b64: "JfiSPgounRI0wMDAwgEBAQEBAA==",
            },
            {
                label: "robot avoid wall",
                b64: "JfiSPgounQo0vhlPNMC+AQEBAQEA",
            },
            {
                label: "robot line follow",
                b64: "JfiSPgoumxpoNL4aZjTAGmc0wRpqNMQaazTFGmk0wgEBAQEBAA==",
            },
            {
                label: "robot showcase",
                b64: "JfiSPgoumwtJNL7IC0o0wsYZTzTEvgEBAQEBAA==",
            },
            {
                label: "robot drift tester",
                b64: "JfiSPgoumwtJNL7IC0o0w8cSNMLGAQEBAQEA",
            },
        ])
    }

    export function rawSamples() {
        const s: rawSampleList = [
            {
                label: "new program",
                ariaId: "N1",
                b64: "JfiSPgEBAQEBAA==",
                icon: "new_program",
            },
            {
                label: "smiley buttons",
                ariaId: "N3",
                b64: "JfiSPgtJLKB7g+gAoBtEBwALSSmkC0osoHsDFwGgewPwAQtKKacBAQEBAQA=",
                icon: "smiley_buttons",
            },
        ]
        return s
    }

    export function samples(withIcon: boolean): Sample[] {
        const s = rawSamples()
        const r = { s: s }
        rawWebAppSamples(r)
        return r.s
            .filter(({ icon }) => !withIcon || !!icon)
            .map(
                ({ label, ariaId, icon, b64 }) =>
                    new Sample(label, ariaId, icon, b64)
            )
    }
}
