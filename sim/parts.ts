namespace pxsim.def2 {

    export const OLD_PARTS = {
        "ledmatrix": {
            "visual": "ledmatrix",
            "breadboardColumnsNeeded": 8,
            "breadboardStartRow": "h",
            "pinAllocation": {
                "type": "auto",
                "pinsNeeded": [5, 5]
            },
            "assemblyStep": 0,
            "wires": [
                {"start": ["breadboard", "j", 0], "end": ["GPIO", 5], "color": "purple", "assemblyStep": 1},
                {"start": ["breadboard", "j", 1], "end": ["GPIO", 6], "color": "purple", "assemblyStep": 1},
                {"start": ["breadboard", "j", 2], "end": ["GPIO", 7], "color": "purple", "assemblyStep": 1},
                {"start": ["breadboard", "j", 3], "end": ["GPIO", 8], "color": "purple", "assemblyStep": 1},
                {"start": ["breadboard", "a", 7], "end": ["GPIO", 9], "color": "purple", "assemblyStep": 1},
                {"start": ["breadboard", "a", 0], "end": ["GPIO", 0], "color": "green", "assemblyStep": 2},
                {"start": ["breadboard", "a", 1], "end": ["GPIO", 1], "color": "green", "assemblyStep": 2},
                {"start": ["breadboard", "a", 2], "end": ["GPIO", 2], "color": "green", "assemblyStep": 2},
                {"start": ["breadboard", "a", 3], "end": ["GPIO", 3], "color": "green", "assemblyStep": 2},
                {"start": ["breadboard", "j", 4], "end": ["GPIO", 4], "color": "green", "assemblyStep": 2}
            ]
        },
        "buttonpair": {
            "visual": "buttonpair",
            "breadboardColumnsNeeded": 6,
            "breadboardStartRow": "f",
            "pinAllocation": {
                "type": "predefined",
                "pins": ["P13", "P12"]
            },
            "assemblyStep": 0,
            "wires": [
                {"start": ["breadboard", "j", 0], "end": ["GPIO", 0], "color": "yellow", "assemblyStep": 1},
                {"start": ["breadboard", "a", 2], "end": "ground", "color": "blue", "assemblyStep": 1},
                {"start": ["breadboard", "j", 3], "end": ["GPIO", 1], "color": "orange", "assemblyStep": 2},
                {"start": ["breadboard", "a", 5], "end": "ground", "color": "blue", "assemblyStep": 2}
            ]
        },
        "neopixel": {
            "visual": "neopixel",
            "breadboardColumnsNeeded": 5,
            "breadboardStartRow": "h",
            "pinAllocation": {
                "type": "factoryfunction",
                "functionName": "neopixel.create",
                "pinArgPositions": [0],
                "otherArgPositions": [1]
            },
            "assemblyStep": 0,
            "wires": [
                {"start": ["breadboard", "j", 1], "end": "ground", "color": "blue", "assemblyStep": 1},
                {"start": ["breadboard", "j", 2], "end": "threeVolt", "color": "red", "assemblyStep": 2},
                {"start": ["breadboard", "j", 3], "end": ["GPIO", 0], "color": "green", "assemblyStep": 2}
            ]
        },
        "speaker": {
            "visual": {
                "image": "/parts/speaker.svg",
                "width": 500,
                "height": 500,
                "firstPin": [180, 135],
                "pinDist": 70,
                "extraColumnOffset": 1
            },
            "breadboardColumnsNeeded": 5,
            "breadboardStartRow": "f",
            "pinAllocation": {
                "type": "auto",
                "pinsNeeded": 1
            },
            "assemblyStep": 0,
            "wires": [
                {"start": ["breadboard", "j", 1], "end": ["GPIO", 0], "color": "#ff80fa", "assemblyStep": 1},
                {"start": ["breadboard", "j", 3], "end": "ground", "color": "blue", "assemblyStep": 1}
            ]
        }
    }

    export interface FactoryFunctionPinAlloc {
        type: "factoryfunction",
        functionName: string,
        pinArgPositions: number[],
        otherArgPositions?: number[],
    }
    export interface PredefinedPinAlloc {
        type: "predefined",
        pins: string[],
    }
    export interface AutoPinAlloc {
        type: "auto",
        pinsNeeded: number | number[],
    }
    export type SPIPin = "MOSI" | "MISO" | "SCK";
    export type I2CPin = "SDA" | "SCL";
    export type PinType = (
        ["GPIO", number]
        | SPIPin
        | I2CPin
        | "ground"
        | "threeVolt");
    export type PinStyle = "male" | "female" | "solder";
    export type PinOrientation = "+X" | "-X" | "+Y" | "-Y" | "+Z" | "-Z";
    export type XY = {x: number, y: number}
    export interface PartDimensions {
        width: number,
        height: number,
        pinDist: number,
        pinLocations: XY[],
    }
    export interface PartVisualDefinition extends PartDimensions {
        image: string,
    }
    export interface PartPinDefinition {
        type: PinType,
        style: PinStyle,
        orientation: PinOrientation,
    }
    export interface AssemblyStep {
        step: number,
        part?: boolean,
        pinIndices?: number[],
    }
    export interface PartDefinition {
        simulationBehavior?: string,
        numberOfPins: number,
        visual: PartVisualDefinition | string,
        pinDefinitions: PartPinDefinition[],
        gpioAllocation?: FactoryFunctionPinAlloc | PredefinedPinAlloc | AutoPinAlloc,
        assembly: AssemblyStep[],
    }

    export const NEW_CMP_DEFS: Map<PartDefinition> = {
        "speaker": {
            numberOfPins: 2,
            visual: {
                image: "/static/hardware/speaker.svg",
                width: 500,
                height: 500,
                pinDist: 70,
                pinLocations: [
                    {x: 180, y: 135},
                    {x: 320, y: 135},
                ],
            },
            pinDefinitions: [
                {type: ["GPIO", 0], style: "male", orientation: "-Z"},
                {type: "ground", style: "male", orientation: "-Z"},
            ],
            gpioAllocation: {
                type: "auto",
                pinsNeeded: 1,
            },
            assembly: [
                {step: 0, part: true},
                {step: 1, pinIndices: [0]},
                {step: 2, pinIndices: [1]},
            ],
        },
        "buttonpair": {
            numberOfPins: 4,
            visual: "buttonpair",
            simulationBehavior: "buttonpair",
            pinDefinitions: [
                {type: ["GPIO", 0], style: "male", orientation: "-Z"},
                {type: "ground", style: "male", orientation: "-Z"},
                {type: ["GPIO", 1], style: "male", orientation: "-Z"},
                {type: "ground", style: "male", orientation: "-Z"},
            ],
            gpioAllocation: {
                type: "predefined",
                pins: ["P13", "P12"],
            },
            assembly: [
                {step: 0, part: true},
                {step: 1, pinIndices: [0, 1]},
                {step: 2, pinIndices: [2, 3]},
            ],
        },
    }
}