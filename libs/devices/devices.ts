
namespace devices {
    /**
     * Sends a ``camera`` command to the parent device.
     * @param event event description
     */
    //% weight=30 help=devices/tell-camera-to
    //% blockId=devices_camera icon="\uf030" block="tell camera to|%property" blockGap=8
    export function tellCameraTo(event: MesCameraEvent) {
        control.raiseEvent(DAL.MES_CAMERA_ID, event);
    }

    /**
     * Sends a ``remote control`` command to the parent device.
     * @param event event description
     */
    //% weight=29 help=devices/tell-remote-control-to
    //% blockId=devices_remote_control block="tell remote control to|%property" blockGap=14 icon="\uf144"
    export function tellRemoteControlTo(event: MesRemoteControlEvent) {
        control.raiseEvent(DAL.MES_REMOTE_CONTROL_ID, event);
    }

    /**
     * Sends an ``alert`` command to the parent device.
     * @param event event description
     */
    //% weight=27 help=devices/raise-alert-to
    //% blockId=devices_alert block="raise alert to|%property" icon="\uf0f3"
    export function raiseAlertTo(event: MesAlertEvent) {
        control.raiseEvent(DAL.MES_ALERTS_ID, event);
    }

    /**
     * Registers code to run when the device notifies about a particular event.
     * @param event event description
     * @param body code handler when event is triggered
     */
    //% help=devices/on-notified weight=26
    //% blockId=devices_device_info_event block="on notified|%event" icon="\uf10a"
    export function onNotified(event: MesDeviceInfo, body: () => void) {
        control.onEvent(DAL.MES_DEVICE_INFO_ID, event, body);
    }

    /**
     * Register code to run when the micro:bit receives a command from the paired gamepad.
     * @param name button name
     * @param body code to run when button is pressed
     */
    //% help=devices/on-gamepad-button weight=40
    //% weight=25
    //% blockId=devices_gamepad_event block="on gamepad button|%NAME" icon="\uf11b"
    export function onGamepadButton(name: MesDpadButtonInfo, body: () => void) {
        control.onEvent(DAL.MES_DPAD_CONTROLLER_ID, name, body);
    }
}