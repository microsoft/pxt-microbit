namespace pxsim.newdefinitions {
     export interface AllocatorOpts {
        boardDef: BoardDefinition,
        partDefs: Map<PartDefinition>,
        partsList: string[]
        fnArgs: any,
        // Used for finding the nearest available power pins
        getBBCoord: (loc: BBRowCol) => visuals.Coord,
    };
    export interface AllocatorResult {
        powerWires: WireInst[],
        parts: PartAndWiresInst[],
    }
    export interface PartAndWiresInst {
        part?: PartInst,
        wires?: WireInst[]
    }
    interface PartVisualInst extends visuals.SVGElAndSize {
        el: SVGElement,
        w: number,
        h: number,
        x: number,
        y: number,
        pinDist: number,
        getPinBBLocs: (topLeftPinLoc: BBRowCol) => BBRowCol[],
    }
    export interface PartInst {
        name: string,
        // breadboardStartColumn: number,
        // breadboardStartRow: string,
        // assemblyStep: number,
        visual: string | PartVisualDefinition,
        microbitPins: string[],
        otherArgs?: string[],
    }
    export interface WireInst {
        start: Loc,
        end: Loc,
        color: string,
        assemblyStep: number
    };
    interface PartIR {
        name: string,
        def: PartDefinition,
        partParams: string[],
        pins: PinIR[],
    }
    interface PinIR {
        def: PartPinDefinition,
        target: PinTarget,
    }
    interface AllocLocOpts {
        nearestBBPin?: BBRowCol,
        startColumn?: number,
        partGPIOPins?: string[],
    };
    interface AllocWireOpts {
        startColumn: number,
        partGPIOPins: string[],
    }
    interface AllocBlock {
        partIdx: number,
        partBlkIdx: number,
        gpioNeeded: number,
        gpioAssigned: string[]
    }
    interface PowerUsage {
        topGround: boolean,
        topThreeVolt: boolean,
        bottomGround: boolean,
        bottomThreeVolt: boolean,
        singleGround: boolean,
        singleThreeVolt: boolean,
    }
    function isOnBreadboardBottom(location: WireLocationDefinition) {
        let isBot = false;
        if (location[0] === "breadboard") {
            let row = <string>location[1];
            isBot = 0 <= ["a", "b", "c", "d", "e"].indexOf(row);
        }
        return isBot;
    }
    const arrCount = (a: boolean[]) => a.reduce((p, n) => p + (n ? 1 : 0), 0);
    const arrAny = (a: boolean[]) => arrCount(a) > 0;
    function computePowerUsage(wireDef: WireDefinition): PowerUsage {
        let ends = [wireDef.start, wireDef.end];
        let endIsGround = ends.map(e => e === "ground");
        let endIsThreeVolt = ends.map(e => e === "threeVolt");
        let endIsBot = ends.map(e => isOnBreadboardBottom(e));
        let hasGround = arrAny(endIsGround);
        let hasThreeVolt = arrAny(endIsThreeVolt);
        let hasBot = arrAny(endIsBot);
        return {
            topGround: hasGround && !hasBot,
            topThreeVolt: hasThreeVolt && !hasBot,
            bottomGround: hasGround && hasBot,
            bottomThreeVolt: hasThreeVolt && hasBot,
            singleGround: hasGround,
            singleThreeVolt: hasThreeVolt
        };
    }
    function mergePowerUsage(powerUsages: PowerUsage[]) {
        let finalPowerUsage = powerUsages.reduce((p, n) => ({
                topGround: p.topGround || n.topGround,
                topThreeVolt: p.topThreeVolt || n.topThreeVolt,
                bottomGround: p.bottomGround || n.bottomGround,
                bottomThreeVolt: p.bottomThreeVolt || n.bottomThreeVolt,
                singleGround: n.singleGround ? p.singleGround === null : p.singleGround,
                singleThreeVolt: n.singleThreeVolt ? p.singleThreeVolt === null : p.singleThreeVolt,
            }), {
                topGround: false,
                topThreeVolt: false,
                bottomGround: false,
                bottomThreeVolt: false,
                singleGround: null,
                singleThreeVolt: null,
            });
        if (finalPowerUsage.singleGround)
            finalPowerUsage.topGround = finalPowerUsage.bottomGround = false;
        if (finalPowerUsage.singleThreeVolt)
            finalPowerUsage.topThreeVolt = finalPowerUsage.bottomThreeVolt = false;
        return finalPowerUsage;
    }
    function copyDoubleArray(a: string[][]) {
         return a.map(b => b.map(p => p));
    }
    function readPin(arg: string): DALPin {
        U.assert(!!arg, "Invalid pin: " + arg);
        let pin = arg.split("DigitalPin.")[1];
        return <DALPin>pin;
    }
    function mkReverseMap(map: {[key: string]: string}) {
        let origKeys: string[] = [];
        let origVals: string[] = [];
        for (let key in map) {
            origKeys.push(key);
            origVals.push(map[key]);
        }
        let newMap: {[key: string]: string} = {};
        for (let i = 0; i < origKeys.length; i++) {
            let newKey = origVals[i];
            let newVal = origKeys[i];
            newMap[newKey] = newVal;
        }
        return newMap;
    }
    class Allocator {
        private opts: AllocatorOpts;
        private availablePowerPins = {
            top: {
                threeVolt: mkRange(26, 51).map(n => <BBRowCol>["+", `${n}`]),
                ground: mkRange(26, 51).map(n => <BBRowCol>["-", `${n}`]),
            },
            bottom: {
                threeVolt: mkRange(1, 26).map(n => <BBRowCol>["+", `${n}`]),
                ground: mkRange(1, 26).map(n => <BBRowCol>["-", `${n}`]),
            },
        };
        private powerUsage: PowerUsage;

        constructor(opts: AllocatorOpts) {
            this.opts = opts;
        }

        private allocLocation(location: WireLocationDefinition, opts: AllocLocOpts): Loc {
            if (location === "ground" || location === "threeVolt") {
                //special case if there is only a single ground or three volt pin in the whole build
                if (location === "ground" && this.powerUsage.singleGround) {
                    let boardGroundPin = this.getBoardGroundPin();
                    return {type: "dalboard", pin: boardGroundPin};
                } else if (location === "threeVolt" && this.powerUsage.singleThreeVolt) {
                    let boardThreeVoltPin = this.getBoardThreeVoltPin();
                    return {type: "dalboard", pin: boardThreeVoltPin};
                }

                U.assert(!!opts.nearestBBPin);
                let nearestCoord = this.opts.getBBCoord(opts.nearestBBPin);
                let firstTopAndBot = [
                    this.availablePowerPins.top.ground[0] || this.availablePowerPins.top.threeVolt[0],
                    this.availablePowerPins.bottom.ground[0] || this.availablePowerPins.bottom.threeVolt[0]
                ].map(loc => {
                    return this.opts.getBBCoord(loc);
                });
                if (!firstTopAndBot[0] || !firstTopAndBot[1]) {
                    console.debug(`No more available "${location}" locations!`);
                    //TODO
                }
                let nearTop = visuals.findClosestCoordIdx(nearestCoord, firstTopAndBot) == 0;
                let barPins: BBRowCol[];
                if (nearTop) {
                    if (location === "ground") {
                        barPins = this.availablePowerPins.top.ground;
                    } else if (location === "threeVolt") {
                        barPins = this.availablePowerPins.top.threeVolt;
                    }
                } else {
                    if (location === "ground") {
                        barPins = this.availablePowerPins.bottom.ground;
                    } else if (location === "threeVolt") {
                        barPins = this.availablePowerPins.bottom.threeVolt;
                    }
                }
                let pinCoords = barPins.map(rowCol => {
                    return this.opts.getBBCoord(rowCol);
                });
                let closestPinIdx = visuals.findClosestCoordIdx(nearestCoord, pinCoords);
                let pin = barPins[closestPinIdx];
                if (nearTop) {
                    this.availablePowerPins.top.ground.splice(closestPinIdx, 1);
                    this.availablePowerPins.top.threeVolt.splice(closestPinIdx, 1);
                } else {
                    this.availablePowerPins.bottom.ground.splice(closestPinIdx, 1);
                    this.availablePowerPins.bottom.threeVolt.splice(closestPinIdx, 1);
                }
                return {type: "breadboard", rowCol: pin};
            } else if (location[0] === "breadboard") {
                U.assert(!!opts.startColumn);
                let row = <string>location[1];
                let col = (<number>location[2] + opts.startColumn).toString();
                return {type: "breadboard", rowCol: [row, col]}
            } else if (location[0] === "GPIO") {
                U.assert(!!opts.partGPIOPins);
                let idx = <number>location[1];
                let pin = opts.partGPIOPins[idx];
                return {type: "dalboard", pin: pin};
            } else if (location === "MOSI" || location === "MISO" || location === "SCK") {
                if (!this.opts.boardDef.spiPins)
                    console.debug("No SPI pin mappings found!");
                let pin = (<any>this.opts.boardDef.spiPins)[location as string] as string;
                return {type: "dalboard", pin: pin};
            } else if (location === "SDA" || location === "SCL") {
                if (!this.opts.boardDef.i2cPins)
                    console.debug("No I2C pin mappings found!");
                let pin = (<any>this.opts.boardDef.i2cPins)[location as string] as string;
                return {type: "dalboard", pin: pin};
            } else {
                //TODO
                U.assert(false);
                return null;
            }
        }
        private getBoardGroundPin() {
            let boardGround = this.opts.boardDef.groundPins[0] || null;
            if (!boardGround) {
                console.log("No available ground pin on board!");
                //TODO
            }
            return boardGround;
        }
        private getBoardThreeVoltPin() {
            let threeVoltPin = this.opts.boardDef.threeVoltPins[0] || null;
            if (!threeVoltPin) {
                console.log("No available 3.3V pin on board!");
                //TODO
            }
            return threeVoltPin;
        }
        private allocPowerWires(powerUsage: PowerUsage): WireInst[] {
            let boardGroundPin = this.getBoardGroundPin();
            let threeVoltPin = this.getBoardThreeVoltPin();
            let topLeft: BBRowCol = ["-", "26"];
            let botLeft: BBRowCol = ["-", "1"];
            let topRight: BBRowCol = ["-", "50"];
            let botRight: BBRowCol = ["-", "25"];
            let top: BBRowCol, bot: BBRowCol;
            if (this.opts.boardDef.attachPowerOnRight) {
                top = topRight;
                bot = botRight;
            } else {
                top = topLeft;
                bot = botLeft;
            }
            const GROUND_COLOR = "blue";
            const POWER_COLOR = "red";
            const wires: WireInst[] = [];
            let groundStep = 0;
            let threeVoltStep = (powerUsage.bottomGround || powerUsage.topGround) ? 1 : 0;
            if (powerUsage.bottomGround && powerUsage.topGround) {
                //bb top - <==> bb bot -
                wires.push({
                    start: this.allocLocation("ground", {nearestBBPin: top}),
                    end: this.allocLocation("ground", {nearestBBPin: bot}),
                    color: GROUND_COLOR, assemblyStep: groundStep
                });
            }
            if (powerUsage.topGround) {
                //board - <==> bb top -
                wires.push({
                    start: this.allocLocation("ground", {nearestBBPin: top}),
                    end: {type: "dalboard", pin: boardGroundPin},
                    color: GROUND_COLOR, assemblyStep: groundStep
                });
            } else if (powerUsage.bottomGround) {
                //board - <==> bb bot -
                wires.push({
                    start: this.allocLocation("ground", {nearestBBPin: bot}),
                    end: {type: "dalboard", pin: boardGroundPin},
                    color: GROUND_COLOR, assemblyStep: groundStep
                });
            }
            if (powerUsage.bottomThreeVolt && powerUsage.bottomGround) {
                //bb top + <==> bb bot +
                wires.push({
                    start: this.allocLocation("threeVolt", {nearestBBPin: top}),
                    end: this.allocLocation("threeVolt", {nearestBBPin: bot}),
                    color: POWER_COLOR, assemblyStep: threeVoltStep
                });
            }
            if (powerUsage.topThreeVolt) {
                //board + <==> bb top +
                wires.push({
                    start: this.allocLocation("threeVolt", {nearestBBPin: top}),
                    end: {type: "dalboard", pin: threeVoltPin},
                    color: POWER_COLOR, assemblyStep: threeVoltStep
                });
            } else if (powerUsage.bottomThreeVolt) {
                //board + <==> bb bot +
                wires.push({
                    start: this.allocLocation("threeVolt", {nearestBBPin: bot}),
                    end: {type: "dalboard", pin: threeVoltPin},
                    color: POWER_COLOR, assemblyStep: threeVoltStep
                });
            }
            return wires;
        }
        private allocWire(wireDef: WireDefinition, opts: AllocWireOpts): WireInst {
            let ends = [wireDef.start, wireDef.end];
            let endIsPower = ends.map(e => e === "ground" || e === "threeVolt");
            //allocate non-power first so we know the nearest pin for the power end
            let endInsts = ends.map((e, idx) => !endIsPower[idx] ? this.allocLocation(e, opts) : null)
            //allocate power pins closest to the other end of the wire
            endInsts = endInsts.map((e, idx) => {
                if (e)
                    return e;
                let locInst = <BBLoc>endInsts[1 - idx]; // non-power end
                let l = this.allocLocation(ends[idx], {
                    nearestBBPin: locInst.rowCol,
                    startColumn: opts.startColumn,
                    partGPIOPins: opts.partGPIOPins,
                });
                return l;
            });
            return {start: endInsts[0], end: endInsts[1], color: wireDef.color, assemblyStep: wireDef.assemblyStep};
        }
        private allocPartIRs(): PartIR[] {
            let partNmAndDefs = this.opts.partsList
                .map(partName => <[string, PartDefinition]>[partName, this.opts.partDefs[partName]])
                .filter(d => !!d[1]);
            let partNmsList = partNmAndDefs.map(p => p[0]);
            let partDefsList = partNmAndDefs.map(p => p[1]);
            let partIRs: PartIR[] = [];
            let mkIR = (def: PartDefinition, nm: string, instPins: PinTarget[], partParams: string[]): PartIR => {
                let pinIRs: PinIR[] = [];
                for (let i = 0; i < def.numberOfPins; i++) {
                    let pinDef = def.pinDefinitions[i];
                    U.assert(typeof pinDef.target === "string", "Invalid pin target for singleton part: " + nm); 
                    let pinTarget: PinTarget;
                    if (typeof pinDef.target === "string") {
                        pinTarget = <PinTarget>pinDef.target;
                    } else {
                        let instIdx = (<PinInstantiationIdx>pinDef.target).pinInstantiationIdx;
                        pinTarget = instPins[instIdx];
                    }
                    pinIRs.push({
                        def: pinDef,
                        target: pinTarget
                    });
                }
                return {
                    name: nm,
                    def: def,
                    pins: pinIRs,
                    partParams: partParams
                };
            };
            //const parse = () => TODO:
            partDefsList.forEach((def, idx) => {
                let nm = partNmsList[idx];
                if (def.instantiation.kind === "singleton") {
                    partIRs.push(mkIR(def, nm, []));
                } else if (def.instantiation.kind === "function") {
                    let fnAlloc = def.instantiation as PartFunctionDefinition;
                    let fnNm = fnAlloc.fullyQualifiedName;
                    let callsitesTrackedArgs = <string[]>this.opts.fnArgs[fnNm];
                    U.assert(!!callsitesTrackedArgs && !!callsitesTrackedArgs.length, "Failed to read pin(s) from callsite for: " + fnNm);
                    callsitesTrackedArgs.forEach(fnArgsStr => {
                        let fnArgsSplit = fnArgsStr.split(",");
                        U.assert(fnArgsSplit.length === fnAlloc.argumentRoles.length,
                            `Mismatch between number of arguments at callsite (function name: ${fnNm}) vs number of argument roles in part definition (part: ${nm}).`);
                        let instPins: PinTarget[] = [];
                        let paramArgs: string[] = [];
                        fnArgsSplit.forEach((arg, idx) => {
                            let role = fnAlloc.argumentRoles[idx];
                            if (role === "ignored") {
                            } else if (role === "partParameter") {
                                paramArgs.push(arg);
                            } else {
                                let instIdx = (<PinInstantiationIdx>role).pinInstantiationIdx;
                                let pin = readPin(arg);
                                instPins[instIdx] = pin;
                            }
                        });
                        partIRs.push(mkIR(def, nm, instPins));
                    });
                }
            });
            return partIRs;
        }
        private allocGPIOPins(partialParts: PartIR[]): string[][] {
            let availableGPIOBlocks = copyDoubleArray(this.opts.boardDef.gpioPinBlocks);
            let sortAvailableGPIOBlocks = () => availableGPIOBlocks.sort((a, b) => a.length - b.length); //smallest blocks first
            // determine blocks needed
            let blockAssignments: AllocBlock[] = [];
            let preassignedPins: string[] = [];
            partialParts.forEach((part, idx) => {
                if (part.pinsAssigned && part.pinsAssigned.length) {
                    //already assigned
                    blockAssignments.push({partIdx: idx, partBlkIdx: 0, gpioNeeded: 0, gpioAssigned: part.pinsAssigned});
                    preassignedPins = preassignedPins.concat(part.pinsAssigned);
                } else if (part.pinsNeeded) {
                    if (typeof part.pinsNeeded === "number") {
                        //individual pins
                        for (let i = 0; i < part.pinsNeeded; i++) {
                            blockAssignments.push(
                                {partIdx: idx, partBlkIdx: 0, gpioNeeded: 1, gpioAssigned: []});
                        }
                    } else {
                        //blocks of pins
                        let blocks = <number[]>part.pinsNeeded;
                        blocks.forEach((numNeeded, blkIdx) => {
                            blockAssignments.push(
                                {partIdx: idx, partBlkIdx: blkIdx, gpioNeeded: numNeeded, gpioAssigned: []});
                        });
                    }
                }
            });
            // remove assigned blocks
            availableGPIOBlocks.forEach(blks => {
                for (let i = blks.length - 1; 0 <= i; i--) {
                    let pin = blks[i];
                    if (0 <= preassignedPins.indexOf(pin)) {
                        blks.splice(i, 1);
                    }
                }
            });
            // sort by size of blocks
            let sortBlockAssignments = () => blockAssignments.sort((a, b) => b.gpioNeeded - a.gpioNeeded); //largest blocks first
            // allocate each block
            if (0 < blockAssignments.length && 0 < availableGPIOBlocks.length) {
                do {
                    sortBlockAssignments();
                    sortAvailableGPIOBlocks();
                    let assignment = blockAssignments[0];
                    let smallestAvailableBlockThatFits: string[];
                    for (let j = 0; j < availableGPIOBlocks.length; j++) {
                        smallestAvailableBlockThatFits = availableGPIOBlocks[j];
                        if (assignment.gpioNeeded <= availableGPIOBlocks[j].length) {
                            break;
                        }
                    }
                    if (!smallestAvailableBlockThatFits || smallestAvailableBlockThatFits.length <= 0) {
                        break; // out of pins
                    }
                    while (0 < assignment.gpioNeeded && 0 < smallestAvailableBlockThatFits.length) {
                        assignment.gpioNeeded--;
                        let pin = smallestAvailableBlockThatFits[0];
                        smallestAvailableBlockThatFits.splice(0, 1);
                        assignment.gpioAssigned.push(pin);
                    }
                    sortBlockAssignments();
                } while (0 < blockAssignments[0].gpioNeeded);
            }
            if (0 < blockAssignments.length && 0 < blockAssignments[0].gpioNeeded) {
                console.debug("Not enough GPIO pins!");
                return null;
            }
            let partGPIOPinBlocks: string[][][] = partialParts.map((def, partIdx) => {
                if (!def)
                    return null;
                let assignments = blockAssignments.filter(a => a.partIdx === partIdx);
                let gpioPins: string[][] = [];
                for (let i = 0; i < assignments.length; i++) {
                    let a = assignments[i];
                    let blk = gpioPins[a.partBlkIdx] || (gpioPins[a.partBlkIdx] = []);
                    a.gpioAssigned.forEach(p => blk.push(p));
                }
                return gpioPins;
            });
            let partGPIOPins = partGPIOPinBlocks.map(blks => blks.reduce((p, n) => p.concat(n), []));
            return partGPIOPins;
        }
        private allocColumns(partialParts: PartIR[]): number[] {
            let partsCount = partialParts.length;
            let totalAvailableSpace = 30; //TODO allow multiple breadboards
            let totalSpaceNeeded = partialParts.map(d => d.breadboardColumnsNeeded).reduce((p, n) => p + n, 0);
            let extraSpace = totalAvailableSpace - totalSpaceNeeded;
            if (extraSpace <= 0) {
                console.log("Not enough breadboard space!");
                //TODO
            }
            let padding = Math.floor(extraSpace / (partsCount - 1 + 2));
            let partSpacing = padding; //Math.floor(extraSpace/(partsCount-1));
            let totalPartPadding = extraSpace - partSpacing * (partsCount - 1);
            let leftPadding = Math.floor(totalPartPadding / 2);
            let rightPadding = Math.ceil(totalPartPadding / 2);
            let nextAvailableCol = 1 + leftPadding;
            let partStartCol = partialParts.map(part => {
                let col = nextAvailableCol;
                nextAvailableCol += part.breadboardColumnsNeeded + partSpacing;
                return col;
            });
            return partStartCol;
        }
        private allocPart(partialPart: PartIR, startColumn: number, microbitPins: string[]): PartInst {
            return {
                name: partialPart.name,
                breadboardStartColumn: startColumn,
                breadboardStartRow: partialPart.def.breadboardStartRow,
                assemblyStep: partialPart.def.assemblyStep,
                visual: partialPart.def.visual,
                microbitPins: microbitPins,
                otherArgs: partialPart.otherArgs,
            };
        }
        public allocAll(): AllocatorResult {
            let partList = this.opts.partsList;
            let basicWires: WireInst[] = [];
            let partsAndWires: PartAndWiresInst[] = [];
            if (partList.length > 0) {
                let partialParts = this.allocPartIRs();
                let allWireDefs = partialParts.map(p => p.def.wires).reduce((p, n) => p.concat(n), []);
                let allPowerUsage = allWireDefs.map(w => computePowerUsage(w));
                this.powerUsage = mergePowerUsage(allPowerUsage);
                basicWires = this.allocPowerWires(this.powerUsage);
                let partGPIOPins = this.allocGPIOPins(partialParts);
                let reverseMap = mkReverseMap(this.opts.boardDef.gpioPinMap);
                let partMicrobitPins = partGPIOPins.map(pins => pins.map(p => reverseMap[p]));
                let partStartCol = this.allocColumns(partialParts);
                let parts = partialParts.map((c, idx) => this.allocPart(c, partStartCol[idx], partMicrobitPins[idx]));
                let wires = partialParts.map((c, idx) => c.def.wires.map(d => this.allocWire(d, {
                    partGPIOPins: partGPIOPins[idx],
                    startColumn: partStartCol[idx],
                })));
                partsAndWires = parts.map((c, idx) => {
                    return {part: c, wires: wires[idx]}
                });
            }
            return {
                powerWires: basicWires,
                parts: partsAndWires
            };
        }
    }

    export function allocateDefinitions(opts: AllocatorOpts): AllocatorResult {
        return new Allocator(opts).allocAll();
    }
}