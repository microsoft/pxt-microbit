/**
 * Events and data from sensors
 */
//% color=#B4009E weight=99 icon="\uf192"
namespace input {
    /**
     * Attaches code to run when the screen is facing up.
     * @param body TODO
     */
    //% help=input/on-screen-up
    export function onScreenUp(body: Action): void {
        onGesture(Gesture.ScreenUp, body);
    }

    /**
     * Attaches code to run when the screen is facing down.
     * @param body TODO
     */
    //% help=input/on-screen-down
    export function onScreenDown(body: Action): void {
        onGesture(Gesture.ScreenDown, body);
    }

    /**
     * Attaches code to run when the device is shaken.
     * @param body TODO
     */
    //% help=input/on-shake
    export function onShake(body: Action): void {
        onGesture(Gesture.Shake, body);
    }

    /**
     * Attaches code to run when the logo is oriented upwards and the board is vertical.
     * @param body TODO
     */
    //% help=input/on-logo-up
    export function onLogoUp(body: Action): void {
        onGesture(Gesture.LogoUp, body);
    }

    /**
     * Attaches code to run when the logo is oriented downwards and the board is vertical.
     * @param body TODO
     */
    //% help=input/on-logo-down
    export function onLogoDown(body: Action): void {
        onGesture(Gesture.LogoDown, body);
    }

    /**
     * Obsolete, use input.calibrateCompass instead.
     */
    //% weight=0 help=input/calibrate-compass
    export function calibrate() {
        input.calibrateCompass();
    }
}
