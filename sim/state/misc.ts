namespace pxsim {
    /**
     * Error codes used in the micro:bit runtime.
    */
    export enum PanicCode {
        // PANIC Codes. These are not return codes, but are terminal conditions.
        // These induce a panic operation, where all code stops executing, and a panic state is
        // entered where the panic code is diplayed.

        // Out out memory error. Heap storage was requested, but is not available.
        MICROBIT_OOM = 20,

        // Corruption detected in the micro:bit heap space
        MICROBIT_HEAP_ERROR = 30,

        // Dereference of a NULL pointer through the ManagedType class,
        MICROBIT_NULL_DEREFERENCE = 40,
    };

    export function panic(code: number) {
        console.log("PANIC:", code)
        throw new Error("PANIC " + code)
    }

    export interface RuntimeOptions {
        theme: string;
    }
}

namespace pxsim.basic {
    export var pause = thread.pause;
    export var forever = thread.forever;
}

namespace pxsim.control {
    export var inBackground = thread.runInBackground;

    export function createBuffer(sz: number) {
        return pxsim.BufferMethods.createBuffer(sz)
    }

    export function reset() {
        const cb = getResume();
        pxsim.runtime.restart();
    }

    export function waitMicros(micros: number) {
        // TODO
    }

    export function deviceName(): string {
        let b = board();
        return b && b.id
            ? b.id.slice(0, 4)
            : "abcd";
    }

    export function deviceSerialNumber(): number {
        let b = board();
        return parseInt(b && b.id
            ? b.id.slice(1)
            : "42");
    }

    export function onEvent(id: number, evid: number, handler: RefAction) {
        if (id == DAL.MICROBIT_ID_BUTTON_AB) {
            const b = board().buttonPairState;
            if (!b.usesButtonAB) {
                b.usesButtonAB = true;
                runtime.queueDisplayUpdate();
            }
        }
        pxtcore.registerWithDal(id, evid, handler)
    }

    export function raiseEvent(id: number, evid: number, mode: number) {
        // TODO mode?
        board().bus.queue(id, evid)
    }

    export function eventTimestamp() {
        return board().bus.getLastEventTime()
    }

    export function eventValue() {
        return board().bus.getLastEventValue()
    }
}

namespace pxsim.pxtcore {
    export function registerWithDal(id: number, evid: number, handler: RefAction) {
        board().bus.listen(id, evid, handler);
    }
}

namespace pxsim.input {
    export function runningTime(): number {
        return runtime.runningTime();
    }

    export function runningTimeMicros(): number {
        return runtime.runningTimeUs();
    }

    export function calibrateCompass() {
        // device calibrates...
    }
}

namespace pxsim.pins {
    export function onPulsed(name: number, pulse: number, body: RefAction) {
    }

    export function pulseDuration(): number {
        return 0;
    }

    export function createBuffer(sz: number) {
        return pxsim.BufferMethods.createBuffer(sz)
    }

    export function pulseIn(name: number, value: number, maxDuration: number): number {
        let pin = getPin(name);
        if (!pin) return 0;

        return 5000;
    }

    export function spiWrite(value: number): number {
        // TODO
        return 0;
    }

    export function spiFrequency(f: number): void {
        // TODO
    }

    export function spiFormat(bits: number, mode: number): void {
        // TODO
    }

    export function spiPins(mosi: number, miso: number, sck: number) {
        // TODO
    }

    export function i2cReadBuffer(address: number, size: number, repeat?: boolean): RefBuffer {
        // fake reading zeros
        return createBuffer(size)
    }

    export function i2cWriteBuffer(address: number, buf: RefBuffer, repeat?: boolean): void {
        // fake - noop
    }

    // this likely shouldn't be called
    export function getPinAddress(name: number) {
        return getPin(name)
    }

    export function setEvents(name: number, event: number) {
    }
}

namespace pxsim.devices {
    export function tellCameraTo(action: number) {
        // TODO
    }
    export function tellRemoteControlTo(action: number) {
        // TODO
    }
    export function raiseAlertTo(action: number) {
        // TODO
    }
    export function onSignalStrengthChanged(action: number) {
        // TODO
    }
    export function signalStrength(): number {
        // TODO
        return 0;
    }
    export function onGamepadButton(button: number, body: RefAction) {
        // TODO
    }
}

namespace pxsim.bluetooth {
    export function startIOPinService(): void {
        // TODO
    }
    export function startLEDService(): void {
        // TODO
    }
    export function startTemperatureService(): void {
        // TODO
    }
    export function startMagnetometerService(): void {
        // TODO
    }
    export function startAccelerometerService(): void {
        // TODO
    }
    export function startButtonService(): void {
        // TODO
    }
    export function startUartService(): void {
        // TODO
    }
    export function uartWriteString(s: string): void {
        serial.writeString(s)
    }

    export function uartWriteBuffer(b: RefBuffer): void {
        serial.writeBuffer(b);
    }

    export function uartReadBuffer(): RefBuffer {
        return pins.createBuffer(0);        
    }

    export function uartReadUntil(del: string): string {
        return serial.readUntil(del);
    }
    export function onUartDataReceived(delimiters: string, handler: RefAction) {
        let b = board();
        b.bus.listen(DAL.MICROBIT_ID_BLE_UART, DAL.MICROBIT_UART_S_EVT_DELIM_MATCH, handler);
    }
    export function onBluetoothConnected(a: RefAction) {
        // TODO
    }
    export function onBluetoothDisconnected(a: RefAction) {
        // TODO
    }
    export function advertiseUrl(url: string, power: number, connectable: boolean) { }
    export function advertiseUidBuffer(nsAndInstance: RefBuffer, power: number, connectable: boolean) { }
    export function stopAdvertising() { }
    export function setTransmitPower(power: number) { }
}

