namespace microcode {
    // eventually, we should get rid of these constants and use the Tid enum

    // Once a tid is assigned, it can NEVER BE CHANGED OR REPURPOSED.
    // Every tid must be unique in the set of all tids.
    export const TID_SENSOR_START_PAGE = "S1"
    export const TID_SENSOR_PRESS = "S2"
    export const TID_SENSOR_RELEASE = "S2B"
    export const TID_SENSOR_ACCELEROMETER = "S3"
    export const TID_SENSOR_TIMER = "S4"
    export const TID_SENSOR_LIGHT = "S5"
    export const TID_SENSOR_TEMP = "S6"
    export const TID_SENSOR_RADIO_RECEIVE = "S7"
    export const TID_SENSOR_MICROPHONE = "S8"
    export const TID_SENSOR_CUP_X_WRITTEN = "S9A"
    export const TID_SENSOR_CUP_Y_WRITTEN = "S9B"
    export const TID_SENSOR_CUP_Z_WRITTEN = "S9C"
    export const TID_SENSOR_MAGNET = "S10"
    export const TID_SENSOR_SLIDER = "S11"
    export const TID_SENSOR_ROTARY = "S12"
    export const TID_SENSOR_CAR_WALL = "S13"
    export const TID_SENSOR_LINE = "S14"
    export const TID_SENSOR_LED_LIGHT = "S15"

    // filters for TID_SENSOR_PRESS
    export const TID_FILTER_PIN_0 = "F0"
    export const TID_FILTER_PIN_1 = "F1"
    export const TID_FILTER_PIN_2 = "F2"
    export const TID_FILTER_BUTTON_A = "F3"
    export const TID_FILTER_BUTTON_B = "F4"
    export const TID_FILTER_KITA_KEY_1 = "F5"
    export const TID_FILTER_KITA_KEY_2 = "F6"

    export const TID_FILTER_LOGO = "F7"
    export const TID_FILTER_COIN_1 = "F8"
    export const TID_FILTER_COIN_2 = "F9"
    export const TID_FILTER_COIN_3 = "F10"
    export const TID_FILTER_COIN_4 = "F11"
    export const TID_FILTER_COIN_5 = "F12"
    export const TID_FILTER_TIMESPAN_SHORT = "F13"
    export const TID_FILTER_TIMESPAN_LONG = "F14"
    export const TID_FILTER_LOUD = "F15"
    export const TID_FILTER_QUIET = "F16"
    export const TID_FILTER_ACCEL = "F17"
    export const TID_FILTER_ACCEL_SHAKE = "F17_shake"
    export const TID_FILTER_ACCEL_TILT_UP = "F17_tilt_up"
    export const TID_FILTER_ACCEL_TILT_DOWN = "F17_tilt_down"
    export const TID_FILTER_ACCEL_TILT_LEFT = "F17_tilt_left"
    export const TID_FILTER_ACCEL_TILT_RIGHT = "F17_tilt_right"
    export const TID_FILTER_ACCEL_FACE_UP = "F17_face_up"
    export const TID_FILTER_ACCEL_FACE_DOWN = "F17_face_down"
    export const TID_FILTER_TIMESPAN_RANDOM = "F18"
    export const TID_FILTER_TIMESPAN_VERY_LONG = "F19"
    export const TID_FILTER_CUP_X_READ = "F20A"
    export const TID_FILTER_CUP_Y_READ = "F20B"
    export const TID_FILTER_CUP_Z_READ = "F20C"
    export const TID_FILTER_ROTARY_LEFT = "F21L"
    export const TID_FILTER_ROTARY_RIGHT = "F21R"
    export const TID_FILTER_TEMP_WARMER = "F22U"
    export const TID_FILTER_TEMP_COLDER = "F22D"
    export const TID_FILTER_LINE_LEFT = "F23L"
    export const TID_FILTER_LINE_RIGHT = "F23R"
    export const TID_FILTER_LINE_BOTH = "F23B"
    export const TID_FILTER_LINE_NEITHER = "F23N"
    export const TID_FILTER_LINE_NEITHER_LEFT = "F23NL"
    export const TID_FILTER_LINE_NEITHER_RIGHT = "F23NR"

    export const TID_ACTUATOR_SWITCH_PAGE = "A1"
    export const TID_ACTUATOR_SPEAKER = "A2"
    export const TID_ACTUATOR_MICROPHONE = "A3" // dead but don't delete
    export const TID_ACTUATOR_MUSIC = "A4"
    export const TID_ACTUATOR_PAINT = "A5"
    export const TID_ACTUATOR_RADIO_SEND = "A6"
    export const TID_ACTUATOR_RADIO_SET_GROUP = "A6A"
    export const TID_ACTUATOR_RGB_LED = "A8"
    export const TID_ACTUATOR_CUP_X_ASSIGN = "A9A"
    export const TID_ACTUATOR_CUP_Y_ASSIGN = "A9B"
    export const TID_ACTUATOR_CUP_Z_ASSIGN = "A9C"
    export const TID_ACTUATOR_SHOW_NUMBER = "A10"

    export const TID_MODIFIER_PAGE_1 = "M1"
    export const TID_MODIFIER_PAGE_2 = "M2"
    export const TID_MODIFIER_PAGE_3 = "M3"
    export const TID_MODIFIER_PAGE_4 = "M4"
    export const TID_MODIFIER_PAGE_5 = "M5"

    export const TID_MODIFIER_COIN_1 = "M6"
    export const TID_MODIFIER_COIN_2 = "M7"
    export const TID_MODIFIER_COIN_3 = "M8"
    export const TID_MODIFIER_COIN_4 = "M9"
    export const TID_MODIFIER_COIN_5 = "M10"

    export const TID_MODIFIER_ICON_EDITOR = "M15"
    export const TID_MODIFIER_COLOR_RED = "M16"
    export const TID_MODIFIER_COLOR_DARKPURPLE = "M17"

    export const TID_MODIFIER_EMOJI_GIGGLE = "M19giggle"
    export const TID_MODIFIER_EMOJI_HAPPY = "M19happy"
    export const TID_MODIFIER_EMOJI_HELLO = "M19hello"
    export const TID_MODIFIER_EMOJI_MYSTERIOUS = "M19mysterious"
    export const TID_MODIFIER_EMOJI_SAD = "M19sad"
    export const TID_MODIFIER_EMOJI_SLIDE = "M19slide"
    export const TID_MODIFIER_EMOJI_SOARING = "M19soaring"
    export const TID_MODIFIER_EMOJI_SPRING = "M19spring"
    export const TID_MODIFIER_EMOJI_TWINKLE = "M19twinkle"
    export const TID_MODIFIER_EMOJI_YAWN = "M19yawn"

    export const TID_MODIFIER_CUP_X_READ = "M20A"
    export const TID_MODIFIER_CUP_Y_READ = "M20B"
    export const TID_MODIFIER_CUP_Z_READ = "M20C"
    export const TID_MODIFIER_RADIO_VALUE = "M21"
    export const TID_MODIFIER_RANDOM_TOSS = "M22"
    export const TID_MODIFIER_LOOP = "M23"
    export const TID_MODIFIER_MELODY_EDITOR = "M24"
    export const TID_MODIFIER_TEMP_READ = "M25"

    export const TID_MODIFIER_RGB_LED_COLOR_X = "A20_"
    export const TID_MODIFIER_RGB_LED_COLOR_1 = "A20_1"
    export const TID_MODIFIER_RGB_LED_COLOR_2 = "A20_2"
    export const TID_MODIFIER_RGB_LED_COLOR_3 = "A20_3"
    export const TID_MODIFIER_RGB_LED_COLOR_4 = "A20_4"
    export const TID_MODIFIER_RGB_LED_COLOR_5 = "A20_5"
    export const TID_MODIFIER_RGB_LED_COLOR_6 = "A20_6"
    export const TID_MODIFIER_RGB_LED_COLOR_RAINBOW = "A20_rainbow"
    export const TID_MODIFIER_RGB_LED_COLOR_SPARKLE = "A20_sparkle"

    export const TID_ACTUATOR_SERVO_SET_ANGLE = "A21_"

