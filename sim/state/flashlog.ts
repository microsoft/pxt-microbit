namespace pxsim.flashlog {
    enum FlashLogTimeStampFormat {
        None = 0,
        Milliseconds = 1,
        Seconds = 10,
        Minutes = 600,
        Hours = 36000,
        Days = 864000,
    }
    // we don't store the flash log in the runtime object, since it's persistent
    let headers: string[] = []
    let rows: {
        text: string
    }[] = []
    let currentRow: string[] = undefined
    let SEPARATOR = ","
    let timestampFormat: FlashLogTimeStampFormat = undefined
    let mirrorToSerial = false;
    let logSize = 0;
    let committedCols = 0;
    /** allocated flash size **/
    const logEnd = 121852;

    function ensureV2() {
        const b = board();
        if (!b) return;
        b.ensureHardwareVersion(2);
    }

    function commitRow(data: string) {
        if (!runtime) return;
        data += "\n";

        rows.push({ text: data })

        /** edge 18 does not support text encoder, so fall back to length **/
        logSize += TextEncoder ? (new TextEncoder().encode(data)).length : data.length;
        if (logSize >= logEnd) {
            board().bus.queue(DAL.MICROBIT_ID_LOG, DAL.MICROBIT_LOG_EVT_LOG_FULL);
            clear(false);
        }
        if (mirrorToSerial) {
            board().serialState.writeSerial(data);
        }
    }

    export function beginRow(): number {
        ensureV2()
        if (currentRow)
            return DAL.DEVICE_INVALID_STATE
        currentRow = []
        return DAL.DEVICE_OK
    }

    export function logData(key: string, value: string, prepend = false) {
        ensureV2()
        if (!currentRow)
            return DAL.DEVICE_INVALID_STATE

        // find header index
        let index = headers.indexOf(key)
        if (index < 0) {
            if (prepend) {
                /** push timestamps up to front of uncommitted rows **/
                headers.splice(committedCols, 0, key);
                currentRow.splice(committedCols, 0, value);
                index = committedCols;
            } else {
                headers.push(key)
                index = headers.length - 1
            }
        }

        // store
        currentRow[index] = value

        return DAL.DEVICE_OK
    }

    export function endRow(): number {
        ensureV2()
        if (!currentRow)
            return DAL.DEVICE_INVALID_STATE
        if (!currentRow.some(el => el !== ""))
            return DAL.DEVICE_OK;

        if (timestampFormat !== FlashLogTimeStampFormat.None && mirrorToSerial) {
            let unit = "";
            switch(timestampFormat) {
                case FlashLogTimeStampFormat.Milliseconds:
                    unit = "milliseconds"
                    break;
                case FlashLogTimeStampFormat.Minutes:
                    unit = "minutes";
                    break;
                case FlashLogTimeStampFormat.Hours:
                    unit = "hours";
                    break;
                case FlashLogTimeStampFormat.Days:
                    unit = "days";
                    break;
                case FlashLogTimeStampFormat.Seconds:
                default:
                    unit = "seconds";
                    break;
            }

            const timestamp = runtime.runningTime()

            const timeUnit = timestampFormat > 1 ? timestampFormat * 100 : timestampFormat;
            const timeValue = timestamp / timeUnit;
            // TODO: there's a semi complicated format conversion
            // over in MicroBitLog::endRow that we might want to replicate.
            // https://github.com/lancaster-university/codal-microbit-v2/blob/master/source/MicroBitLog.cpp#L405
            logData(`time (${unit})`, "" + timeValue, true /** Prepend before new headers */);
        }

        const line = currentRow.join(SEPARATOR);
        if (headers.length !== committedCols) {
            commitRow(headers.join(SEPARATOR))
            committedCols = headers.length;
        }
        currentRow = undefined;

        commitRow(line)
        return DAL.DEVICE_OK
    }

    export function logString(s: string) {
        ensureV2()
        if (!s) return

        commitRow(s)
    }

    export function clear(fullErase: boolean) {
        ensureV2()
        rows = []
        headers = []
        logSize = 0;
        currentRow = undefined;
    }

    export function setTimeStamp(format: FlashLogTimeStampFormat) {
        ensureV2()
        // this option is probably not serialized, needs to move in state
        timestampFormat = format
    }

    export function setSerialMirroring(enabled: boolean) {
        mirrorToSerial = !!enabled;
    }
}
