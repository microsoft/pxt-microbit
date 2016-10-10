#include "ksbit.h"

#define DEFAULT_FILENAME = "output.txt"
/**
* File system operation on the BBC micro:bit
*/
//% weight=5
namespace fs {
    /**
    * Appends text and a new line to a file "output.txt"
    */
    //% blockId="fs_write_line" block="file write line %text"
    void writeLine(StringData* text) {
        if (!text) return;

        MicroBitFile f(DEFAULT_FILENAME);
        f.append(text);
        f.append("\n");
        f.close();
    }
}