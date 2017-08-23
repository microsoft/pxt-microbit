namespace control {
    export function pause(n: number) {
        basic.pause(n)
    }
    export function runInBackground(f: () => void) {
        control.inBackground(f)
    }
}
