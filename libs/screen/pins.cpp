#include "pxt.h"

#include "Pin.h"
#define PinCompat codal::Pin

#define DEV_NUM_PINS 48

namespace pxt {
static DevicePin **pinPtrs;
static uint8_t numPinPtrs;
static uint8_t pinPos[DEV_NUM_PINS];

//%
DevicePin *getPin(int id) {

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

//%
DevicePin *getPinCfg(int key) {
    int p = getConfig(key, -1);
    if (p == -1)
        DMESG("no pin cfg: %d", key);
    return getPin(p);
}

void linkPin(int from, int to) {
    if (from < 0 || from >= DEV_NUM_PINS)
        soft_panic(PANIC_NO_SUCH_PIN);
    getPin(to);
    pinPos[from] = pinPos[to];
}

//%
DevicePin *lookupPin(int pinName) {
    if (pinName < 0 || pinName == 0xff)
        return NULL;
    pinName &= CFG_PIN_NAME_MSK;
    return getPin(pinName);
}

//%
DevicePin *lookupPinCfg(int key) {
    return lookupPin(getConfig(key));
}

CodalComponent *lookupComponent(int id) {
    for (int i = 0; i < DEVICE_COMPONENT_COUNT; ++i) {
        if (CodalComponent::components[i] && CodalComponent::components[i]->id == id)
            return CodalComponent::components[i];
    }
    return NULL;
}

} // namespace pxt

namespace pins {
/**
* Get a pin by configuration id (DAL.CFG_PIN...)
*/
//%
DigitalInOutPin pinByCfg(int key) {
    return pxt::lookupPinCfg(key);
}

/**
 * Create a new zero-initialized buffer.
 * @param size number of bytes in the buffer
 */
//%
Buffer createBuffer(int size) {
    return mkBuffer(NULL, size);
}

/**
 * Get the duration of the last pulse in microseconds. This function should be called from a
 * ``onPulsed`` handler.
 */
//% help=pins/pulse-duration blockGap=8
//% blockId=pins_pulse_duration block="pulse duration (µs)"
//% weight=19
int pulseDuration() {
    return pxt::lastEvent.timestamp;
}
} // namespace pins
