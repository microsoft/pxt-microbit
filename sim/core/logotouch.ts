namespace pxsim.input {
    export function onLogoEvent(action: number, handler: RefAction): void {
        const b = board();
        if (!b) return;

        // update rendering
        runtime.queueDisplayUpdate();

        // minimum v2
        b.ensureHardwareVersion(2);

        // register handle
        pxtcore.registerWithDal(DAL.MICROBIT_ID_LOGO, action, handler);
    }

    export function logoIsPressed(): boolean {
        const b = board();
        if (!b) return false;

        // minimum v2
        b.ensureHardwareVersion(2);

        return b.logoTouch.pressed;
    }
}

namespace pxsim.pins {
    export function touchSetMode(name: number, mode: number) {
        const b = board();
        if (b)
            b.ensureHardwareVersion(2);
        // not simulated
    }
}