/**
 * Reading and writing data over a serial connection.
 */
//% weight=2 color=#002050
namespace serial {
    /**
     * Prints a line of text to the serial
     * @param value to send over serial
     */
    //% weight=90
    //% help=serial/write-line blockGap=8
    //% blockId=serial_writeline block="serial|write line %text"
    export function writeLine(text: string): void {
        writeString(text + "\r\n");
    }

    /**
     * Prints a numeric value to the serial
     */
    //% help=serial/write-number
    //% weight=89 blockGap=8
    //% blockId=serial_writenumber block="serial|write number %value"
    export function writeNumber(value: number): void {
        writeString(value.toString());
    }

    /**
     * Writes a ``name: value`` pair line to the serial.
     * @param name name of the value stream, eg: x
     * @param value to write
     */
    //% weight=88 blockGap=8
    //% help=serial/write-value
    //% blockId=serial_writevalue block="serial|write value %name|= %value"
    export function writeValue(name: string, value: number): void {
        writeString(name + ":" + value + "\r\n");
    }

    /**
    * Registers an event to be fired when a line has been received
    */
    // help=serial/on-line-received
    // blockId=serial_on_line_received block="serial on line received"
    // weight=21 blockGap=8
    export function onLineReceived(body: Action): void {
       // serial.onDataReceived("\n", body);
    }
}
