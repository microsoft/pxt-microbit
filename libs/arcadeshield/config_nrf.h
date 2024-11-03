// here we hard code the dependence on micro:bit V2
// and Arcade Shield, to avoid potential conflicts with pxt-microbit

#include "NRF52Pin.h"
#include "NRF52SPI.h"

#define CODAL_PIN NRF52Pin
#define CODAL_SPI NRF52SPI

#define MY_DISPLAY_TYPE 4242 // smart shield
#define MY_DISPLAY_CFG0 0x02000080 // allow execution without shield plugged in
#define MY_DISPLAY_CFG1 0x00000603
#define MY_DISPLAY_CFG2 8    // maximum SPI frequency for smart shield

#define MY_PIN_BTNMX_LATCH &uBit.io.P9      // DAL.P0_9
#define MY_PIN_BTNMX_CLOCK &uBit.io.P20     // DAL.P1_0
#define MY_PIN_BTNMX_DATA &uBit.io.P14      // DAL.P0_1

#define MY_PIN_DISPLAY_SCK &uBit.io.P13     // DAL.P0_17
#define MY_PIN_DISPLAY_MOSI &uBit.io.P15    // DAL.P0_13
#define MY_PIN_DISPLAY_MISO &uBit.io.P14    // DAL.P0_1
#define MY_PIN_DISPLAY_BL &uBit.io.P19      // DAL.P0_26
#define MY_PIN_DISPLAY_DC &uBit.io.P8       // DAL.P0_10
#define MY_PIN_DISPLAY_RST &uBit.io.P16     // DAL.P1_2
#define MY_PIN_DISPLAY_CS ((CODAL_PIN*)NULL) // not connected
#define MY_PIN_LED  ((CODAL_PIN*)NULL)      // not connected

#undef DEV_NUM_PINS
#define DEV_NUM_PINS 48
#define DEVICE_ID_IO_P0 100

#define DEV_PWM_PINS 0x0000ffffffffULL // all pins are PWM pins it seems
#define DEV_AIN_PINS 0x0000f000001fULL

// Codal doesn't yet distinguish between PWM and AIN
#define DEV_ANALOG_PINS (DEV_PWM_PINS | DEV_AIN_PINS)

#ifndef IS_ANALOG_PIN
#define IS_ANALOG_PIN(id) ((DEV_ANALOG_PINS >> (id)) & 1)
#endif

typedef CODAL_PIN DevicePin;

typedef DevicePin *DigitalInOutPin;
typedef DevicePin *AnalogInOutPin;
typedef DevicePin *AnalogInPin;
typedef DevicePin *AnalogOutPin;
typedef DevicePin *PwmPin;
typedef DevicePin *PwmOnlyPin;

// remove the indirection through configuration
#undef PIN
#undef LOOKUP_PIN
#define PIN(name) MY_PIN_##name
#define LOOKUP_PIN(name) PIN(name) // pxt::myLookupPin(PIN(name))

#define PXT_INTERNAL_KEY_UP 2050
#define PXT_INTERNAL_KEY_DOWN 2051
#define DEVICE_ID_FIRST_BUTTON 4000
#define BUTTON_ACTIVE_LOW_PULL_UP 32

namespace pxt {
    uint32_t readButtonMultiplexer(int bits);
    void disableButtonMultiplexer();
    DevicePin *myLookupPin(int pinName);
    CodalComponent *lookupComponent(int id);
    int pressureLevelByButtonId(int btnId, int codalId);
}

