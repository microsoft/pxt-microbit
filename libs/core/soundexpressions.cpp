#include "pxt.h"

namespace music {
    /**
     * Internal use only
     **/
    //%
    void __playSoundExpression(String nodes, bool waitTillDone) {
#if MICROBIT_CODAL
        if (waillTillDone)
            uBit.audio.soundExpressions.play(nodes);
        else
            uBit.audio.soundExpressions.playAsync(nodes);
#else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
    }
}