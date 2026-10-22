namespace pxsim {
    /** Compatibility name for the board; all state lives in DalBoardState. */
    export class DalBoard extends DalBoardState {
    }

    /** The view operations that DOM-free state code may request. Implemented by DalBoardView. */
    export interface DalBoardViewContract extends BoardView {
        addUpdateSubscriber(subscriber: () => void): void;
        setAudioPinEnabled(enabled: boolean): void;
    }

    export function board(): DalBoard {
        return runtime.board as DalBoard;
    }

    export function boardView(): DalBoardViewContract {
        return runtime.boardView as DalBoardViewContract;
    }
}
