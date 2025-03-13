#include "pxt.h"
#include "MicroBit.h"

#if MICROBIT_CODAL
#include "SampleSource.h"
#endif

using namespace pxt;

namespace samples {

/**
 * Set the sample rate
 */
//%
int setSampleRate(int sampleRate) {
    #if MICROBIT_CODAL
        return uBit.audio.sampleSource->setSampleRate(sampleRate);
    #else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
        return MICROBIT_NOT_SUPPORTED;
    #endif
}

}

/*
main()
{
    uBit.init();
    uBit.audio.enable();
   
    while(1)
    {
        uBit.sleep(2000);
       
        uBit.audio.sampleSource[0]->setSampleRate(11000);
        uBit.audio.sampleSource[0]->playAsync(strings9, sizeof(strings9));
        uBit.audio.sampleSource[1]->setSampleRate(11000);
        uBit.audio.sampleSource[1]->playAsync(strings9, sizeof(strings9));
        uBit.audio.sampleSource[2]->setSampleRate(6000);
        uBit.audio.sampleSource[2]->playAsync(strings9, sizeof(strings9));
        uBit.audio.sampleSource[3]->setSampleRate(13000);
        uBit.audio.sampleSource[3]->playAsync(strings9, sizeof(strings9));      
    }
 
    return 0;
}

*/