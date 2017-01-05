/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxsim {
    export class DalBoard extends CoreBoard {
        // state & update logic for component services
        ledMatrixState: LedMatrixState;
        edgeConnectorState: EdgeConnectorState;
        serialState: SerialState;
        accelerometerState: AccelerometerState;
        compassState: CompassState;
        thermometerState: ThermometerState;
        lightSensorState: LightSensorState;
        buttonPairState: ButtonPairState;
        radioState: RadioState;
        // TODO: not singletons
        neopixelState: NeoPixelState;
        servosState: MicroServosState;
        fileSystem: FileSystemState;

        constructor() {
            super()

            // components
            this.fileSystem = new FileSystemState();
            this.builtinParts["ledmatrix"] = this.ledMatrixState = new LedMatrixState(runtime);
            this.builtinParts["buttonpair"] = this.buttonPairState = new ButtonPairState({
                ID_BUTTON_A: DAL.MICROBIT_ID_BUTTON_A,
                ID_BUTTON_B: DAL.MICROBIT_ID_BUTTON_B,
                ID_BUTTON_AB: DAL.MICROBIT_ID_BUTTON_AB,
                BUTTON_EVT_UP: DAL.MICROBIT_BUTTON_EVT_UP,
                BUTTON_EVT_CLICK: DAL.MICROBIT_BUTTON_EVT_CLICK
            });
            this.builtinParts["edgeconnector"] = this.edgeConnectorState = new EdgeConnectorState({
                pins: [
                    DAL.MICROBIT_ID_IO_P0,
                    DAL.MICROBIT_ID_IO_P1,
                    DAL.MICROBIT_ID_IO_P2,
                    DAL.MICROBIT_ID_IO_P3,
                    DAL.MICROBIT_ID_IO_P4,
                    DAL.MICROBIT_ID_IO_P5,
                    DAL.MICROBIT_ID_IO_P6,
                    DAL.MICROBIT_ID_IO_P7,
                    DAL.MICROBIT_ID_IO_P8,
                    DAL.MICROBIT_ID_IO_P9,
                    DAL.MICROBIT_ID_IO_P10,
                    DAL.MICROBIT_ID_IO_P11,
                    DAL.MICROBIT_ID_IO_P12,
                    DAL.MICROBIT_ID_IO_P13,
                    DAL.MICROBIT_ID_IO_P14,
                    DAL.MICROBIT_ID_IO_P15,
                    DAL.MICROBIT_ID_IO_P16,
                    0,
                    0,
                    DAL.MICROBIT_ID_IO_P19,
                    DAL.MICROBIT_ID_IO_P20
                ]
            });
            this.builtinParts["radio"] = this.radioState = new RadioState(runtime);
            this.builtinParts["accelerometer"] = this.accelerometerState = new AccelerometerState(runtime);
            this.builtinParts["serial"] = this.serialState = new SerialState();
            this.builtinParts["thermometer"] = this.thermometerState = new ThermometerState();
            this.builtinParts["lightsensor"] = this.lightSensorState = new LightSensorState();
            this.builtinParts["compass"] = this.compassState = new CompassState();
            this.builtinParts["neopixel"] = this.neopixelState = new NeoPixelState();
            this.builtinParts["microservo"] = this.servosState = new MicroServosState({
                "P0": DAL.MICROBIT_ID_IO_P0,
                "P1": DAL.MICROBIT_ID_IO_P1,
                "P2": DAL.MICROBIT_ID_IO_P2,
                "P3": DAL.MICROBIT_ID_IO_P3
            });

            this.builtinVisuals["buttonpair"] = () => new visuals.ButtonPairView();
            this.builtinVisuals["ledmatrix"] = () => new visuals.LedMatrixView();
            this.builtinVisuals["neopixel"] = () => new visuals.NeoPixelView();
            this.builtinVisuals["microservo"] = () => new visuals.MicroServoView();

            this.builtinPartVisuals["buttonpair"] = (xy: visuals.Coord) => visuals.mkBtnSvg(xy);
            this.builtinPartVisuals["ledmatrix"] = (xy: visuals.Coord) => visuals.mkLedMatrixSvg(xy, 8, 8);
            this.builtinPartVisuals["neopixel"] = (xy: visuals.Coord) => visuals.mkNeoPixelPart(xy);
            this.builtinPartVisuals["microservo"] = (xy: visuals.Coord) => visuals.mkMicroServoPart(xy);
        }

        receiveMessage(msg: SimulatorMessage) {
            if (!runtime || runtime.dead) return;

            switch (msg.type || "") {
                case "eventbus":
                    let ev = <SimulatorEventBusMessage>msg;
                    this.bus.queue(ev.id, ev.eventid, ev.value);
                    break;
                case "serial":
                    let data = (<SimulatorSerialMessage>msg).data || "";
                    this.serialState.recieveData(data);
                    break;
                case "radiopacket":
                    let packet = <SimulatorRadioPacketMessage>msg;
                    this.radioState.recievePacket(packet);
                    break;
            }
        }

        initAsync(msg: SimulatorRunMessage): Promise<void> {
            super.initAsync(msg);

            const options = (msg.options || {}) as RuntimeOptions;

            const boardDef = msg.boardDefinition;
            const cmpsList = msg.parts;
            const cmpDefs = msg.partDefinitions || {};
            const fnArgs = msg.fnArgs;

            const opts: visuals.BoardHostOpts = {
                state: this,
                boardDef: boardDef,
                partsList: cmpsList,
                partDefs: cmpDefs,
                fnArgs: fnArgs,
                maxWidth: "100%",
                maxHeight: "100%",
            };
            const viewHost = new visuals.BoardHost(pxsim.visuals.mkBoardView({
                visual: boardDef.visual
            }), opts);

            document.body.innerHTML = ""; // clear children
            document.body.appendChild(viewHost.getView());

            return Promise.resolve();
        }
    }

    export function initRuntimeWithDalBoard() {
        U.assert(!runtime.board);
        let b = new DalBoard();
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

    export function board() {
        return runtime.board as DalBoard;
    }
}