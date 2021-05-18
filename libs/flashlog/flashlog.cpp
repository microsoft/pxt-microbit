#include "pxt.h"

#if MICROBIT_CODAL
#include "MicroBitLog.h"
#endif

namespace flashlog {

/**
* Creates a new row in the log, ready to be populated by logData()
**/
//% help=flashlog/begin-row
//% parts="flashlog"
//% blockGap=8
//% group="micro:bit (V2)"
int beginRow() {
#if MICROBIT_CODAL
    return uBit.log.beginRow();
#else
    return DEVICE_NOT_SUPPORTED;
#endif
}

/**
* Populates the current row with the given key/value pair.
**/
//% help=flashlog/log-data
//% parts="flashlog"
//% blockGap=8
//% group="micro:bit (V2)"
int logData(ManagedString key, ManagedString value) {
#if MICROBIT_CODAL
    return uBit.log.logData(key, value);
#else
    return DEVICE_NOT_SUPPORTED;
#endif
}

/**
* Inject the given row into the log as text, ignoring key/value pairs.
**/
//% help=flashlog/log-string
//% parts="flashlog"
//% blockGap=8
//% group="micro:bit (V2)"
int logString(ManagedString value) {
#if MICROBIT_CODAL
    return uBit.log.logString(value);
#else
    return DEVICE_NOT_SUPPORTED;
#endif
}

/**
* Complete a row in the log, and pushes to persistent storage.
**/
//% help=flashlog/end-row
//% parts="flashlog"
//% blockGap=8
//% group="micro:bit (V2)"
int endRow() {
#if MICROBIT_CODAL
    return uBit.log.endRow();
#else
    return DEVICE_NOT_SUPPORTED;
#endif
}

/**
* Resets all data stored in persistent storage.
**/
//% help=flashlog/clear
//% parts="flashlog"
//% blockGap=8
//% group="micro:bit (V2)"
void clear() {
#if MICROBIT_CODAL
    uBit.log.format();
#endif
}

 /**
* Determines the format of the timestamp data to be added (if any).
* If requested, time stamps will be automatically added to each row of data
* as an integer value rounded down to the unit specified.
* 
* @param format The format of timestamp to use. 
*/
void setTimeStamp(TimeStampFormat format) {
#if MICROBIT_CODAL
    return uBit.log.setTimeStamp(format);
#endif
}

}
