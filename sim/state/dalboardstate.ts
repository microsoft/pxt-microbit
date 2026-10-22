/// <reference path="../../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../../libs/core/dal.d.ts"/>
/// <reference path="../../libs/core/enums.d.ts"/>

namespace pxsim {
    export class DalBoardState extends CoreBoard
        implements CommonBoard
        , RadioBoard
        , LightBoard
        , MicrophoneBoard
        , ControlMessageBoard
        , samples.SampleBoard {
        ledMatrixState: LedMatrixState;
        edgeConnectorState: EdgeConnectorState;
        serialState: SerialState;
        accelerometerState: AccelerometerState;
        compassState: CompassState;
        thermometerState: ThermometerState;
        lightSensorState: LightSensorState;
        buttonPairState: ButtonPairState;
        radioState: RadioState;
        microphoneState: MicrophoneState;
        recordingState: RecordingState;
        lightState: pxt.Map<CommonNeoPixelState>;
        fileSystem: FileSystemState;
        logoTouch: Button;
        speakerEnabled: boolean = true;
        controlMessageState: ControlMessageState;
        samplesState: samples.SamplesState;

        hardwareVersion = 1;

        constructor() {
            super()

            this.lightState = {};
            this.fileSystem = new FileSystemState();
            this.controlMessageState = new ControlMessageState(this);
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
                ],
                servos: {
                    "P0": DAL.MICROBIT_ID_IO_P0,
                    "P1": DAL.MICROBIT_ID_IO_P1,
                    "P2": DAL.MICROBIT_ID_IO_P2,
                    "P3": DAL.MICROBIT_ID_IO_P3,
                    "P4": DAL.MICROBIT_ID_IO_P4,
                    "P5": DAL.MICROBIT_ID_IO_P5,
                    "P6": DAL.MICROBIT_ID_IO_P6,
                    "P7": DAL.MICROBIT_ID_IO_P7,
                    "P8": DAL.MICROBIT_ID_IO_P8,
                    "P9": DAL.MICROBIT_ID_IO_P9,
                    "P10": DAL.MICROBIT_ID_IO_P10,
                    "P11": DAL.MICROBIT_ID_IO_P11,
                    "P12": DAL.MICROBIT_ID_IO_P12,
                    "P13": DAL.MICROBIT_ID_IO_P13,
                    "P14": DAL.MICROBIT_ID_IO_P14,
                    "P15": DAL.MICROBIT_ID_IO_P15,
                    "P16": DAL.MICROBIT_ID_IO_P16,
                    "P19": DAL.MICROBIT_ID_IO_P19
                }
            });
            this.builtinParts["radio"] = this.radioState = new RadioState(runtime, this, {
                ID_RADIO: DAL.MICROBIT_ID_RADIO,
                RADIO_EVT_DATAGRAM: DAL.MICROBIT_RADIO_EVT_DATAGRAM
            });
            this.builtinParts["microphone"] = this.microphoneState = new MicrophoneState(DAL.DEVICE_ID_MICROPHONE, 0, 255, 86, 165);
            this.builtinParts["recording"] = this.recordingState = new RecordingState();
            this.builtinParts["accelerometer"] = this.accelerometerState = new AccelerometerState(runtime);
            this.builtinParts["serial"] = this.serialState = new SerialState(runtime, this);
            this.builtinParts["thermometer"] = this.thermometerState = new ThermometerState();
            this.builtinParts["lightsensor"] = this.lightSensorState = new LightSensorState();
            this.builtinParts["compass"] = this.compassState = new CompassState();
            this.builtinParts["microservo"] = this.edgeConnectorState;
            this.builtinParts["logotouch"] = this.logoTouch = new Button(DAL.MICROBIT_ID_LOGO);

            this.builtinParts["neopixel"] = (pin: Pin) => { return this.neopixelState(pin.id); };

            this.samplesState = new samples.SamplesState();
        }

        ensureHardwareVersion(version: number) {
            if (version > this.hardwareVersion) {
                this.hardwareVersion = version;
                runtime.queueDisplayUpdate();
            }
        }

        tryGetNeopixelState(pinId: number): CommonNeoPixelState {
            return this.lightState[pinId];
        }

        neopixelState(pinId: number): CommonNeoPixelState {
            if (pinId === undefined) {
                pinId = DAL.MICROBIT_ID_IO_P0;
            }
            let state = this.lightState[pinId];
            if (!state) state = this.lightState[pinId] = new CommonNeoPixelState();
            return state;
        }
    }
}
