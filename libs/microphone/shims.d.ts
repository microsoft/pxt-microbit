// Auto-generated. Do not edit.
declare namespace input {

    /**
     * Registers an event that runs when a loud sound is detected
     */
    //% help=input/on-loud-sound
    //% blockId=input_on_loud_sound block="on loud sound"
    //% parts="microphone"
    //% weight=88 blockGap=12 shim=input::onLoudSound
    function onLoudSound(handler: () => void): void;

    /**
     * Reads the loudness through the microphone from 0 (silent) to 255 (loud)
     */
    //% help=input/sound-level
    //% blockId=device_get_sound_level block="sound level"
    //% parts="microphone"
    //% weight=34 blockGap=8 shim=input::soundLevel
    function soundLevel(): int32;

    /**
     * Sets the minimum threshold for a loud sound
     */
    //% help=input/set-loud-sound-threshold
    //% blockId=input_set_loud_sound_threshold block="set loud sound threshold %value"
    //% parts="microphone"
    //% value.min=1 value.max=255
    //% group="More" weight=14 blockGap=8 shim=input::setLoudSoundThreshold
    function setLoudSoundThreshold(value: int32): void;
}

// Auto-generated. Do not edit. Really.
