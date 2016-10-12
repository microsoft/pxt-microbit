#include "ksbit.h"

enum SerialPin {
    P0 = MICROBIT_ID_IO_P0,
    P1 = MICROBIT_ID_IO_P1,
    P2 = MICROBIT_ID_IO_P2,
    P8 = MICROBIT_ID_IO_P8,
    P12 = MICROBIT_ID_IO_P12,
    P13 = MICROBIT_ID_IO_P13,
    P14 = MICROBIT_ID_IO_P14,
    P15 = MICROBIT_ID_IO_P15,
    P16 = MICROBIT_ID_IO_P16
};

enum BaudRate {
  //% block=115200
  BaudRate115200 = 115200,
  //% block=9600
  BaudRate9600 = 9600
};

enum Delimiters {
    //% block="new line"
    NewLine = 1,
    //% block=","
    Comma = 2,
    //% block="$"
    Dollar = 3,
    //% block=":"
    Colon = 4,
    //% block="."
    Fullstop = 5,
    //% block="#"
    Hash = 6,
};

//% weight=2 color=30
//% advanced=true
namespace serial {
    // note that at least one // followed by % is needed per declaration!

    /**
     * Reads a line of text from the serial port and returns the buffer when the delimiter is met.
     * @param delimiter text delimiter that separates each text chunk
     */
    //% help=serial/read-until
    //% blockId=serial_read_until block="serial|read until %delimiter=serial_delimiter_conv"
    //% weight=19
    StringData* readUntil(StringData* delimiter) {
      return uBit.serial.readUntil(ManagedString(delimiter)).leakData();
    }

    /**
     * Reads a line of text from the serial port.
     */
    //% help=serial/read-line
    //% blockId=serial_read_line block="serial|read line"
    //% weight=20 blockGap=8
    StringData* readLine() {
      return readUntil(ManagedString("\n").leakData());
    }

    /**
    * Registers an event to be fired when one of the delimiter is matched
    * @param delimiters the characters to match received characters against. eg:"\n"
    */
    // help=serial/on-data-received
    // weight=18
    void onDataReceived(StringData* delimiters, Action body) {
      uBit.serial.eventOn(ManagedString(delimiters));
      registerWithDal(MICROBIT_ID_SERIAL, MICROBIT_SERIAL_EVT_DELIM_MATCH, body);
    }

    /**
     * Sends a piece of text through Serial connection.
     */
    //% help=serial/write-string
    //% weight=87
    //% blockId=serial_writestring block="serial|write string %text"
    void writeString(StringData *text) {
      uBit.serial.send(ManagedString(text));
    }

    /**
    * Dynamically configuring the serial instance to use pins other than USBTX and USBRX.
    * @param tx the new transmission pins
    * @param rx the new reception pin
    * @param baud the new baud rate. eg: 115200
    */
    //% weight=10
    //% help=serial/redirect-to
    //% blockId=serial_redirect block="serial|redirect to|TX %tx|RX %rx|at baud rate %rate"
    //% blockExternalInputs=1
    void redirect(SerialPin tx, SerialPin rx, BaudRate rate) {
      uBit.serial.redirect((PinName)tx, (PinName)rx);
      uBit.serial.baud((int)rate);
    }
}
