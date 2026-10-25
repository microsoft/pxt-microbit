/// <reference path="boardaccess.ts"/>

namespace pxsim {
    /** Creates the board without a view, for running programs outside a browser. */
    export function initHeadlessDalBoard() {
        U.assert(!runtime.board);
        runtime.board = new DalBoard();
        runtime.postError = (e) => drawSadFace();
    }

    if (!pxsim.initHeadlessRuntime) {
        pxsim.initHeadlessRuntime = initHeadlessDalBoard;
    }
}
