// Auto-generated. Do not edit.


    /**
     * Support for additional Bluetooth services.
     */
    //% color=#0082FB weight=96 icon="\uf294"
declare namespace bluetooth {

    /**
     *  Starts the Bluetooth accelerometer service
     */
    //% help=bluetooth/start-accelerometer-service
    //% blockId=bluetooth_start_accelerometer_service block="bluetooth accelerometer service"
    //% parts="bluetooth" weight=90 blockGap=8 shim=bluetooth::startAccelerometerService
    function startAccelerometerService(): void;

    /**
     *  Starts the Bluetooth button service
     */
    //% help=bluetooth/start-button-service
    //% blockId=bluetooth_start_button_service block="bluetooth button service" blockGap=8
    //% parts="bluetooth" weight=89 shim=bluetooth::startButtonService
    function startButtonService(): void;

    /**
     *  Starts the Bluetooth IO pin service.
     */
    //% help=bluetooth/start-io-pin-service
    //% blockId=bluetooth_start_io_pin_service block="bluetooth io pin service" blockGap=8
    //% parts="bluetooth" weight=88 shim=bluetooth::startIOPinService
    function startIOPinService(): void;

    /**
     *  Starts the Bluetooth LED service
     */
    //% help=bluetooth/start-led-service
    //% blockId=bluetooth_start_led_service block="bluetooth led service" blockGap=8
    //% parts="bluetooth" weight=87 shim=bluetooth::startLEDService
    function startLEDService(): void;

    /**
     *  Starts the Bluetooth temperature service
     */
    //% help=bluetooth/start-temperature-service
    //% blockId=bluetooth_start_temperature_service block="bluetooth temperature service" blockGap=8
    //% parts="bluetooth" weight=86 shim=bluetooth::startTemperatureService
    function startTemperatureService(): void;

    /**
     *  Starts the Bluetooth magnetometer service
     */
    //% help=bluetooth/start-magnetometer-service
    //% blockId=bluetooth_start_magnetometer_service block="bluetooth magnetometer service"
    //% parts="bluetooth" weight=85 shim=bluetooth::startMagnetometerService
    function startMagnetometerService(): void;

    /**
     *  Starts the Bluetooth UART service
     */
    //% help=bluetooth/start-uart-service
    //% blockId=bluetooth_start_uart_service block="bluetooth uart service"
    //% parts="bluetooth" advanced=true shim=bluetooth::startUartService
    function startUartService(): void;

    /**
     * Sends a buffer of data via Bluetooth UART
     */
    //% shim=bluetooth::uartWriteBuffer
    function uartWriteBuffer(buffer: Buffer): void;

    /**
     * Reads buffered UART data into a buffer
     */
    //% shim=bluetooth::uartReadBuffer
    function uartReadBuffer(): Buffer;

    /**
     * Registers an event to be fired when one of the delimiter is matched.
     * @param delimiters the characters to match received characters against.
     */
    //% help=bluetooth/on-uart-data-received
    //% weight=18 blockId=bluetooth_on_data_received block="bluetooth|on data received %delimiters=serial_delimiter_conv" shim=bluetooth::onUartDataReceived
    function onUartDataReceived(delimiters: string, body: () => void): void;

    /**
     * Register code to run when the micro:bit is connected to over Bluetooth
     * @param body Code to run when a Bluetooth connection is established
     */
    //% help=bluetooth/on-bluetooth-connected weight=20
    //% blockId=bluetooth_on_connected block="on bluetooth connected" blockGap=8
    //% parts="bluetooth" shim=bluetooth::onBluetoothConnected
    function onBluetoothConnected(body: () => void): void;

    /**
     * Register code to run when a bluetooth connection to the micro:bit is lost
     * @param body Code to run when a Bluetooth connection is lost
     */
    //% help=bluetooth/on-bluetooth-disconnected weight=19
    //% blockId=bluetooth_on_disconnected block="on bluetooth disconnected"
    //% parts="bluetooth" shim=bluetooth::onBluetoothDisconnected
    function onBluetoothDisconnected(body: () => void): void;

    /**
     * Advertise an Eddystone URL
     * @param url the url to transmit. Must be no longer than the supported eddystone url length, eg: "https://makecode.com"
     * @param power power level between 0 and 7, eg: 7
     * @param connectable true to keep bluetooth connectable for other services, false otherwise.
     */
    //% blockId=eddystone_advertise_url block="bluetooth advertise url %url|with power %power|connectable %connectable"
    //% parts=bluetooth weight=11 blockGap=8
    //% help=bluetooth/advertise-url blockExternalInputs=1 shim=bluetooth::advertiseUrl
    function advertiseUrl(url: string, power: int32, connectable: boolean): void;

    /**
     * Advertise an Eddystone UID
     * @param nsAndInstance 16 bytes buffer of namespace (bytes 0-9) and instance (bytes 10-15)
     * @param power power level between 0 and 7, eg: 7
     * @param connectable true to keep bluetooth connectable for other services, false otherwise.
     */
    //% parts=bluetooth weight=12 advanced=true shim=bluetooth::advertiseUidBuffer
    function advertiseUidBuffer(nsAndInstance: Buffer, power: int32, connectable: boolean): void;

    /**
     * Sets the bluetooth transmit power between 0 (minimal) and 7 (maximum).
     * @param power power level between 0 (minimal) and 7 (maximum), eg: 7.
     */
    //% parts=bluetooth weight=5 help=bluetooth/set-transmit-power advanced=true
    //% blockId=bluetooth_settransmitpower block="bluetooth set transmit power %power" shim=bluetooth::setTransmitPower
    function setTransmitPower(power: int32): void;

    /**
     * Stops advertising Eddystone end points
     */
    //% blockId=eddystone_stop_advertising block="bluetooth stop advertising"
    //% parts=bluetooth weight=10
    //% help=bluetooth/stop-advertising advanced=true shim=bluetooth::stopAdvertising
    function stopAdvertising(): void;
}

// Auto-generated. Do not edit. Really.
