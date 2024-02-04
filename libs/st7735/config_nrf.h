#include "NRF52Pin.h"
#include "NRF52SPI.h"

#define CODAL_PIN NRF52Pin
#define CODAL_SPI NRF52SPI

#define MY_DISPLAY_WIDTH 160
#define MY_DISPLAY_HEIGHT 128
#define MY_DISPLAY_TYPE 4242 // smart display
#define MY_DISPLAY_CFG0 0x00000080
#define MY_DISPLAY_CFG1 0x00000603
#define MY_DISPLAY_CFG2 32

#define MY_PIN_BTNMX_LATCH &uBit.io.P9 // 9  // DAL.P0_9     EC P9
#define MY_PIN_BTNMX_CLOCK &uBit.io.P20 // 32 // DAL.P1_0     EC P20
#define MY_PIN_BTNMX_DATA &uBit.io.P14 // 1 // DAL.P0_1       EC P14

#define MY_PIN_DISPLAY_SCK &uBit.io.P13 // 17 // DAL.P0_17    EC P13
#define MY_PIN_DISPLAY_MOSI &uBit.io.P15 // 13 // DAL.P0_13   EC P15
#define MY_PIN_DISPLAY_MISO &uBit.io.P14 // 1 // DAL.P0_1     EC P14
#define MY_PIN_DISPLAY_BL &uBit.io.P19 // 26 // DAL.P0_26     EC P19
#define MY_PIN_DISPLAY_DC &uBit.io.P8 // 10 // DAL.P0_10     EC P8
#define MY_PIN_DISPLAY_RST &uBit.io.P16  // DAL.P1_2     EC P16
#define MY_PIN_DISPLAY_CS ((CODAL_PIN*)NULL) // 0xff // not connected
#define MY_PIN_LED  ((CODAL_PIN*)NULL) // 0xff // not connected

// #define CFG_PIN_NAME_MSK 0xffff
#undef DEV_NUM_PINS
#define DEV_NUM_PINS 48
#define DEVICE_ID_IO_P0 100

// remove the indirection through configuration
#undef PIN
#undef LOOKUP_PIN
#define PIN(name) MY_PIN_##name
#define LOOKUP_PIN(name) PIN(name) // pxt::myLookupPin(PIN(name))

#define PXT_INTERNAL_KEY_UP 2050
#define PXT_INTERNAL_KEY_DOWN 2051
#define DEVICE_ID_FIRST_BUTTON 4000


namespace pxt {
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