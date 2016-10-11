#include "ksbit.h"

/**
 * How to create the event.
 */
enum class EventCreationMode {
    /**
     * MicroBitEvent is initialised, and no further processing takes place.
     */
    CreateOnly = CREATE_ONLY,
    /**
     * MicroBitEvent is initialised, and its event handlers are immediately fired (not suitable for use in interrupts!).
     */
    CreateAndFire = CREATE_AND_FIRE,
};

// note the trailing '_' in names - otherwise we get conflict with the pre-processor
// this trailing underscore is removed by enums.d.ts generation process

// TODO shouldn't these be renamed to something more sensible anyways?

enum EventBusSource {
    MICROBIT_ID_BUTTON_A_ = MICROBIT_ID_BUTTON_A,
    MICROBIT_ID_BUTTON_B_ = MICROBIT_ID_BUTTON_B,
    MICROBIT_ID_BUTTON_AB_ = MICROBIT_ID_BUTTON_AB,
    MICROBIT_ID_RADIO_ = MICROBIT_ID_RADIO,
    MICROBIT_ID_GESTURE_ = MICROBIT_ID_GESTURE,
    MICROBIT_ID_ACCELEROMETER_ = MICROBIT_ID_ACCELEROMETER,
    MICROBIT_ID_IO_P0_ = MICROBIT_ID_IO_P0,
    MICROBIT_ID_IO_P1_ = MICROBIT_ID_IO_P1,
    MICROBIT_ID_IO_P2_ = MICROBIT_ID_IO_P2,
    MICROBIT_ID_IO_P3_ = MICROBIT_ID_IO_P3,
    MICROBIT_ID_IO_P4_ = MICROBIT_ID_IO_P4,
    MICROBIT_ID_IO_P5_ = MICROBIT_ID_IO_P5,
    MICROBIT_ID_IO_P6_ = MICROBIT_ID_IO_P6,
    MICROBIT_ID_IO_P7_ = MICROBIT_ID_IO_P7,
    MICROBIT_ID_IO_P8_ = MICROBIT_ID_IO_P8,
    MICROBIT_ID_IO_P9_ = MICROBIT_ID_IO_P9,
    MICROBIT_ID_IO_P10_ = MICROBIT_ID_IO_P10,
    MICROBIT_ID_IO_P11_ = MICROBIT_ID_IO_P11,
    MICROBIT_ID_IO_P12_ = MICROBIT_ID_IO_P12,
    MICROBIT_ID_IO_P13_ = MICROBIT_ID_IO_P13,
    MICROBIT_ID_IO_P14_ = MICROBIT_ID_IO_P14,
    MICROBIT_ID_IO_P15_ = MICROBIT_ID_IO_P15,
    MICROBIT_ID_IO_P16_ = MICROBIT_ID_IO_P16,
    MICROBIT_ID_IO_P19_ = MICROBIT_ID_IO_P19,
    MICROBIT_ID_IO_P20_ = MICROBIT_ID_IO_P20,
    MES_DEVICE_INFO_ID_ = MES_DEVICE_INFO_ID,
    MES_SIGNAL_STRENGTH_ID_ = MES_SIGNAL_STRENGTH_ID,
    MES_DPAD_CONTROLLER_ID_ = MES_DPAD_CONTROLLER_ID,
    MES_BROADCAST_GENERAL_ID_ = MES_BROADCAST_GENERAL_ID,
};

