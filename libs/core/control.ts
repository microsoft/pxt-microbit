/**
* Runtime and event utilities.
*/
//% weight=1 color="#333333" icon="\uf233"
//% advanced=true
namespace control {
    /**
     * Run other code in the parallel.
     */
    //% hidden=1
    export function runInParallel(a: () => void) {
        control.inBackground(a);
    }

    //% hidden=1 deprecated=1
    export function runInBackground(a: () => void) {
        control.inBackground(a);
    }

    /**
     * Returns the value of a C++ runtime constant
     */
    //% weight=2 weight=19 blockId="control_event_source_id" block="%id" blockGap=8
    //% help=control/event-source-id
    //% shim=TD_ID advanced=true
    export function eventSourceId(id: EventBusSource): number {
        return id;
    }
    /**
     * Returns the value of a C++ runtime constant
     */
    //% weight=1 weight=19 blockId="control_event_value_id" block="%id"
    //% help=control/event-value-id
    //% shim=TD_ID advanced=true
    export function eventValueId(id: EventBusValue): number {
        return id;
    }

    export const enum PXT_PANIC {
        CODAL_OOM = 20,
        GC_OOM = 21,
        GC_TOO_BIG_ALLOCATION = 22,
        CODAL_HEAP_ERROR = 30,
        CODAL_NULL_DEREFERENCE = 40,
        CODAL_USB_ERROR = 50,
        CODAL_HARDWARE_CONFIGURATION_ERROR = 90,

        INVALID_BINARY_HEADER = 901,
        OUT_OF_BOUNDS = 902,
        REF_DELETED = 903,
        SIZE = 904,
        INVALID_VTABLE = 905,
        INTERNAL_ERROR = 906,
        NO_SUCH_CONFIG = 907,
        NO_SUCH_PIN = 908,
        INVALID_ARGUMENT = 909,
        MEMORY_LIMIT_EXCEEDED = 910,
        SCREEN_ERROR = 911,
        MISSING_PROPERTY = 912,
        INVALID_IMAGE = 913,
        CALLED_FROM_ISR = 914,
        HEAP_DUMPED = 915,
        STACK_OVERFLOW = 916,
        BLOCKING_TO_STRING = 917,
        VM_ERROR = 918,
        SETTINGS_CLEARED = 920,
        SETTINGS_OVERLOAD = 921,
        SETTINGS_SECRET_MISSING = 922,
        DELETE_ON_CLASS = 923,

        CAST_FIRST = 980,
        CAST_FROM_UNDEFINED = 980,
        CAST_FROM_BOOLEAN = 981,
        CAST_FROM_NUMBER = 982,
        CAST_FROM_STRING = 983,
        CAST_FROM_OBJECT = 984,
        CAST_FROM_FUNCTION = 985,
        CAST_FROM_NULL = 989,

        UNHANDLED_EXCEPTION = 999,
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

    export function fail(message: string) {
        console.log("Fatal failure: ")
        console.log(message)
        panic(108)
    }

    let _evSource = 0x8000
    /**
     * Incrementally allocates event source identifiers.
     */
    export function allocateEventSource() {
        return ++_evSource
    }    

    /**
     * Display warning in the simulator.
     */
    //% shim=pxtrt::runtimeWarning
    export function runtimeWarning(message: string) { }

    //% shim=pxt::programHash
    export declare function programHash(): number;

    //% shim=pxt::programName
    export declare function programName(): string;

    /** Returns estimated size of memory in bytes. */
    //% shim=control::_ramSize
    export function ramSize() {
        return 32 * 1024 * 1024;
    }

    /** Runs the function and returns run time in microseconds. */
    export function benchmark(f: () => void) {
        const t0 = micros()
        f()
        let t = micros() - t0
        if (t < 0)
            t += 0x3fffffff
        return t
    }

    /**
     * Given two versions, returns -1 if the first version is less than
     * the second, 1 if it's greater, and 0 if it's the same.
     */
    //%
    export function compareVersion(version1: string, version2: string): number {
        let v1Arr = version1.split(".");
        let v2Arr = version2.split(".");

        v1Arr = v1Arr.map((str) => {
            if (str.includes("x") || str.includes("X")) {
                return "0"
            } else {
                return str;
            }
        })
        v2Arr = v2Arr.map((str) => {
            if (str.includes("x") || str.includes("X")) {
                return "0"
            } else {
                return str;
            }
        })

        for (let i = v1Arr.length; i < Math.max(v1Arr.length, v2Arr.length); i++) {
            v1Arr.push("0");
        }

        for (let i = v2Arr.length; i < Math.max(v1Arr.length, v2Arr.length); i++) {
            v2Arr.push("0");
        }

        for (let i = 0; i < v1Arr.length; i++) {
            if (parseInt(v1Arr[i]) != parseInt(v2Arr[i])) {
                return parseInt(v1Arr[i]) - parseInt(v2Arr[i]);
            }
        }
        return 0;
    }

    //% shim=control::_hardwareVersion
    export function hardwareVersion(): string {
        return "2.0";
    }
}

/**
 * Convert any value to text
 * @param value value to be converted to text
 */
//% help=text/convert-to-text weight=1
//% block="convert $value=math_number to text"
//% blockId=variable_to_text blockNamespace="text"
function convertToText(value: any): string {
    return "" + value;
}