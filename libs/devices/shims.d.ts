// Auto-generated. Do not edit.


    /**
     * Control a phone with the BBC micro:bit via Bluetooth.
     */
    //% color=156 weight=80
declare namespace devices {

    /**
     * Sends a ``camera`` command to the parent device.
     * @param event event description
     */
    //% weight=30 help=devices/tell-camera-to
    //% blockId=devices_camera icon="\uf030" block="tell camera to|%property" blockGap=8 shim=devices::tellCameraTo
    function tellCameraTo(event: MesCameraEvent): void;

    /**
     * Sends a ``remote control`` command to the parent device.
     * @param event event description
     */
    //% weight=29 help=devices/tell-remote-control-to
    //% blockId=devices_remote_control block="tell remote control to|%property" blockGap=14 icon="\uf144" shim=devices::tellRemoteControlTo
    function tellRemoteControlTo(event: MesRemoteControlEvent): void;

    /**
     * Sends an ``alert`` command to the parent device.
     * @param event event description
     */
    //% weight=27 help=devices/raise-alert-to
    //% blockId=devices_alert block="raise alert to|%property" icon="\uf0f3" shim=devices::raiseAlertTo
    function raiseAlertTo(event: MesAlertEvent): void;

    /**
     * Registers code to run when the device notifies about a particular event.
     * @param event event description
     * @param body code handler when event is triggered
     */
    //% help=devices/on-notified weight=26
    //% blockId=devices_device_info_event block="on notified|%event" icon="\uf10a" shim=devices::onNotified
    function onNotified(event: MesDeviceInfo, body: () => void): void;

    /**
     * Register code to run when the micro:bit receives a command from the paired gamepad.
     * @param name button name
     * @param body code to run when button is pressed
     */
    //% help=devices/on-gamepad-button weight=40
    //% weight=25
    //% blockId=devices_gamepad_event block="on gamepad button|%NAME" icon="\uf11b" shim=devices::onGamepadButton
    function onGamepadButton(name: MesDpadButtonInfo, body: () => void): void;

    /**
     * Returns the last signal strength reported by the paired device.
     */
    //% help=devices/signal-strength weight=24
    //% blockId=devices_signal_strength block="signal strength" blockGap=14 icon="\uf012" blockGap=14 shim=devices::signalStrength
    function signalStrength(): number;

    /**
     * Registers code to run when the device notifies about a change of signal strength.
     * @param body Code run when the signal strength changes.
     */
    //% weight=23 help=devices/on-signal-strength-changed
    //% blockId=devices_signal_strength_changed_event block="on signal strength changed" icon="\uf012" shim=devices::onSignalStrengthChanged
    function onSignalStrengthChanged(body: () => void): void;
}

// Auto-generated. Do not edit. Really.
