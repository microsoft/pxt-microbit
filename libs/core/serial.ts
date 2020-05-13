const enum Delimiters {
    //% block="new line (\n)"
    NewLine = 10,
    //% block=","
    Comma = 44,
    //% block="$"
    Dollar = 36,
    //% block=":"
    Colon = 58,
    //% block="."
    Fullstop = 46,
    //% block="#"
    Hash = 35,
    //% block="carriage return (\r)"
    CarriageReturn = 13,
    //% block="space"
    Space = 32,
    //% block="tab (\t)"
    Tab = 9,
    //% block="|"
    Pipe = 124,
    //% block=";"
    SemiColon = 59,
}

/**
 * Reading and writing data over a serial connection.
 */
//% weight=2 color=#002050 icon="\uf287"
//% advanced=true
namespace serial {
    /**
     * The string used to mark a new line, default is \r\n
     */
    export let NEW_LINE = "\r\n";
    export let NEW_LINE_DELIMITER: Delimiters = Delimiters.NewLine;
    let writeLinePadding = 32;

    /**
     * Print a line of text to the serial port
     * @param value to send over serial
     */
    //% weight=90
    //% help=serial/write-line blockGap=8
    //% blockId=serial_writeline block="serial|write line %text"
    //% text.shadowOptions.toString=true
    export function writeLine(text: string): void {
        if (!text) text = "";
        serial.writeString(text);
        // pad data to the 32 byte boundary
        // to ensure apps receive the packet
        if (writeLinePadding > 0) {
            let r = (writeLinePadding - (text.length + NEW_LINE.length) % writeLinePadding) % writeLinePadding;
            for (let i = 0; i < r; ++i)
                serial.writeString(" ");
        }
        serial.writeString(NEW_LINE);
    }

    /**
     * Sets the padding length for lines sent with "write line".
     * @param length the number of bytes alignment, eg: 0
     *
     */
    //% weight=1
    //% help=serial/set-write-line-padding
    //% blockId=serialWriteNewLinePadding block="serial set write line padding to $length"
    //% advanced=true
    //% length.min=0 length.max=128
    export function setWriteLinePadding(length: number) {
        writeLinePadding = length | 0;
    }

    /**
     * Print a numeric value to the serial port
     */
    //% help=serial/write-number
    //% weight=89 blockGap=8
    //% blockId=serial_writenumber block="serial|write number %value"
    export function writeNumber(value: number): void {
        writeString(value.toString());
    }

    /**
     * Print an array of numeric values as CSV to the serial port
     */
    //% help=serial/write-numbers
    //% weight=86
    //% blockId=serial_writenumbers block="serial|write numbers %values"
    export function writeNumbers(values: number[]): void {
        if (!values) return;
        for (let i = 0; i < values.length; ++i) {
            if (i > 0) writeString(",");
            writeNumber(values[i]);
        }
        writeLine("")
    }

    /**
     * Write a name:value pair as a line to the serial port.
     * @param name name of the value stream, eg: x
     * @param value to write
     */
    //% weight=88 blockGap=8
    //% help=serial/write-value
    //% blockId=serial_writevalue block="serial|write value %name|= %value"
    export function writeValue(name: string, value: number): void {
        writeLine((name ? name + ":" : "") + value);
    }

    /**
     * Read a line of text from the serial port.
     */
    //% help=serial/read-line
    //% blockId=serial_read_line block="serial|read line"
    //% weight=20 blockGap=8
    export function readLine(): string {
        return serial.readUntil(delimiters(NEW_LINE_DELIMITER));
    }

    /**
     * Return the corresponding delimiter string
     */
    //% blockId="serial_delimiter_conv" block="%del"
    //% weight=1 blockHidden=true
    export function delimiters(del: Delimiters): string {
        return String.fromCharCode(del as number);
    }
}
