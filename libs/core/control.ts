/**
* Runtime and event utilities.
*/
//% weight=1 color="#333333" icon="\uf233"
//% advanced=true
namespace control {

    /**
     * Returns the value of a C++ runtime constant
     */
    //% weight=2 weight=19 blockId="control_event_source_id" block="%id" blockGap=8
    //% shim=TD_ID advanced=true
    export function eventSourceId(id: EventBusSource): number {
        return id;
    }
    /**
     * Returns the value of a C++ runtime constant
     */
    //% weight=1 weight=19 blockId="control_event_value_id" block="%id"
    //% shim=TD_ID advanced=true
    export function eventValueId(id: EventBusValue): number {
        return id;
    }

    /**
     * Display specified error code and stop the program.
     */
    //% shim=pxtrt::panic
    export function panic(code: number) { }

    /**
     * If the condition is false, display msg on serial console, and panic with code 098.
     */
    export function assert(condition: boolean, msg?: string) {
        if (!condition) {
            console.log("ASSERTION FAILED")
            if (msg != null) {
                console.log(msg)
            }
            panic(98)
        }
    }

    /**
     * Display warning in the simulator.
     */
    //% shim=pxtrt::runtimeWarning
    export function runtimeWarning(message: string) { }

    /**
     * Resets the device and enters pairing mode
     */
    //% blockId=control_reset_into_pairing block="reset into pairing mode"
    //% advanced=true
    //% weight=1
    //% help=control/reset-into-pairing-mode
    export function resetIntoPairingMode() {
        control.raiseEvent(DAL.MICROBIT_ID_PARTIAL_FLASHING, DAL.MICROBIT_RESET_INTO_PAIRING);
    }
}
