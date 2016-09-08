namespace pxsim.newdefinitions {
    export interface PartDefinition {
        // built-in simulator logic name
        simulationBehavior?: string,
        // total number of power + GPIO + other pins
        numberOfPins: number,
        // visual description or built-in visual name 
        visual: PartVisualDefinition,
        // metadata for each pin
        pinDefinitions: PartPinDefinition[],
        // description of how part is instantiated
        instantiation: PartSingletonDefinition | PartFunctionDefinition,
        // list describing number and order of assembly instruction steps; the length is how many steps this part needs 
        assembly: AssemblyStep[],
    }
    export interface PartVisualDefinition {
        // URL to image asset
        image?: string,
        // or name of built-in part visual
        builtIn?: string,
        // description of a parts visual; units don't matter but must be internally consistent
        width: number,
        height: number,
        // the distance between the centers of two adjecent pins; used to scale part for breadboard
        pinDistance: number,
        // the exact centers of each pin; must have as many locations as the "numberOfPins" property
        pinLocations: XY[],
    }
    export type XY = {x: number, y: number}
    export interface PartPinDefinition {
        target: UninstantiatedPinTarget, // e.g.: "ground", "MISO", etc.; see PinType
        style: PinStyle, // e.g.: "male", "female", "solder"; see PinStyle
        orientation: PinOrientation, // e.g.: "+X", "-Z", etc.; see PinOrientation
    }
    export type UninstantiatedPinTarget = PinTarget | PinInstantiationIdx;
    export type PinTarget = (
          "ground"
        | "threeVolt"
        | DALPin
        | SPIPin
        | I2CPin);
    // a hard-coded pin index; used by parts that are pre-built on the microbit: led matrix, buttons, etc.
    export type DALPin = (
        "P0" | "P1" | "P2" | "P3" | "P4" | "P5" | "P6" | "P7" | "P8" | "P9"
        | "P10" | "P11" | "P12" | "P13" | "P14" | "P15" | "P16" | "P19" | "P20");
    export type SPIPin = "MOSI" | "MISO" | "SCK";
    export type I2CPin = "SDA" | "SCL";
    // the pin style, necessary to know how to attach to the pin
    export type PinStyle = "male" | "female" | "solder";
    // orientation along an axis in a right-hand coordinate system where:
    //   -Z is into the breadboard
    //   +X is toward larger breadboard numbers
    //   +Y is toward latter breadboard letters
    export type PinOrientation = "+X" | "-X" | "+Y" | "-Y" | "+Z" | "-Z";
    // instantiation definition for parts where there maybe be at most one
    export type PartSingletonDefinition = {
        kind: "singleton"
    }
    // instantiation definition for parts that are created by a function
    export interface PartFunctionDefinition {
        kind: "function",
        fullyQualifiedName: string, // including namespace
        // if the function has the "trackArgs" annotation, this describes how each tracked
        //  argument is treated during part instantiation
        argumentRoles: ArgumentRole[],
    }
    export type ArgumentRole = (
        "ignored"
        // argument is to be passed to the part during initialization. 
        //  E.g. NeoPixel uses this to know if the strip is "RGB" or "RGBW" style 
        | "partParameter"
        // argument is a "DigitalPin" enum value that is used as a pin value for this part 
        //  E.g. neopixel.create(..)'s first argument is the pin which the NeoPixel is connected to 
        | PinInstantiationIdx);
    export type PinInstantiationIdx = {pinInstantiationIdx: number};
    // describes a single step for the assembly instructions
    export interface AssemblyStep {
        part?: boolean, // if true, the part itself should be assembled during this step
        pinIndices?: number[], // the indices (ranging from 0 to "numberOfPins") of pins that should be wired for this step 
    }

    export const EXAMPLE_NEW_PART_DEFINITIONS: Map<PartDefinition> = {
        "buttonpair": {
            "simulationBehavior": "buttonpair",
            "visual": {
                "builtIn": "buttonpair",
                "width": 75,
                "height": 45,
                "pinDistance": 15,
                "pinLocations": [
                    {"x": 0, "y": 0},
                    {"x": 30, "y": 45},
                    {"x": 45, "y": 0},
                    {"x": 75, "y": 45},
                ],
            },
            "numberOfPins": 4,
            "pinDefinitions": [
                {"target": "P14", "style": "male", "orientation": "-Z"},
                {"target": "ground", "style": "male", "orientation": "-Z"},
                {"target": "P15", "style": "male", "orientation": "-Z"},
                {"target": "ground", "style": "male", "orientation": "-Z"},
            ],
            "instantiation": {
                "kind": "singleton"
            },
            "assembly": [
                {"part": true},
                {"pinIndices": [0, 1]},
                {"pinIndices": [2, 3]},
            ],
        },
        "neopixel": {
            "simulationBehavior": "neopixel",
            "visual": {
                "image": "part/neopixel.svg",
                "width": 87.5,
                "height": 190,
                "pinDistance": 15,
                "pinLocations": [
                    {"x": 13.5, "y": 11},
                    {"x": 28.5, "y": 11},
                    {"x": 43.5, "y": 11},
                ],
            },
            "numberOfPins": 3,
            "pinDefinitions": [
                {"target": "ground", "style": "solder", "orientation": "+Z"},
                {"target": "threeVolt", "style": "solder", "orientation": "+Z"},
                {"target": {"pinInstantiationIdx": 0}, "style": "solder", "orientation": "+Z"}
            ],
            "instantiation": {
                "kind": "function",
                "fullyQualifiedName": "neopixel.create",
                "argumentRoles": [
                    {"pinInstantiationIdx": 0},
                    "partParameter",
                ]
            },
            "assembly": [
                {"part": true, "pinIndices": [0]},
                {"pinIndices": [1, 2]},
            ],
        },
        "ledmatrix": {
            "visual": {
                "builtIn": "ledmatrix",
                "width": 105,
                "height": 105,
                "pinDistance": 15,
                "pinLocations": [
                    {"x": 0, "y": 0},
                    {"x": 15, "y": 0},
                    {"x": 30, "y": 0},
                    {"x": 45, "y": 0},
                    {"x": 105, "y": 105},
                    {"x": 0, "y": 105},
                    {"x": 15, "y": 105},
                    {"x": 30, "y": 105},
                    {"x": 45, "y": 105},
                    {"x": 60, "y": 0},
                ],
            },
            "simulationBehavior": "ledmatrix",
            "numberOfPins": 10,
            "instantiation": {"kind": "singleton"},
            "pinDefinitions": [
                {"target": "P4", "style": "male", "orientation": "-Z"},
                {"target": "P5", "style": "male", "orientation": "-Z"},
                {"target": "P6", "style": "male", "orientation": "-Z"},
                {"target": "P7", "style": "male", "orientation": "-Z"},
                {"target": "P8", "style": "male", "orientation": "-Z"},
                {"target": "P9", "style": "male", "orientation": "-Z"},
                {"target": "P10", "style": "male", "orientation": "-Z"},
                {"target": "P11", "style": "male", "orientation": "-Z"},
                {"target": "P12", "style": "male", "orientation": "-Z"},
                {"target": "P13", "style": "male", "orientation": "-Z"}
            ],
            "assembly": [
                {"part": true},
                {"pinIndices": [0, 1, 2, 3, 4]},
                {"pinIndices": [5, 6, 7, 8, 0]},
            ]
        },
        "max6675": {
            "visual": {
                "image": "parts/max6675.svg",
                "width": 58,
                "height": 64,
                "pinDistance": 7.2,
                "pinLocations": [
                    {"x": 11, "y": 5},
                    {"x": 18.2, "y": 5},
                    {"x": 25.4, "y": 5},
                    {"x": 32.6, "y": 5},
                    {"x": 39.8, "y": 5},
                ]
            },
            "numberOfPins": 5,
            "instantiation": {
                "kind": "function",
                "fullyQualifiedName": "sensors.max6675Temperature",
                "argumentRoles": [
                    {"pinInstantiationIdx": 0},
                ]
            },
            "pinDefinitions": [
                {"target": "SCK", "style": "male", "orientation": "+Y" },
                {"target": {"pinInstantiationIdx": 0}, "style": "male", "orientation": "+Y" },
                {"target": "MISO", "style": "male", "orientation": "+Y" },
                {"target": "ground", "style": "male", "orientation": "+Y" },
                {"target": "threeVolt", "style": "male", "orientation": "+Y" },
            ],
            "assembly": [
                {"part": true, "pinIndices": [3]},
                {"pinIndices": [0, 1, 2, 4]},
            ]
        },
        "speaker": {
            "numberOfPins": 2,
            "visual": {
                "image": "/static/hardware/speaker.svg",
                "width": 500,
                "height": 500,
                "pinDistance": 70,
                "pinLocations": [
                    {"x": 180, "y": 135},
                    {"x": 320, "y": 135},
                ],
            },
            "pinDefinitions": [
                {"target": "P0", "style": "male", "orientation": "-Z"},
                {"target": "ground", "style": "male", "orientation": "-Z"},
            ],
            "instantiation": {"kind": "singleton"},
            "assembly": [
                {"part": true, "pinIndices": [0]},
                {"pinIndices": [1]},
            ],
        },
    }

    export const OLD_PARTS_FOR_REFERENCE = {
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
        "neopixel": {
            "visual": "neopixel",
            "breadboardColumnsNeeded": 5,
            "breadboardStartRow": "h",
            "pinAllocation": {
                "type": "factoryfunction",
                "fullyQualifiedFunctionName": "neopixel.create",
                "pinArgIndices": [0],
                "otherArgIndices": [1]
            },
            "assemblyStep": 0,
            "wires": [
                {"start": ["breadboard", "j", 1], "end": "ground", "color": "blue", "assemblyStep": 1},
                {"start": ["breadboard", "j", 2], "end": "threeVolt", "color": "red", "assemblyStep": 2},
                {"start": ["breadboard", "j", 3], "end": ["GPIO", 0], "color": "green", "assemblyStep": 2}
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
        },
    }

}