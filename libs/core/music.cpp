#include "pxt.h"

namespace pins {
    void analogSetPitchVolume(int volume);
    int analogPitchVolume();
    void analogSetPitchPin(AnalogPin name);
}

namespace music {
/**
 * Set the default output volume of the sound synthesizer.
 * @param volume the volume 0...255
 */
//% blockId=synth_set_volume block="set volume %volume"
//% volume.min=0 volume.max=255
//% volume.defl=127
//% help=music/set-volume
//% weight=70
//% group="Volume"
//% blockGap=8
void setVolume(int volume) {
#if MICROBIT_CODAL
    uBit.audio.setVolume(max(0, min(255, volume)));
#else
    pins::analogSetPitchVolume(volume);
#endif
}

/**
 * Returns the current output volume of the sound synthesizer.
 */
//% blockId=synth_get_volume block="volume"
//% help=music/volume
//% weight=69
//% group="Volume"
//% blockGap=8
int volume() {
#if MICROBIT_CODAL
    return uBit.audio.getVolume();
#else
    return pins::analogPitchVolume();
#endif
}

/**
* Turn the built-in speaker on or off.
* Disabling the speaker resets the sound pin to the default of P0.
* @param enabled whether the built-in speaker is enabled in addition to the sound pin
*/
//% blockId=music_set_built_in_speaker_enable block="set built-in speaker $enabled"
//% blockGap=8
//% group="micro:bit V2"
//% parts=builtinspeaker
//% help=music/set-built-in-speaker-enabled
//% enabled.shadow=toggleOnOff
void setBuiltInSpeakerEnabled(bool enabled) {
#if MICROBIT_CODAL
    uBit.audio.setSpeakerEnabled(enabled);
#else
    // don't crash if user asks to turn it off
    if (enabled) {
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
    }
#endif
}

/**
 * Set the pin used when producing sounds. Default is P0.
 * @param name pin to modulate pitch from
 */
//% blockId=music_set_sound_pin block="set sound pin $name"
//% help=music/set-sound-pin weight=3 advanced=true
//% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
//% name.fieldOptions.tooltips="false" name.fieldOptions.width="250"
//% group="Volume"
//% weight=1
void setSoundPin(AnalogPin name) {
#if MICROBIT_CODAL
    //uBit.audio.setPin(name);
#else
    // v1 behavior
    analogSetPitchPin(name);
#endif
}

}