/// <reference path="../node_modules/pxt-core/typings/bluebird/bluebird.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtparts.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../libs/microbit/dal.d.ts"/>
/// <reference path="./visuals/neopixel.ts"/>

namespace pxsim {
    export const MICROBIT_DEF: BoardDefinition = {
        visual: "microbit",
        gpioPinBlocks: [
            ["P0"], ["P1"], ["P2"],
            ["P3"],
            ["P4", "P5", "P6", "P7"],
            ["P8", "P9", "P10", "P11", "P12"],
            ["P16"],
        ],
        gpioPinMap: {
            "P0": "P0",
            "P1": "P1",
            "P2": "P2",
            "P3": "P3",
            "P4": "P4",
            "P5": "P5",
            "P6": "P6",
            "P7": "P7",
            "P8": "P8",
            "P9": "P9",
            "P10": "P10",
            "P11": "P11",
            "P12": "P12",
            "P13": "P13",
            "P14": "P14",
            "P15": "P15",
            "P16": "P16",
            "P19": "P19",
            "P20": "P20",
        },
        spiPins: {
            MOSI: "P15",
            MISO: "P14",
            SCK: "P13",
        },
        i2cPins: {
            SDA: "P20",
            SCL: "P19",
        },
        analogInPins: ["P0", "P1", "P2", "P3", "P10"],
        groundPins: ["GND"],
        threeVoltPins: ["+3v3"],
        attachPowerOnRight: true,
        onboardComponents: ["buttonpair", "ledmatrix", "speaker"],
        useCrocClips: true,
        marginWhenBreadboarding: [0, 0, 80, 0],
    }

    export const builtinComponentSimVisual: Map<() => visuals.IBoardPart<any>> = {
        "buttonpair": () => new visuals.ButtonPairView(),
        "ledmatrix": () => new visuals.LedMatrixView(),
        "neopixel": () => new visuals.NeoPixelView(),
    };
    export const builtinComponentSimState: Map<(d: DalBoard) => any> = {
        "buttonpair": (d: DalBoard) => d.buttonPairState,
        "ledmatrix": (d: DalBoard) => d.ledMatrixState,
        "edgeconnector": (d: DalBoard) => d.edgeConnectorState,
        "serial": (d: DalBoard) => d.serialState,
        "radio": (d: DalBoard) => d.radioState,
        "thermometer": (d: DalBoard) => d.thermometerState,
        "accelerometer": (d: DalBoard) => d.accelerometerState,
        "compass": (d: DalBoard) => d.compassState,
        "lightsensor": (d: DalBoard) => d.lightSensorState,
        "neopixel": (d: DalBoard) => d.neopixelState,
    };
    export const builtinComponentPartVisual: Map<(xy: visuals.Coord) => visuals.SVGElAndSize> = {
        "buttonpair": (xy: visuals.Coord) => visuals.mkBtnSvg(xy),
        "ledmatrix": (xy: visuals.Coord) => visuals.mkLedMatrixSvg(xy, 8, 8),
        "neopixel": (xy: visuals.Coord) => visuals.mkNeoPixelPart(xy),
    };

    //TODO: add multiple board support
    export const CURRENT_BOARD = MICROBIT_DEF;
}