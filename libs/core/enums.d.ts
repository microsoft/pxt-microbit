// Auto-generated. Do not edit.
declare namespace images {
}
declare namespace basic {
}


    declare enum Button {
    A = 1,  // MICROBIT_ID_BUTTON_A
    B = 2,  // MICROBIT_ID_BUTTON_B
    //% block="A+B"
    AB = 26,  // MICROBIT_ID_BUTTON_AB
    }


    declare enum Dimension {
    //% block=x
    X = 0,
    //% block=y
    Y = 1,
    //% block=z
    Z = 2,
    //% block=strength
    Strength = 3,
    }


    declare enum Rotation {
    //% block=pitch
    Pitch = 0,
    //% block=roll
    Roll = 1,
    }


    declare enum TouchPin {
    P0 = 7,  // MICROBIT_ID_IO_P0
    P1 = 8,  // MICROBIT_ID_IO_P1
    P2 = 9,  // MICROBIT_ID_IO_P2
    }


    declare enum AcceleratorRange {
    /**
     * The accelerator measures forces up to 1 gravity
     */
    //%  block="1g"
    OneG = 1,
    /**
     * The accelerator measures forces up to 2 gravity
     */
    //%  block="2g"
    TwoG = 2,
    /**
     * The accelerator measures forces up to 4 gravity
     */
    //% block="4g"
    FourG = 4,
    /**
     * The accelerator measures forces up to 8 gravity
     */
    //% block="8g"
    EightG = 8,
    }


    declare enum Gesture {
    /**
     * Raised when shaken
     */
    //% block=shake
    Shake = 11,  // MICROBIT_ACCELEROMETER_EVT_SHAKE
    /**
     * Raised when the logo is upward and the screen is vertical
     */
    //% block="logo up"
    LogoUp = 1,  // MICROBIT_ACCELEROMETER_EVT_TILT_UP
    /**
     * Raised when the logo is downward and the screen is vertical
     */
    //% block="logo down"
    LogoDown = 2,  // MICROBIT_ACCELEROMETER_EVT_TILT_DOWN
    /**
     * Raised when the screen is pointing down and the board is horizontal
     */
    //% block="screen up"
    ScreenUp = 5,  // MICROBIT_ACCELEROMETER_EVT_FACE_UP
    /**
     * Raised when the screen is pointing up and the board is horizontal
     */
    //% block="screen down"
    ScreenDown = 6,  // MICROBIT_ACCELEROMETER_EVT_FACE_DOWN
    /**
     * Raised when the screen is pointing left
     */
    //% block="tilt left"
    TiltLeft = 3,  // MICROBIT_ACCELEROMETER_EVT_TILT_LEFT
    /**
     * Raised when the screen is pointing right
     */
    //% block="tilt right"
    TiltRight = 4,  // MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT
    /**
     * Raised when the board is falling!
     */
    //% block="free fall"
    FreeFall = 7,  // MICROBIT_ACCELEROMETER_EVT_FREEFALL
    /**
     * Raised when a 3G shock is detected
     */
    //% block="3g"
    ThreeG = 8,  // MICROBIT_ACCELEROMETER_EVT_3G
    /**
     * Raised when a 6G shock is detected
     */
    //% block="6g"
    SixG = 9,  // MICROBIT_ACCELEROMETER_EVT_6G
    }
