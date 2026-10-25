/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>
/// <reference path="../../libs/core/enums.d.ts"/>
/// <reference path="../core/dalboardstate.ts"/>
/// <reference path="../core/boardaccess.ts"/>

namespace pxsim {
    const disabledHeadphoneSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <clipPath id="bounds" clipPathUnits="userSpaceOnUse">
        <circle cx="50" cy="50" r="45" />
        </clipPath>
        <circle cx="50" cy="50" r="40" stroke-width="10" stroke="red" fill="none" clip-path="url(#bounds)" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="red" stroke-width="10" clip-path="url(#bounds)" />
    </svg>
    `

    export class DalBoardView implements DalBoardViewContract {
        viewHost: visuals.BoardHost;
        view: SVGElement;
        builtinVisuals: Map<() => any> = {};
        builtinPartVisuals: Map<(xy: visuals.Coord) => any> = {};
        private updateSubscribers: (() => void)[] = [];

        constructor(private state: DalBoardState) {
            this.builtinVisuals["buttonpair"] = () => new visuals.ButtonPairView();
            this.builtinVisuals["ledmatrix"] = () => new visuals.LedMatrixView();
            this.builtinVisuals["microservo"] = () => new visuals.MicroServoView();
            this.builtinVisuals["neopixel"] = () => new visuals.NeoPixelView(pxsim.parsePinString);

            this.builtinPartVisuals["neopixel"] = (xy: visuals.Coord) => visuals.mkNeoPixelPart(xy);
            this.builtinPartVisuals["buttonpair"] = (xy: visuals.Coord) => visuals.mkBtnSvg(xy);
            this.builtinPartVisuals["ledmatrix"] = (xy: visuals.Coord) => visuals.mkLedMatrixSvg(xy, 8, 8);
            this.builtinPartVisuals["microservo"] = (xy: visuals.Coord) => visuals.mkMicroServoPart(xy);
        }

        addUpdateSubscriber(subscriber: () => void) {
            this.updateSubscribers.push(subscriber);
        }

        updateView() {
            if (this.viewHost)
                this.viewHost.updateState();
            this.updateSubscribers.forEach(subscriber => subscriber());
        }

        initAsync(msg: SimulatorRunMessage): Promise<void> {
            const boardDef = msg.boardDefinition;
            const cmpsList = msg.parts;
            const cmpDefs = msg.partDefinitions || {};
            const fnArgs = msg.fnArgs;

            const v2Parts: pxt.Map<boolean> = {
                "microphone": true,
                "logotouch": true,
                "builtinspeaker": true,
                "flashlog": true,
                "v2": true
            };
            if (msg.builtinParts) {
                const v2PartsUsed = msg.builtinParts.filter(k => v2Parts[k])
                if (v2PartsUsed.length) {
                    console.log(`detected v2 feature`, v2PartsUsed);
                    cmpsList.push(...v2PartsUsed);
                    this.state.hardwareVersion = 2;
                }
            }

            const opts: visuals.BoardHostOpts = {
                state: this.state,
                builtinVisuals: this.builtinVisuals,
                boardDef: boardDef,
                partsList: cmpsList,
                partDefs: cmpDefs,
                fnArgs: fnArgs,
                maxWidth: "100%",
                maxHeight: "100%",
                highContrast: msg.highContrast
            };

            this.viewHost = new visuals.BoardHost(pxsim.visuals.mkBoardView({
                visual: boardDef.visual,
                boardDef: boardDef,
                highContrast: msg.highContrast
            }), opts);

            document.body.innerHTML = ""; // clear children
            if (shouldShowMute()) {
                document.body.appendChild(createMuteButton());
                AudioContextManager.mute(true);
                setParentMuteState("disabled");
            }
            this.view = this.viewHost.getView();
            document.body.appendChild(this.view);

            if (msg.theme === "mbcodal") {
                this.state.ensureHardwareVersion(2);
            }
            return Promise.resolve();
        }

        screenshotAsync(width?: number): Promise<ImageData> {
            return this.viewHost.screenshotAsync(width);
        }

        setAudioPinEnabled(enabled: boolean) {
            if (!this.viewHost) return;
            const headphone = this.viewHost.getView().querySelector("g.sim-headphone-cmp");

            if (headphone) {
                const existing = headphone.querySelector("#headphone-disabled");

                if (existing) {
                    if (enabled) {
                        existing.remove();
                    }
                    else {
                        return;
                    }
                }

                if (!enabled) {
                    const img = document.createElementNS("http://www.w3.org/2000/svg", "image") as SVGImageElement;
                    img.setAttribute("href", "data:image/svg+xml;utf8," + encodeURIComponent(disabledHeadphoneSVG))
                    img.setAttribute("id", "headphone-disabled");
                    img.style.transform = "scale(1.5) translate(-10px, -10px)";
                    headphone.appendChild(img)
                }
            }
        }

        kill() {
            if (this.viewHost) {
                this.viewHost.removeEventListeners();
                this.viewHost = undefined;
            }
            this.updateSubscribers = [];
        }
    }

    export function initRuntimeWithDalBoard() {
        U.assert(!runtime.board);
        let b = new DalBoard();
        runtime.boardView = new DalBoardView(b);
        runtime.board = b;
        runtime.postError = (e) => {
            led.setBrightness(255);
            let img = board().ledMatrixState.image;
            img.clear();
            img.set(0, 4, 255);
            img.set(1, 3, 255);
            img.set(2, 3, 255);
            img.set(3, 3, 255);
            img.set(4, 4, 255);
            img.set(0, 0, 255);
            img.set(1, 0, 255);
            img.set(0, 1, 255);
            img.set(1, 1, 255);
            img.set(3, 0, 255);
            img.set(4, 0, 255);
            img.set(3, 1, 255);
            img.set(4, 1, 255);
            runtime.updateDisplay();
        }
    }

    if (!pxsim.initCurrentRuntime) {
        pxsim.initCurrentRuntime = initRuntimeWithDalBoard;
    }
}