    export const TID_ACTUATOR_CAR = "CAR"
    export const TID_MODIFIER_CAR_FORWARD = "CAR1"
    export const TID_MODIFIER_CAR_REVERSE = "CAR2"
    export const TID_MODIFIER_CAR_TURN_LEFT = "CAR3"
    export const TID_MODIFIER_CAR_TURN_RIGHT = "CAR4"
    export const TID_MODIFIER_CAR_STOP = "CAR5"
    export const TID_MODIFIER_CAR_FORWARD_FAST = "CAR6"
    export const TID_MODIFIER_CAR_SPIN_LEFT = "CAR7"
    export const TID_MODIFIER_CAR_SPIN_RIGHT = "CAR8"
    export const TID_MODIFIER_CAR_LED_COLOR_1 = "CAR9"
    export const TID_MODIFIER_CAR_LED_COLOR_2 = "CAR10"
    export const TID_MODIFIER_CAR_LED_COLOR_3 = "CAR11"
    export const TID_MODIFIER_CAR_LED_COLOR_4 = "CAR12"
    export const TID_MODIFIER_CAR_ARM_OPEN = "CAR13"
    export const TID_MODIFIER_CAR_ARM_CLOSE = "CAR14"

    // DO NOT CHANGE THESE NUMBERS
    export enum Tid {
        // we need markers to indicate the end of a program, page
        END_OF_PROG = 0,
        END_OF_PAGE,

        SENSOR_START = 10,
        TID_SENSOR_START_PAGE = 10,
        TID_SENSOR_PRESS = 11,
        TID_SENSOR_RELEASE = 12,
        TID_SENSOR_ACCELEROMETER = 13,
        TID_SENSOR_TIMER = 14,
        TID_SENSOR_LIGHT = 15, // this is jacdac only
        TID_SENSOR_TEMP = 16,
        TID_SENSOR_RADIO_RECEIVE = 17,
        TID_SENSOR_MICROPHONE = 18,
        TID_SENSOR_CUP_X_WRITTEN = 19,
        TID_SENSOR_CUP_Y_WRITTEN = 20,
        TID_SENSOR_CUP_Z_WRITTEN = 21,
        TID_SENSOR_MAGNET = 22,
        TID_SENSOR_SLIDER = 23,
        TID_SENSOR_ROTARY = 24,
        TID_SENSOR_CAR_WALL = 25,
        TID_SENSOR_LINE = 26,
        TID_SENSOR_LED_LIGHT = 27, // this built-in light sensor on microbit
        SENSOR_END = 27,

        ACTUATOR_START = 40,
        TID_ACTUATOR_SWITCH_PAGE = 40,
        TID_ACTUATOR_SPEAKER = 41,
        TID_ACTUATOR_MICROPHONE = 42, // dead, but don't delete
        TID_ACTUATOR_MUSIC = 43,
        TID_ACTUATOR_PAINT = 44,
        TID_ACTUATOR_RADIO_SEND = 45,
        TID_ACTUATOR_RADIO_SET_GROUP = 46,
        TID_ACTUATOR_RGB_LED = 47,
        TID_ACTUATOR_CUP_X_ASSIGN = 48,
        TID_ACTUATOR_CUP_Y_ASSIGN = 49,
        TID_ACTUATOR_CUP_Z_ASSIGN = 50,
        TID_ACTUATOR_SHOW_NUMBER = 51,
        TID_ACTUATOR_CAR = 52,
        TID_ACTUATOR_SERVO_SET_ANGLE = 53,
        ACTUATOR_END = 53,

        FILTER_START = 70,
        PRESS_RELEASE_START = 70,
        TID_FILTER_PIN_0 = 70,
        TID_FILTER_PIN_1 = 71,
        TID_FILTER_PIN_2 = 72,
        TID_FILTER_BUTTON_A = 73,
        TID_FILTER_BUTTON_B = 74,
        TID_FILTER_KITA_KEY_1 = 75,
        TID_FILTER_KITA_KEY_2 = 76,
        TID_FILTER_LOGO = 77,
        PRESS_RELEASE_END = 77,
        //
        TID_FILTER_COIN_1 = 78,
        TID_FILTER_COIN_2 = 79,
        TID_FILTER_COIN_3 = 80,
        TID_FILTER_COIN_4 = 81,
        TID_FILTER_COIN_5 = 82,
        //
        TID_FILTER_TIMESPAN_SHORT = 83,
        TID_FILTER_TIMESPAN_LONG = 84,
        TID_FILTER_TIMESPAN_RANDOM = 85,
        TID_FILTER_TIMESPAN_VERY_LONG = 86,
        //
        TID_FILTER_LOUD = 87,
        TID_FILTER_QUIET = 88,
        //
        TID_FILTER_ACCEL = 89, // dead (AFAIK)
        ACCELEROMETER_START = 90,
        TID_FILTER_ACCEL_SHAKE = 90,
        TID_FILTER_ACCEL_TILT_UP = 91,
        TID_FILTER_ACCEL_TILT_DOWN = 92,
        TID_FILTER_ACCEL_TILT_LEFT = 93,
        TID_FILTER_ACCEL_TILT_RIGHT = 94,
        ACCELEROMETER_END = 94,
        //
        TID_FILTER_CUP_X_READ = 95,
        TID_FILTER_CUP_Y_READ = 96,
        TID_FILTER_CUP_Z_READ = 97,
        //
        TID_FILTER_ROTARY_LEFT = 98,
        TID_FILTER_ROTARY_RIGHT = 99,
        //
        TID_FILTER_TEMP_WARMER = 100,
        TID_FILTER_TEMP_COLDER = 101,
        //
        LINE_START = 102,
        TID_FILTER_LINE_LEFT = 102,
        TID_FILTER_LINE_RIGHT = 103,
        TID_FILTER_LINE_BOTH = 104,
        TID_FILTER_LINE_NEITHER = 105,
        TID_FILTER_LINE_NEITHER_LEFT = 106,
        TID_FILTER_LINE_NEITHER_RIGHT = 107,
        LINE_END = 107,

        ACCELEROMETER_START2 = 108,
        TID_FILTER_ACCEL_FACE_UP = 108,
        TID_FILTER_ACCEL_FACE_DOWN = 109,
        ACCELEROMETER_END2 = 109,

        FILTER_END = 109,

        MODIFIER_START = 150,
        //
        TID_MODIFIER_PAGE_1 = 150,
        TID_MODIFIER_PAGE_2 = 151,
        TID_MODIFIER_PAGE_3 = 152,
        TID_MODIFIER_PAGE_4 = 153,
        TID_MODIFIER_PAGE_5 = 154,
        //
        TID_MODIFIER_COIN_1 = 155,
        TID_MODIFIER_COIN_2 = 156,
        TID_MODIFIER_COIN_3 = 157,
        TID_MODIFIER_COIN_4 = 158,
        TID_MODIFIER_COIN_5 = 159,
        //
        TID_MODIFIER_ICON_EDITOR = 160,
        TID_MODIFIER_COLOR_RED = 161,
        TID_MODIFIER_COLOR_DARKPURPLE = 162,
        //
        EMOJI_BEGIN = 163,
        TID_MODIFIER_EMOJI_GIGGLE = 163,
        TID_MODIFIER_EMOJI_HAPPY = 164,
        TID_MODIFIER_EMOJI_HELLO = 165,
        TID_MODIFIER_EMOJI_MYSTERIOUS = 166,
        TID_MODIFIER_EMOJI_SAD = 167,
        TID_MODIFIER_EMOJI_SLIDE = 168,
        TID_MODIFIER_EMOJI_SOARING = 169,
        TID_MODIFIER_EMOJI_SPRING = 170,
        TID_MODIFIER_EMOJI_TWINKLE = 171,
        TID_MODIFIER_EMOJI_YAWN = 172,
        EMOJI_END = 172,
        //
        TID_MODIFIER_CUP_X_READ = 173,
        TID_MODIFIER_CUP_Y_READ = 174,
        TID_MODIFIER_CUP_Z_READ = 175,
        TID_MODIFIER_RADIO_VALUE = 176,
        TID_MODIFIER_RANDOM_TOSS = 177,
        TID_MODIFIER_LOOP = 178,
        TID_MODIFIER_MELODY_EDITOR = 179,
        TID_MODIFIER_TEMP_READ = 180,
        //
        TID_MODIFIER_RGB_LED_COLOR_X = 181,
        TID_MODIFIER_RGB_LED_COLOR_1 = 182,
        TID_MODIFIER_RGB_LED_COLOR_2 = 183,
        TID_MODIFIER_RGB_LED_COLOR_3 = 184,
        TID_MODIFIER_RGB_LED_COLOR_4 = 185,
        TID_MODIFIER_RGB_LED_COLOR_5 = 186,
        TID_MODIFIER_RGB_LED_COLOR_6 = 187,
        TID_MODIFIER_RGB_LED_COLOR_RAINBOW = 188,
        TID_MODIFIER_RGB_LED_COLOR_SPARKLE = 189,
        //
        CAR_MODIFIER_BEGIN = 190,
        TID_MODIFIER_CAR_FORWARD = 190,
        TID_MODIFIER_CAR_REVERSE = 191,
        TID_MODIFIER_CAR_TURN_LEFT = 192,
        TID_MODIFIER_CAR_TURN_RIGHT = 193,
        TID_MODIFIER_CAR_STOP = 194,
        TID_MODIFIER_CAR_FORWARD_FAST = 195,
        TID_MODIFIER_CAR_SPIN_LEFT = 196,
        TID_MODIFIER_CAR_SPIN_RIGHT = 197,
        TID_MODIFIER_CAR_LED_COLOR_1 = 198,
        TID_MODIFIER_CAR_LED_COLOR_2 = 199,
        TID_MODIFIER_CAR_LED_COLOR_3 = 200,
        TID_MODIFIER_CAR_LED_COLOR_4 = 201,
        TID_MODIFIER_CAR_ARM_OPEN = 202,
        TID_MODIFIER_CAR_ARM_CLOSE = 203,
        CAR_MODIFIER_END = 203,
        MODIFER_END = 203,
    }

