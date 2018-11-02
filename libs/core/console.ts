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
    //% text.shadowOptions.toString=true
    export function log(text: string): void {
        // pad text on the 32byte boundar
        text += "\r\n";
        control.__log(text);
        // send to listeners
        if (listeners)
            for (let i = 0; i < listeners.length; ++i)
                listeners[i](text);
    }

    /**
     * Write a name:value pair as a line of text to the console output.
     * @param name name of the value stream, eg: "x"
     * @param value to write
     */
    //% weight=88 blockGap=8
    //% help=console/log-value
    export function logValue(name: string, value: number): void {
        log(name ? `${name}: ${value}` : `${value}`)
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
}