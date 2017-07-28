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
    /**
     * Raised when a 8G shock is detected
     */
    //% block="8g"
    EightG = 10,  // MICROBIT_ACCELEROMETER_EVT_8G
    }


    declare enum MesDpadButtonInfo {
    //% block="A down"
    ADown = 1,  // MES_DPAD_BUTTON_A_DOWN
    //% block="A up"
    AUp = 2,  // MES_DPAD_BUTTON_A_UP
    //% block="B down"
    BDown = 3,  // MES_DPAD_BUTTON_B_DOWN
    //% block="B up"
    BUp = 4,  // MES_DPAD_BUTTON_B_UP
    //% block="C down"
    CDown = 5,  // MES_DPAD_BUTTON_C_DOWN
    //% block="C up"
    CUp = 6,  // MES_DPAD_BUTTON_C_UP
    //% block="D down"
    DDown = 7,  // MES_DPAD_BUTTON_D_DOWN
    //% block="D up"
    DUp = 8,  // MES_DPAD_BUTTON_D_UP
    //% block="1 down"
    _1Down = 9,  // MES_DPAD_BUTTON_1_DOWN
    //% block="1 up"
    _1Up = 10,  // MES_DPAD_BUTTON_1_UP
    //% block="2 down"
    _2Down = 11,  // MES_DPAD_BUTTON_2_DOWN
    //% block="2 up"
    _2Up = 12,  // MES_DPAD_BUTTON_2_UP
    //% block="3 down"
    _3Down = 13,  // MES_DPAD_BUTTON_3_DOWN
    //% block="3 up"
    _3Up = 14,  // MES_DPAD_BUTTON_3_UP
    //% block="4 down"
    _4Down = 15,  // MES_DPAD_BUTTON_4_DOWN
    //% block="4 up"
    _4Up = 16,  // MES_DPAD_BUTTON_4_UP
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
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_BUTTON_A = 1,  // MICROBIT_ID_BUTTON_A
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_BUTTON_B = 2,  // MICROBIT_ID_BUTTON_B
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_BUTTON_AB = 26,  // MICROBIT_ID_BUTTON_AB
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_RADIO = 29,  // MICROBIT_ID_RADIO
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_GESTURE = 27,  // MICROBIT_ID_GESTURE
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_ACCELEROMETER = 4,  // MICROBIT_ID_ACCELEROMETER
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P0 = 7,  // MICROBIT_ID_IO_P0
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P1 = 8,  // MICROBIT_ID_IO_P1
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P2 = 9,  // MICROBIT_ID_IO_P2
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P3 = 10,  // MICROBIT_ID_IO_P3
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P4 = 11,  // MICROBIT_ID_IO_P4
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P5 = 12,  // MICROBIT_ID_IO_P5
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P6 = 13,  // MICROBIT_ID_IO_P6
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P7 = 14,  // MICROBIT_ID_IO_P7
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P8 = 15,  // MICROBIT_ID_IO_P8
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P9 = 16,  // MICROBIT_ID_IO_P9
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P10 = 17,  // MICROBIT_ID_IO_P10
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P11 = 18,  // MICROBIT_ID_IO_P11
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P12 = 19,  // MICROBIT_ID_IO_P12
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P13 = 20,  // MICROBIT_ID_IO_P13
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P14 = 21,  // MICROBIT_ID_IO_P14
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P15 = 22,  // MICROBIT_ID_IO_P15
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P16 = 23,  // MICROBIT_ID_IO_P16
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P19 = 24,  // MICROBIT_ID_IO_P19
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P20 = 25,  // MICROBIT_ID_IO_P20
    //% blockIdentity="control.eventSourceId"
    MES_DEVICE_INFO_ID = 1103,  // MES_DEVICE_INFO_ID
    //% blockIdentity="control.eventSourceId"
    MES_SIGNAL_STRENGTH_ID = 1101,  // MES_SIGNAL_STRENGTH_ID
    //% blockIdentity="control.eventSourceId"
    MES_DPAD_CONTROLLER_ID = 1104,  // MES_DPAD_CONTROLLER_ID
    //% blockIdentity="control.eventSourceId"
    MES_BROADCAST_GENERAL_ID = 2000,  // MES_BROADCAST_GENERAL_ID
    }


    declare enum EventBusValue {
    //% blockIdentity="control.eventValueId"
    MICROBIT_EVT_ANY = 0,  // MICROBIT_EVT_ANY
    //% blockIdentity="control.eventValueId"
    MICROBIT_BUTTON_EVT_DOWN = 1,  // MICROBIT_BUTTON_EVT_DOWN
    //% blockIdentity="control.eventValueId"
    MICROBIT_BUTTON_EVT_UP = 2,  // MICROBIT_BUTTON_EVT_UP
    //% blockIdentity="control.eventValueId"
    MICROBIT_BUTTON_EVT_CLICK = 3,  // MICROBIT_BUTTON_EVT_CLICK
    //% blockIdentity="control.eventValueId"
    MICROBIT_RADIO_EVT_DATAGRAM = 1,  // MICROBIT_RADIO_EVT_DATAGRAM
    //% blockIdentity="control.eventValueId"
    MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE = 1,  // MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE
    //% blockIdentity="control.eventValueId"
    MICROBIT_PIN_EVT_RISE = 2,  // MICROBIT_PIN_EVT_RISE
    //% blockIdentity="control.eventValueId"
    MICROBIT_PIN_EVT_FALL = 3,  // MICROBIT_PIN_EVT_FALL
    //% blockIdentity="control.eventValueId"
    MICROBIT_PIN_EVT_PULSE_HI = 4,  // MICROBIT_PIN_EVT_PULSE_HI
    //% blockIdentity="control.eventValueId"
    MICROBIT_PIN_EVT_PULSE_LO = 5,  // MICROBIT_PIN_EVT_PULSE_LO
    //% blockIdentity="control.eventValueId"
    MES_ALERT_EVT_ALARM1 = 6,  // MES_ALERT_EVT_ALARM1
    //% blockIdentity="control.eventValueId"
    MES_ALERT_EVT_ALARM2 = 7,  // MES_ALERT_EVT_ALARM2
    //% blockIdentity="control.eventValueId"
    MES_ALERT_EVT_ALARM3 = 8,  // MES_ALERT_EVT_ALARM3
    //% blockIdentity="control.eventValueId"
    MES_ALERT_EVT_ALARM4 = 9,  // MES_ALERT_EVT_ALARM4
    //% blockIdentity="control.eventValueId"
    MES_ALERT_EVT_ALARM5 = 10,  // MES_ALERT_EVT_ALARM5
    //% blockIdentity="control.eventValueId"
    MES_ALERT_EVT_ALARM6 = 11,  // MES_ALERT_EVT_ALARM6
    //% blockIdentity="control.eventValueId"
    MES_ALERT_EVT_DISPLAY_TOAST = 1,  // MES_ALERT_EVT_DISPLAY_TOAST
    //% blockIdentity="control.eventValueId"
    MES_ALERT_EVT_FIND_MY_PHONE = 5,  // MES_ALERT_EVT_FIND_MY_PHONE
    //% blockIdentity="control.eventValueId"
    MES_ALERT_EVT_PLAY_RINGTONE = 4,  // MES_ALERT_EVT_PLAY_RINGTONE
    //% blockIdentity="control.eventValueId"
    MES_ALERT_EVT_PLAY_SOUND = 3,  // MES_ALERT_EVT_PLAY_SOUND
    //% blockIdentity="control.eventValueId"
    MES_ALERT_EVT_VIBRATE = 2,  // MES_ALERT_EVT_VIBRATE
    //% blockIdentity="control.eventValueId"
    MES_CAMERA_EVT_LAUNCH_PHOTO_MODE = 1,  // MES_CAMERA_EVT_LAUNCH_PHOTO_MODE
    //% blockIdentity="control.eventValueId"
    MES_CAMERA_EVT_LAUNCH_VIDEO_MODE = 2,  // MES_CAMERA_EVT_LAUNCH_VIDEO_MODE
    //% blockIdentity="control.eventValueId"
    MES_CAMERA_EVT_START_VIDEO_CAPTURE = 4,  // MES_CAMERA_EVT_START_VIDEO_CAPTURE
    //% blockIdentity="control.eventValueId"
    MES_CAMERA_EVT_STOP_PHOTO_MODE = 6,  // MES_CAMERA_EVT_STOP_PHOTO_MODE
    //% blockIdentity="control.eventValueId"
    MES_CAMERA_EVT_STOP_VIDEO_CAPTURE = 5,  // MES_CAMERA_EVT_STOP_VIDEO_CAPTURE
    //% blockIdentity="control.eventValueId"
    MES_CAMERA_EVT_STOP_VIDEO_MODE = 7,  // MES_CAMERA_EVT_STOP_VIDEO_MODE
    //% blockIdentity="control.eventValueId"
    MES_CAMERA_EVT_TAKE_PHOTO = 3,  // MES_CAMERA_EVT_TAKE_PHOTO
    //% blockIdentity="control.eventValueId"
    MES_CAMERA_EVT_TOGGLE_FRONT_REAR = 8,  // MES_CAMERA_EVT_TOGGLE_FRONT_REAR
    //% blockIdentity="control.eventValueId"
    MES_DEVICE_DISPLAY_OFF = 5,  // MES_DEVICE_DISPLAY_OFF
    //% blockIdentity="control.eventValueId"
    MES_DEVICE_DISPLAY_ON = 6,  // MES_DEVICE_DISPLAY_ON
    //% blockIdentity="control.eventValueId"
    MES_DEVICE_GESTURE_DEVICE_SHAKEN = 4,  // MES_DEVICE_GESTURE_DEVICE_SHAKEN
    //% blockIdentity="control.eventValueId"
    MES_DEVICE_INCOMING_CALL = 7,  // MES_DEVICE_INCOMING_CALL
    //% blockIdentity="control.eventValueId"
    MES_DEVICE_INCOMING_MESSAGE = 8,  // MES_DEVICE_INCOMING_MESSAGE
    //% blockIdentity="control.eventValueId"
    MES_DEVICE_ORIENTATION_LANDSCAPE = 1,  // MES_DEVICE_ORIENTATION_LANDSCAPE
    //% blockIdentity="control.eventValueId"
    MES_DEVICE_ORIENTATION_PORTRAIT = 2,  // MES_DEVICE_ORIENTATION_PORTRAIT
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_1_DOWN = 9,  // MES_DPAD_BUTTON_1_DOWN
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_1_UP = 10,  // MES_DPAD_BUTTON_1_UP
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_2_DOWN = 11,  // MES_DPAD_BUTTON_2_DOWN
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_2_UP = 12,  // MES_DPAD_BUTTON_2_UP
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_3_DOWN = 13,  // MES_DPAD_BUTTON_3_DOWN
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_3_UP = 14,  // MES_DPAD_BUTTON_3_UP
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_4_DOWN = 15,  // MES_DPAD_BUTTON_4_DOWN
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_4_UP = 16,  // MES_DPAD_BUTTON_4_UP
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_A_DOWN = 1,  // MES_DPAD_BUTTON_A_DOWN
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_A_UP = 2,  // MES_DPAD_BUTTON_A_UP
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_B_DOWN = 3,  // MES_DPAD_BUTTON_B_DOWN
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_B_UP = 4,  // MES_DPAD_BUTTON_B_UP
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_C_DOWN = 5,  // MES_DPAD_BUTTON_C_DOWN
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_C_UP = 6,  // MES_DPAD_BUTTON_C_UP
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_D_DOWN = 7,  // MES_DPAD_BUTTON_D_DOWN
    //% blockIdentity="control.eventValueId"
    MES_DPAD_BUTTON_D_UP = 8,  // MES_DPAD_BUTTON_D_UP
    //% blockIdentity="control.eventValueId"
    MES_REMOTE_CONTROL_EVT_FORWARD = 6,  // MES_REMOTE_CONTROL_EVT_FORWARD
    //% blockIdentity="control.eventValueId"
    MES_REMOTE_CONTROL_EVT_NEXTTRACK = 4,  // MES_REMOTE_CONTROL_EVT_NEXTTRACK
    //% blockIdentity="control.eventValueId"
    MES_REMOTE_CONTROL_EVT_PAUSE = 2,  // MES_REMOTE_CONTROL_EVT_PAUSE
    //% blockIdentity="control.eventValueId"
    MES_REMOTE_CONTROL_EVT_PLAY = 1,  // MES_REMOTE_CONTROL_EVT_PLAY
    //% blockIdentity="control.eventValueId"
    MES_REMOTE_CONTROL_EVT_PREVTRACK = 5,  // MES_REMOTE_CONTROL_EVT_PREVTRACK
    //% blockIdentity="control.eventValueId"
    MES_REMOTE_CONTROL_EVT_REWIND = 7,  // MES_REMOTE_CONTROL_EVT_REWIND
    //% blockIdentity="control.eventValueId"
    MES_REMOTE_CONTROL_EVT_STOP = 3,  // MES_REMOTE_CONTROL_EVT_STOP
    //% blockIdentity="control.eventValueId"
    MES_REMOTE_CONTROL_EVT_VOLUMEDOWN = 9,  // MES_REMOTE_CONTROL_EVT_VOLUMEDOWN
    //% blockIdentity="control.eventValueId"
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
    //% block="P5 (write only)"
    P5 = 12,  // MICROBIT_ID_IO_P5
    //% block="P6 (write only)"
    P6 = 13,  // MICROBIT_ID_IO_P6
    //% block="P7 (write only)"
    P7 = 14,  // MICROBIT_ID_IO_P7
    //% block="P8 (write only)"
    P8 = 15,  // MICROBIT_ID_IO_P8
    //% block="P9 (write only)"
    P9 = 16,  // MICROBIT_ID_IO_P9
    //% block="P11 (write only)"
    P11 = 18,  // MICROBIT_ID_IO_P11
    //% block="P12 (write only)"
    P12 = 19,  // MICROBIT_ID_IO_P12
    //% block="P13 (write only)"
    P13 = 20,  // MICROBIT_ID_IO_P13
    //% block="P14 (write only)"
    P14 = 21,  // MICROBIT_ID_IO_P14
    //% block="P15 (write only)"
    P15 = 22,  // MICROBIT_ID_IO_P15
    //% block="P16 (write only)"
    P16 = 23,  // MICROBIT_ID_IO_P16
    //% block="P19 (write only)"
    P19 = 24,  // MICROBIT_ID_IO_P19
    //% block="P20 (write only)"
    P20 = 25,  // MICROBIT_ID_IO_P20
    }


    declare enum PulseValue {
    //% block=high
    High = 4,  // MICROBIT_PIN_EVT_PULSE_HI
    //% block=low
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


    declare enum PinEventType {
    //% block="edge"
    Edge = 1,  // MICROBIT_PIN_EVENT_ON_EDGE
    //% block="pulse"
    Pulse = 2,  // MICROBIT_PIN_EVENT_ON_PULSE
    //% block="touch"
    Touch = 3,  // MICROBIT_PIN_EVENT_ON_TOUCH
    //% block="none"
    None = 0,  // MICROBIT_PIN_EVENT_NONE
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
    //% block=57600
    BaudRate57600 = 57600,
    //% block=38400
    BaudRate38400 = 38400,
    //% block=31250
    BaudRate31250 = 31250,
    //% block=28800
    BaudRate28800 = 28800,
    //% block=19200
    BaudRate19200 = 19200,
    //% block=14400
    BaudRate14400 = 14400,
    //% block=9600
    BaudRate9600 = 9600,
    //% block=4800
    BaudRate4800 = 4800,
    //% block=2400
    BaudRate2400 = 2400,
    //% block=1200
    BaudRate1200 = 1200,
    //% block=300
    BaudRate300 = 300,
    }


    declare enum Delimiters {
    //% block="new line"
    NewLine = 1,
    //% block=","
    Comma = 2,
    //% block="$"
    Dollar = 3,
    //% block=":"
    Colon = 4,
    //% block="."
    Fullstop = 5,
    //% block="#"
    Hash = 6,
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
