#ifndef BLE_HF2_SERVICE_H
#define BLE_HF2_SERVICE_H

#include "MicroBitConfig.h"
#include "ble/BLE.h"
#include "MicroBitThermometer.h"
#include "EventModel.h"
#include "pxt.h"

#define HF2_ID 9501

#define BLEHF2_STDOUT 0x80
#define BLEHF2_STDERR 0xC0
#define BLEHF2_DATA_LENGTH 19

// UUIDs for our service and characteristics
extern const uint8_t  BLEHF2UUID[];
extern const uint8_t  BLEHF2TxCharacteristicUUID[];

struct BLEHF2Packet {
  uint8_t command;
  uint8_t data[BLEHF2_DATA_LENGTH];
};

class BLEHF2Service
{
    public:

    /**
      * Constructor.
      * Create a representation of the TemperatureService
      * @param _ble The instance of a BLE device that we're running on.
      */
    BLEHF2Service(BLEDevice &_ble);

    /**
    * Sends a key value pair
    */
    void sendLog(Buffer value);

    private:

    // Bluetooth stack we're running on.
    BLEDevice &ble;

    // memory for buffers.
    BLEHF2Packet txCharacteristicMessage;

    // Handles to access each characteristic when they are held by Soft Device.
    GattAttribute::Handle_t txCharacteristicHandle;
};


#endif