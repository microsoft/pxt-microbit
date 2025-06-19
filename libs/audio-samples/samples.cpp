#include "pxt.h"
#include "MicroBit.h"

#if MICROBIT_CODAL
#include "SampleSource.h"
#endif

using namespace pxt;

namespace samples {

/**
 * Enable audio
 */
//%
void enable() {
    #if MICROBIT_CODAL
        uBit.audio.enable();
    #else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
    #endif
}


/**
 *  Disable audio
 */
//%
void disable() {
    #if MICROBIT_CODAL
        uBit.audio.disable();
    #else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
    #endif
}

/**
 * Set the sample rate
 */
//%
void setSampleRate(int src, int sampleRate) {
    #if MICROBIT_CODAL
        if (0 <= src && src < 4)
            uBit.audio.sampleSource[src]->setSampleRate(sampleRate);
    #else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
    #endif
}

bool isValidSample(Buffer buf) {
    if (!buf)
        return false;

    // TODO: other checks here
    return true;
}

/**
 * Play a sample
 */
//%
void playAsync(int src, Buffer buf) {
    #if MICROBIT_CODAL
        if (0 <= src && src < 4 && isValidSample(buf))
            uBit.audio.sampleSource[src]->playAsync(buf->data, buf->length);
    #else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
    #endif
}

}
