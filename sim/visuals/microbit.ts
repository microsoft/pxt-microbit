namespace pxsim.visuals {
    const MB_STYLE = `
        svg.sim {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            display: block;
        }
        svg.sim.grayscale {
            -moz-filter: grayscale(1);
            -webkit-filter: grayscale(1);
            filter: grayscale(1);
        }
        .sim-button-group {
            cursor: pointer;
        }
        .sim-button {
            pointer-events: none;
        }
        .sim-head .sim-button {
            pointer-events: unset;
        }
        .sim-board, .sim-display, sim-button {
            fill: #111;
        }
        .sim-button-outer:hover {
            stroke:grey;
            stroke-width: 3px;
        }
        .sim-button-nut {
            fill:#704A4A;
            pointer-events:none;
        }
        .sim-button-nut:hover {
            stroke:1px solid #704A4A;
        }
        .sim-pin:hover {
            stroke:#D4AF37;
            stroke-width:2px;
        }

        .sim-pin-touch.touched:hover {
            stroke:darkorange;
        }

        .sim-led-back:hover {
            stroke:#a0a0a0;
            stroke-width:3px;
        }
        .sim-led:hover {
            stroke:#ff7f7f;
            stroke-width:3px;
        }

        .sim-systemled {
            fill:#333;
            stroke:#555;
            stroke-width: 1px;
        }

        .sim-light-level-button {
            stroke:#fff;
            stroke-width: 3px;
        }

        .sim-antenna {
            stroke:#555;
            stroke-width: 2px;
        }

        .sim-text {
        font-family:"Lucida Console", Monaco, monospace;
        font-size:25px;
        fill:#fff;
        pointer-events: none;
        }

        .sim-text-small,
        .sim-text-pin {
        font-family:"Lucida Console", Monaco, monospace;
        font-size:20px;
        fill:#fff;
        pointer-events: none;
        }

        .sim-thermometer {
            stroke:#aaa;
            stroke-width: 3px;
            cursor: pointer;
        }

        /* animations */
        .sim-flash {
            animation-name: sim-flash-animation;
            animation-duration: 0.1s;
        }

        @keyframes sim-flash-animation {
            from { fill: yellow; }
            to   { fill: default; }
        }

        .sim-flash-stroke {
            animation-name: sim-flash-stroke-animation;
            animation-duration: 0.4s;
            animation-timing-function: ease-in;
        }

        @keyframes sim-flash-stroke-animation {
            from { stroke: yellow; }
            to   { stroke: default; }
        }

        /* wireframe */
        .sim-wireframe * {
            fill: none;
            stroke: black;
        }
        .sim-wireframe .sim-display,
        .sim-wireframe .sim-led,
        .sim-wireframe .sim-led-back,
        .sim-wireframe .sim-head,
        .sim-wireframe .sim-theme,
        .sim-wireframe .sim-button-group,
        .sim-wireframe .sim-button-label,
        .sim-wireframe .sim-button,
        .sim-wireframe .sim-text-pin
        {
            visibility: hidden;
        }
        .sim-wireframe .sim-label
        {
            stroke: none;
            fill: #777;
        }
        .sim-label, .sim-button-label {
            fill: #000;
        }
        .sim-wireframe .sim-board {
            stroke-width: 2px;
        }
        *:focus {
            outline: none;
        }
        *:focus .sim-button-outer,
        .sim-shake:focus,
        .sim-thermometer:focus,
        .sim-light-level-button:focus,
        .sim-button-outer.sim-button-group:focus > .sim-button {
            outline: 6px solid white;
            outline-offset: 6px;
        }
        .sim-antenna-outer:focus {
            outline: 6px solid white;
        }
        .sim-pin:focus { 
            stroke: white;
            stroke-width: 5px !important;
        }
        .no-drag, .sim-text, .sim-text-small,
        .sim-text-pin {
            user-drag: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }
    `;
    const MB_HIGHCONTRAST = `
path.sim-board {
    stroke: white;
    stroke-width: 3;
}
.sim-led {
    stroke: red;
}
*:focus .sim-button-outer,
.sim-pin:focus,
.sim-thermometer:focus,
.sim-shake:focus,
.sim-light-level-button:focus {
    stroke: #10C8CD !important;
}
    `
    const pins4onXs = [66.7, 79.1, 91.4, 103.7, 164.3, 176.6, 188.9, 201.3, 213.6, 275.2, 287.5, 299.8, 312.1, 324.5, 385.1, 397.4, 409.7, 422];
    const pins4onMids = pins4onXs.map(x => x + 5);
    const littlePinDist = pins4onMids[1] - pins4onMids[0];
    const bigPinWidth = pins4onMids[4] - pins4onMids[3];
    const pin0mid = pins4onXs[0] - bigPinWidth / 2.0;
    const pin3mid = pin0mid - bigPinWidth / 2.0;
    const pin1mid = pins4onMids[3] + bigPinWidth / 2.0;
    const pin2mid = pins4onMids[8] + bigPinWidth / 2.0;
    const pin3Vmid = pins4onMids[13] + bigPinWidth / 2.0;
    const pinGNDmid = pins4onMids[pins4onMids.length - 1] + bigPinWidth / 2.0;
    const pinGND2mid = pinGNDmid + bigPinWidth / 2.0;
    const pinMids = [pin0mid, pin1mid, pin2mid, pin3mid].concat(pins4onMids).concat([pinGNDmid, pin3Vmid, pinGND2mid]);
    const pinNames = [
        "P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10",
        "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20",
        "GND0", "GND", "+3v3", "GND1"];
    const pinDrawOrder = [
        "P3", "P0", "P4", "P5", "P6", "P7", "P1", "P8", "P9", "P10", "P11",
        "P12", "P2", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20",
        "GND0", "GND", "+3v3", "GND1"
    ];
    const pinTitles = [
        "P0, ANALOG IN",
        "P1, ANALOG IN",
        "P2, ANALOG IN",
        "P3, ANALOG IN, LED Col 1",
        "P4, ANALOG IN, LED Col 2",
        "P5, BUTTON A",
        "P6, LED Col 9",
        "P7, LED Col 8",
        "P8",
        "P9, LED Col 7",
        "P10, ANALOG IN, LED Col 3",
        "P11, BUTTON B",
        "P12, RESERVED ACCESSIBILITY",
        "P13, SPI - SCK",
        "P14, SPI - MISO",
        "P15, SPI - MOSI",
        "P16, SPI - Chip Select",
        "P17, +3v3",
        "P18, +3v3",
        "P19, I2C - SCL",
        "P20, I2C - SDA",
        "GND", "GND", "+3v3", "GND"
    ];
    const MB_WIDTH = 500;
    const MB_HEIGHT = 408;

    const LIGHT_LEVEL_BUTTON_POSITION_Y = 50;
    const LIGHT_LEVEL_BUTTON_RADIUS = 35;
    const ANTENNA_X = 380;
    const ANTENNA_WAVE_PERIOD_X = 18;
    const ANTENNA_WAVE_COUNT = 5;
    export interface IBoardTheme {
        highContrast?: boolean;
        accent?: string;
        display?: string;
        pin?: string;
        pinTouched?: string;
        pinActive?: string;
        ledOn?: string;
        ledOff?: string;
        buttonOuter?: string;
        buttonUp?: string;
        buttonDown?: string;
        virtualButtonOuter?: string;
        virtualButtonUp?: string;
        virtualButtonDown?: string;
        lightLevelOn?: string;
        lightLevelOff?: string;
    }

    export var themes: IBoardTheme[] = ["#3ADCFE", "#FFD43A", "#3AFFB3", "#FF3A54"].map(accent => {
        return {
            accent: accent,
            display: "#111",
            pin: "#D4AF37",
            pinTouched: "#FFA500",
            pinActive: "#FF5500",
            ledOn: "#ff7f7f",
            ledOff: "#202020",
            buttonOuter: "#979797",
            buttonUp: "#111",
            buttonDown: "#FFA500",
            virtualButtonOuter: "#333",
            virtualButtonUp: "#fff",
            lightLevelOn: "yellow",
            lightLevelOff: "#555"
        }
    });

    export function randomTheme(highContrast?: boolean): IBoardTheme {
        let theme = themes[Math.floor(Math.random() * themes.length)];
        if (highContrast) {
            theme = JSON.parse(JSON.stringify(theme)) as IBoardTheme;
            theme.highContrast = true;
            theme.ledOff = "#888";
            theme.ledOn = "#0000bb";
            theme.display = "#ffffff";
            theme.pin = "#D4AF37";
            theme.accent = "#FFD43A";
        }
        return theme;
    }

    export interface IBoardProps {
        runtime?: pxsim.Runtime;
        theme?: IBoardTheme;
        wireframe?: boolean;
    }

    export class MicrobitBoardSvg implements BoardView {
        public element: SVGSVGElement;
        private style: SVGStyleElement;
        private defs: SVGDefsElement;
        private g: SVGGElement;
        private pkg: SVGPathElement;
        private logos: SVGElement[];
        private head: SVGGElement;
        private headParts: SVGElement;
        private headInitialized = false;
        private heads: SVGElement[];
        private headText: SVGTextElement;
        private display: SVGElement;
        private buttons: SVGElement[];
        private buttonsOuter: SVGElement[];
        private buttonABText: SVGTextElement;
        private pins: SVGElement[];
        private pinGradients: SVGLinearGradientElement[];
        private pinTexts: SVGTextElement[];
        private ledsOuter: SVGElement[];
        private leds: SVGElement[];
        private microphoneLed: SVGElement;
        private systemLed: SVGCircleElement;
        private antenna: SVGElement;
        private antennaInitialized = false;
        private rssi: SVGTextElement;
        private lightLevelButton: SVGCircleElement;
        private lightLevelGradient: SVGLinearGradientElement;
        private lightLevelInitialized = false;
        private lightLevelText: SVGTextElement;
        private thermometerGradient: SVGLinearGradientElement;
        private thermometer: SVGRectElement;
        private thermometerInitialized = false;
        private thermometerText: SVGTextElement;
        private soundLevelGradient: SVGLinearGradientElement;
        private soundLevel: SVGRectElement;
        private soundLevelInitialized = false;
        private soundLevelText: SVGTextElement;
        private shakeButton: SVGCircleElement;
        private shakeInitialized = false;
        private shakeText: SVGTextElement;
        private accTextX: SVGTextElement;
        private accTextY: SVGTextElement;
        private accTextZ: SVGTextElement;
        private v2Circle: SVGCircleElement
        private v2Text: SVGTextElement;
        public board: pxsim.DalBoard;
        private pinNmToCoord: Map<Coord> = {};
        private domHardwareVersion = 1;
        private moveHeadingOnClick = (ev: MouseEvent) => {
            let pt = this.element.createSVGPoint();
            let cur = svg.cursorPoint(pt, this.element, ev);
            const logoBounds = this.head.getBBox();
            const logoCenterX = logoBounds.x + (logoBounds.width / 2);
            const logoCenterY = logoBounds.y + (logoBounds.height / 2);
            const distance = Math.sqrt((((cur.y - logoCenterY) ** 2) + ((cur.x - logoCenterX) ** 2)));

            // 30 and 90 are not precise, just numbers that fit nicely with usage
            if (distance > 30 && distance < 90) {
                const state = this.board;
                state.compassState.heading = Math.floor(Math.atan2(cur.y - logoCenterY, cur.x - logoCenterX) * 180 / Math.PI) + 90;
                if (state.compassState.heading < 0) state.compassState.heading += 360;
                this.updateHeading();
            }
        }

        constructor(public props: IBoardProps) {
            this.recordPinCoords();
            this.buildDom();
            if (props && props.wireframe)
                U.addClass(this.element, "sim-wireframe");

            if (props && props.theme)
                this.updateTheme();

            if (props && props.runtime) {
                this.board = this.props.runtime.board as pxsim.DalBoard;
                this.board.updateSubscribers.push(() => this.updateState());
                this.updateState();
                this.attachEvents();
            }
        }

        public getView(): SVGAndSize<SVGSVGElement> {
            return {
                el: this.element,
                y: 0,
                x: 0,
                w: MB_WIDTH,
                h: MB_HEIGHT
            };
        }

        public getCoord(pinNm: string): Coord {
            return this.pinNmToCoord[pinNm];
        }

        public highlightPin(pinNm: string): void {
            //TODO: for instructions
        }

        public getPinDist(): number {
            return littlePinDist * 1.7;
        }

        public recordPinCoords() {
            const pinsY = 356.7 + 40;
            pinNames.forEach((nm, i) => {
                let x = pinMids[i];
                this.pinNmToCoord[nm] = [x, pinsY];
            });
        }

        public removeEventListeners() {
            document.body.removeEventListener(pointerEvents.down[0], this.moveHeadingOnClick);
        }

        private updateTheme() {
            let theme = this.props.theme;

            svg.fill(this.display, theme.display);
            svg.fills(this.leds, theme.ledOn);
            svg.fills(this.ledsOuter, theme.ledOff);
            if (this.microphoneLed && this.board.microphoneState.sensorUsed) {
                svg.fills([this.microphoneLed], theme.ledOn);
                svg.filter(this.microphoneLed, `url(#ledglow)`);
            }
            svg.fills(this.buttonsOuter.slice(0, 2), theme.buttonOuter);
            svg.fills(this.buttons.slice(0, 2), theme.buttonUp);
            svg.fill(this.buttonsOuter[2], theme.virtualButtonOuter);
            svg.fill(this.buttons[2], theme.virtualButtonUp);
            svg.fills(this.logos, theme.accent);
            if (this.domHardwareVersion > 1) {
                svg.fills(this.heads.slice(1), "gold");
            } else {
                svg.fills(this.heads.slice(1), theme.accent);
            }

            svg.fill(this.shakeButton, theme.virtualButtonUp);

            this.pinGradients.forEach(lg => svg.setGradientColors(lg, theme.pin, theme.pinActive));
            svg.setGradientColors(this.lightLevelGradient, theme.lightLevelOn, theme.lightLevelOff);

            svg.setGradientColors(this.thermometerGradient, theme.ledOff, theme.ledOn);
            svg.setGradientColors(this.soundLevelGradient, theme.ledOff, theme.ledOn);
            this.positionV2Elements();
        }

        public updateState() {
            const state = this.board;
            if (!state) return;

            this.updateHardwareVersion();
            this.updateMicrophone();
            this.updateRecordingActive();
            this.updateButtonPairs();
            this.updateLEDMatrix();
            this.updatePins();
            this.updateTilt();
            this.updateHeading();
            this.updateLightLevel();
            this.updateTemperature();
            this.updateButtonAB();
            this.updateGestures();
            this.updateRSSI();

            if (!this.props.runtime || this.props.runtime.dead)
                U.addClass(this.element, "grayscale");
            else
                U.removeClass(this.element, "grayscale");
        }

        private updateButtonPairs() {
            const state = this.board;
            const theme = this.props.theme;
            const bpState = state.buttonPairState;
            const buttons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
            buttons.forEach((btn, index) => {
                svg.fill(this.buttons[index], btn.pressed ? theme.buttonDown : theme.buttonUp);
            });
        }

        private updateLEDMatrix() {
            const state = this.board;
            if (state.ledMatrixState.disabled) {
                this.leds.forEach((led, i) => {
                    const sel = (<SVGStyleElement><any>led)
                    sel.style.opacity = "0";
                })
            } else {
                const bw = state.ledMatrixState.displayMode == pxsim.DisplayMode.bw
                const img = state.ledMatrixState.image;
                const br = state.ledMatrixState.brigthness != undefined ? state.ledMatrixState.brigthness : 255;
                this.leds.forEach((led, i) => {
                    const sel = (<SVGStyleElement><any>led)
                    let imgbr = bw ? (img.data[i] > 0 ? br : 0) : img.data[i];
                    // correct brightness
                    const opacity = imgbr > 0 ? imgbr / 255 * 155 + 100 : 0;
                    const transfrom = imgbr > 0 ? imgbr / 255 * 0.4 + 0.6 : 0;
                    sel.style.opacity = (opacity / 255) + "";
                    if (transfrom > 0) {
                        (sel.style as any).transformBox = 'fill-box';
                        sel.style.transformOrigin = '50% 50%';
                        sel.style.transform = `scale(${transfrom})`;
                    }
                })
            }
        }

        private updateGestures() {
            let state = this.board;
            if (state.accelerometerState.useShake && !this.shakeInitialized) {
                this.shakeInitialized = true;
                this.shakeButton.style.visibility = "visible";
                accessibility.makeFocusable(this.shakeButton);
                svg.fill(this.shakeButton, this.props.theme.virtualButtonUp)
                pointerEvents.down.forEach(evid => this.shakeButton.addEventListener(evid, ev => {
                    let state = this.board;
                    svg.fill(this.shakeButton, this.props.theme.buttonDown);
                }));
                this.shakeButton.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    svg.fill(this.shakeButton, this.props.theme.virtualButtonUp);
                })
                this.shakeButton.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    svg.fill(this.shakeButton, this.props.theme.virtualButtonUp);
                    this.board.accelerometerState.shake();
                })
                accessibility.enableKeyboardInteraction(this.shakeButton, undefined, () => {
                    this.board.accelerometerState.shake();
                });
                accessibility.setAria(this.shakeButton, "button", "Shake the board");
                this.shakeText = svg.child(this.g, "text", { x: 420, y: 122, class: "sim-text-small" }) as SVGTextElement;
                this.shakeText.textContent = "SHAKE";
            }
        }

        private updateMicrophone() {
            const b = board();
            if (!b
                || !b.microphoneState.sensorUsed)
                return;

            this.updateSoundLevel();
        }

        private updateRecordingActive() {
            const b = board();
            if (!b)
                return;

            let theme = this.props.theme;
            if (this.microphoneLed) {
                if (b.recordingState.currentlyRecording || b.microphoneState.soundLevelRequested) {
                    svg.fills([this.microphoneLed], theme.ledOn);
                    svg.filter(this.microphoneLed, `url(#ledglow)`);
                } else if (!(b.microphoneState.onSoundRegistered || b.microphoneState.soundLevelRequested)) {
                    svg.fills([this.microphoneLed], theme.ledOff);
                    svg.filter(this.microphoneLed, `url(#none)`);
                }
            }
        }

        private updateButtonAB() {
            let state = this.board;
            if (state.buttonPairState.usesButtonAB && !this.buttonABText) {
                (<any>this.buttonsOuter[2]).style.visibility = "visible";
                (<any>this.buttons[2]).style.visibility = "visible";
                this.buttonABText = svg.child(this.g, "text", { class: "sim-text", x: 370, y: 272 }) as SVGTextElement;
                this.buttonABText.textContent = "A+B";
                this.updateTheme();
                this.positionV2Elements();
            }
        }

        private updatePin(pin: Pin, index: number) {
            if (!pin) return;
            let text = this.pinTexts[index];
            let v = "";
            if (pin.mode & PinFlags.Analog) {
                v = Math.floor(100 - (pin.value || 0) / 1023 * 100) + "%";
                if (text) text.textContent = (pin.period ? "~" : "") + (pin.value || 0) + "";
            }
            else if (pin.mode & PinFlags.Digital) {
                v = pin.value > 0 ? "0%" : "100%";
                if (text) text.textContent = pin.value > 0 ? "1" : "0";
            }
            else if (pin.mode & PinFlags.Touch) {
                v = pin.touched ? "0%" : "100%";
                if (text) text.textContent = "";
            } else {
                v = "100%";
                if (text) text.textContent = "";
            }
            if (v) svg.setGradientValue(this.pinGradients[index], v);

            if (pin.mode !== PinFlags.Unused) {
                accessibility.makeFocusable(this.pins[index]);
                accessibility.setAria(this.pins[index], "slider", this.pins[index].firstChild.textContent);
                this.pins[index].setAttribute("aria-valuemin", "0");
                this.pins[index].setAttribute("aria-valuemax", pin.mode & PinFlags.Analog ? "1023" : "100");
                this.pins[index].setAttribute("aria-orientation", "vertical");
                this.pins[index].setAttribute("aria-valuenow", text ? text.textContent : v);
                accessibility.setLiveContent(text ? text.textContent : v);
            }
        }

        private updateTemperature() {
            let state = this.board;
            if (!state || !state.thermometerState.usesTemperature) return;

            let tmin = -5;
            let tmax = 50;
            if (!this.thermometerInitialized) {
                this.thermometerInitialized = true;
                this.thermometer.style.visibility = "visible";
                this.thermometerText = svg.child(this.g, "text", { class: 'sim-text', x: 58, y: 130 }) as SVGTextElement;
                if (this.props.runtime)
                    this.props.runtime.environmentGlobals[pxsim.localization.lf("temperature")] = state.thermometerState.temperature;
                this.updateTheme();

                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.thermometer,
                    // move
                    (ev) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        let t = Math.max(0, Math.min(1, (260 - cur.y) / 140))
                        state.thermometerState.temperature = Math.floor(tmin + t * (tmax - tmin));
                        this.updateTemperature();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            ev.preventDefault();
                            state.thermometerState.temperature--;
                            if (state.thermometerState.temperature < -5) {
                                state.thermometerState.temperature = 50;
                            }
                            this.updateTemperature();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            ev.preventDefault();
                            state.thermometerState.temperature++;
                            if (state.thermometerState.temperature > 50) {
                                state.thermometerState.temperature = -5;
                            }
                            this.updateTemperature();
                        }
                    })

                accessibility.makeFocusable(this.thermometer);
                accessibility.setAria(this.thermometer, "slider", pxsim.localization.lf("Thermometer"));
                this.thermometer.setAttribute("aria-valuemin", "-5");
                this.thermometer.setAttribute("aria-valuemax", "50");
                this.thermometer.setAttribute("aria-orientation", "vertical");
                this.thermometer.setAttribute("aria-valuenow", "21");
                this.thermometer.setAttribute("aria-valuetext", "21°C");
            }

            let t = Math.max(tmin, Math.min(tmax, state.thermometerState.temperature))
            let per = Math.floor((state.thermometerState.temperature - tmin) / (tmax - tmin) * 100)
            svg.setGradientValue(this.thermometerGradient, 100 - per + "%");
            this.thermometerText.textContent = t + "°C";
            this.thermometer.setAttribute("aria-valuenow", t.toString());
            this.thermometer.setAttribute("aria-valuetext", t + "°C");
            accessibility.setLiveContent(t + "°C");
        }

        private updateSoundLevel() {
            let state = this.board;
            if (!state || !state.microphoneState.sensorUsed) return;

            const tmin = 0 // state.microphoneState.min;
            const tmax = 255 //state.microphoneState.max;
            if (!this.soundLevelInitialized) {
                this.soundLevelInitialized = true;
                this.soundLevel.style.visibility = "visible";
                const level = state.microphoneState.getLevel();
                this.soundLevelText = svg.child(this.g, "text", { class: 'sim-text', x: 370, y: 90 }) as SVGTextElement;
                if (this.props.runtime)
                    this.props.runtime.environmentGlobals[pxsim.localization.lf("sound level")] = state.microphoneState.getLevel();
                this.updateTheme();

                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.soundLevel,
                    // move
                    (ev) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        let t = Math.max(0, Math.min(1, (260 - cur.y) / 140))
                        state.microphoneState.setLevel(Math.floor(tmin + t * (tmax - tmin)));
                        this.updateMicrophone();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            ev.preventDefault();
                            state.microphoneState.setLevel(state.microphoneState.getLevel() - 1);
                            this.updateMicrophone();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            ev.preventDefault();
                            state.microphoneState.setLevel(state.microphoneState.getLevel() + 1)
                            this.updateMicrophone();
                        }
                    })

                accessibility.makeFocusable(this.soundLevel);
                accessibility.setAria(this.soundLevel, "slider", pxsim.localization.lf("Sound Level"));
                this.soundLevel.setAttribute("aria-valuemin", tmin + "");
                this.soundLevel.setAttribute("aria-valuemax", tmax + "");
                this.soundLevel.setAttribute("aria-orientation", "vertical");
                this.soundLevel.setAttribute("aria-valuenow", level + "");
                this.soundLevel.setAttribute("aria-valuetext", level + "");
            }

            let t = Math.max(tmin, Math.min(tmax, state.microphoneState.getLevel()))
            let per = Math.floor((state.microphoneState.getLevel() - tmin) / (tmax - tmin) * 100)
            svg.setGradientValue(this.soundLevelGradient, (100 - per) + "%");
            this.soundLevelText.textContent = t + "";
            this.soundLevel.setAttribute("aria-valuenow", t.toString());
            this.soundLevel.setAttribute("aria-valuetext", t + "");
            accessibility.setLiveContent(t + "");
        }

        private updateHeading() {
            let xc = 258;
            let yc = 75;
            let state = this.board;
            if (!state || !state.compassState.usesHeading) return;
            if (!this.headInitialized) {
                let p = this.heads[1];
                p.setAttribute("d", "m269.9,50.134647l0,0l-39.5,0l0,0c-14.1,0.1 -24.6,10.7 -24.6,24.8c0,13.9 10.4,24.4 24.3,24.7l0,0l39.6,0c14.2,0 40.36034,-22.97069 40.36034,-24.85394c0,-1.88326 -26.06034,-24.54606 -40.16034,-24.64606m-0.2,39l0,0l-39.3,0c-7.7,-0.1 -14,-6.4 -14,-14.2c0,-7.8 6.4,-14.2 14.2,-14.2l39.1,0c7.8,0 14.2,6.4 14.2,14.2c0,7.9 -6.4,14.2 -14.2,14.2l0,0l0,0z");
                this.updateTheme();
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(
                    this.head,
                    (ev: MouseEvent) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        state.compassState.heading = Math.floor(Math.atan2(cur.y - yc, cur.x - xc) * 180 / Math.PI) + 90;
                        if (state.compassState.heading < 0) state.compassState.heading += 360;
                        this.updateHeading();
                    });
                this.headInitialized = true;
            }

            let txt = state.compassState.heading.toString() + "°";
            if (txt != this.headText.textContent) {
                svg.rotateElement(this.head, xc, yc, state.compassState.heading - 180);
                this.headText.textContent = txt;
                if (this.props.runtime)
                    this.props.runtime.environmentGlobals[pxsim.localization.lf("heading")] = state.compassState.heading;
            }
        }

        private lastFlashTime: number = 0;
        public flashSystemLed() {
            if (!this.systemLed)
                this.systemLed = <SVGCircleElement>svg.child(this.g, "circle", { class: "sim-systemled", cx: 300, cy: 20, r: 5 })
            let now = Date.now();
            if (now - this.lastFlashTime > 150) {
                this.lastFlashTime = now;
                svg.animate(this.systemLed, "sim-flash")
            }
        }

        private lastAntennaFlash: number = 0;
        public flashAntenna() {
            if (!this.antennaInitialized) {
                this.antenna.style.visibility = "visible";
                this.antennaInitialized = true;
                const antennaWidth = ANTENNA_WAVE_PERIOD_X * ANTENNA_WAVE_COUNT;
                const valueMin = -128;
                const valueMax = -42;
                const setValue = (val: number) => {
                    const rs = Math.max(valueMin, Math.min(valueMax, val));
                    this.board.radioState.datagram.rssi = rs;
                    this.updateRSSI();
                }
                const pt = this.element.createSVGPoint();
                const mouseEventHandler = (ev: MouseEvent) => {
                    const state = this.board;
                    if (!state) return;
                    const pos = svg.cursorPoint(pt, this.element, ev);
                    setValue((-138 + (pos.x - ANTENNA_X) / antennaWidth * 100) | 0);
                };
                const keyboardEventHandler = (ev: KeyboardEvent) => {
                    const charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode;
                    const rs = this.board.radioState.datagram.rssi ?? -75;
                    if (charCode === 40 || charCode === 37) { // Down/Left arrow
                        ev.preventDefault();
                        setValue(rs - 1);
                    } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                        ev.preventDefault();
                        setValue(rs + 1);
                    }
                };

                svg.buttonEvents(this.antenna.children[0], mouseEventHandler, mouseEventHandler, mouseEventHandler, () => { });
                svg.buttonEvents(this.antenna.children[1], mouseEventHandler, mouseEventHandler, mouseEventHandler, () => { });
                this.antenna.addEventListener('keydown', keyboardEventHandler);

                accessibility.makeFocusable(this.antenna);
                accessibility.setAria(this.antenna, "slider", "RSSI");
                this.antenna.setAttribute("aria-valuemin", `${valueMin}`);
                this.antenna.setAttribute("aria-valuemax", `${valueMax}`);
                this.antenna.setAttribute("aria-orientation", "horizontal");
                this.antenna.setAttribute("aria-valuenow", "");
                accessibility.setLiveContent("");
            }
            let now = Date.now();
            if (now - this.lastAntennaFlash > 200) {
                this.lastAntennaFlash = now;
                svg.animate(this.antenna.children[1] as SVGElement, 'sim-flash-stroke')
            }
            this.updateRSSI();
        }

        private updateRSSI() {
            let state = this.board;
            if (!state) return;
            const v = state.radioState.datagram.rssi;
            if (v === undefined) return;

            if (!this.rssi) {
                let ayt = 10;
                let ayb = 40;
                for (let i = 0; i < 4; ++i)
                    svg.child(this.g, "rect", { x: ANTENNA_X - 90 + i * 6, y: ayt + 28 - i * 4, width: 4, height: 2 + i * 4, fill: "#fff" })
                this.rssi = svg.child(this.g, "text", { x: ANTENNA_X - 64, y: ayb, class: "sim-text" }) as SVGTextElement;
                this.rssi.textContent = "";
            }

            const vt = v.toString();
            if (vt !== this.rssi.textContent) {
                this.rssi.textContent = v.toString();
                this.antenna.setAttribute("aria-valuenow", this.rssi.textContent);
                accessibility.setLiveContent(this.rssi.textContent);
            }
        }

        private updatePins() {
            let state = this.board;
            if (!state) return;

            state.edgeConnectorState.pins.forEach((pin, i) => this.updatePin(pin, i));
        }

        private updateLightLevel() {
            let state = this.board;
            if (!state || !state.lightSensorState.usesLightLevel) return;

            if (!this.lightLevelInitialized) {
                this.lightLevelInitialized = true;
                this.lightLevelButton.style.visibility = "visible";
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.lightLevelButton,
                    // move
                    (ev) => {
                        let pos = svg.cursorPoint(pt, this.element, ev);
                        let rs = LIGHT_LEVEL_BUTTON_RADIUS / 2;
                        let level = Math.max(0, Math.min(255, Math.floor((pos.y - (LIGHT_LEVEL_BUTTON_POSITION_Y - rs)) / (2 * rs) * 255)));
                        if (level != this.board.lightSensorState.lightLevel) {
                            this.board.lightSensorState.lightLevel = level;
                            this.applyLightLevel();
                        }
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            ev.preventDefault();
                            this.board.lightSensorState.lightLevel--;
                            if (this.board.lightSensorState.lightLevel < 0) {
                                this.board.lightSensorState.lightLevel = 255;
                            }
                            this.applyLightLevel();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            ev.preventDefault();
                            this.board.lightSensorState.lightLevel++;
                            if (this.board.lightSensorState.lightLevel > 255) {
                                this.board.lightSensorState.lightLevel = 0;
                            }
                            this.applyLightLevel();
                        }
                    });
                this.lightLevelText = svg.child(this.g, "text", { x: 85, y: LIGHT_LEVEL_BUTTON_POSITION_Y + LIGHT_LEVEL_BUTTON_RADIUS - 5, text: '', class: 'sim-text' }) as SVGTextElement;
                if (this.props.runtime)
                    this.props.runtime.environmentGlobals[pxsim.localization.lf("lightLevel")] = state.lightSensorState.lightLevel;
                this.updateTheme();

                accessibility.makeFocusable(this.lightLevelButton);
                accessibility.setAria(this.lightLevelButton, "slider", "Light level");
                this.lightLevelButton.setAttribute("aria-valuemin", "0");
                this.lightLevelButton.setAttribute("aria-valuemax", "255");
                this.lightLevelButton.setAttribute("aria-orientation", "vertical");
                this.lightLevelButton.setAttribute("aria-valuenow", "128");
            }

            svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(state.lightSensorState.lightLevel * 100 / 255))) + '%')
            this.lightLevelText.textContent = state.lightSensorState.lightLevel.toString();
        }

        private applyLightLevel() {
            let lv = this.board.lightSensorState.lightLevel;
            svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(lv * 100 / 255))) + '%')
            this.lightLevelText.textContent = lv.toString();
            this.lightLevelButton.setAttribute("aria-valuenow", lv.toString());
            accessibility.setLiveContent(lv.toString());
        }

        findParentElement() {
            let el = this.element;
            while (el.parentNode && el.parentNode.nodeName == "svg")
                el = el.parentNode as SVGSVGElement;
            return el;
        }

        private updateTilt() {
            const state = this.board;
            if (!state || !state.accelerometerState.accelerometer.isActive) return;

            const acc = state.accelerometerState.accelerometer;
            const x = acc.getX();
            const y = -acc.getY();
            const z = acc.getZ();
            const af = 8 / 1023;
            const s = 1 - Math.min(0.1, Math.pow(Math.max(Math.abs(x), Math.abs(y)) / 1023, 2) / 35);

            acc.updateEnvironmentGlobals();

            // fix top parent and apply style to it
            const el = this.findParentElement();
            el.style.transform = `perspective(30em) rotateX(${y * af}deg) rotateY(${x * af}deg) scale(${s}, ${s})`
            el.style.perspectiveOrigin = "50% 50% 50%";
            el.style.perspective = "30em";

            // don't display acc data when AB is on, v2 is on or soundLevel is on
            if (state.buttonPairState.usesButtonAB
                || this.v2Circle
                || this.soundLevel) {
                if (this.accTextX) this.accTextX.textContent = "";
                if (this.accTextY) this.accTextY.textContent = "";
                if (this.accTextZ) this.accTextZ.textContent = "";
            } else {
                // update text
                if (acc.flags & AccelerometerFlag.X) {
                    if (!this.accTextX) {
                        this.accTextX = svg.child(this.g, "text", { x: 365, y: 260, class: "sim-text" }) as SVGTextElement;
                        this.accTextX.textContent = "";
                    }
                    this.accTextX.textContent = `ax:${x}`;
                }
                if (acc.flags & AccelerometerFlag.Y) {
                    if (!this.accTextY) {
                        this.accTextY = svg.child(this.g, "text", { x: 365, y: 285, class: "sim-text" }) as SVGTextElement;
                        this.accTextY.textContent = "";
                    }
                    this.accTextY.textContent = `ay:${-y}`;
                }
                if (acc.flags & AccelerometerFlag.Z) {
                    if (!this.accTextZ) {
                        this.accTextZ = svg.child(this.g, "text", { x: 365, y: 310, class: "sim-text" }) as SVGTextElement;
                        this.accTextZ.textContent = "";
                    }
                    this.accTextZ.textContent = `az:${z}`;
                }
            }
        }

        private buildDom() {
            this.domHardwareVersion = 1;
            this.element = <SVGSVGElement>svg.elt("svg")
            svg.hydrate(this.element, {
                "version": "1.0",
                "viewBox": `0 0 ${MB_WIDTH} ${MB_HEIGHT}`,
                "class": "sim",
                "x": "0px",
                "y": "0px",
                "width": MB_WIDTH + "px",
                "height": MB_HEIGHT + "px",
                "fill": "rgba(0,0,0,0)"
            });
            this.style = <SVGStyleElement>svg.child(this.element, "style", {});
            this.style.textContent = MB_STYLE + (this.props.theme.highContrast ? MB_HIGHCONTRAST : "");

            this.defs = <SVGDefsElement>svg.child(this.element, "defs", {});
            this.g = <SVGGElement>svg.elt("g");
            this.element.appendChild(this.g);

            // filters
            let ledglow = svg.child(this.defs, "filter", { id: "ledglow", x: "-75%", y: "-75%", width: "300%", height: "300%" });
            svg.child(ledglow, "feMorphology", { operator: "dilate", radius: "4", in: "SourceAlpha", result: "thicken" });
            svg.child(ledglow, "feGaussianBlur", { stdDeviation: "5", in: "thicken", result: "blurred" });
            svg.child(ledglow, "feFlood", { "flood-color": "rgb(255, 17, 77)", result: "glowColor" });
            svg.child(ledglow, "feComposite", { in: "glowColor", in2: "blurred", operator: "in", result: "ledglow_colored" });
            let ledglowMerge = svg.child(ledglow, "feMerge", {});
            svg.child(ledglowMerge, "feMergeNode", { in: "ledglow_colored" });
            svg.child(ledglowMerge, "feMergeNode", { in: "SourceGraphic" });

            let glow = svg.child(this.defs, "filter", { id: "filterglow", x: "-5%", y: "-5%", width: "120%", height: "120%" });
            svg.child(glow, "feGaussianBlur", { stdDeviation: "5", result: "glow" });
            let merge = svg.child(glow, "feMerge", {});
            for (let i = 0; i < 3; ++i) svg.child(merge, "feMergeNode", { in: "glow" })

            // outline
            this.pkg = svg.path(this.g, "sim-board", "M498,31.9C498,14.3,483.7,0,466.1,0H31.9C14.3,0,0,14.3,0,31.9v342.2C0,391.7,14.3,406,31.9,406h434.2c17.6,0,31.9-14.3,31.9-31.9V31.9z M14.3,206.7c-2.7,0-4.8-2.2-4.8-4.8c0-2.7,2.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8C19.2,204.6,17,206.7,14.3,206.7z M486.2,206.7c-2.7,0-4.8-2.2-4.8-4.8c0-2.72.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8C491,204.6,488.8,206.7,486.2,206.7z");
            svg.hydrate(this.pkg, { fill: "#111" });

            // script background
            this.display = svg.path(this.g, "sim-display", "M333.8,310.3H165.9c-8.3,0-15-6.7-15-15V127.5c0-8.3,6.7-15,15-15h167.8c8.3,0,15,6.7,15,15v167.8C348.8,303.6,342.1,310.3,333.8,310.3z");
            svg.hydrate(this.display, { fill: "#111" });

            this.logos = [];
            this.logos.push(svg.child(this.g, "polygon", { class: "sim-theme", points: "115,56.7 173.1,0 115,0" }));
            this.logos.push(svg.path(this.g, "sim-theme", "M114.2,0H25.9C12.1,2.1,0,13.3,0,27.7v83.9L114.2,0z"));
            this.logos.push(svg.child(this.g, "polygon", { class: "sim-theme", points: "173,27.9 202.5,0 173,0" }));
            this.logos.push(svg.child(this.g, "polygon", { class: "sim-theme", points: "54.1,242.4 54.1,274.1 22.4,274.1" }));
            this.logos.push(svg.child(this.g, "polygon", { class: "sim-theme", points: "446.2,164.6 446.2,132.8 477.9,132.8" }));

            // leds
            this.leds = [];
            this.ledsOuter = [];
            let left = 154, top = 113, ledoffw = 46, ledoffh = 44;
            for (let i = 0; i < 5; ++i) {
                let ledtop = i * ledoffh + top;
                for (let j = 0; j < 5; ++j) {
                    let ledleft = j * ledoffw + left;
                    let k = i * 5 + j;
                    this.ledsOuter.push(svg.child(this.g, "rect", { class: "sim-led-back", x: ledleft, y: ledtop, width: 10, height: 20, rx: 2, ry: 2 }));
                    let led = svg.child(this.g, "rect", { class: "sim-led", x: ledleft - 2, y: ledtop - 2, width: 14, height: 24, rx: 3, ry: 3, title: `(${j},${i})` });
                    svg.filter(led, `url(#ledglow)`)
                    this.leds.push(led);
                }
            }

            // Order of construction affects tab ordering
            this.buildLightLevelElement();
            this.buildAntennaElement();
            this.buildHeadElement();
            this.buildThermometerElement();
            this.buildSoundLevel();
            this.buildShakeElement();
            this.buildButtonElements();
            this.buildPinElements();
        }

        private buildAntennaElement() {
            this.antenna = svg.child(this.g, "g", { class: "sim-antenna-outer" });

            const ayt = 10;
            const ayb = 40;
            const antennaWidth = ANTENNA_WAVE_PERIOD_X * ANTENNA_WAVE_COUNT;
            const borderOffset = 3;

            svg.child(this.antenna, "rect", {
                x: ANTENNA_X - borderOffset,
                y: ayt - borderOffset,
                width: antennaWidth + 2 * borderOffset,
                height: ayb - ayt + 2 * borderOffset,
                fill: "transparent",
                rx: 2
            });

            let ax = ANTENNA_X;
            const dax = ANTENNA_WAVE_PERIOD_X;
            svg.child(this.antenna, "polyline", { class: "sim-antenna", points: `${ax},${ayb} ${ax},${ayt} ${ax += dax},${ayt} ${ax},${ayb} ${ax += dax},${ayb} ${ax},${ayt} ${ax += dax},${ayt} ${ax},${ayb} ${ax += dax},${ayb} ${ax},${ayt} ${ax += dax},${ayt}` });
            this.antenna.style.visibility = "hidden";
        }

        private buildSoundLevel() {
            let gid = "gradient-soundlevel";
            this.soundLevelGradient = svg.linearGradient(this.defs, gid);
            this.soundLevel = <SVGRectElement>svg.child(this.g, "rect", {
                class: "sim-thermometer no-drag",
                x: 360,
                y: 110,
                width: 20,
                height: 160,
                rx: 5, ry: 5,
                fill: `url(#${gid})`
            });
            this.soundLevel.style.visibility = "hidden";
        }

        private buildThermometerElement() {
            let gid = "gradient-thermometer";
            this.thermometerGradient = svg.linearGradient(this.defs, gid);
            this.thermometer = <SVGRectElement>svg.child(this.g, "rect", {
                class: "sim-thermometer no-drag",
                x: 120,
                y: 110,
                width: 20,
                height: 160,
                rx: 5, ry: 5,
                fill: `url(#${gid})`
            });
            this.thermometer.style.visibility = "hidden";
        }

        private buildLightLevelElement() {
            let gid = "gradient-light-level";
            this.lightLevelGradient = svg.linearGradient(this.defs, gid);
            this.lightLevelButton = svg.child(this.g, "circle", {
                cx: `50px`, cy: `${LIGHT_LEVEL_BUTTON_POSITION_Y}px`, r: `${LIGHT_LEVEL_BUTTON_RADIUS}px`,
                class: 'sim-light-level-button no-drag',
                fill: `url(#${gid})`
            }) as SVGCircleElement;
            this.lightLevelButton.style.visibility = "hidden";
        }

        private buildHeadElement() {
            // head
            this.head = <SVGGElement>svg.child(this.g, "g", { class: "sim-head" });
            svg.child(this.head, "ellipse", { cx: 251, cy: 75, rx: 75, ry: 35, fill: "transparent" })
            this.headParts = <SVGGElement>svg.child(this.head, "g", {});
            this.heads = []
            // background
            this.heads.push(svg.path(this.headParts, "sim-button", "M 269.9 50.2 L 269.9 50.2 l -39.5 0 v 0 c -14.1 0.1 -24.6 10.7 -24.6 24.8 c 0 13.9 10.4 24.4 24.3 24.7 v 0 h 39.6 c 14.2 0 24.8 -10.6 24.8 -24.7 C 294.5 61 284 50.3 269.9 50.2 M 269.7 89.2"));
            // shapes
            this.heads.push(svg.path(this.headParts, "sim-theme", "M269.9,50.2L269.9,50.2l-39.5,0v0c-14.1,0.1-24.6,10.7-24.6,24.8c0,13.9,10.4,24.4,24.3,24.7v0h39.6c14.2,0,24.8-10.6,24.8-24.7C294.5,61,284,50.3,269.9,50.2 M269.7,89.2L269.7,89.2l-39.3,0c-7.7-0.1-14-6.4-14-14.2c0-7.8,6.4-14.2,14.2-14.2h39.1c7.8,0,14.2,6.4,14.2,14.2C283.9,82.9,277.5,89.2,269.7,89.2"));
            this.heads.push(svg.path(this.headParts, "sim-theme", "M230.6,69.7c-2.9,0-5.3,2.4-5.3,5.3c0,2.9,2.4,5.3,5.3,5.3c2.9,0,5.3-2.4,5.3-5.3C235.9,72.1,233.5,69.7,230.6,69.7"));
            this.heads.push(svg.path(this.headParts, "sim-theme", "M269.7,80.3c2.9,0,5.3-2.4,5.3-5.3c0-2.9-2.4-5.3-5.3-5.3c-2.9,0-5.3,2.4-5.3,5.3C264.4,77.9,266.8,80.3,269.7,80.3"));
            this.headText = <SVGTextElement>svg.child(this.g, "text", { x: 160, y: 60, class: "sim-text" })
        }

        private buildPinElements() {
            // https://www.microbit.co.uk/device/pins
            // The order of this.pins must match the edgeConnectorState.pins order.
            // The draw order must match the desired tab order. To this end we
            // create the drawlist in sim order and evaluate it in tab order.

            // P0, P1, P2
            let drawList: (() => SVGElement)[] = [
                "M16.5,341.2c0,0.4-0.1,0.9-0.1,1.3v60.7c4.1,1.7,8.6,2.7,12.9,2.7h34.4v-64.7c0,0,0-0.1,0-0.1c0-13-10.6-23.6-23.7-23.6C27.2,317.6,16.5,328.1,16.5,341.2z M21.2,341.6c0-10.7,8.7-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3c0,10.7-8.6,19.3-19.3,19.3C29.9,360.9,21.2,352.2,21.2,341.6z",
                "M139.1,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h46.2v-65.6C162.2,327.7,151.9,317.3,139.1,317.3zM139.3,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C158.6,351.5,150,360.1,139.3,360.1z",
                "M249,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h46.2v-65.6C272.1,327.7,261.8,317.3,249,317.3z M249.4,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C268.7,351.5,260.1,360.1,249.4,360.1z"
            ].map((p) => () => svg.path(this.g, "sim-pin sim-pin-touch", p));

            // P3
            drawList.push(() => svg.path(this.g, "sim-pin", "M0,357.7v19.2c0,10.8,6.2,20.2,14.4,25.2v-44.4H0z"));

            pins4onXs.forEach(x => {
                drawList.push(() => svg.child(this.g, "rect", { x: x, y: 356.7, width: 10, height: 50, class: "sim-pin" }));
            });

            drawList.push(() => svg.path(this.g, "sim-pin", "M483.6,402c8.2-5,14.4-14.4,14.4-25.1v-19.2h-14.4V402z"));
            drawList.push(() => svg.path(this.g, "sim-pin", "M359.9,317.3c-12.8,0-22.1,10.3-23.1,23.1V406H383v-65.6C383,327.7,372.7,317.3,359.9,317.3z M360,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C379.3,351.5,370.7,360.1,360,360.1z"));
            drawList.push(() => svg.path(this.g, "sim-pin", "M458,317.6c-13,0-23.6,10.6-23.6,23.6c0,0,0,0.1,0,0.1h0V406H469c4.3,0,8.4-1,12.6-2.7v-60.7c0-0.4,0-0.9,0-1.3C481.6,328.1,471,317.6,458,317.6z M457.8,360.9c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C477.1,352.2,468.4,360.9,457.8,360.9z"));

            this.pins = pinDrawOrder.reduce((pins, pinName) => {
                const simPinIndex = pinNames.indexOf(pinName);
                const newPin = drawList[simPinIndex]();
                svg.hydrate(newPin, { title: pinTitles[simPinIndex] });
                pins[simPinIndex] = newPin;
                return pins;
            }, new Array(pinDrawOrder.length));

            this.pinGradients = this.pins.map((pin, i) => {
                let gid = "gradient-pin-" + i
                let lg = svg.linearGradient(this.defs, gid)
                pin.setAttribute("fill", `url(#${gid})`);
                return lg;
            });

            this.pinTexts = [67, 165, 275].map(x => <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin", x: x, y: 345 }));
        }

        private buildShakeElement() {
            this.shakeButton = svg.child(this.g, "circle", {
                cx: 404,
                cy: 115,
                r: 12,
                class: "sim-shake",
            }) as SVGCircleElement;
            this.shakeButton.style.visibility = "hidden";
        }

        private buildButtonElements() {
            this.buttonsOuter = []; this.buttons = [];

            const outerBtn = (left: number, top: number, label: string) => {
                const btnr = 4;
                const btnw = 56.2;
                const btnn = 6;
                const btnnm = 10
                let btng = svg.child(this.g, "g", { class: "sim-button-group" });
                accessibility.makeFocusable(btng);
                accessibility.setAria(btng, "button", label);
                this.buttonsOuter.push(btng);
                svg.child(btng, "rect", { class: "sim-button-outer", x: left, y: top, rx: btnr, ry: btnr, width: btnw, height: btnw });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnnm, r: btnn });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnw - btnnm, r: btnn });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnw - btnnm, r: btnn });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnnm, r: btnn });
            }

            outerBtn(25.9, 176.4, "A");
            this.buttons.push(svg.path(this.g, "sim-button", "M69.7,203.5c0,8.7-7,15.7-15.7,15.7s-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7S69.7,194.9,69.7,203.5"));
            outerBtn(418.1, 176.4, "B");
            this.buttons.push(svg.path(this.g, "sim-button", "M461.9,203.5c0,8.7-7,15.7-15.7,15.7c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7C454.9,187.8,461.9,194.9,461.9,203.5"));
            outerBtn(417, 250, "A+B");
            this.buttons.push(svg.child(this.g, "circle", { class: "sim-button", cx: 446, cy: 278, r: 16.5 }));
            (<any>this.buttonsOuter[2]).style.visibility = "hidden";
            (<any>this.buttons[2]).style.visibility = "hidden";
            this.buttons.forEach(btn => svg.hydrate(btn, { fill: "#111" }));

            svg.path(this.g, "sim-label", "M35.7,376.4c0-2.8,2.1-5.1,5.5-5.1c3.3,0,5.5,2.4,5.5,5.1v4.7c0,2.8-2.2,5.1-5.5,5.1c-3.3,0-5.5-2.4-5.5-5.1V376.4zM43.3,376.4c0-1.3-0.8-2.3-2.2-2.3c-1.3,0-2.1,1.1-2.1,2.3v4.7c0,1.2,0.8,2.3,2.1,2.3c1.3,0,2.2-1.1,2.2-2.3V376.4z");
            svg.path(this.g, "sim-label", "M136.2,374.1c2.8,0,3.4-0.8,3.4-2.5h2.9v14.3h-3.4v-9.5h-3V374.1z");
            svg.path(this.g, "sim-label", "M248.6,378.5c1.7-1,3-1.7,3-3.1c0-1.1-0.7-1.6-1.6-1.6c-1,0-1.8,0.6-1.8,2.1h-3.3c0-2.6,1.8-4.6,5.1-4.6c2.6,0,4.9,1.3,4.9,4.3c0,2.4-2.3,3.9-3.8,4.7c-2,1.3-2.5,1.8-2.5,2.9h6.1v2.7h-10C244.8,381.2,246.4,379.9,248.6,378.5z");

            svg.path(this.g, "sim-button-label", "M48.1,270.9l-0.6-1.7h-5.1l-0.6,1.7h-3.5l5.1-14.3h3.1l5.2,14.3H48.1z M45,260.7l-1.8,5.9h3.5L45,260.7z");
            svg.path(this.g, "sim-button-label", "M449.1,135.8h5.9c3.9,0,4.7,2.4,4.7,3.9c0,1.8-1.4,2.9-2.5,3.2c0.9,0,2.6,1.1,2.6,3.3c0,1.5-0.8,4-4.7,4h-6V135.8zM454.4,141.7c1.6,0,2-1,2-1.7c0-0.6-0.3-1.7-2-1.7h-2v3.4H454.4z M452.4,144.1v3.5h2.1c1.6,0,2-1,2-1.8c0-0.7-0.4-1.8-2-1.8H452.4z")

            svg.path(this.g, "sim-label", "M352.1,381.1c0,1.6,0.9,2.5,2.2,2.5c1.2,0,1.9-0.9,1.9-1.9c0-1.2-0.6-2-2.1-2h-1.3v-2.6h1.3c1.5,0,1.9-0.7,1.9-1.8c0-1.1-0.7-1.6-1.6-1.6c-1.4,0-1.8,0.8-1.8,2.1h-3.3c0-2.4,1.5-4.6,5.1-4.6c2.6,0,5,1.3,5,4c0,1.6-1,2.8-2.1,3.2c1.3,0.5,2.3,1.6,2.3,3.5c0,2.7-2.4,4.3-5.2,4.3c-3.5,0-5.5-2.1-5.5-5.1H352.1z")
            svg.path(this.g, "sim-label", "M368.5,385.9h-3.1l-5.1-14.3h3.5l3.1,10.1l3.1-10.1h3.6L368.5,385.9z")
            svg.path(this.g, "sim-label", "M444.4,378.3h7.4v2.5h-1.5c-0.6,3.3-3,5.5-7.1,5.5c-4.8,0-7.5-3.5-7.5-7.5c0-3.9,2.8-7.5,7.5-7.5c3.8,0,6.4,2.3,6.6,5h-3.5c-0.2-1.1-1.4-2.2-3.1-2.2c-2.7,0-4.1,2.3-4.1,4.7c0,2.5,1.4,4.7,4.4,4.7c2,0,3.2-1.2,3.4-2.7h-2.5V378.3z")
            svg.path(this.g, "sim-label", "M461.4,380.9v-9.3h3.3v14.3h-3.5l-5.2-9.2v9.2h-3.3v-14.3h3.5L461.4,380.9z")
            svg.path(this.g, "sim-label", "M472.7,371.6c4.8,0,7.5,3.5,7.5,7.2s-2.7,7.2-7.5,7.2h-5.3v-14.3H472.7z M470.8,374.4v8.6h1.8c2.7,0,4.2-2.1,4.2-4.3s-1.6-4.3-4.2-4.3H470.8z")
        }

        private updateHardwareVersion() {
            // check if microphone has been used
            const b = this.board;
            if (!b) return;
            if (b.microphoneState.sensorUsed)
                b.ensureHardwareVersion(2);

            // check current version
            const version = this.board.hardwareVersion;
            if (version === this.domHardwareVersion) return;

            this.domHardwareVersion = this.board.hardwareVersion;
            // v2 skinning
            // don't use yellow theme
            if (this.props.theme.accent === "#FFD43A") {
                this.props.theme = themes[0];
            }

            // display v2 indicator
            const title = pxsim.localization.lf("micro:bit v2 needed")
            this.v2Circle = <SVGCircleElement>svg.child(this.g, "circle", { r: 21, title: title });
            svg.fill(this.v2Circle, "white");
            this.v2Text = <SVGTextElement>svg.child(this.g, "text", { class: "sim-text", title: title });
            this.v2Text.textContent = "V2";
            svg.fill(this.v2Text, "black");
            this.v2Text.style.fontWeight = "700";

            // update pins
            // notch: 46.2 -> h 7 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 7
            this.pins[0].setAttribute("d", "M 16.5 341.2 c 0 0.4 -0.1 0.9 -0.1 1.3 v 60.7 c 2.6 1.8 4.6 2.8 8.6 2.8 c 0 0 -1 -9 8 -8 l 16 0 c 0 0 9 -1 8 8 h 8 v -64.7 c 0 0 0 -0.1 0 -0.1 c 0 -13 -10.6 -23.6 -23.7 -23.6 C 27.2 317.6 16.5 328.1 16.5 341.2 z M 21.2 341.6 c 0 -10.7 8.7 -19.3 19.3 -19.3 c 10.7 0 19.3 8.7 19.3 19.3 c 0 10.7 -8.6 19.3 -19.3 19.3 C 29.9 360.9 21.2 352.2 21.2 341.6 z")
            this.pins[1].setAttribute("d", "M139.1,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h 6 c 0 0 -1 -9 8 -8 l 17 0 c 0 0 9 -1 8 8 h 7v-65.6C162.2,327.7,151.9,317.3,139.1,317.3zM139.3,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C158.6,351.5,150,360.1,139.3,360.1z");
            this.pins[2].setAttribute("d", "M249,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h 6 c 0 0 -1 -9 8 -8 l 17 0 c 0 0 9 -1 8 8 h 7v-65.6C272.1,327.7,261.8,317.3,249,317.3z M249.4,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C268.7,351.5,260.1,360.1,249.4,360.1z");

            // 3v
            this.pins[this.pins.length - 2].setAttribute("d", "M359.9,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h 7 c 0 0 -1 -9 8 -8 l 17 0 c 0 0 9 -1 8 8 h 7v-65.6C383,327.7,372.7,317.3,359.9,317.3z M360,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C379.3,351.5,370.7,360.1,360,360.1z")
            this.pins[this.pins.length - 1].setAttribute("d", "M 458 317.6 c -13 0 -23.6 10.6 -23.6 23.6 c 0 0 0 0.1 0 0.1 h 0 V 406 h 7 c 0 0 -1 -9 8 -8 l 17 0 c 0 0 9 -1 8 8 h 1.6 c 2 0 4 -1 5 -3 v -60.7 c 0 -0.4 0 -0.9 0 -1.3 C 481.6 328.1 471 317.6 458 317.6 z M 457.8 360.9 c -10.7 0 -19.3 -8.6 -19.3 -19.3 c 0 -10.7 8.6 -19.3 19.3 -19.3 c 10.7 0 19.3 8.7 19.3 19.3 C 477.1 352.2 468.4 360.9 457.8 360.9 z")

            // outline
            this.pkg.setAttribute("d", "M 498 31.9 C 498 14.3 483.7 0 466.1 0 H 31.9 C 14.3 0 0 14.3 0 31.9 v 342.2 C -1 399 21 405 23 406 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 7 h 50 h 7 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 7 h 63 h 7 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 7 h 64 h 7 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 7 h 51 h 5 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 0 c 9 0 23 -17 23 -31 V 31.9 z M 14.3 206.7 c -2.7 0 -4.8 -2.2 -4.8 -4.8 c 0 -2.7 2.2 -4.8 4.8 -4.8 c 2.7 0 4.8 2.2 4.8 4.8 C 19.2 204.6 17 206.7 14.3 206.7 z M 486.2 206.7 c -2.7 0 -4.8 -2.2 -4.8 -4.8 c 0 -2.72 0.2 -4.8 4.8 -4.8 c 2.7 0 4.8 2.2 4.8 4.8 C 491 204.6 488.8 206.7 486.2 206.7 z")

            const headTitle = pxsim.localization.lf("logo touch (micro:bit v2 needed)")
            accessibility.makeFocusable(this.headParts);
            accessibility.setAria(this.headParts, "button", headTitle);
            this.headParts.setAttribute("class", "sim-button-outer sim-button-group")
            this.attachButtonEvents(this.board.logoTouch, this.headParts, this.headParts);
            document.body.addEventListener(pointerEvents.down[0], this.moveHeadingOnClick);

            // microphone led
            const microphoneTitle = pxsim.localization.lf("microphone (micro:bit v2 needed)")
            const microg = svg.child(this.g, "g", { title: microphoneTitle })
            this.microphoneLed = svg.path(microg, "sim-led sim-mic", "M 352.852 71 C 351.315 71 350.07 72.248 350.07 73.784 V 79.056 C 350.07 80.594 351.316 81.838 352.852 81.838 C 354.387 81.838 355.634 80.593 355.634 79.056 V 73.784 C 355.634 72.248 354.387 71 352.852 71 Z M 346.743 79.981 C 346.743 82.84 348.853 85.062 351.501 85.658 V 87.095 H 348.448 V 89.329 H 357.366 V 87.095 H 354.306 V 85.658 C 356.954 85.064 359.071 82.842 359.071 79.981 H 357.057 C 357.057 82.174 355.168 83.81 352.905 83.81 C 350.64 83.81 348.757 82.173 348.757 79.981 Z");
            svg.fills([this.microphoneLed], this.props.theme.ledOff);
            // ring
            const microhole = svg.child(this.g, "circle", { cx: 336, cy: 86, r: 3, stroke: "gold", strokeWidth: "1px" })
            svg.title(microhole, pxsim.localization.lf("microphone (micro:bit v2 needed)"))

            this.updateMicrophone();
            this.updateTheme();
        }

        private positionV2Elements() {
            if (this.v2Circle && this.v2Text) {
                const offsetFromAB = !!(this.board && this.board.buttonPairState.usesButtonAB);
                const x = offsetFromAB ? 385 : 458;
                const y = offsetFromAB ? 300 : 290;

                this.v2Circle.setAttribute("cx", "" + x);
                this.v2Circle.setAttribute("cy", "" + y);
                this.v2Text.setAttribute("x", `${x - 15}`);
                this.v2Text.setAttribute("y", `${y + 8}`);
            }

            if (this.soundLevel && this.buttonABText) {
                // hide A+B text
                this.buttonABText.setAttribute("x", "386")
                this.buttonABText.setAttribute("y", "274")
                this.buttonABText.style.fontSize = "95%"
            }
        }

        private attachEvents() {
            this.attachIFrameEvents();
            this.attachAccelerometerEvents();
            this.attachPinsIOEvents();
            this.attachPinsTouchEvents();
            this.attachABEvents();
            this.attachAPlusBEvents();
        }

        private attachIFrameEvents() {
            Runtime.messagePosted = (msg) => {
                switch (msg.type || "") {
                    case "serial": this.flashSystemLed(); break;
                    case "radiopacket": this.flashAntenna(); break;
                    case "eventbus":
                        if ((<pxsim.SimulatorEventBusMessage>msg).id == DAL.MES_BROADCAST_GENERAL_ID)
                            this.flashAntenna();
                        break;
                }
            }
        }

        private attachAccelerometerEvents() {
            let tiltDecayer: any =  undefined;
            this.element.addEventListener(pointerEvents.move, (ev: MouseEvent) => {
                const state = this.board;
                if (!state.accelerometerState.accelerometer.isActive) return;

                if (tiltDecayer) {
                    clearInterval(tiltDecayer);
                    tiltDecayer = 0;
                }

                const bbox = this.element.getBoundingClientRect();

                // ev.clientX and ev.clientY are not defined on mobile iOS
                const xPos = ev.clientX != null ? ev.clientX : ev.pageX;
                const yPos = ev.clientY != null ? ev.clientY : ev.pageY;

                const ax = (xPos - bbox.width / 2) / (bbox.width / 3);
                const ay = (yPos - bbox.height / 2) / (bbox.height / 3);

                const x = - Math.max(- 1023, Math.min(1023, Math.floor(ax * 1023)));
                const y = - Math.max(- 1023, Math.min(1023, Math.floor(ay * 1023)));
                const z2 = 1023 * 1023 - x * x - y * y;
                const z = Math.floor((z2 > 0 ? -1 : 1) * Math.sqrt(Math.abs(z2)));

                state.accelerometerState.accelerometer.update(x, y, z);
                this.updateTilt();
            }, false);
            this.element.addEventListener(pointerEvents.leave, (ev: MouseEvent) => {
                let state = this.board;
                if (!state.accelerometerState.accelerometer.isActive) return;

                if (!tiltDecayer) {
                    tiltDecayer = setInterval(() => {
                        let accx = state.accelerometerState.accelerometer.getX(MicroBitCoordinateSystem.RAW);
                        accx = Math.floor(Math.abs(accx) * 0.85) * (accx > 0 ? 1 : -1);
                        let accy = state.accelerometerState.accelerometer.getY(MicroBitCoordinateSystem.RAW);
                        accy = Math.floor(Math.abs(accy) * 0.85) * (accy > 0 ? 1 : -1);
                        let accz = -Math.sqrt(Math.max(0, 1023 * 1023 - accx * accx - accy * accy));
                        if (Math.abs(accx) <= 24 && Math.abs(accy) <= 24) {
                            clearInterval(tiltDecayer);
                            tiltDecayer = 0;
                            accx = 0;
                            accy = 0;
                            accz = -1023;
                        }
                        state.accelerometerState.accelerometer.update(accx, accy, accz);
                        this.updateTilt();
                    }, 50)
                }
            }, false);
        }

        private attachPinsIOEvents() {
            this.pins.forEach((pin, index) => {
                if (!this.board.edgeConnectorState.pins[index]) return;
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(pin,
                    // move
                    ev => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        if (pin.mode & PinFlags.Input) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let v = (400 - cursor.y) / 40 * 1023
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        this.updatePin(pin, index);
                    },
                    // start
                    ev => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        U.addClass(svgpin, "touched");
                        if (pin.mode & PinFlags.Input) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let v = (400 - cursor.y) / 40 * 1023
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        this.updatePin(pin, index);
                    },
                    // stop
                    (ev: MouseEvent) => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        U.removeClass(svgpin, "touched");
                        this.updatePin(pin, index);
                        return false;
                    },
                    // keydown
                    (ev: KeyboardEvent) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];

                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            ev.preventDefault();
                            pin.value -= 10;
                            if (pin.value < 0) {
                                pin.value = 1023;
                            }
                            this.updatePin(pin, index);
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            ev.preventDefault();
                            pin.value += 10;
                            if (pin.value > 1023) {
                                pin.value = 0;
                            }
                            this.updatePin(pin, index);
                        }
                    });
            })
        }

        private attachPinsTouchEvents() {
            this.pins.slice(0, 3).forEach((btn, index) => {
                let pressedTime: number;
                pointerEvents.down.forEach(evid => btn.addEventListener(evid, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = true;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                    pressedTime = runtime.runningTime()
                }));
                btn.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = false;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                })
                btn.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = false;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    const currentTime = runtime.runningTime()
                    if (currentTime - pressedTime > DAL.DEVICE_BUTTON_LONG_CLICK_TIME)
                        this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_LONG_CLICK);
                    else
                        this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                    pressedTime = undefined;
                })
                accessibility.enableKeyboardInteraction(btn, undefined, () => {
                    let state = this.board;
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                });
            })
        }

        private attachABEvents() {
            const bpState = this.board.buttonPairState;
            const stateButtons: Button[] = [bpState.aBtn, bpState.bBtn];
            const elButtonOuters = this.buttonsOuter.slice(0, 2);
            const elButtons = this.buttons.slice(0, 2);

            elButtonOuters.forEach((btn, index) => {
                this.attachButtonEvents(stateButtons[index], btn, elButtons[index]);
            });
        }

        attachButtonEvents(stateButton: Button, buttonOuter: SVGElement, elButton: SVGElement) {
            let pressedTime: number;
            pointerEvents.down.forEach(evid => buttonOuter.addEventListener(evid, ev => {
                // console.log(`down ${stateButton.id}`)
                stateButton.pressed = true;
                svg.fill(elButton, this.props.theme.buttonDown);
                this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                pressedTime = runtime.runningTime()
            }));
            buttonOuter.addEventListener(pointerEvents.leave, ev => {
                stateButton.pressed = false;
                svg.fill(elButton, this.props.theme.buttonUp);
            })
            buttonOuter.addEventListener(pointerEvents.up, ev => {
                stateButton.pressed = false;
                svg.fill(elButton, this.props.theme.buttonUp);
                this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_UP);
                const currentTime = runtime.runningTime()
                if (currentTime - pressedTime > DAL.DEVICE_BUTTON_LONG_CLICK_TIME)
                    this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_LONG_CLICK);
                else
                    this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                pressedTime = undefined;
            })
            accessibility.enableKeyboardInteraction(buttonOuter, undefined, () => {
                this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_UP);
                this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_CLICK);
            });
        }

        private attachAPlusBEvents() {
            const bpState = this.board.buttonPairState;

            let pressedTime: number;
            // A+B
            pointerEvents.down.forEach(evid => this.buttonsOuter[2].addEventListener(evid, ev => {
                bpState.aBtn.pressed = true;
                bpState.bBtn.pressed = true;
                bpState.abBtn.pressed = true;
                svg.fill(this.buttons[0], this.props.theme.buttonDown);
                svg.fill(this.buttons[1], this.props.theme.buttonDown);
                svg.fill(this.buttons[2], this.props.theme.buttonDown);
                this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                pressedTime = runtime.runningTime()
            }));
            this.buttonsOuter[2].addEventListener(pointerEvents.leave, ev => {
                bpState.aBtn.pressed = false;
                bpState.bBtn.pressed = false;
                bpState.abBtn.pressed = false;
                svg.fill(this.buttons[0], this.props.theme.buttonUp);
                svg.fill(this.buttons[1], this.props.theme.buttonUp);
                svg.fill(this.buttons[2], this.props.theme.virtualButtonUp);
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.up, ev => {
                bpState.aBtn.pressed = false;
                bpState.bBtn.pressed = false;
                bpState.abBtn.pressed = false;
                svg.fill(this.buttons[0], this.props.theme.buttonUp);
                svg.fill(this.buttons[1], this.props.theme.buttonUp);
                svg.fill(this.buttons[2], this.props.theme.virtualButtonUp);

                this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_UP);
                const currentTime = runtime.runningTime()
                if (currentTime - pressedTime > DAL.DEVICE_BUTTON_LONG_CLICK_TIME)
                    this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_LONG_CLICK);
                else
                    this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                pressedTime = undefined;
            })
            accessibility.enableKeyboardInteraction(this.buttonsOuter[2], undefined, () => {
                this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_UP);
                this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_CLICK);
            });
        }
    }
}
