/// <reference no-default-lib="true"/>

/**
 * Reading and writing data to the console output.
 */
//% weight=12 color=#002050 icon="\uf120"
//% advanced=true
namespace console {
    type Listener = (text: string) => void;

    //% whenUsed
    let listeners: Listener[] = undefined;

    /**
     * Write a line of text to the console output.
     * @param value to send
     */
    //% weight=90
    //% help=console/log blockGap=8
    export function log(text: any): void {
        let stringified = inspect(text);
        // pad text on the 32byte boundar
        stringified += "\r\n";
        control.__log(stringified);
        // send to listeners
        if (listeners)
            for (let i = 0; i < listeners.length; ++i)
                listeners[i](stringified);
    }

    /**
     * Write a name:value pair as a line of text to the console output.
     * @param name name of the value stream, eg: "x"
     * @param value to write
     */
    //% weight=88 blockGap=8
    //% help=console/log-value
    export function logValue(name: any, value: number): void {
        const nameText = inspect(name);
        log(nameText ? `${nameText}: ${value}` : `${value}`)
    }

    /**
     * Adds a listener for the log messages
     * @param listener
     */
    //%
    export function addListener(listener: (text: string) => void) {
        if (!listener) return;
        if (!listeners)
            listeners = [];
        listeners.push(listener);
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

            return `{${
                keys.reduce(
                    (prev, currKey) => prev + `\n    ${currKey}: ${obj[currKey]}`,
                    ""
                ) + (snipped ? "\n    ..." : "")
            }
}`;
        }
    }
}