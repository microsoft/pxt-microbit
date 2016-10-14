/**
 * Communicate data using radio packets
 */
//% color=#E3008C weight=34
namespace radio {
    export class Packet {
        public value: number;
        public time: number;
        public serial: number;
        public name: string;
        public rssi: number;
    }

    export function onDataPacketReceived(cb: (packet: Packet) => void) {
        onDataReceived(() => {
            receiveNumber();
            const packet = new Packet();
            packet.value = receivedNumberAt(0);
            packet.time = receivedNumberAt(1);
            packet.serial = receivedNumberAt(2);
            packet.name = receivedValueName();
            packet.rssi = receivedSignalStrength();
            cb(packet)
        });
    }
}
