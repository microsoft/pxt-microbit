// Auto-generated. Do not edit.


    /**
     * File system operations
     */
    //% weight=5 color=#002050
declare namespace files {

    /**
     * Appends text and a new line to a file
     * @param filename file name, eg: "output.txt"
     * @param text the string to append to the end of the file
     */
    //% blockId="files_append_line" block="file %filename|append string %text"
    //% blockExternalInputs=1 weight=90 blockGap=8 shim=files::appendLine
    function appendLine(filename: string, text: string): void;

    /**
     * Appends text and a new line to a file
     * @param filename file name, eg: "output.txt"
     * @param text the string to append to the end of the file
     */
    //% blockId="fs_append_string" block="file %filename|append line %text"
    //% blockExternalInputs=1 weight=86 blockGap=8 shim=files::appendString
    function appendString(filename: string, text: string): void;

    /**
     * Removes the file. There is no undo for this operation.
     * @param filename name of the file to remove, eg: "output.txt"
     */
    //% blockId="fs_remove" block="file remove %filename"
    //% weight=50 shim=files::remove
    function remove(filename: string): void;
}

// Auto-generated. Do not edit. Really.
