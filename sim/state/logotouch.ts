namespace pxsim.input {
    export function onLogoPressed(handler: RefAction): void {
        const b = board();
        if (!b) return;
        
        // minimum v2
        b.ensureHardwareVersion(2);

        // register handle
        pxtcore.registerWithDal(DAL.MICROBIT_ID_LOGO, DAL.MICROBIT_BUTTON_EVT_CLICK, handler);
    }

    export function logoIsPressed(): boolean {
        const b = board();
        if (!b) return false;

        return b.logoTouch.pressed;
    }
}
