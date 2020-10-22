#include "pxt.h"

#if MICROBIT_CODAL
#include "LevelDetector.h"
#include "LevelDetectorSPL.h"
#endif

#define MICROPHONE_MIN 52.0f
#define MICROPHONE_MAX 120.0f

namespace pxt {
#if MICROBIT_CODAL
    codal::LevelDetectorSPL* getMicrophoneLevel();
#endif   
}

namespace input {
/**
* Registers an event that runs when a loud sound is detected
*/
//% help=input/on-loud-sound
//% blockId=input_on_loud_sound block="on loud sound"
//% parts="microphone"
//% weight=88 blockGap=12
//% group="micro:bit v2"
void onLoudSound(Action handler) {
#if MICROBIT_CODAL
    pxt::getMicrophoneLevel(); // wake up service
    registerWithDal(DEVICE_ID_MICROPHONE, LEVEL_THRESHOLD_HIGH, handler);
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
//% group="micro:bit v2"
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
* Sets the minimum threshold for a loud sound
*/
//% help=input/set-loud-sound-threshold
//% blockId=input_set_loud_sound_threshold block="set loud sound threshold %value"
//% parts="microphone"
//% value.min=1 value.max=255
//% weight=14 blockGap=8
//% group="micro:bit v2"
void setLoudSoundThreshold(int value) {
#if MICROBIT_CODAL
    auto level = pxt::getMicrophoneLevel();
    if (NULL == level)
        return;

    auto threshold = max(0, min(0xff, value));
    const int scaled = MICROPHONE_MIN + threshold * (MICROPHONE_MAX - MICROPHONE_MIN) / 0xff;
    level->setHighThreshold(scaled);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}

}