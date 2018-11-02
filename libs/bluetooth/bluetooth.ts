/// <reference no-default-lib="true"/>
/**
 * Support for additional Bluetooth services.
 */
//% color=#007EF4 weight=96 icon="\uf294"
namespace bluetooth {
    /**
     * Internal use
     */
    //% shim=bluetooth::__log
    export function __log(msg: string) {
        return;
    }
    console.addListener(function (msg) { __log(msg) });

    /**
    *  Writes to the Bluetooth UART service buffer. From there the data is transmitted over Bluetooth to a connected device.
    */
    //% help=bluetooth/uart-write-string weight=80
    //% blockId=bluetooth_uart_write block="bluetooth uart|write string %data" blockGap=8
    //% parts="bluetooth" shim=bluetooth::uartWriteString advanced=true
    export function uartWriteString(data: string): void {
        // dummy implementation for simulator
        console.log("UART Write: " + data)
    }

    /**
     * Prints a numeric value to the serial
     */
    //% help=bluetooth/uart-write-number weight=79
    //% weight=89 blockGap=8 advanced=true
    //% blockId=bluetooth_uart_writenumber block="bluetooth uart|write number %value"
    export function uartWriteNumber(value: number): void {
        uartWriteString(value.toString());
    }

    /**
     * Writes a ``name: value`` pair line to the serial.
     * @param name name of the value stream, eg: x
     * @param value to write
     */
    //% weight=88 weight=78
    //% help=bluetooth/uart-write-value advanced=true
    //% blockId=bluetooth_uart_writevalue block="bluetooth uart|write value %name|= %value"
    export function uartWriteValue(name: string, value: number): void {
        uartWriteString(name + ":" + value + "\r\n");
    }

    /**
     *  Reads from the Bluetooth UART service buffer, returning its contents when the specified delimiter character is encountered.
     */
    //% help=bluetooth/uart-read-until weight=75
    //% blockId=bluetooth_uart_read block="bluetooth uart|read until %del=serial_delimiter_conv"
    //% parts="bluetooth" shim=bluetooth::uartReadUntil advanced=true
    export function uartReadUntil(del: string): string {
        // dummy implementation for simulator
        return "???"
    }

    /**
    * Advertise an Eddystone UID
    * @param ns 4 last bytes of the namespace uid
    * @param instance 4 last bytes of the instance uid
    * @param power power level between 0 and 7, eg: 7
    * @param connectable true to keep bluetooth connectable for other services, false otherwise.
    */
    //% blockId=eddystone_advertise_uid block="bluetooth advertise UID|namespace (bytes 6-9)%ns|instance (bytes 2-6)%instance|with power %power|connectable %connectable"
    //% parts=bluetooth weight=12 blockGap=8
    //% help=bluetooth/advertise-uid blockExternalInputs=1
    export function advertiseUid(ns: number, instance: number, power: number, connectable: boolean) {
        const buf = pins.createBuffer(16);
        buf.setNumber(NumberFormat.Int32BE, 6, ns);
        buf.setNumber(NumberFormat.Int32BE, 12, instance);
        bluetooth.advertiseUidBuffer(buf, power, connectable);
    }
}
