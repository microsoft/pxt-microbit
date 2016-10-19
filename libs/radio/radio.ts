/**
 * Communicate data using radio packets
 */
//% color=#E3008C weight=34
namespace radio {
    export class Packet {
        public sentNumber: number;
        public time: number;
        public serial: number;
        public name: string;
        public rssi: number;
    }

    //% mutate=true
    //% mutateText=Packet
    //% mutateDefaults="sentNumber;sentNumber,name"
    //% blockId=radio_on_packet block="on radio received" blockGap=8
    export function onDataPacketReceived(cb: (packet: Packet) => void) {
        onDataReceived(() => {
            receiveNumber();
            const packet = new Packet();
            packet.sentNumber = receivedNumberAt(0);
            packet.time = receivedNumberAt(1);
            packet.serial = receivedNumberAt(2);
            packet.name = receivedValueName();
            packet.rssi = receivedSignalStrength();
            cb(packet)
        });
    }
}
