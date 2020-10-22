namespace pxsim.input {
    export function onLogoPressed(handler: RefAction): void {
        const b = board();
        if (!b) return;

        // update rendering
        runtime.queueDisplayUpdate();

        // minimum v2
        b.ensureHardwareVersion(2);

        // register handle
        pxtcore.registerWithDal(DAL.MICROBIT_ID_LOGO, DAL.MICROBIT_BUTTON_EVT_CLICK, handler);
    }

    export function onLogoReleased(handler: RefAction): void {
        const b = board();
        if (!b) return;
        
        // update rendering
        runtime.queueDisplayUpdate();

        // minimum v2
        b.ensureHardwareVersion(2);

        // register handle
        pxtcore.registerWithDal(DAL.MICROBIT_ID_LOGO, DAL.MICROBIT_BUTTON_EVT_UP, handler);
    }

    export function logoIsPressed(): boolean {
        const b = board();
        if (!b) return false;

        // minimum v2
        b.ensureHardwareVersion(2);

        return b.logoTouch.pressed;
    }
}