    type RangeMap = { [id: string]: [Tid, Tid] }

    export const ranges: RangeMap = {
        sensors: [Tid.SENSOR_START, Tid.SENSOR_END],
        filters: [Tid.FILTER_START, Tid.FILTER_END],
        actuators: [Tid.ACTUATOR_START, Tid.ACTUATOR_END],
        modifiers: [Tid.MODIFIER_START, Tid.MODIFER_END],
    }

    export function tidToString(e: Tid) {
        switch (e) {
            case Tid.TID_SENSOR_START_PAGE:
                return TID_SENSOR_START_PAGE
            case Tid.TID_SENSOR_PRESS:
                return TID_SENSOR_PRESS
            case Tid.TID_SENSOR_RELEASE:
                return TID_SENSOR_RELEASE
            case Tid.TID_SENSOR_ACCELEROMETER:
                return TID_SENSOR_ACCELEROMETER
            case Tid.TID_SENSOR_TIMER:
                return TID_SENSOR_TIMER
            case Tid.TID_SENSOR_LIGHT:
                return TID_SENSOR_LIGHT
            case Tid.TID_SENSOR_LED_LIGHT:
                return TID_SENSOR_LED_LIGHT
            case Tid.TID_SENSOR_TEMP:
                return TID_SENSOR_TEMP
            case Tid.TID_SENSOR_RADIO_RECEIVE:
                return TID_SENSOR_RADIO_RECEIVE
            case Tid.TID_SENSOR_MICROPHONE:
                return TID_SENSOR_MICROPHONE
            case Tid.TID_SENSOR_CUP_X_WRITTEN:
                return TID_SENSOR_CUP_X_WRITTEN
            case Tid.TID_SENSOR_CUP_Y_WRITTEN:
                return TID_SENSOR_CUP_Y_WRITTEN
            case Tid.TID_SENSOR_CUP_Z_WRITTEN:
                return TID_SENSOR_CUP_Z_WRITTEN
            case Tid.TID_SENSOR_MAGNET:
                return TID_SENSOR_MAGNET
            case Tid.TID_SENSOR_SLIDER:
                return TID_SENSOR_SLIDER
            case Tid.TID_SENSOR_ROTARY:
                return TID_SENSOR_ROTARY
            case Tid.TID_SENSOR_CAR_WALL:
                return TID_SENSOR_CAR_WALL
            case Tid.TID_SENSOR_LINE:
                return TID_SENSOR_LINE

            case Tid.TID_FILTER_PIN_0:
                return TID_FILTER_PIN_0
            case Tid.TID_FILTER_PIN_1:
                return TID_FILTER_PIN_1
            case Tid.TID_FILTER_PIN_2:
                return TID_FILTER_PIN_2
            case Tid.TID_FILTER_BUTTON_A:
                return TID_FILTER_BUTTON_A
            case Tid.TID_FILTER_BUTTON_B:
                return TID_FILTER_BUTTON_B
            case Tid.TID_FILTER_KITA_KEY_1:
                return TID_FILTER_KITA_KEY_1
            case Tid.TID_FILTER_KITA_KEY_2:
                return TID_FILTER_KITA_KEY_2
            case Tid.TID_FILTER_LOGO:
                return TID_FILTER_LOGO
            case Tid.TID_FILTER_COIN_1:
                return TID_FILTER_COIN_1
            case Tid.TID_FILTER_COIN_2:
                return TID_FILTER_COIN_2
            case Tid.TID_FILTER_COIN_3:
                return TID_FILTER_COIN_3
            case Tid.TID_FILTER_COIN_4:
                return TID_FILTER_COIN_4
            case Tid.TID_FILTER_COIN_5:
                return TID_FILTER_COIN_5
            case Tid.TID_FILTER_TIMESPAN_SHORT:
                return TID_FILTER_TIMESPAN_SHORT
            case Tid.TID_FILTER_TIMESPAN_LONG:
                return TID_FILTER_TIMESPAN_LONG
            case Tid.TID_FILTER_LOUD:
                return TID_FILTER_LOUD
            case Tid.TID_FILTER_QUIET:
                return TID_FILTER_QUIET
            case Tid.TID_FILTER_ACCEL:
                return TID_FILTER_ACCEL
            case Tid.TID_FILTER_ACCEL_SHAKE:
                return TID_FILTER_ACCEL_SHAKE
            case Tid.TID_FILTER_ACCEL_TILT_UP:
                return TID_FILTER_ACCEL_TILT_UP
            case Tid.TID_FILTER_ACCEL_TILT_DOWN:
                return TID_FILTER_ACCEL_TILT_DOWN
            case Tid.TID_FILTER_ACCEL_TILT_LEFT:
                return TID_FILTER_ACCEL_TILT_LEFT
            case Tid.TID_FILTER_ACCEL_FACE_DOWN:
                return TID_FILTER_ACCEL_FACE_DOWN
            case Tid.TID_FILTER_ACCEL_FACE_UP:
                return TID_FILTER_ACCEL_FACE_UP
            case Tid.TID_FILTER_ACCEL_TILT_RIGHT:
                return TID_FILTER_ACCEL_TILT_RIGHT
            case Tid.TID_FILTER_TIMESPAN_RANDOM:
                return TID_FILTER_TIMESPAN_RANDOM
            case Tid.TID_FILTER_TIMESPAN_VERY_LONG:
                return TID_FILTER_TIMESPAN_VERY_LONG
            case Tid.TID_FILTER_CUP_X_READ:
                return TID_FILTER_CUP_X_READ
            case Tid.TID_FILTER_CUP_Y_READ:
                return TID_FILTER_CUP_Y_READ
            case Tid.TID_FILTER_CUP_Z_READ:
                return TID_FILTER_CUP_Z_READ
            case Tid.TID_FILTER_ROTARY_LEFT:
                return TID_FILTER_ROTARY_LEFT
            case Tid.TID_FILTER_ROTARY_RIGHT:
                return TID_FILTER_ROTARY_RIGHT
            case Tid.TID_FILTER_TEMP_WARMER:
                return TID_FILTER_TEMP_WARMER
            case Tid.TID_FILTER_TEMP_COLDER:
                return TID_FILTER_TEMP_COLDER
            case Tid.TID_FILTER_LINE_LEFT:
                return TID_FILTER_LINE_LEFT
            case Tid.TID_FILTER_LINE_RIGHT:
                return TID_FILTER_LINE_RIGHT
            case Tid.TID_FILTER_LINE_BOTH:
                return TID_FILTER_LINE_BOTH
            case Tid.TID_FILTER_LINE_NEITHER:
                return TID_FILTER_LINE_NEITHER
            case Tid.TID_FILTER_LINE_NEITHER_LEFT:
                return TID_FILTER_LINE_NEITHER_LEFT
            case Tid.TID_FILTER_LINE_NEITHER_RIGHT:
                return TID_FILTER_LINE_NEITHER_RIGHT

            case Tid.TID_ACTUATOR_SWITCH_PAGE:
                return TID_ACTUATOR_SWITCH_PAGE
            case Tid.TID_ACTUATOR_SPEAKER:
                return TID_ACTUATOR_SPEAKER
            case Tid.TID_ACTUATOR_MUSIC:
                return TID_ACTUATOR_MUSIC
            case Tid.TID_ACTUATOR_PAINT:
                return TID_ACTUATOR_PAINT
            case Tid.TID_ACTUATOR_RADIO_SEND:
                return TID_ACTUATOR_RADIO_SEND
            case Tid.TID_ACTUATOR_RADIO_SET_GROUP:
                return TID_ACTUATOR_RADIO_SET_GROUP
            case Tid.TID_ACTUATOR_RGB_LED:
                return TID_ACTUATOR_RGB_LED
            case Tid.TID_ACTUATOR_CUP_X_ASSIGN:
                return TID_ACTUATOR_CUP_X_ASSIGN
            case Tid.TID_ACTUATOR_CUP_Y_ASSIGN:
                return TID_ACTUATOR_CUP_Y_ASSIGN
            case Tid.TID_ACTUATOR_CUP_Z_ASSIGN:
                return TID_ACTUATOR_CUP_Z_ASSIGN
            case Tid.TID_ACTUATOR_SHOW_NUMBER:
                return TID_ACTUATOR_SHOW_NUMBER

            case Tid.TID_MODIFIER_PAGE_1:
                return TID_MODIFIER_PAGE_1
            case Tid.TID_MODIFIER_PAGE_2:
                return TID_MODIFIER_PAGE_2
            case Tid.TID_MODIFIER_PAGE_3:
                return TID_MODIFIER_PAGE_3
            case Tid.TID_MODIFIER_PAGE_4:
                return TID_MODIFIER_PAGE_4
            case Tid.TID_MODIFIER_PAGE_5:
                return TID_MODIFIER_PAGE_5

            case Tid.TID_MODIFIER_COIN_1:
                return TID_MODIFIER_COIN_1
            case Tid.TID_MODIFIER_COIN_2:
                return TID_MODIFIER_COIN_2
            case Tid.TID_MODIFIER_COIN_3:
                return TID_MODIFIER_COIN_3
            case Tid.TID_MODIFIER_COIN_4:
                return TID_MODIFIER_COIN_4
            case Tid.TID_MODIFIER_COIN_5:
                return TID_MODIFIER_COIN_5

            case Tid.TID_MODIFIER_ICON_EDITOR:
                return TID_MODIFIER_ICON_EDITOR

            case Tid.TID_MODIFIER_COLOR_RED:
                return TID_MODIFIER_COLOR_RED
            case Tid.TID_MODIFIER_COLOR_DARKPURPLE:
                return TID_MODIFIER_COLOR_DARKPURPLE

            case Tid.TID_MODIFIER_EMOJI_GIGGLE:
                return TID_MODIFIER_EMOJI_GIGGLE
            case Tid.TID_MODIFIER_EMOJI_HAPPY:
                return TID_MODIFIER_EMOJI_HAPPY
            case Tid.TID_MODIFIER_EMOJI_HELLO:
                return TID_MODIFIER_EMOJI_HELLO
            case Tid.TID_MODIFIER_EMOJI_MYSTERIOUS:
                return TID_MODIFIER_EMOJI_MYSTERIOUS
            case Tid.TID_MODIFIER_EMOJI_SAD:
                return TID_MODIFIER_EMOJI_SAD
            case Tid.TID_MODIFIER_EMOJI_SLIDE:
                return TID_MODIFIER_EMOJI_SLIDE
            case Tid.TID_MODIFIER_EMOJI_SOARING:
                return TID_MODIFIER_EMOJI_SOARING
            case Tid.TID_MODIFIER_EMOJI_SPRING:
                return TID_MODIFIER_EMOJI_SPRING
            case Tid.TID_MODIFIER_EMOJI_TWINKLE:
                return TID_MODIFIER_EMOJI_TWINKLE
            case Tid.TID_MODIFIER_EMOJI_YAWN:
                return TID_MODIFIER_EMOJI_YAWN

            case Tid.TID_MODIFIER_CUP_X_READ:
                return TID_MODIFIER_CUP_X_READ
            case Tid.TID_MODIFIER_CUP_Y_READ:
                return TID_MODIFIER_CUP_Y_READ
            case Tid.TID_MODIFIER_CUP_Z_READ:
                return TID_MODIFIER_CUP_Z_READ

            case Tid.TID_MODIFIER_RADIO_VALUE:
                return TID_MODIFIER_RADIO_VALUE
            case Tid.TID_MODIFIER_RANDOM_TOSS:
                return TID_MODIFIER_RANDOM_TOSS

            case Tid.TID_MODIFIER_LOOP:
                return TID_MODIFIER_LOOP

            case Tid.TID_MODIFIER_MELODY_EDITOR:
                return TID_MODIFIER_MELODY_EDITOR

            case Tid.TID_MODIFIER_TEMP_READ:
                return TID_MODIFIER_TEMP_READ

            case Tid.TID_MODIFIER_RGB_LED_COLOR_X:
                return TID_MODIFIER_RGB_LED_COLOR_X
            case Tid.TID_MODIFIER_RGB_LED_COLOR_1:
                return TID_MODIFIER_RGB_LED_COLOR_1
            case Tid.TID_MODIFIER_RGB_LED_COLOR_2:
                return TID_MODIFIER_RGB_LED_COLOR_2
            case Tid.TID_MODIFIER_RGB_LED_COLOR_3:
                return TID_MODIFIER_RGB_LED_COLOR_3
            case Tid.TID_MODIFIER_RGB_LED_COLOR_4:
                return TID_MODIFIER_RGB_LED_COLOR_4
            case Tid.TID_MODIFIER_RGB_LED_COLOR_5:
                return TID_MODIFIER_RGB_LED_COLOR_5
            case Tid.TID_MODIFIER_RGB_LED_COLOR_6:
                return TID_MODIFIER_RGB_LED_COLOR_6

            case Tid.TID_MODIFIER_RGB_LED_COLOR_RAINBOW:
                return TID_MODIFIER_RGB_LED_COLOR_RAINBOW
            case Tid.TID_MODIFIER_RGB_LED_COLOR_SPARKLE:
                return TID_MODIFIER_RGB_LED_COLOR_SPARKLE

            case Tid.TID_ACTUATOR_SERVO_SET_ANGLE:
                return TID_ACTUATOR_SERVO_SET_ANGLE

            case Tid.TID_ACTUATOR_CAR:
                return TID_ACTUATOR_CAR
            case Tid.TID_MODIFIER_CAR_FORWARD:
                return TID_MODIFIER_CAR_FORWARD
            case Tid.TID_MODIFIER_CAR_REVERSE:
                return TID_MODIFIER_CAR_REVERSE
            case Tid.TID_MODIFIER_CAR_TURN_LEFT:
                return TID_MODIFIER_CAR_TURN_LEFT
            case Tid.TID_MODIFIER_CAR_TURN_RIGHT:
                return TID_MODIFIER_CAR_TURN_RIGHT
            case Tid.TID_MODIFIER_CAR_STOP:
                return TID_MODIFIER_CAR_STOP
            case Tid.TID_MODIFIER_CAR_FORWARD_FAST:
                return TID_MODIFIER_CAR_FORWARD_FAST
            case Tid.TID_MODIFIER_CAR_SPIN_LEFT:
                return TID_MODIFIER_CAR_SPIN_LEFT
            case Tid.TID_MODIFIER_CAR_SPIN_RIGHT:
                return TID_MODIFIER_CAR_SPIN_RIGHT
            case Tid.TID_MODIFIER_CAR_LED_COLOR_1:
                return TID_MODIFIER_CAR_LED_COLOR_1
            case Tid.TID_MODIFIER_CAR_LED_COLOR_2:
                return TID_MODIFIER_CAR_LED_COLOR_2
            case Tid.TID_MODIFIER_CAR_LED_COLOR_3:
                return TID_MODIFIER_CAR_LED_COLOR_3
            case Tid.TID_MODIFIER_CAR_LED_COLOR_4:
                return TID_MODIFIER_CAR_LED_COLOR_4
            case Tid.TID_MODIFIER_CAR_ARM_OPEN:
                return TID_MODIFIER_CAR_ARM_OPEN
            case Tid.TID_MODIFIER_CAR_ARM_CLOSE:
                return TID_MODIFIER_CAR_ARM_CLOSE
            default:
                assert(false, "unknown tid: " + e)
                return undefined
        }
    }

