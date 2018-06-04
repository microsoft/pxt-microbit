// Auto-generated. Do not edit.


    /**
     * Control a phone with the BBC micro:bit via Bluetooth.
     */
    //% color=#008272 weight=80 icon="\uf10b"
declare namespace devices {

    /**
     * Returns the last signal strength reported by the paired device.
     */
    //% help=devices/signal-strength weight=24
    //% blockId=devices_signal_strength block="signal strength" blockGap=14 icon="\uf012" blockGap=14 shim=devices::signalStrength
    function signalStrength(): int32;

    /**
     * Registers code to run when the device notifies about a change of signal strength.
     * @param body Code run when the signal strength changes.
     */
    //% weight=23 help=devices/on-signal-strength-changed
    //% blockId=devices_signal_strength_changed_event block="on signal strength changed" icon="\uf012" shim=devices::onSignalStrengthChanged
    function onSignalStrengthChanged(body: () => void): void;
}

// Auto-generated. Do not edit. Really.
