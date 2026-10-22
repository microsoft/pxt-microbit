/// <reference path="boardaccess.ts"/>

namespace pxsim {
    /** Creates the board without a view, for running programs outside a browser. */
    export function initHeadlessDalBoard() {
        U.assert(!runtime.board);
        runtime.board = new DalBoard();
        runtime.postError = (e) => {
            // there is no display to draw the sad face on; the runtime's error handler reports the error
        };
    }

    pxsim.initHeadlessRuntime = initHeadlessDalBoard;
}
