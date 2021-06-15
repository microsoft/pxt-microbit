// Auto-generated. Do not edit.


    /**
     * Storing structured data in flash.
     */
    //%
declare namespace flashlog {

    /**
     * Creates a new row in the log, ready to be populated by logData()
     **/
    //% help=flashlog/begin-row
    //% parts="flashlog"
    //% blockGap=8
    //% group="micro:bit (V2)" shim=flashlog::beginRow
    function beginRow(): int32;

    /**
     * Populates the current row with the given key/value pair.
     **/
    //% help=flashlog/log-data
    //% parts="flashlog"
    //% blockGap=8
    //% group="micro:bit (V2)" shim=flashlog::logData
    function logData(key: string, value: string): int32;

    /**
     * Inject the given row into the log as text, ignoring key/value pairs.
     **/
    //% help=flashlog/log-string
    //% parts="flashlog"
    //% blockGap=8
    //% group="micro:bit (V2)" shim=flashlog::logString
    function logString(value: string): int32;

    /**
     * Complete a row in the log, and pushes to persistent storage.
     **/
    //% help=flashlog/end-row
    //% parts="flashlog"
    //% blockGap=8
    //% group="micro:bit (V2)" shim=flashlog::endRow
    function endRow(): int32;

    /**
     * Resets all data stored in persistent storage.
     **/
    //% help=flashlog/clear
    //% parts="flashlog"
    //% blockGap=8
    //% group="micro:bit (V2)" shim=flashlog::clear
    function clear(fullErase: boolean): void;

    /**
     * Determines the format of the timestamp data to be added (if any).
     * If requested, time stamps will be automatically added to each row of data
     * as an integer value rounded down to the unit specified.
     *
     * @param format The format of timestamp to use.
     */
    //% help=flashlog/set-timestamp
    //% parts="flashlog"
    //% blockGap=8
    //% group="micro:bit (V2)" shim=flashlog::setTimeStamp
    function setTimeStamp(format: FlashLogTimeStampFormat): void;

    /**
     * Defines if data logging should also be streamed over the serial port.
     *
     * @param enable True to enable serial port streaming, false to disable.
     */
    //% help=flashlog/set-serial-mirroring
    //% parts="flashlog"
    //% blockGap=8
    //% group="micro:bit (V2)" shim=flashlog::setSerialMirroring
    function setSerialMirroring(enable: boolean): void;
}

// Auto-generated. Do not edit. Really.
