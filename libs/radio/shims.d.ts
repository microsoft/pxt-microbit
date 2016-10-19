// Auto-generated. Do not edit.



    //% color=270 weight=34
declare namespace radio {

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
     * @param name the field name (max 12 characters), eg: "data"
     * @param value the numberic value
     */
    //% help=radio/send-value
    //% weight=59
    //% blockId=radio_datagram_send_value block="radio send|value %name|= %value" blockGap=8 shim=radio::sendValue
    function sendValue(name: string, value: number): void;

    /**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    //% help=radio/send-string
    //% weight=58
    //% blockId=radio_datagram_send_string block="radio send string %msg" shim=radio::sendString
    function sendString(msg: string): void;

    /**
     * Reads a value sent with `stream value` and writes it
     * to the serial stream as JSON
     */
    //% help=radio/write-value-to-serial
    //% weight=3
    //% blockId=radio_write_value_serial block="radio write value to serial"
    //% advanced=true shim=radio::writeValueToSerial
    function writeValueToSerial(): void;

    /**
     * Reads a number at a given index, between ``0`` and ``3``, from the packet received by ``receive number``. Not supported in simulator.
     * @param index index of the number to read from 0 to 3. 1 eg
     */
    //% help=radio/received-number-at
    //% weight=45 debug=true shim=radio::receivedNumberAt
    function receivedNumberAt(index: number): number;

    /**
     * Reads a string received in a packet received by ``receive number``. Not supported in simulator.
     */
    //% help=radio/received-value-name
    //% weight=45 debug=true shim=radio::receivedValueName
    function receivedValueName(): string;

    /**
     * Reads the next packet as a number from the radio queue.
     */
    //% help=radio/receive-number
    //% weight=46
    //% blockId=radio_datagram_receive block="radio receive number" blockGap=8
    //% advanced=true shim=radio::receiveNumber
    function receiveNumber(): number;

    /**
     * Registers code to run when a packet is received over radio.
     */
    //% help=radio/on-data-received
    //% weight=50
    //% blockId=radio_datagram_received_event block="radio on data received" blockGap=8 shim=radio::onDataReceived
    function onDataReceived(body: () => void): void;

    /**
     * Reads the next packet as a string and returns it.
     */
    //% blockId=radio_datagram_receive_string block="radio receive string" blockGap=8
    //% weight=44
    //% help=radio/receive-string shim=radio::receiveString
    function receiveString(): string;

    /**
     * Gets the received signal strength indicator (RSSI) from the packet received by ``receive number``. Not supported in simulator.
     * namespace=radio
     */
    //% help=radio/received-signal-strength
    //% weight=40
    //% blockId=radio_datagram_rssi block="radio received signal strength"
    //% advanced=true shim=radio::receivedSignalStrength
    function receivedSignalStrength(): number;

    /**
     * Sets the group id for radio communications. A micro:bit can only listen to one group ID at any time.
     * @ param id the group id between ``0`` and ``255``, 1 eg
     */
    //% help=radio/set-group
    //% weight=10 blockGap=8 advanced=true
    //% blockId=radio_set_group block="radio set group %ID" shim=radio::setGroup
    function setGroup(id: number): void;

    /**
     * Change the output power level of the transmitter to the given value.
     * @param power a value in the range 0..7, where 0 is the lowest power and 7 is the highest. eg: 7
     */
    //% help=radio/set-transmit-power
    //% weight=9 blockGap=8
    //% blockId=radio_set_transmit_power block="radio set transmit power %power"
    //% advanced=true shim=radio::setTransmitPower
    function setTransmitPower(power: number): void;

    /**
     * Set the radio to transmit the serial number in each message.
     * @param transmit value indicating if the serial number is transmitted, eg: true
     */
    //% help=radio/set-transmit-serial-number
    //% weight=8 blockGap=8
    //% blockId=radio_set_transmit_serial_number block="radio set transmit serial number %transmit"
    //% advanced=true shim=radio::setTransmitSerialNumber
    function setTransmitSerialNumber(transmit: boolean): void;
}

// Auto-generated. Do not edit. Really.
