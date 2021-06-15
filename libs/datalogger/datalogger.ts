/**
 * Log data to flash storage
 */
//% block="Data Logger"
//% icon="\uf0ce"
//% color="#378273"
namespace datalogger {
    export enum DeleteType {
        //% block="fast"
        Fast,
        //% block="full"
        Full
    }

    let onLogFullHandler: () => void;
    let _disabled = false;

    let initialized = false;
    function init() {
        if (initialized)
            return;
        initialized = true;

        includeTimestamp(FlashLogTimeStampFormat.Seconds);
        mirrorToSerial(true);

        control.onEvent(DAL.MICROBIT_ID_LOG, DAL.MICROBIT_LOG_EVT_LOG_FULL, () => {
            _disabled = true;
            if (onLogFullHandler) {
                onLogFullHandler();
            } else {
                basic.showLeds(`
                    # . . . #
                    # # . # #
                    . . . . .
                    . # # # .
                    # . . . #
                `);
                basic.pause(1000);
                basic.clearScreen();
                basic.showString("928");
            }
        });
    }

    export class ColumnValue {
        public value: string;
        constructor(
            public column: string,
            value: any
        ) {
            this.value = "" + value;
        }
    }

    /**
     * A column and value to log to flash storage
     * @param column the column to set
     * @param value the value to set.
     * @returns A new value that can be stored in flash storage using log data
     */
    //% block="column $column value $value"
    //% value.shadow=math_number
    //% blockId=dataloggercreatecolumnvalue
    //% group="micro:bit (V2)"
    //% weight=80
    export function createCV(column: string, value: any): ColumnValue {
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
    //% group="micro:bit (V2)"
    //% weight=100
    export function logData(data: ColumnValue[]): void {
        if (!data || !data.length)
            return;
        init();

        if (_disabled)
            return;

        flashlog.beginRow();
        for (const cv of data) {
            flashlog.logData(cv.column, cv.value);
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
    //% group="micro:bit (V2)"
    //% weight=70
    export function setColumns(cols: string[]): void {
        if (!cols)
            return;

        logData(cols.map(col => createCV(col, "")));
    }

    /**
     * Delete all existing logs, including column headers. By default this only marks the log as
     * overwriteable / deletable in the future.
     * @param deleteType optional set whether a deletion will be fast or full
     */
    //% block="delete log||$deleteType"
    //% blockId=dataloggerdeletelog
    //% group="micro:bit (V2)"
    //% weight=60
    export function deleteLog(deleteType?: DeleteType): void {
        init();
        flashlog.clear(deleteType === DeleteType.Full);
        _disabled = false;
    }

    /**
     * Register an event to run when no more data can be logged.
     * @param handler code to run when the log is full and no more data can be stored.
     */
    //% block="on log full"
    //% blockId="on log full"
    //% group="micro:bit (V2)"
    //% weight=40
    export function onLogFull(handler: () => void): void {
        init();
        onLogFullHandler = handler;
    }

    /**
     * Set the format for timestamps
     * @param format Format in which to show the timestamp. Setting FlashLogTimeStampFormat.None will disable the timestamp.
     */
    //% block="set timestamp $format"
    //% blockId=dataloggertoggleincludetimestamp
    //% format.defl=FlashLogTimeStampFormat.None
    //% group="micro:bit (V2)"
    //% weight=30
    export function includeTimestamp(format: FlashLogTimeStampFormat): void {
        init();
        flashlog.setTimeStamp(format);
    }

    /**
     * Set whether data is mirrored to serial or not.
     * @param on if true, data that is logged will be mirrored to serial
     */
    //% block="mirror data to serial $on"
    //% blockId=dataloggertogglemirrortoserial
    //% on.shadow=toggleOnOff
    //% on.defl=true
    //% weight=25
    export function mirrorToSerial(on: boolean): void {
        // TODO:/note intentionally does not have group, as having the same group for all
        // blocks in a category causes the group to be elided.
        init();
        flashlog.setSerialMirroring(on);
    }
}