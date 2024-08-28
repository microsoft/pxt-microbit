// Auto-generated. Do not edit.


    declare const enum NumberFormat {
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

    UInt32LE = 11,
    UInt32BE = 12,
    Float32LE = 13,
    Float64LE = 14,
    Float32BE = 15,
    Float64BE = 16,
    }


    declare const enum PerfCounters {
    GC = 0,
    }
declare namespace images {
}
declare namespace basic {
}


    declare const enum Button {
    A = 1,  // MICROBIT_ID_BUTTON_A
    B = 2,  // MICROBIT_ID_BUTTON_B
    //% block="A+B"
    AB = 3,  // MICROBIT_ID_BUTTON_AB
    }


    declare const enum Dimension {
    //% block=x
    X = 0,
    //% block=y
    Y = 1,
    //% block=z
    Z = 2,
    //% block=strength
    Strength = 3,
    }


    declare const enum Rotation {
    //% block=pitch
    Pitch = 0,
    //% block=roll
    Roll = 1,
    }


    declare const enum TouchPin {
    P0 = 100,  // MICROBIT_ID_IO_P0
    P1 = 101,  // MICROBIT_ID_IO_P1
    P2 = 102,  // MICROBIT_ID_IO_P2
    }


    declare const enum AcceleratorRange {
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


    declare const enum Gesture {
    /**
     * Raised when shaken
     */
    //% block=shake
    //% jres=gestures.shake
    Shake = 11,  // MICROBIT_ACCELEROMETER_EVT_SHAKE
    /**
     * Raised when the logo is upward and the screen is vertical
     */
    //% block="logo up"
    //% jres=gestures.tiltforward
    LogoUp = 1,  // MICROBIT_ACCELEROMETER_EVT_TILT_UP
    /**
     * Raised when the logo is downward and the screen is vertical
     */
    //% block="logo down"
    //% jres=gestures.tiltbackwards
    LogoDown = 2,  // MICROBIT_ACCELEROMETER_EVT_TILT_DOWN
    /**
     * Raised when the screen is pointing up and the board is horizontal
     */
    //% block="screen up"
    //% jres=gestures.frontsideup
    ScreenUp = 5,  // MICROBIT_ACCELEROMETER_EVT_FACE_UP
    /**
     * Raised when the screen is pointing down and the board is horizontal
     */
    //% block="screen down"
    //% jres=gestures.backsideup
    ScreenDown = 6,  // MICROBIT_ACCELEROMETER_EVT_FACE_DOWN
    /**
     * Raised when the screen is pointing left
     */
    //% block="tilt left"
    //% jres=gestures.tiltleft
    TiltLeft = 3,  // MICROBIT_ACCELEROMETER_EVT_TILT_LEFT
    /**
     * Raised when the screen is pointing right
     */
    //% block="tilt right"
    //% jres=gestures.tiltright
    TiltRight = 4,  // MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT
    /**
     * Raised when the board is falling!
     */
    //% block="free fall"
    //% jres=gestures.freefall
    FreeFall = 7,  // MICROBIT_ACCELEROMETER_EVT_FREEFALL
    /**
     * Raised when a 3G shock is detected
     */
    //% block="3g"
    //% jres=gestures.impact3g
    ThreeG = 8,  // MICROBIT_ACCELEROMETER_EVT_3G
    /**
     * Raised when a 6G shock is detected
     */
    //% block="6g"
    //% jres=gestures.impact6g
    SixG = 9,  // MICROBIT_ACCELEROMETER_EVT_6G
    /**
     * Raised when a 8G shock is detected
     */
    //% block="8g"
    //% jres=gestures.impact8g
    EightG = 10,  // MICROBIT_ACCELEROMETER_EVT_8G
    }


    declare const enum MesDpadButtonInfo {
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

    declare const enum EventCreationMode {
    /**
     * MicroBitEvent is initialised, and no further processing takes place.
     */
    CreateOnly = 0,  // CREATE_ONLY
    /**
     * MicroBitEvent is initialised, and its event handlers are immediately fired (not suitable for use in interrupts!).
     */
    CreateAndFire = 1,  // CREATE_AND_FIRE
    }


    declare const enum EventBusSource {
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_BUTTON_A = 1,  // MICROBIT_ID_BUTTON_A
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_BUTTON_B = 2,  // MICROBIT_ID_BUTTON_B
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_BUTTON_AB = 3,  // MICROBIT_ID_BUTTON_AB
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_RADIO = 9,  // MICROBIT_ID_RADIO
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_GESTURE = 13,  // MICROBIT_ID_GESTURE
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_ACCELEROMETER = 5,  // MICROBIT_ID_ACCELEROMETER
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P0 = 100,  // MICROBIT_ID_IO_P0
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P1 = 101,  // MICROBIT_ID_IO_P1
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P2 = 102,  // MICROBIT_ID_IO_P2
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P3 = 103,  // MICROBIT_ID_IO_P3
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P4 = 104,  // MICROBIT_ID_IO_P4
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P5 = 105,  // MICROBIT_ID_IO_P5
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P6 = 106,  // MICROBIT_ID_IO_P6
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P7 = 107,  // MICROBIT_ID_IO_P7
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P8 = 108,  // MICROBIT_ID_IO_P8
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P9 = 109,  // MICROBIT_ID_IO_P9
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P10 = 110,  // MICROBIT_ID_IO_P10
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P11 = 111,  // MICROBIT_ID_IO_P11
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P12 = 112,  // MICROBIT_ID_IO_P12
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P13 = 113,  // MICROBIT_ID_IO_P13
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P14 = 114,  // MICROBIT_ID_IO_P14
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P15 = 115,  // MICROBIT_ID_IO_P15
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P16 = 116,  // MICROBIT_ID_IO_P16
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P19 = 119,  // MICROBIT_ID_IO_P19
    //% blockIdentity="control.eventSourceId"
    MICROBIT_ID_IO_P20 = 120,  // MICROBIT_ID_IO_P20
    //% blockIdentity="control.eventSourceId"
    MES_DEVICE_INFO_ID = 1103,  // MES_DEVICE_INFO_ID
    //% blockIdentity="control.eventSourceId"
    MES_SIGNAL_STRENGTH_ID = 1101,  // MES_SIGNAL_STRENGTH_ID
    //% blockIdentity="control.eventSourceId"
    MES_DPAD_CONTROLLER_ID = 1104,  // MES_DPAD_CONTROLLER_ID
    //% blockIdentity="control.eventSourceId"
    MES_BROADCAST_GENERAL_ID = 2000,  // MES_BROADCAST_GENERAL_ID
    }


    declare const enum EventBusValue {
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


    declare const enum EventFlags {
    //%
    QueueIfBusy = 16,  // MESSAGE_BUS_LISTENER_QUEUE_IF_BUSY
    //%
    DropIfBusy = 32,  // MESSAGE_BUS_LISTENER_DROP_IF_BUSY
    //%
    Reentrant = 8,  // MESSAGE_BUS_LISTENER_REENTRANT
    }
declare namespace control {
}


    declare const enum DisplayMode {
    //% block="black and white"
    BlackAndWhite = 0,  // DISPLAY_MODE_BLACK_AND_WHITE
    //% blockHidden=true
    BackAndWhite = 0,  // DISPLAY_MODE_BLACK_AND_WHITE
    //% block="greyscale"
    Greyscale = 1,  // DISPLAY_MODE_GREYSCALE
    // TODO DISPLAY_MODE_BLACK_AND_WHITE_LIGHT_SENSE
    }
declare namespace led {
}


    declare const enum DigitalPin {
    //% blockIdentity="pins._digitalPin"
    P0 = 100,  // MICROBIT_ID_IO_P0
    //% blockIdentity="pins._digitalPin"
    P1 = 101,  // MICROBIT_ID_IO_P1
    //% blockIdentity="pins._digitalPin"
    P2 = 102,  // MICROBIT_ID_IO_P2
    //% blockIdentity="pins._digitalPin"
    P3 = 103,  // MICROBIT_ID_IO_P3
    //% blockIdentity="pins._digitalPin"
    P4 = 104,  // MICROBIT_ID_IO_P4
    //% blockIdentity="pins._digitalPin"
    P5 = 105,  // MICROBIT_ID_IO_P5
    //% blockIdentity="pins._digitalPin"
    P6 = 106,  // MICROBIT_ID_IO_P6
    //% blockIdentity="pins._digitalPin"
    P7 = 107,  // MICROBIT_ID_IO_P7
    //% blockIdentity="pins._digitalPin"
    P8 = 108,  // MICROBIT_ID_IO_P8
    //% blockIdentity="pins._digitalPin"
    P9 = 109,  // MICROBIT_ID_IO_P9
    //% blockIdentity="pins._digitalPin"
    P10 = 110,  // MICROBIT_ID_IO_P10
    //% blockIdentity="pins._digitalPin"
    P11 = 111,  // MICROBIT_ID_IO_P11
    //% blockIdentity="pins._digitalPin"
    P12 = 112,  // MICROBIT_ID_IO_P12
    //% blockIdentity="pins._digitalPin"
    P13 = 113,  // MICROBIT_ID_IO_P13
    //% blockIdentity="pins._digitalPin"
    P14 = 114,  // MICROBIT_ID_IO_P14
    //% blockIdentity="pins._digitalPin"
    P15 = 115,  // MICROBIT_ID_IO_P15
    //% blockIdentity="pins._digitalPin"
    P16 = 116,  // MICROBIT_ID_IO_P16
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=1
    P19 = 119,  // MICROBIT_ID_IO_P19
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=1
    P20 = 120,  // MICROBIT_ID_IO_P20
    }


    declare const enum AnalogPin {
    //% blockIdentity="pins._analogPin"
    P0 = 100,  // MICROBIT_ID_IO_P0
    //% blockIdentity="pins._analogPin"
    P1 = 101,  // MICROBIT_ID_IO_P1
    //% blockIdentity="pins._analogPin"
    P2 = 102,  // MICROBIT_ID_IO_P2
    //% blockIdentity="pins._analogPin"
    P3 = 103,  // MICROBIT_ID_IO_P3
    //% blockIdentity="pins._analogPin"
    P4 = 104,  // MICROBIT_ID_IO_P4
    //% blockIdentity="pins._analogPin"
    P5 = 105,  // MICROBIT_ID_IO_P5
    //% blockIdentity="pins._analogPin"
    P6 = 106,  // MICROBIT_ID_IO_P6
    //% blockIdentity="pins._analogPin"
    P7 = 107,  // MICROBIT_ID_IO_P7
    //% blockIdentity="pins._analogPin"
    P8 = 108,  // MICROBIT_ID_IO_P8
    //% blockIdentity="pins._analogPin"
    P9 = 109,  // MICROBIT_ID_IO_P9
    //% blockIdentity="pins._analogPin"
    P10 = 110,  // MICROBIT_ID_IO_P10
    //% blockIdentity="pins._analogPin"
    P11 = 111,  // MICROBIT_ID_IO_P11
    //% blockIdentity="pins._analogPin"
    P12 = 112,  // MICROBIT_ID_IO_P12
    //% blockIdentity="pins._analogPin"
    P13 = 113,  // MICROBIT_ID_IO_P13
    //% blockIdentity="pins._analogPin"
    P14 = 114,  // MICROBIT_ID_IO_P14
    //% blockIdentity="pins._analogPin"
    P15 = 115,  // MICROBIT_ID_IO_P15
    //% blockIdentity="pins._analogPin"
    P16 = 116,  // MICROBIT_ID_IO_P16
    //% blockIdentity="pins._analogPin"
    //% blockHidden=1
    P19 = 119,  // MICROBIT_ID_IO_P19
    //% blockIdentity="pins._analogPin"
    //% blockHidden=1
    P20 = 120,  // MICROBIT_ID_IO_P20
    }


    declare const enum PulseValue {
    //% block=high
    High = 4,  // MICROBIT_PIN_EVT_PULSE_HI
    //% block=low
    Low = 5,  // MICROBIT_PIN_EVT_PULSE_LO
    }


    declare const enum PinPullMode {
    //% block="down"
    PullDown = 0,
    //% block="up"
    PullUp = 1,
    //% block="none"
    PullNone = 2,
    }


    declare const enum PinEventType {
    //% block="edge"
    Edge = 2,  // MICROBIT_PIN_EVENT_ON_EDGE
    //% block="pulse"
    Pulse = 3,  // MICROBIT_PIN_EVENT_ON_PULSE
    //% block="touch"
    Touch = 4,  // MICROBIT_PIN_EVENT_ON_TOUCH
    //% block="none"
    None = 0,  // MICROBIT_PIN_EVENT_NONE
    }


    declare const enum SerialPin {
    P0 = 100,  // MICROBIT_ID_IO_P0
    P1 = 101,  // MICROBIT_ID_IO_P1
    P2 = 102,  // MICROBIT_ID_IO_P2
    P8 = 108,  // MICROBIT_ID_IO_P8
    P12 = 112,  // MICROBIT_ID_IO_P12
    P13 = 113,  // MICROBIT_ID_IO_P13
    P14 = 114,  // MICROBIT_ID_IO_P14
    P15 = 115,  // MICROBIT_ID_IO_P15
    P16 = 116,  // MICROBIT_ID_IO_P16
    USB_TX = 1001,
    USB_RX = 1002,
    }


    declare const enum BaudRate {
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
    }
declare namespace serial {
}


    /**
     * An action on a touch button
     */

    declare const enum TouchButtonEvent {
    //% block=pressed
    Pressed = 3,  // MICROBIT_BUTTON_EVT_CLICK
    //% block=touched
    Touched = 1,  // MICROBIT_BUTTON_EVT_DOWN
    //% block=released
    Released = 2,  // MICROBIT_BUTTON_EVT_UP
    //% block="long pressed"
    LongPressed = 4,  // MICROBIT_BUTTON_EVT_LONG_CLICK
    }


    declare const enum TouchTargetMode {
    //% block="capacitive"
    Capacitive = 1,
    //% block="resistive"
    Resistive = 0,
    }


    declare const enum TouchTarget {
    //% block="P0"
    P0 = 100,  // MICROBIT_ID_IO_P0
    //% block="P1"
    P1 = 101,  // MICROBIT_ID_IO_P1
    //% block="P2"
    P2 = 102,  // MICROBIT_ID_IO_P2
    //% block="logo"
    LOGO = 121,  // MICROBIT_ID_LOGO
    }

// Auto-generated. Do not edit. Really.