declare namespace input {
}


    /**
     * How to create the event.
     */

    declare enum EventCreationMode {
    /**
     * MicroBitEvent is initialised, and no further processing takes place.
     */
    CreateOnly = 0,  // CREATE_ONLY
    /**
     * MicroBitEvent is initialised, and its event handlers are immediately fired (not suitable for use in interrupts!).
     */
    CreateAndFire = 1,  // CREATE_AND_FIRE
    }


    declare enum EventBusSource {
    MICROBIT_ID_BUTTON_A = 1,  // MICROBIT_ID_BUTTON_A
    MICROBIT_ID_BUTTON_B = 2,  // MICROBIT_ID_BUTTON_B
    MICROBIT_ID_BUTTON_AB = 26,  // MICROBIT_ID_BUTTON_AB
    MICROBIT_ID_RADIO = 29,  // MICROBIT_ID_RADIO
    MICROBIT_ID_GESTURE = 27,  // MICROBIT_ID_GESTURE
    MICROBIT_ID_ACCELEROMETER = 4,  // MICROBIT_ID_ACCELEROMETER
    MICROBIT_ID_IO_P0 = 7,  // MICROBIT_ID_IO_P0
    MICROBIT_ID_IO_P1 = 8,  // MICROBIT_ID_IO_P1
    MICROBIT_ID_IO_P2 = 9,  // MICROBIT_ID_IO_P2
    MICROBIT_ID_IO_P3 = 10,  // MICROBIT_ID_IO_P3
    MICROBIT_ID_IO_P4 = 11,  // MICROBIT_ID_IO_P4
    MICROBIT_ID_IO_P5 = 12,  // MICROBIT_ID_IO_P5
    MICROBIT_ID_IO_P6 = 13,  // MICROBIT_ID_IO_P6
    MICROBIT_ID_IO_P7 = 14,  // MICROBIT_ID_IO_P7
    MICROBIT_ID_IO_P8 = 15,  // MICROBIT_ID_IO_P8
    MICROBIT_ID_IO_P9 = 16,  // MICROBIT_ID_IO_P9
    MICROBIT_ID_IO_P10 = 17,  // MICROBIT_ID_IO_P10
    MICROBIT_ID_IO_P11 = 18,  // MICROBIT_ID_IO_P11
    MICROBIT_ID_IO_P12 = 19,  // MICROBIT_ID_IO_P12
    MICROBIT_ID_IO_P13 = 20,  // MICROBIT_ID_IO_P13
    MICROBIT_ID_IO_P14 = 21,  // MICROBIT_ID_IO_P14
    MICROBIT_ID_IO_P15 = 22,  // MICROBIT_ID_IO_P15
    MICROBIT_ID_IO_P16 = 23,  // MICROBIT_ID_IO_P16
    MICROBIT_ID_IO_P19 = 24,  // MICROBIT_ID_IO_P19
    MICROBIT_ID_IO_P20 = 25,  // MICROBIT_ID_IO_P20
    MES_DEVICE_INFO_ID = 1103,  // MES_DEVICE_INFO_ID
    MES_SIGNAL_STRENGTH_ID = 1101,  // MES_SIGNAL_STRENGTH_ID
    MES_DPAD_CONTROLLER_ID = 1104,  // MES_DPAD_CONTROLLER_ID
    MES_BROADCAST_GENERAL_ID = 2000,  // MES_BROADCAST_GENERAL_ID
    }


    declare enum EventBusValue {
    MICROBIT_EVT_ANY = 0,  // MICROBIT_EVT_ANY
    MICROBIT_BUTTON_EVT_CLICK = 3,  // MICROBIT_BUTTON_EVT_CLICK
    MICROBIT_RADIO_EVT_DATAGRAM = 1,  // MICROBIT_RADIO_EVT_DATAGRAM
    MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE = 1,  // MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE
    MES_ALERT_EVT_ALARM1 = 6,  // MES_ALERT_EVT_ALARM1
    MES_ALERT_EVT_ALARM2 = 7,  // MES_ALERT_EVT_ALARM2
    MES_ALERT_EVT_ALARM3 = 8,  // MES_ALERT_EVT_ALARM3
    MES_ALERT_EVT_ALARM4 = 9,  // MES_ALERT_EVT_ALARM4
    MES_ALERT_EVT_ALARM5 = 10,  // MES_ALERT_EVT_ALARM5
    MES_ALERT_EVT_ALARM6 = 11,  // MES_ALERT_EVT_ALARM6
    MES_ALERT_EVT_DISPLAY_TOAST = 1,  // MES_ALERT_EVT_DISPLAY_TOAST
    MES_ALERT_EVT_FIND_MY_PHONE = 5,  // MES_ALERT_EVT_FIND_MY_PHONE
    MES_ALERT_EVT_PLAY_RINGTONE = 4,  // MES_ALERT_EVT_PLAY_RINGTONE
    MES_ALERT_EVT_PLAY_SOUND = 3,  // MES_ALERT_EVT_PLAY_SOUND
    MES_ALERT_EVT_VIBRATE = 2,  // MES_ALERT_EVT_VIBRATE
    MES_CAMERA_EVT_LAUNCH_PHOTO_MODE = 1,  // MES_CAMERA_EVT_LAUNCH_PHOTO_MODE
    MES_CAMERA_EVT_LAUNCH_VIDEO_MODE = 2,  // MES_CAMERA_EVT_LAUNCH_VIDEO_MODE
    MES_CAMERA_EVT_START_VIDEO_CAPTURE = 4,  // MES_CAMERA_EVT_START_VIDEO_CAPTURE
    MES_CAMERA_EVT_STOP_PHOTO_MODE = 6,  // MES_CAMERA_EVT_STOP_PHOTO_MODE
    MES_CAMERA_EVT_STOP_VIDEO_CAPTURE = 5,  // MES_CAMERA_EVT_STOP_VIDEO_CAPTURE
    MES_CAMERA_EVT_STOP_VIDEO_MODE = 7,  // MES_CAMERA_EVT_STOP_VIDEO_MODE
    MES_CAMERA_EVT_TAKE_PHOTO = 3,  // MES_CAMERA_EVT_TAKE_PHOTO
    MES_CAMERA_EVT_TOGGLE_FRONT_REAR = 8,  // MES_CAMERA_EVT_TOGGLE_FRONT_REAR
    MES_DEVICE_DISPLAY_OFF = 5,  // MES_DEVICE_DISPLAY_OFF
    MES_DEVICE_DISPLAY_ON = 6,  // MES_DEVICE_DISPLAY_ON
    MES_DEVICE_GESTURE_DEVICE_SHAKEN = 4,  // MES_DEVICE_GESTURE_DEVICE_SHAKEN
    MES_DEVICE_INCOMING_CALL = 7,  // MES_DEVICE_INCOMING_CALL
    MES_DEVICE_INCOMING_MESSAGE = 8,  // MES_DEVICE_INCOMING_MESSAGE
    MES_DEVICE_ORIENTATION_LANDSCAPE = 1,  // MES_DEVICE_ORIENTATION_LANDSCAPE
    MES_DEVICE_ORIENTATION_PORTRAIT = 2,  // MES_DEVICE_ORIENTATION_PORTRAIT
    MES_DPAD_BUTTON_1_DOWN = 9,  // MES_DPAD_BUTTON_1_DOWN
    MES_DPAD_BUTTON_1_UP = 10,  // MES_DPAD_BUTTON_1_UP
    MES_DPAD_BUTTON_2_DOWN = 11,  // MES_DPAD_BUTTON_2_DOWN
    MES_DPAD_BUTTON_2_UP = 12,  // MES_DPAD_BUTTON_2_UP
    MES_DPAD_BUTTON_3_DOWN = 13,  // MES_DPAD_BUTTON_3_DOWN
    MES_DPAD_BUTTON_3_UP = 14,  // MES_DPAD_BUTTON_3_UP
    MES_DPAD_BUTTON_4_DOWN = 15,  // MES_DPAD_BUTTON_4_DOWN
    MES_DPAD_BUTTON_4_UP = 16,  // MES_DPAD_BUTTON_4_UP
    MES_DPAD_BUTTON_A_DOWN = 1,  // MES_DPAD_BUTTON_A_DOWN
    MES_DPAD_BUTTON_A_UP = 2,  // MES_DPAD_BUTTON_A_UP
    MES_DPAD_BUTTON_B_DOWN = 3,  // MES_DPAD_BUTTON_B_DOWN
    MES_DPAD_BUTTON_B_UP = 4,  // MES_DPAD_BUTTON_B_UP
    MES_DPAD_BUTTON_C_DOWN = 5,  // MES_DPAD_BUTTON_C_DOWN
    MES_DPAD_BUTTON_C_UP = 6,  // MES_DPAD_BUTTON_C_UP
    MES_DPAD_BUTTON_D_DOWN = 7,  // MES_DPAD_BUTTON_D_DOWN
    MES_DPAD_BUTTON_D_UP = 8,  // MES_DPAD_BUTTON_D_UP
    MES_REMOTE_CONTROL_EVT_FORWARD = 6,  // MES_REMOTE_CONTROL_EVT_FORWARD
    MES_REMOTE_CONTROL_EVT_NEXTTRACK = 4,  // MES_REMOTE_CONTROL_EVT_NEXTTRACK
    MES_REMOTE_CONTROL_EVT_PAUSE = 2,  // MES_REMOTE_CONTROL_EVT_PAUSE
    MES_REMOTE_CONTROL_EVT_PLAY = 1,  // MES_REMOTE_CONTROL_EVT_PLAY
    MES_REMOTE_CONTROL_EVT_PREVTRACK = 5,  // MES_REMOTE_CONTROL_EVT_PREVTRACK
    MES_REMOTE_CONTROL_EVT_REWIND = 7,  // MES_REMOTE_CONTROL_EVT_REWIND
    MES_REMOTE_CONTROL_EVT_STOP = 3,  // MES_REMOTE_CONTROL_EVT_STOP
    MES_REMOTE_CONTROL_EVT_VOLUMEDOWN = 9,  // MES_REMOTE_CONTROL_EVT_VOLUMEDOWN
    MES_REMOTE_CONTROL_EVT_VOLUMEUP = 8,  // MES_REMOTE_CONTROL_EVT_VOLUMEUP
    }
