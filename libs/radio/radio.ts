/**
 * Communicate data using radio packets
 */
//% color=#E3008C weight=96 icon="\uf012"
namespace radio {
    export class Packet {
        /**
         * The number payload if a number was sent in this packet (via ``sendNumber()`` or ``sendValue()``)
         * or 0 if this packet did not contain a number.
         */
        public receivedNumber: number;
        /**
         * The string payload if a string was sent in this packet (via ``sendString()`` or ``sendValue()``)
         * or the empty string if this packet did not contain a string.
         */
        public receivedString: string;
        /**
         * The buffer payload if a buffer was sent in this packet
         * or the empty buffer
         */
        public receivedBuffer: Buffer;
        /**
         * The array of numbers if numbers were sent
         * or the empty array
         */
        public receivedNumbers: number[];
        /**
         * The system time of the sender of the packet at the time the packet was sent.
         */
        public time: number;
        /**
         * The serial number of the sender of the packet or 0 if the sender did not sent their serial number.
         */
        public serial: number;
        /**
         * The received signal strength indicator (RSSI) of the packet.
         */
        public signal: number;
    }

    /**
     * Registers code to run when the radio receives a packet. Also takes the
     * received packet from the radio queue.
     */
    //% help=radio/on-data-packet-received
    //% mutate=objectdestructuring
    //% mutateText=Packet
    //% mutateDefaults="receivedNumber;receivedString:name,receivedNumber:value;receivedString"
    //% blockId=radio_on_packet block="on radio received" blockGap=8
    export function onDataPacketReceived(cb: (packet: Packet) => void) {
        onDataReceived(() => {
            receiveNumber();
            const packet = new Packet();
            packet.receivedNumber = receivedNumber();
            packet.time = receivedTime();
            packet.serial = receivedSerial();
            packet.receivedString = receivedString();
            packet.receivedBuffer = receivedBuffer();
            packet.receivedNumbers = receivedNumbers();
            packet.signal = receivedSignalStrength();
            cb(packet)
        });
    }

    function receivedNumbers(): number[] {
        const buf = receivedBuffer();
        if (buf && buf.length == 16) {
            return [
                buf.getNumber(NumberFormat.Int32LE, 0),
                buf.getNumber(NumberFormat.Int32LE, 4),
                buf.getNumber(NumberFormat.Int32LE, 8),
                buf.getNumber(NumberFormat.Int32LE, 12)
            ]
        }

        return [];
    }

    /**
     * Broadcasts up to 4 numbers over radio to any connected micro:bit in the group.
     */
    //% help=radio/send-numbers
    //% weight=40
    //% advanced=true
    //% blockId=radio_datagram_send_numbers block="radio send numbers %number1|%number2|%number3|%number4" blockGap=8
    export function sendNumbers(number0: number, number1: number, number2: number, number3: number) {
        const buf = pins.createBuffer(16);
        buf.setNumber(NumberFormat.Int32LE, 0, number0);
        buf.setNumber(NumberFormat.Int32LE, 4, number1);
        buf.setNumber(NumberFormat.Int32LE, 8, number2);
        buf.setNumber(NumberFormat.Int32LE, 12, number3);
        radio.sendBuffer(buf)
    }
}
