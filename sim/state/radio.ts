namespace pxsim {
    export interface PacketBuffer {
        payload: SimulatorRadioPacketPayload;
        rssi: number;
        serial: number;
        time: number;
    }

    // Extends interface in pxt-core
    export interface SimulatorRadioPacketPayload {
        bufferData?: Uint8Array;
    }

    export class RadioDatagram {
        datagram: PacketBuffer[] = [];
        lastReceived: PacketBuffer = RadioDatagram.defaultPacket();

        constructor(private runtime: Runtime) {
        }

        queue(packet: PacketBuffer) {
            if (this.datagram.length < 4) {
                this.datagram.push(packet);
            }
            (<DalBoard>runtime.board).bus.queue(DAL.MICROBIT_ID_RADIO, DAL.MICROBIT_RADIO_EVT_DATAGRAM);
        }

        send(payload: SimulatorRadioPacketPayload) {
            const b = board();
            Runtime.postMessage(<SimulatorRadioPacketMessage>{
                type: "radiopacket",
                rssi: -42, // -42 is the strongest signal
                serial: b.radioState.transmitSerialNumber ? pxsim.control.deviceSerialNumber() : 0,
                time: new Date().getTime(),
                payload
            })
        }

        recv(): PacketBuffer {
            let r = this.datagram.shift();
            if (!r) r = RadioDatagram.defaultPacket();
            return this.lastReceived = r;
        }

        private static defaultPacket(): PacketBuffer {
            return {
                rssi: -1,
                serial: 0,
                time: 0,
                payload: { type: -1, groupId: 0 }
            };
        }
    }

    export class RadioState {
        power = 0;
        transmitSerialNumber = false;
        datagram: RadioDatagram;
        groupId: number;

        constructor(runtime: Runtime) {
            this.datagram = new RadioDatagram(runtime);
            this.power = 6; // default value
            this.groupId = 0;
        }

        public setGroup(id: number) {
            this.groupId = id & 0xff; // byte only
        }

        setTransmitPower(power: number) {
            this.power = Math.max(0, Math.min(7, power));
        }

        setTransmitSerialNumber(sn: boolean) {
            this.transmitSerialNumber = !!sn;
        }

        raiseEvent(id: number, eventid: number) {
            Runtime.postMessage(<SimulatorEventBusMessage>{
                type: "eventbus",
                id,
                eventid,
                power: this.power,
                group: this.groupId
            })
        }

        receivePacket(packet: SimulatorRadioPacketMessage) {
            if (this.groupId == packet.payload.groupId)
                this.datagram.queue(packet)
        }
    }
}

namespace pxsim.radio {
    enum PacketPayloadType {
        NUMBER = 0,
        VALUE = 1,
        STRING = 2,
        BUFFER = 3
    }

    export function raiseEvent(id: number, eventid: number): void {
        board().radioState.raiseEvent(id, eventid);
    }

    export function setGroup(id: number): void {
        board().radioState.setGroup(id);
    }

    export function setTransmitPower(power: number): void {
        board().radioState.setTransmitPower(power);
    }

    export function setTransmitSerialNumber(transmit: boolean): void {
        board().radioState.setTransmitSerialNumber(transmit);
    }

    export function sendNumber(value: number): void {
        board().radioState.datagram.send({
            type: PacketPayloadType.NUMBER,
            groupId: board().radioState.groupId,
            numberData: value,
        });
    }

    export function sendString(msg: string): void {
        if (msg === undefined) return;

        msg = msg.substr(0, 19);
        board().radioState.datagram.send({
            type: PacketPayloadType.STRING,
            groupId: board().radioState.groupId,
            stringData: msg,
        });
    }

    export function sendBuffer(buf: RefBuffer): void {
        if (!buf) return;

        const data = buf.data.slice(0, 18);
        board().radioState.datagram.send({
            type: PacketPayloadType.STRING,
            groupId: board().radioState.groupId,
            bufferData: data
        });
    }

    export function writeValueToSerial(): void {
        const b = board();
        writePacketToSerial(b, b.radioState.datagram.recv())
    }

    export function writeReceivedPacketToSerial(): void {
        const b = board();
        writePacketToSerial(b, b.radioState.datagram.lastReceived);
    }

    export function sendValue(name: string, value: number) {
        name = name.substr(0, 12);
        const msg: number[] = [];
        msg.push()
        board().radioState.datagram.send({
            type: PacketPayloadType.VALUE,
            groupId: board().radioState.groupId,
            stringData: name,
            numberData: value
        });
    }

    export function receiveNumber(): number {
        const packet = board().radioState.datagram.recv();
        return receivedNumber();
    }

    export function receiveString(): string {
        const packet = board().radioState.datagram.recv();
        return receivedString();
    }

    export function receivedSignalStrength(): number {
        return board().radioState.datagram.lastReceived.rssi;
    }

    export function onDataReceived(handler: RefAction): void {
        pxtcore.registerWithDal(DAL.MICROBIT_ID_RADIO, DAL.MICROBIT_RADIO_EVT_DATAGRAM, handler);
        radio.receiveNumber();
    }

    export function receivedNumber(): number {
        return board().radioState.datagram.lastReceived.payload.numberData || 0;
    }

    export function receivedSerial(): number {
        return board().radioState.datagram.lastReceived.serial;
    }

    export function receivedString(): string {
        return initString(board().radioState.datagram.lastReceived.payload.stringData || "");
    }

    export function receivedBuffer(): RefBuffer {
        return new RefBuffer(board().radioState.datagram.lastReceived.payload.bufferData || new Uint8Array(0))
    }

    export function receivedTime(): number {
        return board().radioState.datagram.lastReceived.time;
    }

    function writePacketToSerial(b: DalBoard, p: PacketBuffer) {
        switch (p.payload.type) {
            case PacketPayloadType.NUMBER:
                b.writeSerial(`{"t":${p.time},"s":${p.serial},"v":${p.payload.numberData}}\r\n`)
                break;
            case PacketPayloadType.VALUE:
                b.writeSerial(`{"t":${p.time},"s":${p.serial},"n":"${p.payload.stringData}","v":${p.payload.numberData}}\r\n`)
                break;
            case PacketPayloadType.STRING:
                b.writeSerial(`{"t":${p.time},"s":${p.serial},"n":"${p.payload.stringData}"}\r\n`)
                break;
            // TODO: (microbit master)
            // case PacketPayloadType.BUFFER:
            //     const buf = new Uint8Array(p.payload.bufferData.buffer);
            //     let res = "";
            //     for (let i = 0; i < buf.length; ++i)
            //         res += String.fromCharCode(buf[i]);
            //     b.writeSerial(`{"t":${p.time},"s":${p.serial},"b":"${res}"}\r\n`)
            default:
                // unknown type
                break;
        }
    }
}