namespace pxsim {
    export interface PacketBuffer {
        payload: SimulatorRadioPacketPayload;
        rssi: number;
        serial: number;
        time: number;
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
                rssi: 70, // Not yet supported
                serial: b.radioState.bus.transmitSerialNumber ? pxsim.control.deviceSerialNumber() : 0,
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

    export class RadioBus {
        // uint8_t radioDefaultGroup = MICROBIT_RADIO_DEFAULT_GROUP;
        power = 0;
        transmitSerialNumber = false;
        datagram: RadioDatagram;

        constructor(private runtime: Runtime) {
            this.datagram = new RadioDatagram(runtime);
        }

        setTransmitPower(power: number) {
            this.power = Math.max(0, Math.min(7, power));
        }

        setTransmitSerialNumber(sn: boolean) {
            this.transmitSerialNumber = !!sn;
        }

        broadcast(msg: number, groupId: number) {
            Runtime.postMessage(<SimulatorEventBusMessage>{
                type: "eventbus",
                id: DAL.MES_BROADCAST_GENERAL_ID,
                eventid: msg,
                power: this.power,
                group: groupId
            })
        }
    }

    export class RadioState {
        bus: RadioBus;
        groupId: number;

        constructor(runtime: Runtime) {
            this.bus = new RadioBus(runtime);
            this.groupId = 0;
        }

        public setGroup(id: number) {
            this.groupId = id & 0xff; // byte only
        }

        public broadcast(msg: number) {
            this.bus.broadcast(msg, this.groupId)
        }

        public receivePacket(packet: SimulatorRadioPacketMessage) {
            if (this.groupId == packet.payload.groupId)
                this.bus.datagram.queue(packet)
        }
    }
}

namespace pxsim.radio {
    enum PacketPayloadType {
        NUMBER = 0,
        VALUE = 1,
        STRING = 2
    }

    export function sendEvent(msg: number): void {
        board().radioState.broadcast(msg);
    }

    export function onEventReceived(msg: number, handler: RefAction): void {
        pxtcore.registerWithDal(DAL.MES_BROADCAST_GENERAL_ID, msg, handler);
    }

    export function setGroup(id: number): void {
        board().radioState.setGroup(id);
    }

    export function setTransmitPower(power: number): void {
        board().radioState.bus.setTransmitPower(power);
    }

    export function setTransmitSerialNumber(transmit: boolean): void {
        board().radioState.bus.setTransmitSerialNumber(transmit);
    }

    export function sendNumber(value: number): void {
        board().radioState.bus.datagram.send({
            type: PacketPayloadType.NUMBER,
            groupId: board().radioState.groupId,
            numberData: value,
        });
    }

    export function sendString(msg: string): void {
        msg = msg.substr(0, 19);
        board().radioState.bus.datagram.send({
            type: PacketPayloadType.STRING,
            groupId: board().radioState.groupId,
            stringData: msg,
        });
    }

    export function writeValueToSerial(): void {
        const b = board();
        writePacketToSerial(b, b.radioState.bus.datagram.recv())
    }

    export function writeReceivedPacketToSerial(): void {
        const b = board();
        writePacketToSerial(b, b.radioState.bus.datagram.lastReceived);
    }

    export function sendValue(name: string, value: number) {
        name = name.substr(0, 12);
        const msg: number[] = [];
        msg.push()
        board().radioState.bus.datagram.send({
            type: PacketPayloadType.VALUE,
            groupId: board().radioState.groupId,
            stringData: name,
            numberData: value
        });
    }

    export function receiveNumber(): number {
        const packet = board().radioState.bus.datagram.recv();
        return receivedNumber();
    }

    export function receiveString(): string {
        const packet = board().radioState.bus.datagram.recv();
        return receivedString();
    }

    export function receivedSignalStrength(): number {
        return board().radioState.bus.datagram.lastReceived.rssi;
    }

    export function onDataReceived(handler: RefAction): void {
        pxtcore.registerWithDal(DAL.MICROBIT_ID_RADIO, DAL.MICROBIT_RADIO_EVT_DATAGRAM, handler);
        radio.receiveNumber();
    }

    export function receivedNumber(): number {
        return board().radioState.bus.datagram.lastReceived.payload.numberData || 0;
    }

    export function receivedSerial(): number {
        return board().radioState.bus.datagram.lastReceived.serial;
    }

    export function receivedString(): string {
        return initString(board().radioState.bus.datagram.lastReceived.payload.stringData || "");
    }

    export function receivedTime(): number {
        return board().radioState.bus.datagram.lastReceived.time;
    }

    function writePacketToSerial(b: DalBoard, p: PacketBuffer) {
        switch(p.payload.type) {
            case PacketPayloadType.NUMBER:
                b.writeSerial(`{"t":${p.time},"s":${p.serial},"v":${p.payload.numberData}}\r\n`)
                break;
            case PacketPayloadType.VALUE:
                b.writeSerial(`{"t":${p.time},"s":${p.serial},"n":"${p.payload.stringData}","v":${p.payload.numberData}}\r\n`)
                break;
            case PacketPayloadType.STRING:
                b.writeSerial(`{"t":${p.time},"s":${p.serial},"n":"${p.payload.stringData}"}\r\n`)
                break;
            default:
        }
    }
}