#include "pxt.h"

#if MICROBIT_CODAL
#include "LevelDetector.h"
#include "LevelDetectorSPL.h"
#endif

enum class DetectedSound {
    //% block="loud"
    Loud = 2,
    //% block="quiet"
    Quiet = 1
};

enum class SoundThreshold {
    //% block="loud"
    Loud = 2,
    //% block="quiet"
    Quiet = 1
};
namespace input {

#if MICROBIT_CODAL
bool didInit;

void init() {
    if (didInit) {
        return;
    }

    didInit = true;
    uBit.audio.levelSPL->setUnit(LEVEL_DETECTOR_SPL_8BIT);
}

#endif

/**
* Registers an event that runs when a sound is detected
*/
//% help=input/on-sound
//% blockId=input_on_sound block="on %sound sound"
//% parts="microphone"
//% weight=88 blockGap=12
//% group="micro:bit (V2)"
void onSound(DetectedSound sound, Action handler) {
#if MICROBIT_CODAL
    init();
    const auto thresholdType = sound == DetectedSound::Loud ? LEVEL_THRESHOLD_HIGH : LEVEL_THRESHOLD_LOW;
    registerWithDal(DEVICE_ID_SYSTEM_LEVEL_DETECTOR, thresholdType, handler);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}

/**
* Reads the loudness through the microphone from 0 (silent) to 255 (loud)
*/
//% help=input/sound-level
//% blockId=device_get_sound_level block="sound level"
//% parts="microphone"
//% weight=34 blockGap=8
//% group="micro:bit (V2)"
int soundLevel() {
#if MICROBIT_CODAL
    init();
    return uBit.audio.levelSPL->getValue();
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
    return 0;
#endif
}

/**
* Sets the threshold for a sound type.
*/
//% help=input/set-sound-threshold
//% blockId=input_set_sound_threshold block="set %sound sound threshold to %value"
//% parts="microphone"
//% threshold.min=0 threshold.max=255 threshold.defl=128
//% weight=14 blockGap=8
//% advanced=true
//% group="micro:bit (V2)"
void setSoundThreshold(SoundThreshold sound, int threshold) {
#if MICROBIT_CODAL
    init();
    LevelDetectorSPL* level = uBit.audio.levelSPL;
    if (NULL == level)
        return;
    if (SoundThreshold::Loud == sound)
        level->setHighThreshold(threshold);
    else
        level->setLowThreshold(threshold);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}
}