enum EventBusValue {
    MICROBIT_EVT_ANY_ = MICROBIT_EVT_ANY,
    MICROBIT_BUTTON_EVT_CLICK_ = MICROBIT_BUTTON_EVT_CLICK,
    MICROBIT_RADIO_EVT_DATAGRAM_ = MICROBIT_RADIO_EVT_DATAGRAM,
    MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE_ = MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE,
    MES_ALERT_EVT_ALARM1_ = MES_ALERT_EVT_ALARM1,
    MES_ALERT_EVT_ALARM2_ = MES_ALERT_EVT_ALARM2,
    MES_ALERT_EVT_ALARM3_ = MES_ALERT_EVT_ALARM3,
    MES_ALERT_EVT_ALARM4_ = MES_ALERT_EVT_ALARM4,
    MES_ALERT_EVT_ALARM5_ = MES_ALERT_EVT_ALARM5,
    MES_ALERT_EVT_ALARM6_ = MES_ALERT_EVT_ALARM6,
    MES_ALERT_EVT_DISPLAY_TOAST_ = MES_ALERT_EVT_DISPLAY_TOAST,
    MES_ALERT_EVT_FIND_MY_PHONE_ = MES_ALERT_EVT_FIND_MY_PHONE,
    MES_ALERT_EVT_PLAY_RINGTONE_ = MES_ALERT_EVT_PLAY_RINGTONE,
    MES_ALERT_EVT_PLAY_SOUND_ = MES_ALERT_EVT_PLAY_SOUND,
    MES_ALERT_EVT_VIBRATE_ = MES_ALERT_EVT_VIBRATE,
    MES_CAMERA_EVT_LAUNCH_PHOTO_MODE_ = MES_CAMERA_EVT_LAUNCH_PHOTO_MODE,
    MES_CAMERA_EVT_LAUNCH_VIDEO_MODE_ = MES_CAMERA_EVT_LAUNCH_VIDEO_MODE,
    MES_CAMERA_EVT_START_VIDEO_CAPTURE_ = MES_CAMERA_EVT_START_VIDEO_CAPTURE,
    MES_CAMERA_EVT_STOP_PHOTO_MODE_ = MES_CAMERA_EVT_STOP_PHOTO_MODE,
    MES_CAMERA_EVT_STOP_VIDEO_CAPTURE_ = MES_CAMERA_EVT_STOP_VIDEO_CAPTURE,
    MES_CAMERA_EVT_STOP_VIDEO_MODE_ = MES_CAMERA_EVT_STOP_VIDEO_MODE,
    MES_CAMERA_EVT_TAKE_PHOTO_ = MES_CAMERA_EVT_TAKE_PHOTO,
    MES_CAMERA_EVT_TOGGLE_FRONT_REAR_ = MES_CAMERA_EVT_TOGGLE_FRONT_REAR,
    MES_DEVICE_DISPLAY_OFF_ = MES_DEVICE_DISPLAY_OFF,
    MES_DEVICE_DISPLAY_ON_ = MES_DEVICE_DISPLAY_ON,
    MES_DEVICE_GESTURE_DEVICE_SHAKEN_ = MES_DEVICE_GESTURE_DEVICE_SHAKEN,
    MES_DEVICE_INCOMING_CALL_ = MES_DEVICE_INCOMING_CALL,
    MES_DEVICE_INCOMING_MESSAGE_ = MES_DEVICE_INCOMING_MESSAGE,
    MES_DEVICE_ORIENTATION_LANDSCAPE_ = MES_DEVICE_ORIENTATION_LANDSCAPE,
    MES_DEVICE_ORIENTATION_PORTRAIT_ = MES_DEVICE_ORIENTATION_PORTRAIT,
    MES_DPAD_BUTTON_1_DOWN_ = MES_DPAD_BUTTON_1_DOWN,
    MES_DPAD_BUTTON_1_UP_ = MES_DPAD_BUTTON_1_UP,
    MES_DPAD_BUTTON_2_DOWN_ = MES_DPAD_BUTTON_2_DOWN,
    MES_DPAD_BUTTON_2_UP_ = MES_DPAD_BUTTON_2_UP,
    MES_DPAD_BUTTON_3_DOWN_ = MES_DPAD_BUTTON_3_DOWN,
    MES_DPAD_BUTTON_3_UP_ = MES_DPAD_BUTTON_3_UP,
    MES_DPAD_BUTTON_4_DOWN_ = MES_DPAD_BUTTON_4_DOWN,
    MES_DPAD_BUTTON_4_UP_ = MES_DPAD_BUTTON_4_UP,
    MES_DPAD_BUTTON_A_DOWN_ = MES_DPAD_BUTTON_A_DOWN,
    MES_DPAD_BUTTON_A_UP_ = MES_DPAD_BUTTON_A_UP,
    MES_DPAD_BUTTON_B_DOWN_ = MES_DPAD_BUTTON_B_DOWN,
    MES_DPAD_BUTTON_B_UP_ = MES_DPAD_BUTTON_B_UP,
    MES_DPAD_BUTTON_C_DOWN_ = MES_DPAD_BUTTON_C_DOWN,
    MES_DPAD_BUTTON_C_UP_ = MES_DPAD_BUTTON_C_UP,
    MES_DPAD_BUTTON_D_DOWN_ = MES_DPAD_BUTTON_D_DOWN,
    MES_DPAD_BUTTON_D_UP_ = MES_DPAD_BUTTON_D_UP,
    MES_REMOTE_CONTROL_EVT_FORWARD_ = MES_REMOTE_CONTROL_EVT_FORWARD,
    MES_REMOTE_CONTROL_EVT_NEXTTRACK_ = MES_REMOTE_CONTROL_EVT_NEXTTRACK,
    MES_REMOTE_CONTROL_EVT_PAUSE_ = MES_REMOTE_CONTROL_EVT_PAUSE,
    MES_REMOTE_CONTROL_EVT_PLAY_ = MES_REMOTE_CONTROL_EVT_PLAY,
    MES_REMOTE_CONTROL_EVT_PREVTRACK_ = MES_REMOTE_CONTROL_EVT_PREVTRACK,
    MES_REMOTE_CONTROL_EVT_REWIND_ = MES_REMOTE_CONTROL_EVT_REWIND,
    MES_REMOTE_CONTROL_EVT_STOP_ = MES_REMOTE_CONTROL_EVT_STOP,
    MES_REMOTE_CONTROL_EVT_VOLUMEDOWN_ = MES_REMOTE_CONTROL_EVT_VOLUMEDOWN,
    MES_REMOTE_CONTROL_EVT_VOLUMEUP_ = MES_REMOTE_CONTROL_EVT_VOLUMEUP,
};

