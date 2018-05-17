/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxsim.visuals {
    export function mkLedMatrixSvg(xy: Coord, rows: number, cols: number):
        { el: SVGGElement, y: number, x: number, w: number, h: number, leds: SVGElement[], ledsOuter: SVGElement[], background: SVGElement } {
        let result: { el: SVGGElement, y: number, x: number, w: number, h: number, leds: SVGElement[], ledsOuter: SVGElement[], background: SVGElement }
            = { el: null, y: 0, x: 0, w: 0, h: 0, leds: [], ledsOuter: [], background: null };
        result.el = <SVGGElement>svg.elt("g");
        let width = cols * PIN_DIST;
        let height = rows * PIN_DIST;
        let ledRad = Math.round(PIN_DIST * .35);
        let spacing = PIN_DIST;
        let padding = (spacing - 2 * ledRad) / 2.0;
        let [x, y] = xy;
        let left = x - (ledRad + padding);
        let top = y - (ledRad + padding);
        result.x = left;
        result.y = top;
        result.w = width;
        result.h = height;
        result.background = svg.child(result.el, "rect", { class: "sim-display", x: left, y: top, width: width, height: height })

        // ledsOuter
        result.leds = [];
        result.ledsOuter = [];
        let hoverRad = ledRad * 1.2;
        for (let i = 0; i < rows; ++i) {
            let y = top + ledRad + i * spacing + padding;
            for (let j = 0; j < cols; ++j) {
                let x = left + ledRad + j * spacing + padding;
                result.ledsOuter.push(svg.child(result.el, "circle", { class: "sim-led-back", cx: x, cy: y, r: ledRad }));
                result.leds.push(svg.child(result.el, "circle", { class: "sim-led", cx: x, cy: y, r: hoverRad, title: `(${j},${i})` }));
            }
        }

        //default theme
        svg.fill(result.background, defaultLedMatrixTheme.background);
        svg.fills(result.leds, defaultLedMatrixTheme.ledOn);
        svg.fills(result.ledsOuter, defaultLedMatrixTheme.ledOff);

        //turn off LEDs
        result.leds.forEach(l => (<SVGStyleElement><any>l).style.opacity = 0 + "");

        return result;
    }

    export interface ILedMatrixTheme {
        background?: string;
        ledOn?: string;
        ledOff?: string;
    }
    export var defaultLedMatrixTheme: ILedMatrixTheme = {
        background: "#000",
        ledOn: "#ff5f5f",
        ledOff: "#DDD",
    };

    export const LED_MATRIX_STYLE = `
            .sim-led-back:hover {
                stroke:#a0a0a0;
                stroke-width:3px;
            }
            .sim-led:hover {
                stroke:#ff7f7f;
                stroke-width:3px;
            }
            `

    export class LedMatrixView implements IBoardPart<LedMatrixState> {
        private background: SVGElement;
        private ledsOuter: SVGElement[];
        private leds: SVGElement[];
        private state: LedMatrixState;
        private bus: EventBus;
        public element: SVGElement;
        public defs: SVGElement[];
        private theme: ILedMatrixTheme;

        private DRAW_SIZE = 8;
        private ACTIVE_SIZE = 5;

        public style = LED_MATRIX_STYLE;

        public init(bus: EventBus, state: LedMatrixState) {
            this.bus = bus;
            this.state = state;
            this.theme = defaultLedMatrixTheme;
            this.defs = [];
            this.element = this.buildDom();
        }

        public moveToCoord(xy: Coord) {
            translateEl(this.element, xy);
        }

        public updateTheme() {
            svg.fill(this.background, this.theme.background);
            svg.fills(this.leds, this.theme.ledOn);
            svg.fills(this.ledsOuter, this.theme.ledOff);
        }

        public updateState() {
            if (this.state.disabled) {
                this.leds.forEach((led, i) => {
                    let sel = (<SVGStyleElement><any>led)
                    sel.style.opacity = 0 + "";
                });
                return;
            }

            const bw = this.state.displayMode == pxsim.DisplayMode.bw
            const img = this.state.image;
            this.leds.forEach((led, i) => {
                let sel = (<SVGStyleElement><any>led)
                let dx = i % this.DRAW_SIZE;
                let dy = (i - dx) / this.DRAW_SIZE;
                if (dx < this.ACTIVE_SIZE && dy < this.ACTIVE_SIZE) {
                    let j = dx + dy * this.ACTIVE_SIZE;
                    sel.style.opacity = ((bw ? img.data[j] > 0 ? 255 : 0 : img.data[j]) / 255.0) + "";
                } else {
                    sel.style.opacity = 0 + "";
                }
            })
        }

        public buildDom() {
            let res = mkLedMatrixSvg([0, 0], this.DRAW_SIZE, this.DRAW_SIZE);
            let display = res.el;
            this.background = res.background;
            this.leds = res.leds;
            this.ledsOuter = res.ledsOuter;
            return display;
        }
    }
}