#include "pxt.h"

namespace pins {
    void analogSetPitchVolume(int volume);
    int analogPitchVolume();
}

namespace music {
/**
 * Set the default output volume of the sound synthesizer.
 * @param volume the volume 0...255
 */
//% blockId=synth_set_volume block="set volume %volume"
//% parts="speaker"
//% volume.min=0 volume.max=255
//% volume.defl=127
//% help=music/set-volume
//% weight=70
//% group="Volume"
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
//% parts="speaker"
//% help=music/volume
//% weight=69
//% group="Volume"
int volume() {
#if MICROBIT_CODAL
    return uBit.audio.getVolume();
#else
    return pins::analogPitchVolume();
#endif
}
}