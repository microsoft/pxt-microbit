#include "pxt.h"

#if MICROBIT_CODAL
#include "MicroBitLog.h"
#endif

namespace flashlog {

/**
* Creates a new row in the log, ready to be populated by logData()
**/
//%
int beginRow() {
#if MICROBIT_CODAL
    return uBit.log.beginRow()
#else
    return DEVICE_NOT_SUPPORTED
#endif
}

/**
* Populates the current row with the given key/value pair.
**/
//%
int logData(ManagedString key, ManagedString value) {
#if MICROBIT_CODAL
    return uBit.log.logData(key, value)
#else
    return DEVICE_NOT_SUPPORTED
#endif
}

/**
* Populates the current row with the given key/value pair.
**/
//%
int endRow() {
#if MICROBIT_CODAL
    return uBit.log.endRow()
#else
    return DEVICE_NOT_SUPPORTED
#endif
}

}

#else


#endif