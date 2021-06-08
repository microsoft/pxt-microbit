/**
 * Log data to flash storage
 */
//% block="Data Logger"
//% icon="\uf0ce"
//% color="#378273"
namespace datalogger {
    let onLogFullHandler: () => void;
    let _mirrorToSerial = true;
    let _timestampFormat= FlashLogTimeStampFormat.None;

    let initialized = false;
    function init() {
        if (initialized)
            return;
        initialized = true;

        // TODO update dal and drop the nums / use the proper enums
        control.onEvent(DAL.MICROBIT_ID_LOG, DAL.MICROBIT_LOG_EVT_LOG_FULL, () => {
            if (onLogFullHandler) {
                onLogFullHandler();
            } else {
                throw "Flash memory full; log failed.";
            }
        });

    }
    export class ColumnValue {
        constructor(
            public column: string,
            public value: number | string
        ) { }
    }

    /**
     * A column and value to log to flash storage
     * @param column the column to set
     * @param value the value to set. Can be a string or a number.
     * @returns A new value that can be stored in flash storage using log data
     */
    //% block="column $column value $value"
    //% value.shadow=text
    //% blockId=dataloggercreatecolumnvalue
    //% weight=80
    export function createCV(column: string, value: number | string): ColumnValue {
        return new ColumnValue(column, value);
    }

    /**
     * Log data to flash storage
     * @param data Array of data to be logged to flash storage
     */
    //% block="log data $data"
    //% blockId=dataloggerlogdata
    //% data.shadow=lists_create_with
    //% data.defl=dataloggercreatecolumnvalue
    //% weight=100
    export function logData(data: ColumnValue[]): void {
        if (!data || !data.length)
            return;
        init();

        flashlog.beginRow();

        for (const cv of data) {
            flashlog.logData(cv.column, "" + cv.value);
            if (_mirrorToSerial) {
                serial.writeLine(`${cv.column}: ${cv.value}`);
                // todo: should mirror to serial be in exact same format as row?
                // if so, we'd probably need to either mirror to serial in codal itself
                // or add a 'read last row' function to codal, to get order correct
                // and to get the same timestamp.
                // TODO: probably drop from sim side or move this to cpp?
            }
        }

        flashlog.endRow();
    }

    /**
     * Set the columns for future data logging
     * @param cols Array of the columns that will be logged.
     */
    //% block="set columns $cols"
    //% blockId=dataloggersetcolumns
    //% data.shadow=list_create_with
    //% weight=70
    export function setColumns(cols: string[]): void {
        if (!cols)
            return;
        logData(cols.map(col => createCV(col, "")));
    }

    /**
     * Delete all existing logs, including column headers
     */
    //% block="delete log"
    //% blockId=dataloggerdeletelog
    //% weight=60
    export function deleteLog(): void {
        flashlog.clear();
    }

    /**
     * Register an event to run when no more data can be logged.
     * @param handler code to run when the log is full and no more data can be stored.
     */
    //% block="on log full"
    //% blockId="on log full"
    //% weight=40
    export function onLogFull(handler: () => void): void {
        onLogFullHandler = handler;
    }

    /**
     * Set whether timestamp is included in included when logging data or not.
     * @param on if true timestamp will be included
     * @param format Format in which to show the timestamp. Setting FlashLogTimeStampFormat.None is equivalent to setting 'on' to false
     */
    //% block="include timestamp $on||format $format"
    //% blockId=dataloggertoggleincludetimestamp
    //% on.shadow=toggleOnOff
    //% weight=30
    export function includeTimestamp(on: boolean, format: FlashLogTimeStampFormat = FlashLogTimeStampFormat.Milliseconds): void {
        _timestampFormat = !on ? FlashLogTimeStampFormat.None : format;
        flashlog.setTimeStamp(_timestampFormat);
    }

    /**
     * Set whether data is mirrored to serial or not.
     * @param on if true, data that is logged will be mirrored to serial
     */
    //% block="mirror data to serial $on"
    //% blockId=dataloggertogglemirrortoserial
    //% on.shadow=toggleOnOff
    //% weight=25
    export function mirrorToSerial(on: boolean): void {
        _mirrorToSerial = !!on;
    }
}