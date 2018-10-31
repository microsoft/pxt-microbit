#include "MicroBitConfig.h"
#include "ble/UUID.h"
#include "BLEHF2Service.h"
#include "MicroBitEvent.h"

BLEHF2Service::BLEHF2Service(BLEDevice &_ble) :
        ble(_ble)
{
    GattCharacteristic  txCharacteristic(BLEHF2TxCharacteristicUUID, (uint8_t *)&txCharacteristicMessage, 0,
    sizeof(txCharacteristicMessage), GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_NOTIFY);

    // Initialise our characteristic values.
    memset(&txCharacteristicMessage, 0, sizeof(txCharacteristicMessage));

    // Set default security requirements
    txCharacteristic.requireSecurity(SecurityManager::MICROBIT_BLE_SECURITY_LEVEL);

    // setup GATT table
    GattCharacteristic *characteristics[] = {&txCharacteristic};
    GattService service(BLEHF2ServiceUUID, characteristics, sizeof(characteristics) / sizeof(GattCharacteristic *));
    ble.addService(service);

    // retreive handles
    txCharacteristicHandle = txCharacteristic.getValueHandle();

    // initialize data
    ble.gattServer().write(txCharacteristicHandle,(uint8_t *)&txCharacteristicMessage, sizeof(txCharacteristicMessage));
}

void BLEHF2Service::sendSerial(const char *data, int len, bool isError) {
    if (ble.getGapState().connected)
    {
        int32_t sent = 0;
        while(sent < len) {
            int32_t n = min(BLEHF2_DATA_LENGTH, len - sent);
            txCharacteristicMessage.command = (isError ? BLEHF2_FLAG_SERIAL_OUT : BLEHF2_FLAG_SERIAL_ERR) | n;
            memcpy(&txCharacteristicMessage.data, data + sent, n);
            ble.gattServer().notify(txCharacteristicHandle,(uint8_t *)&txCharacteristicMessage, sizeof(txCharacteristicMessage));
            sent += n;
        }
    }
}

const uint8_t  BLEHF2ServiceUUID[] = {
    0xb1,0x12,0xf5,0xe6,0x26,0x79,0x30,0xda,0xa2,0x6e,0x02,0x73,0xb6,0x04,0x38,0x49
};

const uint8_t  BLEHF2TxCharacteristicUUID[] = {
    0xb1,0x12,0xf5,0xe6,0x26,0x79,0x30,0xda,0xa2,0x6e,0x02,0x73,0xb6,0x04,0x38,0x4a
};