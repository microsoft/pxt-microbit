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
            Runtime.postMessage(<SimulatorRadioPacketMessage>{
                type: "radiopacket",
                rssi: 0, // Not yet supported
                serial: board().radioState.bus.transmitSerialNumber ? board().radioState.bus.serial : 0,
                time: 0, // Not yet supported
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
                payload: { type: -1 }
            };
        }
    }

    export class RadioBus {
        // uint8_t radioDefaultGroup = MICROBIT_RADIO_DEFAULT_GROUP;
        groupId = 0; // todo
        power = 0;
        serial = 0;
        transmitSerialNumber = false;
        datagram: RadioDatagram;

        constructor(private runtime: Runtime) {
            this.datagram = new RadioDatagram(runtime);
            this.serial = Math.floor(Math.random() * Math.pow(2, 32)) - Math.pow(2, 31); // 32 bit signed integer
        }

        setGroup(id: number) {
            this.groupId = id & 0xff; // byte only
        }

        setTransmitPower(power: number) {
            this.power = Math.max(0, Math.min(7, power));
        }

        setTransmitSerialNumber(sn: boolean) {
            this.transmitSerialNumber = !!sn;
        }

        broadcast(msg: number) {
            Runtime.postMessage(<SimulatorEventBusMessage>{
                type: "eventbus",
                id: DAL.MES_BROADCAST_GENERAL_ID,
                eventid: msg,
                power: this.power,
                group: this.groupId
            })
        }
    }

    export class RadioState {
        bus: RadioBus;

        constructor(runtime: Runtime) {
            this.bus = new RadioBus(runtime);
        }

        public recievePacket(packet: SimulatorRadioPacketMessage) {
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

    export function broadcastMessage(msg: number): void {
        board().radioState.bus.broadcast(msg);
    }

    export function onBroadcastMessageReceived(msg: number, handler: RefAction): void {
        pxtcore.registerWithDal(DAL.MES_BROADCAST_GENERAL_ID, msg, handler);
    }

    export function setGroup(id: number): void {
        board().radioState.bus.setGroup(id);
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
            numberData: value
        });
    }

    export function sendString(msg: string): void {
        msg = msg.substr(0, 19);
        board().radioState.bus.datagram.send({
            type: PacketPayloadType.STRING,
            stringData: msg
        });
    }

    export function writeValueToSerial(): void {
        let b = board();
        let p = b.radioState.bus.datagram.recv();

        switch(p.payload.type) {
            case PacketPayloadType.NUMBER:
                b.writeSerial(`{"t":${p.time},"s":${p.serial},"v":${p.payload.numberData}}`)
                break;
            case PacketPayloadType.VALUE:
                b.writeSerial(`{"t":${p.time},"s":${p.serial},"n":"${p.payload.stringData}","v":${p.payload.numberData}}`)
                break;
            case PacketPayloadType.STRING:
                b.writeSerial(`{"t":${p.time},"s":${p.serial},"n":"${p.payload.stringData}"}`)
                break;
            default:
        }
    }

    export function sendValue(name: string, value: number) {
        name = name.substr(0, 12);
        const msg: number[] = [];
        msg.push()
        board().radioState.bus.datagram.send({
            type: PacketPayloadType.VALUE,
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
        return board().radioState.bus.datagram.lastReceived.payload.stringData || "";
    }

    export function receivedTime(): number {
        return board().radioState.bus.datagram.lastReceived.time;
    }
}