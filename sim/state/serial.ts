namespace pxsim {
    export class SerialState {
        serialIn: string[] = [];

        public recieveData(data: string) {
            this.serialIn.push();
        }

        readSerial() {
            let v = this.serialIn.shift() || "";
            return v;
        }

        serialOutBuffer: string = "";
        writeSerial(s: string) {
            for (let i = 0; i < s.length; ++i) {
                let c = s[i];
                this.serialOutBuffer += c;
                if (c == "\n") {
                    Runtime.postMessage(<SimulatorSerialMessage>{
                        type: "serial",
                        data: this.serialOutBuffer,
                        id: runtime.id
                    })
                    this.serialOutBuffer = ""
                    break;
                }
            }
        }
    }
}

namespace pxsim.serial {
    export function writeString(s: string) {
        board().writeSerial(s);
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
}