    export function isSensor(tid: Tid) {
        return tid >= Tid.SENSOR_START && tid <= Tid.SENSOR_END
    }

    export function isFilter(tid: Tid) {
        return tid >= Tid.FILTER_START && tid <= Tid.FILTER_END
    }

    export function isActuator(tid: Tid) {
        return tid >= Tid.ACTUATOR_START && tid <= Tid.ACTUATOR_END
    }

    export function isModifier(tid: Tid) {
        return tid >= Tid.MODIFIER_START && tid <= Tid.MODIFER_END
    }

    function isPressReleaseEvent(tidEnum: Tid) {
        return (
            Tid.PRESS_RELEASE_START <= tidEnum &&
            tidEnum <= Tid.PRESS_RELEASE_END
        )
    }

    function isAccelerometerEvent(tidEnum: Tid) {
        return (
            Tid.ACCELEROMETER_START <= tidEnum &&
            tidEnum <= Tid.ACCELEROMETER_END ||
            Tid.ACCELEROMETER_START2 <= tidEnum &&
            tidEnum <= Tid.ACCELEROMETER_END2
        )
    }

    function isLineEvent(tidEnum: Tid) {
        return Tid.LINE_START <= tidEnum && tidEnum <= Tid.LINE_END
    }

    function isFilterConstant(tidEnum: Tid) {
        return (
            Tid.TID_FILTER_COIN_1 <= tidEnum && tidEnum <= Tid.TID_FILTER_COIN_5
        )
    }

