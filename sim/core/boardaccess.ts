/// <reference path="dalboardstate.ts"/>

namespace pxsim {
    /** The micro:bit board. The shims reach it through `board()`. */
    export class DalBoard extends DalBoardState {
    }

    export function board(): DalBoard {
        return runtime.board as DalBoard;
    }

    /** Returns the board view, or undefined in a headless run. */
    export function boardView(): RuntimeBoardView | undefined {
        return runtime.boardView;
    }

    export function parsePinString(gpioPin: string): Pin {
        if (gpioPin == "*")
            return board().edgeConnectorState.getPin(DAL.MICROBIT_ID_IO_P0);

        const m = /^(Analog|Digital)Pin\.P(\d+)/.exec(gpioPin);
        if (!m)
            return undefined;
        const pinNum = parseInt(m[2], 10);
        return board().edgeConnectorState.pins[pinNum];
    }
}
