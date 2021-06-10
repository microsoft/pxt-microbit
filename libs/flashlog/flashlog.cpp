#include "pxt.h"

#if MICROBIT_CODAL
#include "MicroBitLog.h"
#endif

enum class FlashLogTimeStampFormat
{
    //% block="none"
    None = 0,
    //% block="milliseconds"
    Milliseconds = 1,
    //% block="seconds"
    Seconds = 10,
    //% block="minutes"
    Minutes = 600,
    //% block="hours"
    Hours = 36000,
    //% block="days"
    Days = 864000
};

/**
 * Storing structured data in flash.
 */
//%
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
int logData(String key, String value) {
    if (NULL == key || NULL == value)
        return DEVICE_INVALID_PARAMETER;
#if MICROBIT_CODAL
    return uBit.log.logData(MSTR(key), MSTR(value));
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
int logString(String value) {
    if (NULL == value)
        return DEVICE_INVALID_PARAMETER;
#if MICROBIT_CODAL
    return uBit.log.logString(MSTR(value));
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
void clear(bool fullErase) {
#if MICROBIT_CODAL
    uBit.log.clear(fullErase);
#endif
}

/**
* Determines the format of the timestamp data to be added (if any).
* If requested, time stamps will be automatically added to each row of data
* as an integer value rounded down to the unit specified.
*
* @param format The format of timestamp to use.
*/
//% help=flashlog/set-timestamp
//% parts="flashlog"
//% blockGap=8
//% group="micro:bit (V2)"
void setTimeStamp(FlashLogTimeStampFormat format) {
#if MICROBIT_CODAL
    return uBit.log.setTimeStamp((codal::TimeStampFormat)format);
#endif
}

}
