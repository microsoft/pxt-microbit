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
     * Takes the next packet from the radio queue and returns its contents in a Buffer
     */
    //% help=radio/received-packet shim=radio::readRawPacket
    function readRawPacket(): Buffer;

    /**
     * Sends a raw packet through the radio
     */
    //% advanced=true
    //% async shim=radio::sendRawPacket
    function sendRawPacket(msg: Buffer): void;

    /**
     * Registers code to run when a packet is received over radio.
     */
    //% help=radio/on-data-received
    //% weight=50
    //% blockId=radio_datagram_received_event block="radio on data received" blockGap=8
    //% deprecated=true shim=radio::onDataReceived
    function onDataReceived(body: () => void): void;

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
    //% weight=100
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
}

// Auto-generated. Do not edit. Really.
