/**
 * Communicate data using radio packets
 */
//% color=#E3008C weight=34
namespace radio {
    export class Packet {
        public sentNumber: number;
        public time: number;
        public serialNumber: number;
        public sentName: string;
        public signalStrength: number;
    }

    //% mutate=true
    //% mutateText=Packet
    //% mutateDefaults="sentNumber;sentNumber,sentName"
    //% blockId=radio_on_packet block="on radio received" blockGap=8
    export function onDataPacketReceived(cb: (packet: Packet) => void) {
        onDataReceived(() => {
            receiveNumber();
            const packet = new Packet();
            packet.sentNumber = receivedNumberAt(0);
            packet.time = receivedNumberAt(1);
            packet.serialNumber = receivedNumberAt(2);
            packet.sentName = receivedValueName();
            packet.signalStrength = receivedSignalStrength();
            cb(packet)
        });
    }
}
