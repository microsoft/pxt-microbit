namespace bluetooth {
    /**
     * Returns the delimiter corresponding string
     */
    //% blockId="bluetooth_uart_delimiter_conv" block="%del"
    //% weight=1 parts="bluetooth"
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

    /**
    *  Writes to the Bluetooth UART service buffer. From there the data is transmitted over Bluetooth to a connected device.
    */
    //% help=bluetooth/uart-write
    //% blockId=bluetooth_uart_write block="bluetooth uart|write %data" blockGap=8
    //% parts="bluetooth" shim=bluetooth::uartWriteString
    export function uartWriteString(data: string): void {
        // dummy implementation for simulator
        console.log("UART Write: " + data)
    }

    /**
     * Prints a numeric value to the serial
     */
    //% help=serial/write-number
    //% weight=89 blockGap=8
    //% blockId=bluetooth_uart_writenumber block="bluetooth uart|write number %value"
    export function uartWriteNumber(value: number): void {
        uartWriteString(value.toString());
    }

    /**
     * Writes a ``name: value`` pair line to the serial.
     * @param name name of the value stream, eg: x
     * @param value to write
     */
    //% weight=88 blockGap=8
    //% help=bluetooth/uart-write-value
    //% blockId=bluetooth_uart_writevalue block="bluetooth uart|write value %name|= %value"
    export function uartWriteValue(name: string, value: number): void {
        uartWriteString(name + ":" + value + "\r\n");
    }

    /**
     *  Reads from the Bluetooth UART service buffer, returning its contents when the specified delimiter character is encountered.
     */
    //% help=bluetooth/uart-read
    //% blockId=bluetooth_uart_read block="bluetooth uart read %del=bluetooth_uart_delimiter_conv" blockGap=8
    //% parts="bluetooth" shim=bluetooth::uartRead
    export function uartRead(del: string): string {
        // dummy implementation for simulator
        return "???"
    }
}