    function isFilterVariable(tidEnum: Tid) {
        return (
            Tid.TID_FILTER_CUP_X_READ <= tidEnum &&
            tidEnum <= Tid.TID_FILTER_CUP_Z_READ
        )
    }

    function isModifierConstant(tidEnum: Tid) {
        return (
            Tid.TID_MODIFIER_COIN_1 <= tidEnum &&
            tidEnum <= Tid.TID_MODIFIER_COIN_5
        )
    }

    function isModifierVariable(tidEnum: Tid) {
        return (
            Tid.TID_MODIFIER_CUP_X_READ <= tidEnum &&
            tidEnum <= Tid.TID_MODIFIER_CUP_Z_READ
        )
    }

    function isTimespan(tidEnum: Tid) {
        return (
            Tid.TID_FILTER_TIMESPAN_SHORT <= tidEnum &&
            tidEnum <= Tid.TID_FILTER_TIMESPAN_VERY_LONG
        )
    }

    function isEmoji(tidEnum: Tid) {
        return Tid.EMOJI_BEGIN <= tidEnum && tidEnum <= Tid.EMOJI_END
    }

    function isPage(tidEnum: Tid) {
        return (
            Tid.TID_MODIFIER_PAGE_1 <= tidEnum &&
            tidEnum <= Tid.TID_MODIFIER_PAGE_5
        )
    }

    function isLedColor(tidEnum: Tid) {
        return (
            Tid.TID_MODIFIER_RGB_LED_COLOR_1 <= tidEnum &&
            tidEnum <= Tid.TID_MODIFIER_RGB_LED_COLOR_6
        )
    }
    function isLedModifier(tidEnum: Tid) {
        return (
            isLedColor(tidEnum) ||
            tidEnum == Tid.TID_MODIFIER_RGB_LED_COLOR_RAINBOW ||
            tidEnum == Tid.TID_MODIFIER_RGB_LED_COLOR_SPARKLE
        )
    }

    function isCarModifier(tidEnum: Tid) {
        return (
            Tid.CAR_MODIFIER_BEGIN <= tidEnum && tidEnum <= Tid.CAR_MODIFIER_END
        )
    }

    export function isTerminal(tile: Tile) {
        const tid = getTid(tile)
        // the following sensors and actuators are terminal
        if (
            tid == Tid.TID_SENSOR_CAR_WALL ||
            tid == Tid.TID_SENSOR_SLIDER ||
            tid == Tid.TID_ACTUATOR_SWITCH_PAGE ||
            tid == Tid.TID_SENSOR_LIGHT ||
            tid == Tid.TID_SENSOR_LED_LIGHT ||
            tid == Tid.TID_SENSOR_MICROPHONE ||
            tid == Tid.TID_SENSOR_MAGNET
        )
            return true
        // everything else except some filters is not terminal
        if (!isFilter(tid)) return false
        // the following filters are not terminal
        if (isFilterConstant(tid) || isTimespan(tid) || isFilterVariable(tid))
            return false
        // all other filters are terminal
        return true
    }

    export function isVisible(tile: Tile) {
        const tid = getTid(tile)
        // these tids are dead
        if (tid == Tid.TID_ACTUATOR_MICROPHONE || tid == Tid.TID_FILTER_ACCEL)
            return false
        const ext = jdExternalClass(tile)
        if (ext && !jacs.debugOut) {
            const count = 0 // jdc.numServiceInstances(ext)
            // special case for buttons, which already exist on micro:bit (6 of them)
            // we also have light sensor on board micro:bit (1 of them), as well as in Kit A
            return ext == jacs.ServiceClass.Button
                ? count > 6
                : ext == jacs.ServiceClass.LightLevel
                ? count > 1
                : count > 0
        }
        return true
    }

    export function defaultModifier(tid: Tid): Tile {
        switch (tid) {
            case Tid.TID_ACTUATOR_SPEAKER:
                return Tid.TID_MODIFIER_EMOJI_GIGGLE
            case Tid.TID_ACTUATOR_CAR:
                return Tid.TID_MODIFIER_CAR_STOP
            case Tid.TID_ACTUATOR_RGB_LED:
                return Tid.TID_MODIFIER_RGB_LED_COLOR_RAINBOW
            case Tid.TID_ACTUATOR_PAINT: {
                return getEditor(Tid.TID_MODIFIER_ICON_EDITOR)
            }
            case Tid.TID_ACTUATOR_MUSIC: {
                return getEditor(Tid.TID_MODIFIER_MELODY_EDITOR)
            }
            default:
                return undefined
        }
    }

    export function buttonStyle(tile: Tile): ButtonStyle {
        return getFieldEditor(tile)
            ? ButtonStyles.Transparent
            : ButtonStyles.FlatWhite
    }

    export function priority(tile: Tile): number {
        const tid = getTid(tile)
        if (isFilter(tid)) {
            if (isFilterConstant(tid) || isPressReleaseEvent(tid))
                return jdParam(tid)
            if (isLineEvent(tid)) {
                if (tid == Tid.TID_FILTER_LINE_BOTH) return 101
                else return tid
            }
            switch (tid) {
                case Tid.TID_FILTER_TIMESPAN_SHORT:
                    return 10
                case Tid.TID_FILTER_TIMESPAN_LONG:
                    return 20
                case Tid.TID_FILTER_TIMESPAN_VERY_LONG:
                    return 30
                case Tid.TID_FILTER_TIMESPAN_RANDOM:
                    return 40
            }
            return tid
        } else if (isModifier(tid)) {
            if (tid == Tid.TID_MODIFIER_LOOP)
                // loop always at end
                return 1000
            return tid
        }
        switch (tid) {
            // sensors
            case Tid.TID_SENSOR_PRESS:
                return 9
            case Tid.TID_SENSOR_RELEASE:
                return 10
            case Tid.TID_SENSOR_ACCELEROMETER:
                return 20
            case Tid.TID_SENSOR_MICROPHONE:
                return 30
            case Tid.TID_SENSOR_TEMP:
                return 40
            case Tid.TID_SENSOR_LED_LIGHT:
                return 50
            case Tid.TID_SENSOR_RADIO_RECEIVE:
                return 100
            case Tid.TID_SENSOR_TIMER:
                return 110
            case Tid.TID_SENSOR_START_PAGE:
                return 108
            case Tid.TID_SENSOR_CUP_X_WRITTEN:
                return 200
            case Tid.TID_SENSOR_CUP_Y_WRITTEN:
                return 201
            case Tid.TID_SENSOR_CUP_Z_WRITTEN:
                return 202
            // Robot car
            case Tid.TID_SENSOR_CAR_WALL:
                return 300
            case Tid.TID_SENSOR_LINE:
                return 301
            // Jacdac
            case Tid.TID_SENSOR_SLIDER:
                return 500
            case Tid.TID_SENSOR_ROTARY:
                return 501
            case Tid.TID_SENSOR_LIGHT:
                return 502
            case Tid.TID_SENSOR_ROTARY:
                return 503

            case Tid.TID_ACTUATOR_PAINT:
                return 10
            case Tid.TID_ACTUATOR_SHOW_NUMBER:
                return 15
            case Tid.TID_ACTUATOR_SPEAKER:
                return 20
            case Tid.TID_ACTUATOR_MUSIC:
                return 22
            case Tid.TID_ACTUATOR_RADIO_SEND:
                return 100
            case Tid.TID_ACTUATOR_RADIO_SET_GROUP:
                return 105
            case Tid.TID_ACTUATOR_SWITCH_PAGE:
                return 110
            case Tid.TID_ACTUATOR_CUP_X_ASSIGN:
                return 200
            case Tid.TID_ACTUATOR_CUP_Y_ASSIGN:
                return 201
            case Tid.TID_ACTUATOR_CUP_Z_ASSIGN:
                return 202
            // car
            case Tid.TID_ACTUATOR_CAR:
                return 500
            // jacdac
            case Tid.TID_ACTUATOR_RGB_LED:
                return 600
            case Tid.TID_ACTUATOR_SERVO_SET_ANGLE:
                return 601
        }
        return 1000
    }

