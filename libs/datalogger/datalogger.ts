/**
 * Log data to flash storage
 */
//% block="Data Logger"
//% icon="\uf0ce"
//% color="#378273"
namespace datalogger {
    let onLogFullHandler: () => void;
    let _mirrorToSerial = true;
    let _timestampFormat = FlashLogTimeStampFormat.Seconds;
    let _disabled = false;

    let initialized = false;
    function init() {
        if (initialized)
            return;
        initialized = true;

        includeTimestamp(true, _timestampFormat);

        control.onEvent(DAL.MICROBIT_ID_LOG, DAL.MICROBIT_LOG_EVT_LOG_FULL, () => {
            _disabled = true;
            if (onLogFullHandler) {
                onLogFullHandler();
            } else {
                basic.showString("Log Full");
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
    //% weight=100
    export function logData(data: ColumnValue[]): void {
        if (!data || !data.length)
            return;
        init();

        if (_timestampFormat && _mirrorToSerial) {
            let unit = "";
            switch(_timestampFormat) {
                case FlashLogTimeStampFormat.Milliseconds:
                    unit = "milliseconds"
                    break;
                case FlashLogTimeStampFormat.Seconds:
                    unit = "seconds";
                    break;
                case FlashLogTimeStampFormat.Minutes:
                    unit = "minutes";
                    break;
                case FlashLogTimeStampFormat.Hours:
                    unit = "hours";
                    break;
                case FlashLogTimeStampFormat.Days:
                default:
                    unit = "days";
            }
            // TODO: if we don't move it to CODAL and want the display of the time given
            // to serial to match the time written to device, there's a semi complicated format conversion
            // over in MicroBitLog::endRow that would need replicating.
            // https://github.com/lancaster-university/codal-microbit-v2/blob/master/source/MicroBitLog.cpp#L405
            const timeUnit = _timestampFormat > 1 ? _timestampFormat * 100 : _timestampFormat;
            serial.writeLine(`Time (${unit}): ${control.millis() / timeUnit}`)
        }

        for (const cv of data) {
            if (_mirrorToSerial && cv.value != "") {
                serial.writeLine(`${cv.column}: ${cv.value}`);
                // todo: should mirror to serial be in exact same format as row?
                // if so, we'd probably need to either mirror to serial in codal itself
                // or add a 'read last row' function to codal, to get order correct
                // and to get the same timestamp.
            }
        }

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
    //% weight=70
    export function setColumns(cols: string[]): void {
        if (!cols)
            return;
        logData(cols.map(col => createCV(col, "")));
    }

    /**
     * Delete all existing logs, including column headers. By default this only marks the log as
     * overwriteable / deletable in the future.
     * @param fullErase optional if set on (true), fully erase log instead of marking as empty. This will take longer but makes sure data will not persist on device.
     */
    //% block="delete log||wipe $fullErase"
    //% fullErase.shadow=toggleOnOff
    //% blockId=dataloggerdeletelog
    //% weight=60
    export function deleteLog(fullErase?: boolean): void {
        flashlog.clear(fullErase);
        _disabled = false;
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
     * @param format optional Format in which to show the timestamp. Setting FlashLogTimeStampFormat.None is equivalent to setting 'on' to false
     */
    //% block="include timestamp $on||format $format"
    //% blockId=dataloggertoggleincludetimestamp
    //% on.shadow=toggleOnOff
    //% on.defl=true
    //% format.defl=FlashLogTimeStampFormat.Seconds
    //% weight=30
    export function includeTimestamp(on: boolean, format: FlashLogTimeStampFormat = FlashLogTimeStampFormat.Seconds): void {
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
    //% on.defl=true
    //% weight=25
    export function mirrorToSerial(on: boolean): void {
        _mirrorToSerial = !!on;
    }
}