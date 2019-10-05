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
                broadcast: true,
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
                payload: { type: -1, groupId: 0, bufferData: new Uint8Array(0) }
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
                broadcast: true,
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
    export function raiseEvent(id: number, eventid: number): void {
        board().radioState.raiseEvent(id, eventid);
    }

    export function setGroup(id: number): void {
        board().radioState.setGroup(id);
    }

    export function setTransmitPower(power: number): void {
        board().radioState.setTransmitPower(power);
    }

    export function sendRawPacket(buf: RefBuffer) {
        let cb = getResume();
        board().radioState.datagram.send({
            type: 0,
            groupId: board().radioState.groupId,
            bufferData: buf.data
        });
        setTimeout(cb, 1);
    }

    export function readRawPacket() {
        const packet = board().radioState.datagram.recv();
        return new RefBuffer(packet.payload.bufferData)
    }

    export function receivedSignalStrength(): number {
        return board().radioState.datagram.lastReceived.rssi;
    }

    export function onDataReceived(handler: RefAction): void {
        pxtcore.registerWithDal(DAL.MICROBIT_ID_RADIO, DAL.MICROBIT_RADIO_EVT_DATAGRAM, handler);
        readRawPacket();
    }
}