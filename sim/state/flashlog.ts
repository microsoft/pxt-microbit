namespace pxsim.flashlog {
    // we don't store the flash log in the runtime object, since it's persistent
    let headers: string[] = []
    let rows: {
        text: string,
        timestamp: number
    }[] = []
    let currentRow: string[] = undefined
    let SEPARATOR = ","
    let timestampFormat: number = undefined
    let logSize = 0;
    /** Estimate for flash size; TODO: get exact size, correctly count unicode character > 1 byte **/
    const logEnd = 60000;

    function ensureV2() {
        const b = board();
        if (!b) return;
        b.ensureHardwareVersion(2);
    }

    function commitRow(text: string) {
        if (!runtime) return;

        const timestamp = runtime.runningTime()
        rows.push({ text, timestamp })
        // TODO: maybe do something better here
        // send data to simulator
        const data = `${text}${timestampFormat ? `${SEPARATOR}${(timestamp / timestampFormat)}` : ""}\n`;
        logSize += data.length;

        if (logSize >= logEnd) {
            board().bus.queue(DAL.MICROBIT_ID_LOG, DAL.MICROBIT_LOG_EVT_LOG_FULL);
            clear(false);
        }
        // Runtime.postMessage(<SimulatorSerialMessage>{
        //     type: 'serial',
        //     data,
        //     id: runtime.id,
        //     sim: true
        // })
    }

    export function beginRow(): number {
        ensureV2()
        if (currentRow)
            return DAL.DEVICE_INVALID_STATE
        currentRow = []
        return DAL.DEVICE_OK
    }

    export function logData(key: string, value: string) {
        ensureV2()
        if (!currentRow)
            return DAL.DEVICE_INVALID_STATE

        // find header index
        let index = headers.indexOf(key)
        if (index < 0) {
            headers.push(key)
            index = headers.length - 1
            logSize += key.length;
        }

        // store
        currentRow[index] = value

        return DAL.DEVICE_OK
    }

    export function endRow(): number {
        ensureV2()
        if (!currentRow)
            return DAL.DEVICE_INVALID_STATE
        const line = currentRow.join(SEPARATOR)
        currentRow = undefined
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

    export function setTimeStamp(format: number) {
        ensureV2()
        // this option is probably not serialized, needs to move in state
        timestampFormat = format
    }
}
