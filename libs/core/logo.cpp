#include "pxt.h"

namespace input {
    /**
     * Do something when the logo is touched and released again.
     * @param body the code to run when the logo is pressed
     */
    //% weight=83 blockGap=32
    //% blockId=input_logo_event block="on logo pressed"
    //% group="micro:bit v2"
    //% parts="logotouch"
    //% help="input/on-logo-pressed"
    void onLogoPressed(Action body) {
#if MICROBIT_CODAL
        registerWithDal(uBit.logo.id, MICROBIT_BUTTON_EVT_CLICK, body);
#else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
    }

    /**
     * Do something when the logo is released.
     * @param body the code to run when the logo is released
     */
    //% weight=6 blockGap=16
    //% blockId=input_logo_released block="on logo released"
    //% advanced=true
    //% group="micro:bit v2"
    //% parts="logotouch"
    //% help="input/on-logo-released"
    void onLogoReleased(Action body) {
#if MICROBIT_CODAL
        registerWithDal(uBit.logo.id, MICROBIT_BUTTON_EVT_UP, body);
#else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
    }

    /**
     * Get the logo state (pressed or not).
     */
    //% weight=58
    //% blockId="input_logo_is_pressed" block="logo is pressed"
    //% blockGap=8
    //% group="micro:bit v2"
    //% parts="logotouch"
    //% help="input/logo-is-pressed"
    bool logoIsPressed() {
#if MICROBIT_CODAL
        return uBit.io.logo.isTouched();
#else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
        return false;
#endif
    }
}