#include "pxt.h"

#if MICROBIT_CODAL
#include "LevelDetector.h"
#include "LevelDetectorSPL.h"
#endif

#define MICROPHONE_MIN 52.0f
#define MICROPHONE_MAX 120.0f

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

namespace pxt {
#if MICROBIT_CODAL
    codal::LevelDetectorSPL* getMicrophoneLevel();
#endif
}

namespace input {

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
    pxt::getMicrophoneLevel(); // wake up service
    const auto thresholdType = sound == DetectedSound::Loud ? LEVEL_THRESHOLD_HIGH : LEVEL_THRESHOLD_LOW;
    registerWithDal(DEVICE_ID_MICROPHONE, thresholdType, handler);
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
    auto level = pxt::getMicrophoneLevel();
    if (NULL == level)
        return 0;
    const int micValue = level->getValue();
    const int scaled = max(MICROPHONE_MIN, min(micValue, MICROPHONE_MAX)) - MICROPHONE_MIN;
    return min(0xff, scaled * 0xff / (MICROPHONE_MAX - MICROPHONE_MIN));
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
    auto level = pxt::getMicrophoneLevel();
    if (NULL == level)
        return;

    threshold = max(0, min(0xff, threshold));
    const int scaled = MICROPHONE_MIN + threshold * (MICROPHONE_MAX - MICROPHONE_MIN) / 0xff;
    if (SoundThreshold::Loud == sound)
        level->setHighThreshold(scaled);
    else
        level->setLowThreshold(scaled);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}
}