//% weight=1 color="#333333"
//% advanced=true
namespace control {
    void fiberDone(void *a)
    {
      decr((Action)a);
      release_fiber();
    }

    /**
     * Schedules code that run in the background.
     */
    //% help=control/in-background
    //% blockId="control_in_background" block="run in background" blockGap=8
    void inBackground(Action a) {
      runInBackground(a);
    }

    /**
     * Resets the BBC micro:bit.
     */
    //% weight=30 async help=control/reset blockGap=8
    //% blockId="control_reset" block="reset"
    void reset() {
      microbit_reset();
    }

    /**
    * Blocks the current fiber for the given microseconds
    * @param micros number of micro-seconds to wait. eg: 4
    */
    //% help=control/wait-micros weight=29
    //% blockId="control_wait_us" block="wait (µs)%micros"
    void waitMicros(int micros) {
        wait_us(micros);
    }

    /**
     * Raises an event in the event bus.
     * @param src ID of the MicroBit Component that generated the event e.g. MICROBIT_ID_BUTTON_A.
     * @param value Component specific code indicating the cause of the event.
     * @param mode optional definition of how the event should be processed after construction (default is CREATE_AND_FIRE).
     */
    //% weight=21 blockGap=12 blockId="control_raise_event" block="raise event|from source %src=control_event_source_id|with value %value=control_event_value_id" blockExternalInputs=1
    //% mode.defl=CREATE_AND_FIRE
    void raiseEvent(int src, int value, EventCreationMode mode) {
        MicroBitEvent evt(src, value, (MicroBitEventLaunchMode)mode);
    }

    /**
     * Raises an event in the event bus.
     */
    //% weight=20 blockGap=8 blockId="control_on_event" block="on event|from %src=control_event_source_id|with value %value=control_event_value_id"
    //% blockExternalInputs=1
    void onEvent(int src, int value, Action handler) {
        registerWithDal(src, value, handler);
    }

    /**
    * Gets the value of the last event executed on the bus
    */
    //% blockId=control_event_value" block="event value"
    //% weight=18
    int eventValue() {
        return pxt::lastEvent.value;
    }

    /**
    * Gets the timestamp of the last event executed on the bus
    */
    //% blockId=control_event_timestamp" block="event timestamp"
    //% weight=19 blockGap=8
    int eventTimestamp() {
        return pxt::lastEvent.timestamp;
    }

    /**
     * Gets a friendly name for the device derived from the its serial number
     */
    //% blockId="control_device_name" block="device name" weight=10 blockGap=8
    StringData* deviceName() {
        return ManagedString(microbit_friendly_name()).leakData();
    }

    /**
    * Derive a unique, consistent serial number of this device from internal data.
    */
    //% blockId="control_device_serial_number" block="device serial number" weight=9
    int deviceSerialNumber() {
        return microbit_serial_number();
    }
}
