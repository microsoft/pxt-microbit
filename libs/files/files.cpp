#include "pxt.h"
#include "MicroBitFile.h"

#define DEFAULT_CSV_FILENAME = "data.csv"
#define DEFAULT_FILENAME = "output.txt"

/**
* File system operations
*/
//% weight=5
namespace files {
    /**
    * Appends text and a new line to a file
    */
    //% blockId="files_append_line" block="file %name|append string %text"
    //% blockExternalInputs=1
    void appendLine(StringData* name, StringData* text) {
        if (!text) return;

        MicroBitFile f(name);
        f.append(text);
        f.append("\r\n");
        f.close();
    }

    /**
    * Appends text and a new line to a file
    */
    //% blockId="fs_append_line" block="file %name|append line %text"
    //% blockExternalInputs=1
    void appendString(StringData* name, StringData* text) {
        if (!text) return;

        MicroBitFile f(name);
        f.append(text);
        f.close();
    }
}