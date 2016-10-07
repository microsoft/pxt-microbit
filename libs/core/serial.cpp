#include "ksbit.h"

enum class SerialPin {
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

enum class BaudRate {
  //% block=115200
  BaudRate115200 = 115200,
  //% block=9600
  BaudRate9600 = 9600
};

//% weight=2 color=30
namespace serial {
    // note that at least one // followed by % is needed per declaration!
    
    /**
     * Reads a line of text from the serial port.
     */
    //% help=serial/read-line
    //% blockId=serial_read_line block="serial read line"
    //% weight=20
    StringData* readLine() {
      return uBit.serial.readUntil(ManagedString("\n")).leakData();
    }

    /**
     * Sends a piece of text through Serial connection.
     */
    //% help=serial/write-string
    //% weight=87
    //% blockId=serial_writestring block="serial write string %text"
    void writeString(StringData *text) { 
      uBit.serial.send(ManagedString(text));
    }
    
    /**
    * Registers an event to be fired when one of the delimiter is matched
    * @param delimiters the characters to match received characters against. eg:"\n"
    */
    // help=serial/on-data-received
    // weight=19
    void onDataReceived(StringData* delimiters, Action body) {
      uBit.serial.eventOn(ManagedString(delimiters));
      registerWithDal(MICROBIT_ID_SERIAL, MICROBIT_SERIAL_EVT_DELIM_MATCH, body);
    }
    
    /**
    * Dynamically configuring the serial instance to use pins other than USBTX and USBRX.
    * @param tx the new transmission pins
    * @param rx the new reception pin
    * @param baud the new baud rate. eg: 115200
    */
    //% weight=10
    //% help=serial/redirect-to
    //% blockId=serial_redirect block="serial redirect to|TX %tx|RX %rx|at baud rate %rate"
    //% blockExternalInputs=1
    void redirect(SerialPin tx, SerialPin rx, BaudRate rate) {
      uBit.serial.redirect((PinName)tx, (PinName)rx);
      uBit.serial.baud((int)rate);
    }
}
