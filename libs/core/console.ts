/// <reference no-default-lib="true"/>

enum ConsolePriority {
    Debug = 0,
    Log = 1,
    Warning = 2,
    Error = 3,
    Silent = 4
}

/**
 * Reading and writing data to the console output.
 */
//% weight=12 color=#002050 icon="\uf120"
//% advanced=true
namespace console {
    type Listener = (priority: ConsolePriority, text: string) => void;

    /**
     * Minimum priority to send messages to listeners
     */
    export let minPriority = ConsolePriority.Log;

    let listeners: Listener[]

    export function add(priority: ConsolePriority, message: any) {
        if (priority < minPriority) return;
        let text = inspect(message);
        // add new line
        text += "\n";
        control.__log(priority, text)
        // send to listeners
        if (listeners)
            for (let i = 0; i < listeners.length; ++i)
                listeners[i](priority, text);
    }

    export function debug(text: any) {
        add(ConsolePriority.Debug, text);
    }

    export function warn(text: any) {
        add(ConsolePriority.Warning, text);
    }

    export function error(text: any) {
        add(ConsolePriority.Error, text);
    }

    /**
     * Write a line of text to the console output.
     * @param value to send
     */
    //% weight=90
    //% help=console/log blockGap=8
    export function log(value: any): void {
        add(ConsolePriority.Log, value);
    }

    /**
     * Write a name:value pair as a line of text to the console output.
     * @param name name of the value stream, eg: "x"
     * @param value to write
     */
    //% weight=88 blockGap=8
    //% help=console/log-value
    export function logValue(name: any, value: any): void {
        log(name ? `${inspect(name)}: ${inspect(value)}` : `${inspect(value)}`)
    }

    /**
     * Convert any object or value to a string representation
     * @param obj value to be converted to a string
     * @param maxElements [optional] max number values in an object to include in output
     */
    export function inspect(obj: any, maxElements = 20): string {
        if (typeof obj == "string") {
            return obj;
        } else if (typeof obj == "number") {
            return "" + obj;
        } else if (Array.isArray(obj)) {
            const asArr = (obj as Array<string>);
            if (asArr.length <= maxElements) {
                return asArr.join(",");
            } else {
                return `${asArr.slice(0, maxElements).join(",")}...`;
            }
        } else {
            const asString = obj + "";
            if (asString != "[object Object]"
                && asString != "[Object]") { // on arcade at least, default toString is [Object] on hardware instead of standard
                return asString;
            }

            let keys = Object.keys(obj);
            const snipped = keys.length > maxElements;
            if (snipped) {
                keys = keys.slice(0, maxElements);
            }

            return `{${keys.reduce(
                (prev, currKey) => prev + `\n    ${currKey}: ${obj[currKey]}`,
                ""
            ) + (snipped ? "\n    ..." : "")
                }
}`;
        }
    }

    /**
     * Adds a listener for the log messages
     * @param listener
     */
    //%
    export function addListener(listener: (priority: ConsolePriority, text: string) => void) {
        if (!listeners) listeners = []
        if (!listener || listeners.indexOf(listener) > -1) return;
        listeners.push(listener);
    }

    /**
     * Removes a listener
     * @param listener
     */
    //%
    export function removeListener(listener: (priority: ConsolePriority, text: string) => void) {
        if (!listener || !listeners) return;
        const i = listeners.indexOf(listener);
        if (i > -1)
            listeners.splice(i, 1);
    }
}