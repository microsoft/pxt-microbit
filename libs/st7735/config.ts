// there's no UF2 bootloader for 52833 yet, so we specify example configuration here
namespace config {
    export const PIN_BTNMX_LATCH = DAL.P0_9
    export const PIN_BTNMX_CLOCK = DAL.P1_0
    export const PIN_BTNMX_DATA = DAL.P0_1

    // pybadge-like layout
    export const PIN_BTN_LEFT = 1050
    export const PIN_BTN_UP = 1051
    export const PIN_BTN_DOWN = 1052
    export const PIN_BTN_RIGHT = 1053
    export const PIN_BTN_A = 1054
    export const PIN_BTN_B = 1055
    export const PIN_BTN_MENU = 1056

    export const PIN_JACK_SND = DAL.P0_0

    export const PIN_DISPLAY_SCK = DAL.P0_17
    export const PIN_DISPLAY_MOSI = DAL.P0_13
    export const PIN_DISPLAY_MISO = DAL.P0_1
    export const PIN_DISPLAY_BL = DAL.P0_26
    export const PIN_DISPLAY_DC = DAL.P0_10
    export const PIN_DISPLAY_RST = DAL.P1_2

    // Jacdac, when jacdaptor is connected, is on the accessibility pin (P12)
    export const PIN_JACK_TX = DAL.P0_12

    export const DISPLAY_WIDTH = 160
    export const DISPLAY_HEIGHT = 128

    export const DISPLAY_TYPE = 4242 // smart display

    export const DISPLAY_CFG0 = 0x00000080
    export const DISPLAY_CFG1 = 0x00000603
    export const DISPLAY_CFG2 = 8
}
