/**
* File system operations
*/
//% weight=5 color=#002050
namespace files {
    /**
    * Appends a number to a file
    * @param filename file name, eg: "output.txt"
    * @param value the value to write to the file
    */
    //% blockId="fs_append_number" block="file %filename|append number %value"
    //% blockExternalInputs=1 weight=85
    export function appendNumber(filename: string, value: number) {
        files.appendString(filename, value.toString());
    }
}