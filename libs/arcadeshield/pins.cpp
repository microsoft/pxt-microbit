#include "pxt.h"

#include "Pin.h"
#define PinCompat codal::Pin

#include "config_nrf.h"

// #undef Button

namespace pxt {
static DevicePin **pinPtrs;
static uint8_t numPinPtrs;
static uint8_t pinPos[DEV_NUM_PINS];

DevicePin *myGetPin(int id) {

    id &= CFG_PIN_NAME_MSK;

    if (id >= DEV_NUM_PINS)
        soft_panic(PANIC_NO_SUCH_PIN);

    // we could use lookupComponent() here - it would be slightly slower

    int ptr = pinPos[id];
    if (ptr == 0) {
        pinPtrs = (DevicePin **)realloc(pinPtrs, (numPinPtrs + 1) * sizeof(void *));
        bool isAnalog = IS_ANALOG_PIN(id);
        // GCTODO
        pinPtrs[numPinPtrs++] =
            new DevicePin(DEVICE_ID_IO_P0 + id, (PinName)id,
                          isAnalog ? PIN_CAPABILITY_AD : PIN_CAPABILITY_DIGITAL);
        ptr = numPinPtrs;
        pinPos[id] = ptr;
    }
    return pinPtrs[ptr - 1];
}

DevicePin *getPinCfg(int key) {
    int p = getConfig(key, -1);
    if (p == -1)
        DMESG("no pin cfg: %d", key);
    return myGetPin(p);
}

void linkPin(int from, int to) {
    if (from < 0 || from >= DEV_NUM_PINS)
        soft_panic(PANIC_NO_SUCH_PIN);
    myGetPin(to);
    pinPos[from] = pinPos[to];
}

DevicePin *myLookupPin(int pinName) {
    if (pinName < 0 || pinName == 0xff)
        return NULL;
    pinName &= CFG_PIN_NAME_MSK;
    return myGetPin(pinName);
}

DevicePin *lookupPinCfg(int key) {
    return myLookupPin(getConfig(key));
}

CodalComponent *lookupComponent(int id) {
    for (int i = 0; i < DEVICE_COMPONENT_COUNT; ++i) {
        if (CodalComponent::components[i] && CodalComponent::components[i]->id == id)
            return CodalComponent::components[i];
    }
    return NULL;
}

} // namespace pxt
