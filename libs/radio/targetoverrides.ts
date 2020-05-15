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
     * Deprecated. Use onDataReceived() instead
     * Registers code to run when the radio receives a packet. Also takes the
     * received packet from the radio queue.
     */
    //% help=radio/on-data-packet-received blockHandlerKey="radioreceived" deprecated=true
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
            packet.signal = receivedSignalStrength();
            cb(packet)
        });
    }

    /**
     * Registers code to run when the radio receives a number. Deprecated, use
     * onReceivedNumber instead.
     */
    //% help=radio/on-received-number blockHandlerKey="radioreceived"
    //% blockId=radio_on_number block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" deprecated=1
    export function onReceivedNumberDeprecated(cb: (receivedNumber: number) => void) {
        onReceivedNumber(cb);
    }

    /**
     * Registers code to run when the radio receives a key value pair. Deprecated, use
     * onReceivedValue instead.
     */
    //% help=radio/on-received-value blockHandlerKey="radioreceived"
    //% blockId=radio_on_value block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" deprecated=1
    export function onReceivedValueDeprecated(cb: (name: string, value: number) => void) {
        onReceivedValue(cb);
    }

    /**
     * Registers code to run when the radio receives a string. Deprecated, use
     * onReceivedString instead.
     */
    //% help=radio/on-received-string blockHandlerKey="radioreceived"
    //% blockId=radio_on_string block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" deprecated=1
    export function onReceivedStringDeprecated(cb: (receivedString: string) => void) {
        onReceivedString(cb);
    }

    /**
     * Registers code to run when the radio receives a buffer. Deprecated, use
     * onReceivedBuffer instead.
     */
    //% help=radio/on-received-buffer blockHandlerKey="radioreceived" blockHidden=1
    //% blockId=radio_on_buffer block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" deprecated=1
    export function onReceivedBufferDeprecated(cb: (receivedBuffer: Buffer) => void) {
        onReceivedBuffer(cb);
    }

    /**
     * Returns the number payload from the last packet taken from the radio queue
     * (via ``receiveNumber``, ``receiveString``, etc) or 0 if that packet did not
     * contain a number.
     */
    //% help=radio/received-number deprecated=1
    export function receivedNumber(): number {
        return (lastPacket ? lastPacket.numberPayload : 0) || 0;
    }

    /**
     * Returns the serial number of the sender micro:bit from the last packet taken
     * from the radio queue (via ``receiveNumber``, ``receiveString``, etc) or 0 if
     * that packet did not send a serial number.
     */
    //% help=radio/received-serial deprecated=1
    export function receivedSerial(): number {
        return lastPacket ? lastPacket.serial : 0;
    }

    /**
     * Returns the string payload from the last packet taken from the radio queue
     * (via ``receiveNumber``, ``receiveString``, etc) or the empty string if that
     * packet did not contain a string.
     */
    //% help=radio/received-string deprecated=1
    export function receivedString(): string {
        return (lastPacket ? lastPacket.stringPayload : "") || "";
    }

    /**
     * Returns the buffer payload from the last packet taken from the radio queue
     * (via ``receiveNumber``, ``receiveString``, etc) or the empty string if that
     * packet did not contain a string.
     */
    //% help=radio/received-buffer deprecated=1
    export function receivedBuffer(): Buffer {
        return (lastPacket ? lastPacket.bufferPayload : null) || control.createBuffer(0);
    }

    /**
     * Returns the system time of the sender micro:bit at the moment when it sent the
     * last packet taken from the radio queue (via ``receiveNumber``,
     * ``receiveString``, etc).
     */
    //% help=radio/received-time deprecated=1
    export function receivedTime(): number {
        return lastPacket ? lastPacket.time : 0;
    }

    /**
     * Reads the next packet from the radio queue and returns the packet's number
     * payload or 0 if the packet did not contain a number.
     */
    //% help=radio/receive-number
    //% weight=46
    //% blockId=radio_datagram_receive block="radio receive number" blockGap=8
    //% deprecated=true
    export function receiveNumber(): number {
        lastPacket = RadioPacket.getPacket(readRawPacket());
        return receivedNumber();
    }

    /**
     * Reads the next packet from the radio queue and returns the packet's string
     * payload or the empty string if the packet did not contain a string.
     */
    //% blockId=radio_datagram_receive_string block="radio receive string" blockGap=8
    //% weight=44
    //% help=radio/receive-string
    //% deprecated=true
    export function receiveString(): string {
        lastPacket = RadioPacket.getPacket(readRawPacket());
        return receivedString();
    }

    /**
     * Gets the received signal strength indicator (RSSI) from the last packet taken
     * from the radio queue (via ``receiveNumber``, ``receiveString``, etc). Not supported in simulator.
     */
    //% help=radio/received-signal-strength
    //% weight=40
    //% blockId=radio_datagram_rssi block="radio received signal strength"
    //% deprecated=true blockHidden=true
    export function receivedSignalStrength(): number {
        return lastPacket ? lastPacket.signal : 0;
    }

    /**
    * Reads the next packet from the radio queue and and writes it to serial
    * as JSON.
    */
    //% help=radio/write-value-to-serial
    //% weight=3
    //% blockId=radio_write_value_serial block="radio write value to serial"
    //% deprecated=true
    export function writeValueToSerial() {
        const p = RadioPacket.getPacket(radio.readRawPacket());
        if(p)
            writeToSerial(p);
    }

    /**
    * Writes the last received packet to serial as JSON. This should be called
    * within an ``onDataPacketReceived`` callback.
    */
    //% help=radio/write-received-packet-to-serial
    //% weight=3
    //% blockId=radio_write_packet_serial block="radio write received packet to serial"
    //% advanced=true deprecated=true
    export function writeReceivedPacketToSerial() {
        if (lastPacket) writeToSerial(lastPacket)
    }

    function writeToSerial(packet: RadioPacket) {
        serial.writeString("{");
        serial.writeString("\"t\":");
        serial.writeString("" + packet.time);
        serial.writeString(",\"s\":");
        serial.writeString("" + packet.serial);

        if (packet.hasString()) {
            serial.writeString(",\"n\":\"");
            serial.writeString(packet.stringPayload);
            serial.writeString("\"");
        }
        if (packet.packetType == PACKET_TYPE_BUFFER) {
            serial.writeString(",\"b\":\"");
            // TODO: proper base64 encoding
            serial.writeString(packet.bufferPayload.toString());
            serial.writeString("\"");
        }
        if (packet.hasNumber()) {
            serial.writeString(",\"v\":");
            serial.writeString("" + packet.numberPayload);
        }

        serial.writeString("}\r\n");
    }
}