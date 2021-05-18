namespace pxsim.flashlog {
    // we don't store the flash log in the runtime object, since it's persistent
    let headers: string[] = []
    let rows: string[] = []
    let currentRow: string[] = undefined
    let SEPARATOR = ","

    export function beginRow(): number {
        if (currentRow)
            return DAL.DEVICE_INVALID_STATE
        currentRow = []
        return DAL.DEVICE_OK
    }

    export function logData(key: string, value: string) {
        if (!currentRow)
            return DAL.DEVICE_INVALID_STATE

        // find header index
        let index = headers.indexOf(key)
        if (index < 0) {
            headers.push(key)
            index = headers.length - 1
        }

        // store
        currentRow[index] = value

        return DAL.DEVICE_OK
    }

    export function endRow(): number {
        if (!currentRow)
            return DAL.DEVICE_INVALID_STATE
        rows.push(currentRow.join(SEPARATOR))
        currentRow = undefined
        return DAL.DEVICE_OK
    }

    export function logString(s: string) {
        if (!s) return

        rows.push(s)
    }

    export function clear() {
        rows = []
        headers = []
        currentRow = undefined;
    }
}
