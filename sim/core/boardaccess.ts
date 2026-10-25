/// <reference path="dalboardstate.ts"/>

namespace pxsim {
    /** Compatibility name for the board; all state lives in DalBoardState. */
    export class DalBoard extends DalBoardState {
    }

    /** The view operations that DOM-free state code may request. Implemented by DalBoardView. */
    export interface DalBoardViewContract extends RuntimeBoardView {
        addUpdateSubscriber(subscriber: () => void): void;
        setAudioPinEnabled(enabled: boolean): void;
    }

    export function board(): DalBoard {
        return runtime.board as DalBoard;
    }

    export function boardView(): DalBoardViewContract {
        return runtime.boardView as DalBoardViewContract;
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
