#define CFG_DISPLAY_WIDTH 160
#define CFG_DISPLAY_HEIGHT = 128
#define CFG_DISPLAY_TYPE 4242 // smart display

#define CFG_DISPLAY_CFG0 0x00000080
#define CFG_DISPLAY_CFG1 0x00000603
#define CFG_DISPLAY_CFG2 8

#define CFG_PIN_DISPLAY_SCK 17 // DAL.P0_17
#define CFG_PIN_DISPLAY_MOSI 13 // DAL.P0_13
#define CFG_PIN_DISPLAY_MISO 1 // DAL.P0_1
#define CFG_PIN_DISPLAY_BL 26 // DAL.P0_26
#define CFG_PIN_DISPLAY_DC 10 // DAL.P0_10
#define CFG_PIN_DISPLAY_RST 34 // DAL.P1_2
#define CDG_PIN_DISPLAY_CS 11 // DAL.P0_11  TODO: check this ???

#define CFG_PIN_LED 13 // DAL.P0_13 TODO

// // there's no UF2 bootloader for 52833 yet, so we specify example configuration here
// namespace config {
//     export const PIN_BTNMX_LATCH = DAL.P0_9
//     export const PIN_BTNMX_CLOCK = DAL.P1_0
//     export const PIN_BTNMX_DATA = DAL.P0_1

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

//  
// }
