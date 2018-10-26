// Auto-generated. Do not edit.



    //% color=#E3008C weight=96 icon="\uf012"
declare namespace radio {

    /**
     * Sends an event over radio to neigboring devices
     */
    //% blockId=radioRaiseEvent block="radio raise event|from source %src=control_event_source_id|with value %value=control_event_value_id" 
    //% blockExternalInputs=1
    //% advanced=true
    //% weight=1
    //% help=radio/raise-event shim=radio::raiseEvent
    function raiseEvent(src: int32, value: int32): void;

    /**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    //% help=radio/send-number
    //% weight=60
    //% blockId=radio_datagram_send block="radio send number %value" blockGap=8 shim=radio::sendNumber
    function sendNumber(value: number): void;

    /**
     * Broadcasts a name / value pair along with the device serial number
     * and running time to any connected micro:bit in the group.
     * @param name the field name (max 12 characters), eg: "name"
     * @param value the numberic value
     */
    //% help=radio/send-value
    //% weight=59
    //% blockId=radio_datagram_send_value block="radio send|value %name|= %value" blockGap=8 shim=radio::sendValue
    function sendValue(name: string, value: number): void;

    /**
     * Broadcasts a string along with the device serial number
     * and running time to any connected micro:bit in the group.
     */
    //% help=radio/send-string
    //% weight=58
    //% blockId=radio_datagram_send_string block="radio send string %msg"
    //% msg.shadowOptions.toString=true shim=radio::sendString
    function sendString(msg: string): void;

    /**
     * Broadcasts a buffer (up to 19 bytes long) along with the device serial number
     * and running time to any connected micro:bit in the group.
     */
    //% help=radio/send-buffer
    //% weight=57
    //% advanced=true shim=radio::sendBuffer
    function sendBuffer(msg: Buffer): void;

    /**
     * Reads the next packet from the radio queue and and writes it to serial
     * as JSON.
     */
    //% help=radio/write-value-to-serial
    //% weight=3
    //% blockId=radio_write_value_serial block="radio write value to serial"
    //% deprecated=true shim=radio::writeValueToSerial
    function writeValueToSerial(): void;

    /**
     * Writes the last received packet to serial as JSON. This should be called
     * within an ``onDataPacketReceived`` callback.
     */
    //% help=radio/write-received-packet-to-serial
    //% weight=3
    //% blockId=radio_write_packet_serial block="radio write received packet to serial"
    //% advanced=true shim=radio::writeReceivedPacketToSerial
    function writeReceivedPacketToSerial(): void;

    /**
     * Reads the next packet from the radio queue and returns the packet's number
     * payload or 0 if the packet did not contain a number.
     */
    //% help=radio/receive-number
    //% weight=46
    //% blockId=radio_datagram_receive block="radio receive number" blockGap=8
    //% deprecated=true shim=radio::receiveNumber
    function receiveNumber(): number;

    /**
     * Registers code to run when a packet is received over radio.
     */
    //% help=radio/on-data-received
    //% weight=50
    //% blockId=radio_datagram_received_event block="radio on data received" blockGap=8
    //% deprecated=true shim=radio::onDataReceived
    function onDataReceived(body: () => void): void;

    /**
     * Reads the next packet from the radio queue and returns the packet's string
     * payload or the empty string if the packet did not contain a string.
     */
    //% blockId=radio_datagram_receive_string block="radio receive string" blockGap=8
    //% weight=44
    //% help=radio/receive-string
    //% deprecated=true shim=radio::receiveString
    function receiveString(): string;

    /**
     * Gets the received signal strength indicator (RSSI) from the last packet taken
     * from the radio queue (via ``receiveNumber``, ``receiveString``, etc). Not supported in simulator.
     * namespace=radio
     */
    //% help=radio/received-signal-strength
    //% weight=40
    //% blockId=radio_datagram_rssi block="radio received signal strength"
    //% deprecated=true shim=radio::receivedSignalStrength
    function receivedSignalStrength(): int32;

    /**
     * Sets the group id for radio communications. A micro:bit can only listen to one group ID at any time.
     * @param id the group id between ``0`` and ``255``, eg: 1
     */
    //% help=radio/set-group
    //% weight=10 blockGap=8
    //% blockId=radio_set_group block="radio set group %ID"
    //% id.min=0 id.max=255 shim=radio::setGroup
    function setGroup(id: int32): void;

    /**
     * Change the output power level of the transmitter to the given value.
     * @param power a value in the range 0..7, where 0 is the lowest power and 7 is the highest. eg: 7
     */
    //% help=radio/set-transmit-power
    //% weight=9 blockGap=8
    //% blockId=radio_set_transmit_power block="radio set transmit power %power"
    //% power.min=0 power.max=7
    //% advanced=true shim=radio::setTransmitPower
    function setTransmitPower(power: int32): void;

    /**
     * Set the radio to transmit the serial number in each message.
     * @param transmit value indicating if the serial number is transmitted, eg: true
     */
    //% help=radio/set-transmit-serial-number
    //% weight=8 blockGap=8
    //% blockId=radio_set_transmit_serial_number block="radio set transmit serial number %transmit"
    //% advanced=true shim=radio::setTransmitSerialNumber
    function setTransmitSerialNumber(transmit: boolean): void;

    /**
     * Returns the number payload from the last packet taken from the radio queue
     * (via ``receiveNumber``, ``receiveString``, etc) or 0 if that packet did not
     * contain a number.
     */
    //% help=radio/received-number shim=radio::receivedNumber
    function receivedNumber(): number;

    /**
     * Returns the serial number of the sender micro:bit from the last packet taken
     * from the radio queue (via ``receiveNumber``, ``receiveString``, etc) or 0 if
     * that packet did not send a serial number.
     */
    //% help=radio/received-serial shim=radio::receivedSerial
    function receivedSerial(): uint32;

    /**
     * Returns the string payload from the last packet taken from the radio queue
     * (via ``receiveNumber``, ``receiveString``, etc) or the empty string if that
     * packet did not contain a string.
     */
    //% help=radio/received-string shim=radio::receivedString
    function receivedString(): string;

    /**
     * Returns the buffer payload from the last packet taken from the radio queue
     * (via ``receiveNumber``, ``receiveString``, etc) or the empty string if that
     * packet did not contain a string.
     */
    //% help=radio/received-buffer shim=radio::receivedBuffer
    function receivedBuffer(): Buffer;

    /**
     * Returns the system time of the sender micro:bit at the moment when it sent the
     * last packet taken from the radio queue (via ``receiveNumber``,
     * ``receiveString``, etc).
     */
    //% help=radio/received-time shim=radio::receivedTime
    function receivedTime(): uint32;
}

// Auto-generated. Do not edit. Really.
