namespace pxsim.input {
    export function onButtonPressed(button: number, handler: RefAction): void {
        let b = board().buttonPairState;
        if (button == b.props.ID_BUTTON_AB && !b.usesButtonAB) {
            b.usesButtonAB = true;
            runtime.queueDisplayUpdate();
        }
        pxtcore.registerWithDal(button, DAL.MICROBIT_BUTTON_EVT_CLICK, handler);
    }

    export function buttonIsPressed(button: number): boolean {
        let b = board().buttonPairState;
        if (button == b.abBtn.id && !b.usesButtonAB) {
            b.usesButtonAB = true;
            runtime.queueDisplayUpdate();
        }
        if (button == b.aBtn.id) return b.aBtn.pressed;
        if (button == b.bBtn.id) return b.bBtn.pressed;
        return b.abBtn.pressed || (b.aBtn.pressed && b.bBtn.pressed);
    }
}
