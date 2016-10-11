#include "pxt.h"
#include "MESEvents.h"

using namespace pxt;

enum class MesCameraEvent {
    //% block="take photo"
    TakePhoto = MES_CAMERA_EVT_TAKE_PHOTO,
    //% block="start video capture"
    StartVideoCapture = MES_CAMERA_EVT_START_VIDEO_CAPTURE,
    //% block="stop video capture"
    StopVideoCapture = MES_CAMERA_EVT_STOP_VIDEO_CAPTURE,
    //% block="toggle front-rear"
    ToggleFrontRear = MES_CAMERA_EVT_TOGGLE_FRONT_REAR,
    //% block="launch photo mode"
    LaunchPhotoMode = MES_CAMERA_EVT_LAUNCH_PHOTO_MODE,
    //% block="launch video mode"
    LaunchVideoMode = MES_CAMERA_EVT_LAUNCH_VIDEO_MODE,
    //% block="stop photo mode"
    StopPhotoMode = MES_CAMERA_EVT_STOP_PHOTO_MODE,
    //% block="stop video mode"
    StopVideoMode = MES_CAMERA_EVT_STOP_VIDEO_MODE,
};

enum class MesAlertEvent {
    //% block="display toast"
    DisplayToast = MES_ALERT_EVT_DISPLAY_TOAST,
    //% block="vibrate"
    Vibrate = MES_ALERT_EVT_VIBRATE,
    //% block="play sound"
    PlaySound = MES_ALERT_EVT_PLAY_SOUND,
    //% block="play ring tone"
    PlayRingtone = MES_ALERT_EVT_PLAY_RINGTONE,
    //% block="find my phone"
    FindMyPhone = MES_ALERT_EVT_FIND_MY_PHONE,
    //% block="ring alarm"
    RingAlarm = MES_ALERT_EVT_ALARM1,
    //% block="ring alarm 2"
    RingAlarm2 = MES_ALERT_EVT_ALARM2,
    //% block="ring alarm 3"
    RingAlarm3 = MES_ALERT_EVT_ALARM3,
    //% block="ring alarm 4"
    RingAlarm4 = MES_ALERT_EVT_ALARM4,
    //% block="ring alarm 5"
    RingAlarm5 = MES_ALERT_EVT_ALARM5,
    //% block="ring alarm 6"
    RingAlarm6 = MES_ALERT_EVT_ALARM6,
};

enum class MesDeviceInfo {
    //% block="incoming call"
    IncomingCall = MES_DEVICE_INCOMING_CALL,
    //% block="incoming message"
    IncomingMessage = MES_DEVICE_INCOMING_MESSAGE,
    //% block="orientation landscape"
    OrientationLandscape = MES_DEVICE_ORIENTATION_LANDSCAPE,
    //% block="orientation portrait"
    OrientationPortrait = MES_DEVICE_ORIENTATION_PORTRAIT,
    //% block="shaken"
    Shaken = MES_DEVICE_GESTURE_DEVICE_SHAKEN,
    //% block="display off"
    DisplayOff = MES_DEVICE_DISPLAY_OFF,
    //% block="display on"
    DisplayOn = MES_DEVICE_DISPLAY_ON,
};

enum class MesRemoteControlEvent {
    //% block="play"
    play = MES_REMOTE_CONTROL_EVT_PLAY,
    //% block="pause"
    pause = MES_REMOTE_CONTROL_EVT_PAUSE,
    //% block="stop"
    stop = MES_REMOTE_CONTROL_EVT_STOP,
    //% block="next track"
    nextTrack = MES_REMOTE_CONTROL_EVT_NEXTTRACK,
    //% block="previous track"
    previousTrack = MES_REMOTE_CONTROL_EVT_PREVTRACK,
    //% block="forward"
    forward = MES_REMOTE_CONTROL_EVT_FORWARD,
    //% block="rewind"
    rewind = MES_REMOTE_CONTROL_EVT_REWIND,
    //% block="volume up"
    volumeUp = MES_REMOTE_CONTROL_EVT_VOLUMEUP,
    //% block="volume down"
    volumeDown = MES_REMOTE_CONTROL_EVT_VOLUMEDOWN,
};