    const only5 = [
        Tid.TID_FILTER_COIN_1,
        Tid.TID_FILTER_COIN_2,
        Tid.TID_FILTER_COIN_3,
        Tid.TID_FILTER_COIN_4,
        Tid.TID_FILTER_COIN_5,
    ]

    export function getConstraints(tile: Tile): Constraints {
        const tid = getTid(tile)
        switch (tid) {
            case Tid.TID_SENSOR_PRESS:
            case Tid.TID_SENSOR_RELEASE:
                return { allow: ["press_event"] }
            case Tid.TID_SENSOR_START_PAGE:
                return { allow: ["timespan"] }
            case Tid.TID_SENSOR_CUP_X_WRITTEN:
                return {
                    allow: ["value_in"],
                    disallow: [Tid.TID_FILTER_CUP_X_READ],
                }
            case Tid.TID_SENSOR_CUP_Y_WRITTEN:
                return {
                    allow: ["value_in"],
                    disallow: [Tid.TID_FILTER_CUP_Y_READ],
                }
            case Tid.TID_SENSOR_CUP_Z_WRITTEN:
                return {
                    allow: ["value_in"],
                    disallow: [Tid.TID_FILTER_CUP_Z_READ],
                }
            case Tid.TID_SENSOR_RADIO_RECEIVE:
                return {
                    allow: ["value_in"],
                    provides: [Tid.TID_SENSOR_RADIO_RECEIVE],
                }
            case Tid.TID_SENSOR_SLIDER:
            case Tid.TID_SENSOR_CAR_WALL:
            case Tid.TID_SENSOR_MAGNET:
            case Tid.TID_SENSOR_LIGHT:
            case Tid.TID_SENSOR_LED_LIGHT:
                return { allow: only5 }
            case Tid.TID_SENSOR_MICROPHONE:
                return { allow: only5.concat([Tid.TID_FILTER_LOUD]) }
            case Tid.TID_SENSOR_TEMP:
                return { allow: ["temperature_event"] }
            case Tid.TID_SENSOR_ROTARY:
                return { allow: ["rotary_event"] }
            case Tid.TID_SENSOR_LINE:
                return { allow: ["line"] }
            case Tid.TID_SENSOR_TIMER:
                return { allow: ["timespan"] }
            case Tid.TID_SENSOR_ACCELEROMETER:
                return { allow: ["accel_event"] }
            case Tid.TID_ACTUATOR_PAINT:
                return { allow: ["icon_editor", "loop"] }
            case Tid.TID_ACTUATOR_SPEAKER:
                return { allow: ["sound_emoji", "loop"] }
            case Tid.TID_ACTUATOR_MUSIC:
                return { allow: ["melody_editor", "loop"] }
            case Tid.TID_ACTUATOR_RADIO_SEND:
            case Tid.TID_ACTUATOR_SHOW_NUMBER:
            case Tid.TID_ACTUATOR_CUP_X_ASSIGN:
            case Tid.TID_ACTUATOR_CUP_Y_ASSIGN:
            case Tid.TID_ACTUATOR_CUP_Z_ASSIGN:
                return { allow: ["value_out", "constant"] }
            case Tid.TID_ACTUATOR_RGB_LED:
                return { allow: ["rgb_led", "loop"] }
            case Tid.TID_ACTUATOR_SERVO_SET_ANGLE:
            case Tid.TID_ACTUATOR_RADIO_SET_GROUP:
            case Tid.TID_MODIFIER_LOOP:
                return { only: ["constant"] } // ahy only and not allow?
            case Tid.TID_ACTUATOR_SWITCH_PAGE:
                return { allow: ["page"] }
            case Tid.TID_ACTUATOR_CAR:
                return { allow: ["car"] }
            case Tid.TID_MODIFIER_RADIO_VALUE:
                return { requires: [Tid.TID_SENSOR_RADIO_RECEIVE] }
            case Tid.TID_MODIFIER_RANDOM_TOSS:
                return { allow: ["constant"], disallow: ["value_out"] }
        }
        return undefined
    }

    export function getCategory(tile: Tile): string {
        const tid = getTid(tile)
        if (isPressReleaseEvent(tid)) return "press_event"
        if (isLineEvent(tid)) return "line"
        if (isTimespan(tid)) return "timespan"
        if (isAccelerometerEvent(tid)) return "accel_event"
        if (isEmoji(tid)) return "sound_emoji"
        if (isFilterConstant(tid) || isFilterVariable(tid)) return "value_in"
        if (isModifierConstant(tid)) return "constant"
        if (isModifierVariable(tid)) return "value_out"
        if (isPage(tid)) return "page"
        if (isCarModifier(tid)) return "car"
        if (isLedModifier(tid)) return "rgb_led"
        switch (tid) {
            case Tid.TID_FILTER_ROTARY_LEFT:
            case Tid.TID_FILTER_ROTARY_RIGHT:
                return "rotary_event"
            case Tid.TID_FILTER_TEMP_WARMER:
            case Tid.TID_FILTER_TEMP_COLDER:
                return "temperature_event"
            case Tid.TID_FILTER_LOUD:
            case Tid.TID_FILTER_QUIET: // dead
                return "sound_event"
            case Tid.TID_MODIFIER_LOOP:
                return "loop"
            case Tid.TID_MODIFIER_ICON_EDITOR:
                return "icon_editor"
            case Tid.TID_MODIFIER_MELODY_EDITOR:
                return "melody_editor"
            case Tid.TID_MODIFIER_RANDOM_TOSS:
            case Tid.TID_MODIFIER_TEMP_READ:
            case Tid.TID_MODIFIER_RADIO_VALUE:
                return "value_out"
        }
        return undefined
    }

    // following functions are needed to compile to JacScript

    // let P be jdParam
    export enum JdKind {
        Literal = 1, // value is P
        Variable, // value is variables[P]
        Page, // value is page[P]
        EventCode,
        ServiceInstanceIndex,
        ServiceCommandArg, // argument of command sent will be set to P; P2 is duration in ms for Sequance
        ExtLibFn, // call external function P(P2)
        Timespan,
        RadioValue,
        Rotary,
        Temperature,

        Loop, // repeat modifier

        // Filter/actuator kinds
        Radio, // radio send/recv
        RandomToss, // random number
        NumFmt, // on actuator - P is numfmt

        // for each modifier (defaults to [defaultModifier]), do ...
        // P is a shortcut external function
        // P2 is service arg size
        Sequence,
    }

