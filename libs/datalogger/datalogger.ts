//% block="Data Logger"
//% icon="\uf0ce"
//% color="#378273"
namespace datalogger {
    let onLogFullHandler: () => void;
    let _mirrorToSerial = true;
    let _timestampFormat= FlashLogTimeStampFormat.None;

    export class ColumnValue {
        constructor(
            public column: string,
            public value: number | string
        ) { }
    }

    // TODO should default be number or string (value.shadow below)

    //% block="column $column value $value"
    //% value.shadow=text
    //% blockId=dataloggercreatecolumnvalue
    //% weight=80
    export function createCV(column: string, value: number | string): ColumnValue {
        return new ColumnValue(column, value);
    }

    //% block="log data $data"
    //% blockId=dataloggerlogdata
    //% data.shadow=lists_create_with
    //% data.defl=dataloggercreatecolumnvalue
    //% weight=100
    export function logData(data: ColumnValue[]): void {
        if (!data || !data.length)
            return;

        flashlog.beginRow();

        for (const cv of data) {
            flashlog.logData(cv.column, "" + cv.value);
            if (_mirrorToSerial) {
                serial.writeLine(`${cv.column}: ${cv.value}`);
                // todo: should mirror to serial be in exact same format as row?
                // if so, we'd probably need to either mirror to serial in codal itself
                // or add a 'read last row' function to codal, to get order correct
                // and to get the same timestamp.
                // TODO: probably drop from sim side? or something of the sort.
            }
        }

        flashlog.endRow();
    }

    export function setColumns(data: string[]): void {
        // need to test if we need to add timestamp col or if that gets added to column writeline automatically
        // flashlog.logString
    }

    //% block="delete log"
    //% blockId=dataloggerdeletelog
    //% weight=60
    export function deleteLog(): void {
        flashlog.clear();
    }

    //% block="on log full"
    //% blockId="on log full"
    //% weight=40
    export function onLogFull(handler: () => void): void {
        onLogFullHandler = handler;
    }

    // when api is available in codal
    /**
     * onLogFullHandler = () => {
     *     throw "Flash memory full; log failed.";
     *     // ^^ Maybe aka link to microbit support page?
     * }
     */


    //% block="include timestamp $on||format $format"
    //% blockId=dataloggertoggleincludetimestamp
    //% on.shadow=toggleOnOff
    //% weight=30
    export function includeTimestamp(on: boolean, format: FlashLogTimeStampFormat = FlashLogTimeStampFormat.None): void {
        _timestampFormat = !on ? FlashLogTimeStampFormat.None : format;
        flashlog.setTimeStamp(_timestampFormat);
    }

    //% block="mirror data to serial $on"
    //% blockId=dataloggertogglemirrortoserial
    //% on.shadow=toggleOnOff
    //% weight=25
    export function mirrorToSerial(on: boolean): void {
        _mirrorToSerial = !!on;
    }
}