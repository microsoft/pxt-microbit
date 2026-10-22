/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../libs/core/dal.d.ts"/>
/// <reference path="../libs/core/enums.d.ts"/>
/// <reference path="state/dalboardstate.ts"/>

namespace pxsim {
    export class DalBoard extends DalBoardState implements samples.SampleBoard {
        recordingState: RecordingState;
        samplesState: samples.SamplesState;

        constructor() {
            super();
            this.builtinParts["recording"] = this.recordingState = new RecordingState();
            this.samplesState = new samples.SamplesState();
        }
    }

    export class DalBoardView implements BoardView {
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

    export function board(): DalBoard {
        return runtime.board as DalBoard;
    }

    export function boardView(): DalBoardView {
        return runtime.boardView as DalBoardView;
    }

    export function parsePinString(gpioPin: string): Pin {
        if (gpioPin == "*")
            return board().edgeConnectorState.getPin(DAL.MICROBIT_ID_IO_P0);

        const m = /^(Analog|Digital)Pin\.P(\d)+/.exec(gpioPin);
        if (!m)
            return undefined;
        const pinNum = parseInt(m[2]);
        return board().edgeConnectorState.pins[pinNum]
    }
}