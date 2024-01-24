#include "NRF52Pin.h"
#include "NRF52SPI.h"

#define MY_DISPLAY_WIDTH 160
#define MY_DISPLAY_HEIGHT 128
#define MY_DISPLAY_TYPE 4242 // smart display
#define MY_DISPLAY_CFG0 0x00000080
#define MY_DISPLAY_CFG1 0x00000603
#define MY_DISPLAY_CFG2 8

#define MY_PIN_BTNMX_LATCH 9 // = DAL.P0_9
#define MY_PIN_BTNMX_CLOCK 32 // = DAL.P1_0
#define MY_PIN_BTNMX_DATA 1 // = DAL.P0_1

#define MY_PIN_DISPLAY_SCK 17 // DAL.P0_17
#define MY_PIN_DISPLAY_MOSI 13 // DAL.P0_13
#define MY_PIN_DISPLAY_MISO 1 // DAL.P0_1
#define MY_PIN_DISPLAY_BL 26 // DAL.P0_26
#define MY_PIN_DISPLAY_DC 10 // DAL.P0_10
#define MY_PIN_DISPLAY_RST 34 // DAL.P1_2
#define MY_PIN_DISPLAY_CS 0xff // not connected
#define MY_PIN_LED 0xff // not connected

// #define CFG_PIN_NAME_MSK 0xffff
#undef DEV_NUM_PINS
#define DEV_NUM_PINS 48
#define DEVICE_ID_IO_P0 100

// remove the indirection through configuration
#undef PIN
#undef LOOKUP_PIN
#define PIN(name) MY_PIN_##name
#define LOOKUP_PIN(name) pxt::myLookupPin(PIN(name))

#define DEV_PWM_PINS 0x0000ffffffffULL // all pins are PWM pins it seems
#define DEV_AIN_PINS 0x0000f000001fULL

// Codal doesn't yet distinguish between PWM and AIN
#define DEV_ANALOG_PINS (DEV_PWM_PINS | DEV_AIN_PINS)

#undef IS_ANALOG_PIN
#define IS_ANALOG_PIN(id) ((DEV_ANALOG_PINS >> (id)) & 1)

#define CODAL_PIN NRF52Pin
#define CODAL_SPI NRF52SPI
//#define CODAL_I2C NRF52I2C
//#define CODAL_TIMER Timer
//#define CODAL_SERIAL NRF52Serial

#define PXT_INTERNAL_KEY_UP 2050
#define PXT_INTERNAL_KEY_DOWN 2051
#define DEVICE_ID_FIRST_BUTTON 4000

typedef CODAL_PIN *DigitalInOutPin;
typedef CODAL_PIN *AnalogInOutPin;
typedef CODAL_PIN *AnalogInPin;
typedef CODAL_PIN *AnalogOutPin;
typedef CODAL_PIN *PwmPin;
typedef CODAL_PIN *PwmOnlyPin;

namespace pxt {
    CODAL_PIN *myGetPin(int id);
    CODAL_PIN *myLookupPin(int pinName);
    uint32_t readButtonMultiplexer(int bits);
    void disableButtonMultiplexer();
}


//     // pybadge-like layout
//     export const PIN_BTN_LEFT = 1050
//     export const PIN_BTN_UP = 1051
//     export const PIN_BTN_DOWN = 1052
//     export const PIN_BTN_RIGHT = 1053
//     export const PIN_BTN_A = 1054
//     export const PIN_BTN_B = 1055
//     export const PIN_BTN_MENU = 1056
//     export const PIN_JACK_SND = DAL.P0_0
//     // Jacdac, when jacdaptor is connected, is on the accessibility pin (P12)
//     export const PIN_JACK_TX = DAL.P0_12