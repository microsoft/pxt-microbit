#include "pxt.h"
#include "MESEvents.h"
#include "MicroBitUARTService.h"

using namespace pxt;

enum Delimiters {
    //% block="new line"
    NewLine = 1,
    //% block=","
    Comma = 2,
    //% block="$"
    Dollar = 3,
    //% block=":"
    Colon = 4,
    //% block="."
    Fullstop = 5,
    //% block="#"
    Hash = 6,
};


/**
 * Support for additional Bluetooth services.
 */
//% color=#0082FB weight=20
namespace bluetooth {
    MicroBitUARTService *uart = NULL;

    /**
    *  Starts the Bluetooth IO pin service.
    */
    //% help=bluetooth/start-io-pin-service
    //% blockId=bluetooth_start_io_pin_service block="bluetooth io pin service" blockGap=8
    //% parts="bluetooth"
    void startIOPinService() {
        new MicroBitIOPinService(*uBit.ble, uBit.io);
    }

    /**
    *  Starts the Bluetooth LED service
    */
    //% help=bluetooth/start-led-service
    //% blockId=bluetooth_start_led_service block="bluetooth led service" blockGap=8
    //% parts="bluetooth"
    void startLEDService() {
        new MicroBitLEDService(*uBit.ble, uBit.display);
    }

    /**
    *  Starts the Bluetooth temperature service
    */
    //% help=bluetooth/start-temperature-service
    //% blockId=bluetooth_start_temperature_service block="bluetooth temperature service" blockGap=8
    //% parts="bluetooth"
    void startTemperatureService() {    
        new MicroBitTemperatureService(*uBit.ble, uBit.thermometer);        
    }

    /**
    *  Starts the Bluetooth magnetometer service
    */
    //% help=bluetooth/start-magnetometer-service
    //% blockId=bluetooth_start_magnetometer_service block="bluetooth magnetometer service" blockGap=8
    //% parts="bluetooth"
    void startMagnetometerService() {    
        new MicroBitMagnetometerService(*uBit.ble, uBit.compass); 
    }

    /**
    *  Starts the Bluetooth accelerometer service
    */
    //% help=bluetooth/start-accelerometer-service
    //% blockId=bluetooth_start_accelerometer_service block="bluetooth accelerometer service" blockGap=8
    //% parts="bluetooth"
    void startAccelerometerService() {
        new MicroBitAccelerometerService(*uBit.ble, uBit.accelerometer);        
    }

    /**
    *  Starts the Bluetooth button service
    */
    //% help=bluetooth/start-button-service
    //% blockId=bluetooth_start_button_service block="bluetooth button service" blockGap=8
    //% parts="bluetooth"
    void startButtonService() {
        new MicroBitButtonService(*uBit.ble);      
    }

    /**
    *  Starts the Bluetooth UART service
    */
    //% help=bluetooth/start-uart-service
    //% blockId=bluetooth_start_uart_service block="bluetooth uart service" blockGap=8
    //% parts="bluetooth"
    void startUartService() {
        if (uart) return;
        // 61 octet buffer size is 3 x (MTU - 3) + 1
        // MTU on nRF51822 is 23 octets. 3 are used by Attribute Protocol header data leaving 20 octets for payload
        // So we allow a RX buffer that can contain 3 x max length messages plus one octet for a terminator character
        uart = new MicroBitUARTService(*uBit.ble, 61, 60);
    }
    
    //%
    void uartWriteString(StringData *data) {
        startUartService();
    	uart->send(ManagedString(data));
    }    

    //%
    StringData* uartRead(StringData *del) {
        startUartService();
        return uart->readUntil(ManagedString(del)).leakData();
    }    

    /**
     * Register code to run when the micro:bit is connected to over Bluetooth
     * @param body Code to run when a Bluetooth connection is established
     */
    //% help=bluetooth/on-bluetooth-connected weight=20
    //% blockId=bluetooth_on_connected block="on bluetooth connected" blockGap=8
    //% parts="bluetooth"
    void onBluetoothConnected(Action body) {
        registerWithDal(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_CONNECTED, body);
    }    

     /**
     * Register code to run when a bluetooth connection to the micro:bit is lost
     * @param body Code to run when a Bluetooth connection is lost
     */
    //% help=bluetooth/on-bluetooth-disconnected weight=19
    //% blockId=bluetooth_on_disconnected block="on bluetooth disconnected"
    //% parts="bluetooth"
    void onBluetoothDisconnected(Action body) {
        registerWithDal(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_DISCONNECTED, body);
    }  
}