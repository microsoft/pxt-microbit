// The fallback logic below still requires level detection.
// It's only kept with a view to syncing with the common-packages in future.

#include "pxt.h"

#if MICROBIT_CODAL
#include "LevelDetector.h"
#include "LevelDetectorSPL.h"
#include "DataStream.h"

#ifndef MIC_DEVICE
// STM?
class DummyDataSource : public codal::DataSource {
  public:
    DummyDataSource() {}
};
class PanicPDM {
  public:
    uint8_t level;
    DummyDataSource source;
    codal::DataStream output;

    PanicPDM(Pin &sd, Pin &sck) : output(source) { target_panic(PANIC_MICROPHONE_MISSING); }
    void enable() {}
    void disable() {}
};
#define MIC_DEVICE PanicPDM
#endif

#ifndef MIC_INIT
#define MIC_INIT                                                                                   \
        : microphone(*LOOKUP_PIN(MIC_DATA), *LOOKUP_PIN(MIC_CLOCK)) \
        , level(microphone.output, 95.0, 75.0, 9, 52, DEVICE_ID_MICROPHONE)
#endif

#ifndef MIC_ENABLE
#define MIC_ENABLE microphone.enable()
#endif

namespace pxt {

class WMicrophone {
  public:
    MIC_DEVICE microphone;
    LevelDetectorSPL level;
    WMicrophone() MIC_INIT { MIC_ENABLE; }
};
SINGLETON(WMicrophone);

codal::LevelDetectorSPL *getMicrophoneLevel() {
    auto wmic = getWMicrophone();
    return wmic ? &(wmic->level) : NULL;
}

} // namespace pxt
#endif