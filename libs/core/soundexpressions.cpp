#include "pxt.h"

namespace music {
    /**
     * Internal use only
     **/
    //% async
    void __playSoundExpression(String nodes, bool waitTillDone) {
#if MICROBIT_CODAL
        if (waitTillDone)
            uBit.audio.soundExpressions.play(MSTR(nodes));
        else
            uBit.audio.soundExpressions.playAsync(MSTR(nodes));
#else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
    }

    /**
    * Internal use only
    */
    //% 
    void __stopSoundExpressions() {
#if MICROBIT_CODAL
        uBit.audio.soundExpressions.stop();
#endif
    }
}