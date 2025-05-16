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

    /**
     * Number of rows currently used by the datalogger, start counting at fromRowIndex
     * Treats the header as the first row
     * @param fromRowIndex 0-based index of start: Default value of 0
     * @returns header + rows
     */
    //% fromRowIndex.defl=0 shim=flashlog::getNumberOfRows
    function getNumberOfRows(fromRowIndex?: int32): int32;

    /**
     * Get all rows separated by a newline & each column separated by a comma.
     * Starting at the 0-based index fromRowIndex & counting inclusively until nRows.
     * @param fromRowIndex 0-based index of start
     * @param nRows inclusive count from fromRowIndex
     * @returns String where newlines denote rows & commas denote columns
     */
    //% shim=flashlog::getRows
    function getRows(fromRowIndex: int32, nRows: int32): string;
}

// Auto-generated. Do not edit. Really.
