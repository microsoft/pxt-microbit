namespace pxsim {
    const SERIAL_BUFFER_LENGTH = 16;
    export class SerialState {
        serialIn: string[] = [];

        constructor(private readonly runtime: Runtime, private readonly board: BaseBoard) {
            this.board.addMessageListener(this.handleMessage.bind(this))
        }

        private handleMessage(msg: SimulatorMessage) {
            if (msg.type === "seria") {
                const data = (<SimulatorSerialMessage>msg).data || "";
                this.receiveData(data);
            }
        }

        public receiveData(data: string) {
            this.serialIn.push();
        }

        readSerial() {
            let v = this.serialIn.shift() || "";
            return v;
        }

        serialOutBuffer: string = "";
        writeSerial(s: string) {
            this.serialOutBuffer += s;
            if (/\n/.test(this.serialOutBuffer) || this.serialOutBuffer.length > SERIAL_BUFFER_LENGTH) {
                Runtime.postMessage(<SimulatorSerialMessage>{
                    type: 'serial',
                    data: this.serialOutBuffer,
                    id: runtime.id,
                    sim: true
                })
                this.serialOutBuffer = '';
            }
        }
    }
}

namespace pxsim.serial {
    export function writeString(s: string) {
        board().writeSerial(s);
    }

    export function writeBuffer(buf: RefBuffer) {
        // TODO
    }

    export function readUntil(del: string): string {
        return readString();
    }

    export function readString(): string {
        return board().serialState.readSerial();
    }

    export function onDataReceived(delimiters: string, handler: RefAction) {
        let b = board();
        b.bus.listen(DAL.MICROBIT_ID_SERIAL, DAL.MICROBIT_SERIAL_EVT_DELIM_MATCH, handler);
    }

    export function redirect(tx: number, rx: number, rate: number) {
        // TODO?
    }

    export function redirectToUSB() {
        // TODO
    }

    export function setRxBufferSize(size: number) {
        // TODO
    }

    export function setTxBufferSize(size: number) {
        // TODO
    }

    export function readBuffer(length: number) {
        length |= 0;
        if (length <= 0)
            length = 64;
        return pins.createBuffer(length);
    }

    export function setBaudRate(rate: number) {
        // TODO
    }
}