enum class MesDpadButtonInfo {
    //% block="A down"
    ADown = MES_DPAD_BUTTON_A_DOWN,
    //% block="A up"
    AUp = MES_DPAD_BUTTON_A_UP,
    //% block="B down"
    BDown = MES_DPAD_BUTTON_B_DOWN,
    //% block="B up"
    BUp = MES_DPAD_BUTTON_B_UP,
    //% block="C down"
    CDown = MES_DPAD_BUTTON_C_DOWN,
    //% block="C up"
    CUp = MES_DPAD_BUTTON_C_UP,
    //% block="D down"
    DDown = MES_DPAD_BUTTON_D_DOWN,
    //% block="D up"
    DUp = MES_DPAD_BUTTON_D_UP,
    //% block="1 down"
    _1Down = MES_DPAD_BUTTON_1_UP,
    //% block="1 up"
    _1Up = MES_DPAD_BUTTON_1_DOWN,
    //% block="2 down"
    _2Down = MES_DPAD_BUTTON_2_DOWN,
    //% block="2 up"
    _2Up = MES_DPAD_BUTTON_2_UP,
    //% block="3 down"
    _3Down = MES_DPAD_BUTTON_3_DOWN,
    //% block="3 up"
    _3Up = MES_DPAD_BUTTON_3_UP,
    //% block="4 down"
    _4Down = MES_DPAD_BUTTON_4_DOWN,
    //% block="4 up"
    _4Up = MES_DPAD_BUTTON_4_UP,
};

/**
 * Control a phone with the BBC micro:bit via Bluetooth.
 */
//% color=156 weight=80
namespace devices {
    static void genEvent(int id, int event) {
      MicroBitEvent e(id, event);
    }

    /**
     * Sends a ``camera`` command to the parent device.
     * @param event event description
     */
    //% weight=30 help=devices/tell-camera-to
    //% blockId=devices_camera icon="\uf030" block="tell camera to|%property" blockGap=8
    void tellCameraTo(MesCameraEvent event) { 
        genEvent(MES_CAMERA_ID, (int)event);
    }

    /**
     * Sends a ``remote control`` command to the parent device.
     * @param event event description
     */
    //% weight=29 help=devices/tell-remote-control-to
    //% blockId=devices_remote_control block="tell remote control to|%property" blockGap=14 icon="\uf144"
    void tellRemoteControlTo(MesRemoteControlEvent event) { 
        genEvent(MES_REMOTE_CONTROL_ID, (int)event);
    }

    /**
     * Sends an ``alert`` command to the parent device.
     * @param event event description
     */
    //% weight=27 help=devices/raise-alert-to
    //% blockId=devices_alert block="raise alert to|%property" icon="\uf0f3"
    void raiseAlertTo(MesAlertEvent event) { 
        genEvent(MES_ALERTS_ID, (int)event);
    }

    /**
     * Registers code to run when the device notifies about a particular event.
     * @param event event description
     * @param body code handler when event is triggered
     */
    //% help=devices/on-notified weight=26
    //% blockId=devices_device_info_event block="on notified|%event" icon="\uf10a"
    void onNotified(MesDeviceInfo event, Action body) {
        registerWithDal(MES_DEVICE_INFO_ID, (int)event, body);
    }

    /**
     * Register code to run when the micro:bit receives a command from the paired gamepad.
     * @param name button name
     * @param body code to run when button is pressed
     */
    //% help=devices/on-gamepad-button weight=40
    //% weight=25
    //% blockId=devices_gamepad_event block="on gamepad button|%NAME" icon="\uf11b"
    void onGamepadButton(MesDpadButtonInfo name, Action body) {
        registerWithDal(MES_DPAD_CONTROLLER_ID, (int)name, body);
    }

    static int _signalStrength = -1;
    static void signalStrengthHandler(MicroBitEvent ev) { 
        // keep in sync with MESEvents.h
        _signalStrength = ev.value - 1; 
    }
    static void initSignalStrength() {
        if (_signalStrength < 0) {
            _signalStrength = 0;
            uBit.messageBus.listen(MES_SIGNAL_STRENGTH_ID, MICROBIT_EVT_ANY, signalStrengthHandler);
        }        
    }
    
    /**
     * Returns the last signal strength reported by the paired device.
     */
    //% help=devices/signal-strength weight=24
    //% blockId=devices_signal_strength block="signal strength" blockGap=14 icon="\uf012" blockGap=14
    int signalStrength() {
        initSignalStrength();
        return _signalStrength;
    }

    /**
     * Registers code to run when the device notifies about a change of signal strength.
     * @param body Code run when the signal strength changes.
     */
    //% weight=23 help=devices/on-signal-strength-changed
    //% blockId=devices_signal_strength_changed_event block="on signal strength changed" icon="\uf012"
    void onSignalStrengthChanged(Action body) {
        initSignalStrength();    
        registerWithDal(MES_SIGNAL_STRENGTH_ID, MICROBIT_EVT_ANY, body);
    }
}