declare namespace control {
}


    declare enum DisplayMode {
    //% block="black and white"
    BackAndWhite = 0,  // DISPLAY_MODE_BLACK_AND_WHITE
    //% block="greyscale"
    Greyscale = 1,  // DISPLAY_MODE_GREYSCALE
    // TODO DISPLAY_MODE_BLACK_AND_WHITE_LIGHT_SENSE
    }
declare namespace led {
}


    declare enum DigitalPin {
    P0 = 7,  // MICROBIT_ID_IO_P0
    P1 = 8,  // MICROBIT_ID_IO_P1
    P2 = 9,  // MICROBIT_ID_IO_P2
    P3 = 10,  // MICROBIT_ID_IO_P3
    P4 = 11,  // MICROBIT_ID_IO_P4
    P5 = 12,  // MICROBIT_ID_IO_P5
    P6 = 13,  // MICROBIT_ID_IO_P6
    P7 = 14,  // MICROBIT_ID_IO_P7
    P8 = 15,  // MICROBIT_ID_IO_P8
    P9 = 16,  // MICROBIT_ID_IO_P9
    P10 = 17,  // MICROBIT_ID_IO_P10
    P11 = 18,  // MICROBIT_ID_IO_P11
    P12 = 19,  // MICROBIT_ID_IO_P12
    P13 = 20,  // MICROBIT_ID_IO_P13
    P14 = 21,  // MICROBIT_ID_IO_P14
    P15 = 22,  // MICROBIT_ID_IO_P15
    P16 = 23,  // MICROBIT_ID_IO_P16
    P19 = 24,  // MICROBIT_ID_IO_P19
    P20 = 25,  // MICROBIT_ID_IO_P20
    }


    declare enum AnalogPin {
    P0 = 7,  // MICROBIT_ID_IO_P0
    P1 = 8,  // MICROBIT_ID_IO_P1
    P2 = 9,  // MICROBIT_ID_IO_P2
    P3 = 10,  // MICROBIT_ID_IO_P3
    P4 = 11,  // MICROBIT_ID_IO_P4
    P10 = 17,  // MICROBIT_ID_IO_P10
    }


    declare enum PulseValue {
    High = 4,  // MICROBIT_PIN_EVT_PULSE_HI
    Low = 5,  // MICROBIT_PIN_EVT_PULSE_LO
    }


    declare enum PinPullMode {
    //% block="down"
    PullDown = 0,
    //% block="up"
    PullUp = 1,
    //% block="none"
    PullNone = 2,
    }


    declare enum SerialPin {
    P0 = 7,  // MICROBIT_ID_IO_P0
    P1 = 8,  // MICROBIT_ID_IO_P1
    P2 = 9,  // MICROBIT_ID_IO_P2
    P8 = 15,  // MICROBIT_ID_IO_P8
    P12 = 19,  // MICROBIT_ID_IO_P12
    P13 = 20,  // MICROBIT_ID_IO_P13
    P14 = 21,  // MICROBIT_ID_IO_P14
    P15 = 22,  // MICROBIT_ID_IO_P15
    P16 = 23,  // MICROBIT_ID_IO_P16
    }


    declare enum BaudRate {
    //% block=115200
    BaudRate115200 = 115200,
    //% block=9600
    BaudRate9600 = 9600,
    }
declare namespace serial {
}


    declare enum NumberFormat {
    Int8LE = 1,
    UInt8LE = 2,
    Int16LE = 3,
    UInt16LE = 4,
    Int32LE = 5,
    Int8BE = 6,
    UInt8BE = 7,
    Int16BE = 8,
    UInt16BE = 9,
    Int32BE = 10,
    // UInt32,
    }

// Auto-generated. Do not edit. Really.
