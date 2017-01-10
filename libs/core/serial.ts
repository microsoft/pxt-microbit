/**
 * Reading and writing data over a serial connection.
 */
//% weight=2 color=#002050 icon="\uf287"
//% advanced=true
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
     * Reads a line of text from the serial port.
     */
    //% help=serial/read-line
    //% blockId=serial_read_line block="serial|read line"
    //% weight=20 blockGap=8
    export function readLine(): string {
        return serial.readUntil(delimiters(Delimiters.NewLine));
    }

    /**
     * Returns the delimiter corresponding string
     */
    //% blockId="serial_delimiter_conv" block="%del"
    //% weight=1 blockHidden=true
    export function delimiters(del: Delimiters): string {
        // even though it might not look like, this is more
        // (memory) efficient than the C++ implementation, because the
        // strings are statically allocated and take no RAM 
        switch (del) {
            case Delimiters.NewLine: return "\n"
            case Delimiters.Comma: return ","
            case Delimiters.Dollar: return "$"
            case Delimiters.Colon: return ":"
            case Delimiters.Fullstop: return "."
            case Delimiters.Hash: return "#"
            default: return "\n"
        }
    }
}
