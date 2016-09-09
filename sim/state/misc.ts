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

    export namespace AudioContextManager {
        let _context: any; // AudioContext
        let _vco: any; // OscillatorNode;
        let _vca: any; // GainNode;

        function context(): any {
            if (!_context) _context = freshContext();
            return _context;
        }

        function freshContext(): any {
            (<any>window).AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;
            if ((<any>window).AudioContext) {
                try {
                    // this call my crash.
                    // SyntaxError: audio resources unavailable for AudioContext construction
                    return new (<any>window).AudioContext();
                } catch (e) { }
            }
            return undefined;
        }

        export function stop() {
            if (_vca) _vca.gain.value = 0;
        }

        export function tone(frequency: number, gain: number) {
            if (frequency <= 0) return;
            let ctx = context();
            if (!ctx) return;

            gain = Math.max(0, Math.min(1, gain));
            if (!_vco) {
                try {
                    _vco = ctx.createOscillator();
                    _vca = ctx.createGain();
                    _vco.connect(_vca);
                    _vca.connect(ctx.destination);
                    _vca.gain.value = gain;
                    _vco.start(0);
                } catch (e) {
                    _vco = undefined;
                    _vca = undefined;
                    return;
                }
            }

            _vco.frequency.value = frequency;
            _vca.gain.value = gain;
        }
    }

    export interface RuntimeOptions {
        theme: string;
    }

    export class EventBus {
        private queues: Map<EventQueue<number>> = {};

        constructor(private runtime: Runtime) { }

        listen(id: number, evid: number, handler: RefAction) {
            let k = id + ":" + evid;
            let queue = this.queues[k];
            if (!queue) queue = this.queues[k] = new EventQueue<number>(this.runtime);
            queue.handler = handler;
        }

        queue(id: number, evid: number, value: number = 0) {
            let k = id + ":" + evid;
            let queue = this.queues[k];
            if (queue) queue.push(value);
        }
    }
}

namespace pxsim.basic {
    export var pause = thread.pause;
    export var forever = thread.forever;
}

namespace pxsim.control {
    export var inBackground = thread.runInBackground;

    export function reset() {
        U.userError("reset not implemented in simulator yet")
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
        pxtcore.registerWithDal(id, evid, handler)
    }

    export function raiseEvent(id: number, evid: number, mode: number) {
        // TODO mode?
        board().bus.queue(id, evid)
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

    export function calibrate() {
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

    export function i2cReadBuffer(address: number, size: number, repeat?: boolean): RefBuffer {
        // fake reading zeros
        return createBuffer(size)
    }

    export function i2cWriteBuffer(address: number, buf: RefBuffer, repeat?: boolean): void {
        // fake - noop
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
}

