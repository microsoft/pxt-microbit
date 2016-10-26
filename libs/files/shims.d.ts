// Auto-generated. Do not edit.


    /**
     * File system operations
     */
    //% weight=5
declare namespace files {

    /**
     * Appends text and a new line to a file
     */
    //% blockId="files_append_line" block="file %name|append string %text"
    //% blockExternalInputs=1 shim=files::appendLine
    function appendLine(name: string, text: string): void;

    /**
     * Appends text and a new line to a file
     */
    //% blockId="fs_append_line" block="file %name|append line %text"
    //% blockExternalInputs=1 shim=files::appendString
    function appendString(name: string, text: string): void;
}

// Auto-generated. Do not edit. Really.
