namespace pxsim.files {
    export function appendLine(filename: string, text: string) {
        const b = board();
        b.fileSystem.append(filename, text + "\r\n");
    }
    export function appendString(filename: string, text: string) {
        const b = board();
        b.fileSystem.append(filename, text);
    }
    export function appendNumber(filename: string, value: number) {
        const b = board();
        b.fileSystem.append(filename, value.toString());
    }
    export function remove(filename: string) {
        const b = board();
        b.fileSystem.remove(filename);
    }
    export function readToSerial(filename: string) {
        const b = board();
        let f = b.fileSystem.files[filename];
        if (f)
            b.serialState.writeSerial(f);
    }
}