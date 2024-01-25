#include "pxt.h"

#include "config_nrf.h"

namespace pxt {
static CODAL_PIN **pinPtrs;
static uint8_t numPinPtrs;
static uint8_t pinPos[DEV_NUM_PINS];

CODAL_PIN *myGetPin(int id) {

    id &= CFG_PIN_NAME_MSK;

    if (id >= DEV_NUM_PINS)
        soft_panic(PANIC_NO_SUCH_PIN);

    // we could use lookupComponent() here - it would be slightly slower

    int ptr = pinPos[id];
    if (ptr == 0) {
        pinPtrs = (CODAL_PIN **)realloc(pinPtrs, (numPinPtrs + 1) * sizeof(void *));
        bool isAnalog = IS_ANALOG_PIN(id);
        // GCTODO
        pinPtrs[numPinPtrs++] =
            new CODAL_PIN(DEVICE_ID_IO_P0 + id, (PinName)id,
                          isAnalog ? PIN_CAPABILITY_AD : PIN_CAPABILITY_DIGITAL);
        ptr = numPinPtrs;
        pinPos[id] = ptr;
    }
    return pinPtrs[ptr - 1];
}

CODAL_PIN *myLookupPin(int pinName) {
    if (pinName < 0 || pinName == 0xff)
        return NULL;
    pinName &= CFG_PIN_NAME_MSK;
    return myGetPin(pinName);
}

}