    export function jdKind(tile: Tile): JdKind {
        const tid = getTid(tile)
        if (isPressReleaseEvent(tid)) return JdKind.ServiceInstanceIndex
        if (
            isLineEvent(tid) ||
            isFilterConstant(tid) ||
            isModifierConstant(tid)
        )
            return JdKind.Literal
        if (isTimespan(tid)) return JdKind.Timespan
        if (
            isEmoji(tid) ||
            tid == Tid.TID_MODIFIER_ICON_EDITOR ||
            tid == Tid.TID_MODIFIER_MELODY_EDITOR
        )
            return JdKind.ServiceCommandArg
        if (isPage(tid)) return JdKind.Page
        if (isLedModifier(tid)) return JdKind.ExtLibFn
        if (isCarModifier(tid)) return JdKind.NumFmt
        switch (tid) {
            case Tid.TID_MODIFIER_LOOP:
                return JdKind.Loop
            case Tid.TID_SENSOR_RADIO_RECEIVE:
            case Tid.TID_SENSOR_CAR_WALL:
            case Tid.TID_SENSOR_LINE:
                return JdKind.Radio
            case Tid.TID_MODIFIER_RADIO_VALUE:
                return JdKind.RadioValue
            case Tid.TID_SENSOR_TEMP:
            case Tid.TID_MODIFIER_TEMP_READ:
                return JdKind.Temperature
            case Tid.TID_MODIFIER_RANDOM_TOSS:
                return JdKind.RandomToss
            case Tid.TID_SENSOR_ROTARY:
                return JdKind.Rotary
            case Tid.TID_FILTER_ROTARY_LEFT:
            case Tid.TID_FILTER_ROTARY_RIGHT:
            case Tid.TID_FILTER_TEMP_WARMER:
            case Tid.TID_FILTER_TEMP_COLDER:
            case Tid.TID_FILTER_ACCEL_SHAKE:
            case Tid.TID_FILTER_ACCEL_TILT_UP:
            case Tid.TID_FILTER_ACCEL_TILT_DOWN:
            case Tid.TID_FILTER_ACCEL_TILT_LEFT:
            case Tid.TID_FILTER_ACCEL_TILT_RIGHT:
            case Tid.TID_FILTER_ACCEL_FACE_DOWN:
            case Tid.TID_FILTER_ACCEL_FACE_UP:
            case Tid.TID_FILTER_LOUD:
            case Tid.TID_FILTER_QUIET:
                return JdKind.EventCode
            case Tid.TID_ACTUATOR_PAINT:
            case Tid.TID_ACTUATOR_SPEAKER:
            case Tid.TID_ACTUATOR_MUSIC:
            case Tid.TID_ACTUATOR_RGB_LED:
            case Tid.TID_ACTUATOR_CAR:
                return JdKind.Sequence
            case Tid.TID_ACTUATOR_SHOW_NUMBER:
                return JdKind.ExtLibFn
            case Tid.TID_ACTUATOR_RADIO_SEND:
            case Tid.TID_ACTUATOR_RADIO_SET_GROUP:
            case Tid.TID_ACTUATOR_SERVO_SET_ANGLE:
                return JdKind.NumFmt
            case Tid.TID_SENSOR_CUP_X_WRITTEN:
            case Tid.TID_SENSOR_CUP_Y_WRITTEN:
            case Tid.TID_SENSOR_CUP_Z_WRITTEN:
            case Tid.TID_ACTUATOR_CUP_X_ASSIGN:
            case Tid.TID_ACTUATOR_CUP_Y_ASSIGN:
            case Tid.TID_ACTUATOR_CUP_Z_ASSIGN:
            case Tid.TID_FILTER_CUP_X_READ:
            case Tid.TID_FILTER_CUP_Y_READ:
            case Tid.TID_FILTER_CUP_Z_READ:
            case Tid.TID_MODIFIER_CUP_X_READ:
            case Tid.TID_MODIFIER_CUP_Y_READ:
            case Tid.TID_MODIFIER_CUP_Z_READ:
                return JdKind.Variable
        }
        return undefined
    }

    export function jdParam(tile: Tile): any {
        const tid = getTid(tile)
        if (isModifierConstant(tid)) return tid - Tid.TID_MODIFIER_COIN_1 + 1
        if (isFilterConstant(tid)) return tid - Tid.TID_FILTER_COIN_1 + 1
        if (isPage(tid)) return tid - Tid.TID_MODIFIER_PAGE_1 + 1
        if (isLedColor(tid)) return "led_solid"
        if (isCarModifier(tid)) return jacs.NumFmt.F64
        switch (tid) {
            case Tid.TID_FILTER_BUTTON_A:
                return 0
            case Tid.TID_FILTER_BUTTON_B:
                return 1
            case Tid.TID_FILTER_LOGO:
                return 2
            case Tid.TID_FILTER_PIN_0:
                return 3
            case Tid.TID_FILTER_PIN_1:
                return 4
            case Tid.TID_FILTER_PIN_2:
                return 5
            case Tid.TID_FILTER_KITA_KEY_1:
                return 6
            case Tid.TID_FILTER_KITA_KEY_2:
                return 7
            //
            case Tid.TID_SENSOR_CUP_X_WRITTEN:
            case Tid.TID_ACTUATOR_CUP_X_ASSIGN:
            case Tid.TID_FILTER_CUP_X_READ:
            case Tid.TID_MODIFIER_CUP_X_READ:
                return 0
            case Tid.TID_SENSOR_CUP_Y_WRITTEN:
            case Tid.TID_ACTUATOR_CUP_Y_ASSIGN:
            case Tid.TID_FILTER_CUP_Y_READ:
            case Tid.TID_MODIFIER_CUP_Y_READ:
                return 1
            case Tid.TID_SENSOR_CUP_Z_WRITTEN:
            case Tid.TID_ACTUATOR_CUP_Z_ASSIGN:
            case Tid.TID_FILTER_CUP_Z_READ:
            case Tid.TID_MODIFIER_CUP_Z_READ:
                return 2
            //
            case Tid.TID_FILTER_ROTARY_LEFT:
            case Tid.TID_FILTER_TEMP_WARMER:
            case Tid.TID_FILTER_LOUD:
                return 1
            //
            case Tid.TID_FILTER_ROTARY_RIGHT:
            case Tid.TID_FILTER_TEMP_COLDER:
            case Tid.TID_FILTER_QUIET:
                return 2
            //
            case Tid.TID_FILTER_LINE_BOTH:
                return robot.robots.RobotCompactCommand.LineBoth
            case Tid.TID_FILTER_LINE_LEFT:
                return robot.robots.RobotCompactCommand.LineLeft
            case Tid.TID_FILTER_LINE_RIGHT:
                return robot.robots.RobotCompactCommand.LineRight
            case Tid.TID_FILTER_LINE_NEITHER:
                return robot.robots.RobotCompactCommand.LineNone
            case Tid.TID_FILTER_LINE_NEITHER_LEFT:
                return robot.robots.RobotCompactCommand.LineLostLeft
            case Tid.TID_FILTER_LINE_NEITHER_RIGHT:
                return robot.robots.RobotCompactCommand.LineLostRight
            //
            case Tid.TID_FILTER_TIMESPAN_SHORT:
                return 250
            case Tid.TID_FILTER_TIMESPAN_LONG:
                return 1000
            case Tid.TID_FILTER_TIMESPAN_VERY_LONG:
                return 5000
            case Tid.TID_FILTER_TIMESPAN_RANDOM:
                return -1000
            //
            case Tid.TID_FILTER_ACCEL_SHAKE:
                return 0x8b
            case Tid.TID_FILTER_ACCEL_TILT_UP:
                return 0x81
            case Tid.TID_FILTER_ACCEL_TILT_DOWN:
                return 0x82
            case Tid.TID_FILTER_ACCEL_TILT_LEFT:
                return 0x83
            case Tid.TID_FILTER_ACCEL_TILT_RIGHT:
                return 0x84
            case Tid.TID_FILTER_ACCEL_FACE_UP:
                return 0x85
            case Tid.TID_FILTER_ACCEL_FACE_DOWN:
                return 0x86
            //
            case Tid.TID_ACTUATOR_PAINT:
                return "dot_animation"
            case Tid.TID_ACTUATOR_SHOW_NUMBER:
                return "dot_showNumber"
            case Tid.TID_ACTUATOR_MUSIC:
                return "note_sequence"
            //
            case Tid.TID_ACTUATOR_RADIO_SEND:
                return jacs.NumFmt.F64
            case Tid.TID_ACTUATOR_RADIO_SET_GROUP:
                return jacs.NumFmt.U8
            //
            case Tid.TID_MODIFIER_EMOJI_GIGGLE:
                return "giggle"
            case Tid.TID_MODIFIER_EMOJI_HAPPY:
                return "happy"
            case Tid.TID_MODIFIER_EMOJI_HELLO:
                return "hello"
            case Tid.TID_MODIFIER_EMOJI_MYSTERIOUS:
                return "mysterious"
            case Tid.TID_MODIFIER_EMOJI_SAD:
                return "sad"
            case Tid.TID_MODIFIER_EMOJI_SLIDE:
                return "slide"
            case Tid.TID_MODIFIER_EMOJI_SOARING:
                return "soaring"
            case Tid.TID_MODIFIER_EMOJI_SPRING:
                return "spring"
            case Tid.TID_MODIFIER_EMOJI_TWINKLE:
                return "twinkle"
            case Tid.TID_MODIFIER_EMOJI_YAWN:
                return "yawn"
            //
            case Tid.TID_ACTUATOR_SERVO_SET_ANGLE:
                return jacs.NumFmt.I32
            //
            case Tid.TID_MODIFIER_RGB_LED_COLOR_SPARKLE:
                return "led_anim_sparkle"
            case Tid.TID_MODIFIER_RGB_LED_COLOR_RAINBOW:
                return "led_anim_rainbow"
        }
        return undefined
    }

    export function jdParam2(tile: Tile): number {
        const tid = getTid(tile)
        switch (tid) {
            // length of the melody (milliseconds)
            case Tid.TID_MODIFIER_EMOJI_GIGGLE:
                return 1478
            case Tid.TID_MODIFIER_EMOJI_HAPPY:
                return 1233
            case Tid.TID_MODIFIER_EMOJI_HELLO:
                return 547
            case Tid.TID_MODIFIER_EMOJI_MYSTERIOUS:
                return 4794
            case Tid.TID_MODIFIER_EMOJI_SAD:
                return 1687
            case Tid.TID_MODIFIER_EMOJI_SLIDE:
                return 1315
            case Tid.TID_MODIFIER_EMOJI_SOARING:
                return 8192
            case Tid.TID_MODIFIER_EMOJI_SPRING:
                return 2083
            case Tid.TID_MODIFIER_EMOJI_TWINKLE:
                return 6772
            case Tid.TID_MODIFIER_EMOJI_YAWN:
                return 2816
            case Tid.TID_ACTUATOR_PAINT:
                return 5
            case Tid.TID_ACTUATOR_MUSIC:
                return 6

            case Tid.TID_MODIFIER_CAR_FORWARD:
                return robot.robots.RobotCompactCommand.MotorRunForward
            case Tid.TID_MODIFIER_CAR_REVERSE:
                return robot.robots.RobotCompactCommand.MotorRunBackward
            case Tid.TID_MODIFIER_CAR_TURN_LEFT:
                return robot.robots.RobotCompactCommand.MotorTurnLeft
            case Tid.TID_MODIFIER_CAR_TURN_RIGHT:
                return robot.robots.RobotCompactCommand.MotorTurnRight
            case Tid.TID_MODIFIER_CAR_STOP:
                return robot.robots.RobotCompactCommand.MotorStop
            case Tid.TID_MODIFIER_CAR_FORWARD_FAST:
                return robot.robots.RobotCompactCommand.MotorRunForwardFast
            case Tid.TID_MODIFIER_CAR_SPIN_LEFT:
                return robot.robots.RobotCompactCommand.MotorSpinLeft
            case Tid.TID_MODIFIER_CAR_SPIN_RIGHT:
                return robot.robots.RobotCompactCommand.MotorSpinRight
            case Tid.TID_MODIFIER_CAR_LED_COLOR_1:
                return robot.robots.RobotCompactCommand.LEDRed
            case Tid.TID_MODIFIER_CAR_LED_COLOR_2:
                return robot.robots.RobotCompactCommand.LEDGreen
            case Tid.TID_MODIFIER_CAR_LED_COLOR_3:
                return robot.robots.RobotCompactCommand.LEDBlue
            case Tid.TID_MODIFIER_CAR_LED_COLOR_4:
                return robot.robots.RobotCompactCommand.LEDOff
            case Tid.TID_MODIFIER_CAR_ARM_OPEN:
                return robot.robots.RobotCompactCommand.ArmOpen
            case Tid.TID_MODIFIER_CAR_ARM_CLOSE:
                return robot.robots.RobotCompactCommand.ArmClose

            case Tid.TID_MODIFIER_RGB_LED_COLOR_1:
                return 0x2f0000
            case Tid.TID_MODIFIER_RGB_LED_COLOR_2:
                return 0x002f00
            case Tid.TID_MODIFIER_RGB_LED_COLOR_3:
                return 0x00002f
            case Tid.TID_MODIFIER_RGB_LED_COLOR_4:
                return 0x2f002f
            case Tid.TID_MODIFIER_RGB_LED_COLOR_5:
                return 0x2f2f00
            case Tid.TID_MODIFIER_RGB_LED_COLOR_6:
                return 0x000000
            case Tid.TID_MODIFIER_ICON_EDITOR:
                return 400 // ms
            case Tid.TID_MODIFIER_MELODY_EDITOR:
                return 250 // ms
        }
        return undefined
    }

    // Jacdac event codes
    export function eventCode(tile: Tile) {
        const tid = getTid(tile)
        switch (tid) {
            case Tid.TID_SENSOR_TEMP:
            case Tid.TID_FILTER_QUIET:
            case Tid.TID_SENSOR_RELEASE:
                return 2
            case Tid.TID_SENSOR_LINE:
            case Tid.TID_SENSOR_CAR_WALL:
            case Tid.TID_SENSOR_RADIO_RECEIVE:
                return 0x91
            case Tid.TID_SENSOR_MICROPHONE:
            case Tid.TID_SENSOR_ROTARY:
            case Tid.TID_FILTER_LOUD:
            case Tid.TID_SENSOR_PRESS:
                return 1
            case Tid.TID_SENSOR_ACCELEROMETER:
                return 0x8b
            default:
                return undefined
        }
    }

    export function jdExternalClass(tile: Tile) {
        const tid = getTid(tile)
        switch (tid) {
            case Tid.TID_FILTER_KITA_KEY_1:
            case Tid.TID_FILTER_KITA_KEY_2:
                return jacs.ServiceClass.Button
            case Tid.TID_SENSOR_SLIDER:
                return jacs.ServiceClass.Potentiometer
            case Tid.TID_SENSOR_MAGNET:
                return jacs.ServiceClass.MagneticFieldLevel
            case Tid.TID_SENSOR_LIGHT:
                return jacs.ServiceClass.LightLevel
            case Tid.TID_SENSOR_ROTARY:
                return jacs.ServiceClass.RotaryEncoder
            case Tid.TID_ACTUATOR_RGB_LED:
                return jacs.ServiceClass.Led
            case Tid.TID_ACTUATOR_SERVO_SET_ANGLE:
                return jacs.ServiceClass.Servo
            default:
                return undefined
        }
    }

    export function serviceClassName(tile: Tile): jacs.ServiceClass {
        const tid = getTid(tile)
        switch (tid) {
            case Tid.TID_SENSOR_PRESS:
            case Tid.TID_SENSOR_RELEASE:
                return jacs.ServiceClass.Button
            case Tid.TID_SENSOR_TEMP:
                return jacs.ServiceClass.Temperature
            case Tid.TID_SENSOR_RADIO_RECEIVE:
            case Tid.TID_ACTUATOR_RADIO_SEND:
            case Tid.TID_ACTUATOR_RADIO_SET_GROUP:
            case Tid.TID_SENSOR_LINE:
            case Tid.TID_SENSOR_CAR_WALL:
            case Tid.TID_ACTUATOR_CAR:
                return jacs.ServiceClass.Radio
            case Tid.TID_SENSOR_SLIDER:
                return jacs.ServiceClass.Potentiometer
            case Tid.TID_SENSOR_MAGNET:
                return jacs.ServiceClass.MagneticFieldLevel
            case Tid.TID_SENSOR_LIGHT:
            case Tid.TID_SENSOR_LED_LIGHT:
                return jacs.ServiceClass.LightLevel
            case Tid.TID_SENSOR_ROTARY:
                return jacs.ServiceClass.RotaryEncoder
            case Tid.TID_SENSOR_ACCELEROMETER:
                return jacs.ServiceClass.Accelerometer
            case Tid.TID_SENSOR_MICROPHONE:
                return jacs.ServiceClass.SoundLevel
            case Tid.TID_ACTUATOR_PAINT:
            case Tid.TID_ACTUATOR_SHOW_NUMBER:
                return jacs.ServiceClass.DotMatrix
            case Tid.TID_ACTUATOR_SPEAKER:
                return jacs.ServiceClass.SoundPlayer
            case Tid.TID_ACTUATOR_MUSIC:
                return jacs.ServiceClass.Buzzer
            case Tid.TID_ACTUATOR_RGB_LED:
                return jacs.ServiceClass.Led
            case Tid.TID_ACTUATOR_SERVO_SET_ANGLE:
                return jacs.ServiceClass.Servo
            default:
                return undefined
        }
    }

    export function serviceCommand(tile: Tile) {
        const tid = getTid(tile)
        switch (tid) {
            case Tid.TID_ACTUATOR_PAINT:
            case Tid.TID_ACTUATOR_RGB_LED:
            case Tid.TID_ACTUATOR_SERVO_SET_ANGLE:
                return jacs.CMD_SET_REG | 0x2
            case Tid.TID_ACTUATOR_SPEAKER:
            case Tid.TID_ACTUATOR_MUSIC:
                return 0x80
            case Tid.TID_ACTUATOR_CAR:
            case Tid.TID_ACTUATOR_RADIO_SEND:
                return 0x81
            case Tid.TID_ACTUATOR_RADIO_SET_GROUP:
                return jacs.CMD_SET_REG | 0x80
            default:
                return undefined
        }
    }

    export function serviceCommandArg(tile: Tile): string | Buffer {
        if (tile instanceof ModifierEditor) return tile.serviceCommandArg()
        const ret = jdParam(tile)
        if (typeof ret == "string") return ret
        return undefined
    }

    export function serviceIndex(tile: Tile) {
        const tid = getTid(tile)
        // these are special cases where we have multiple
        // instances of the same service
        if (tid == Tid.TID_SENSOR_LIGHT) return 1
        // default index is 0
        return 0
    }
}
