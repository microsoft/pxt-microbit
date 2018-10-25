#include "pxt.h"

#define MICROBIT_SERIAL_READ_BUFFER_LENGTH 64

// make sure USB_TX and USB_RX don't overlap with other pin ids
enum SerialPin {
    P0 = MICROBIT_ID_IO_P0,
    P1 = MICROBIT_ID_IO_P1,
    P2 = MICROBIT_ID_IO_P2,
    P8 = MICROBIT_ID_IO_P8,
    P12 = MICROBIT_ID_IO_P12,
    P13 = MICROBIT_ID_IO_P13,
    P14 = MICROBIT_ID_IO_P14,
    P15 = MICROBIT_ID_IO_P15,
    P16 = MICROBIT_ID_IO_P16,
    USB_TX = 1001,
    USB_RX = 1002
};

enum BaudRate {
  //% block=115200
  BaudRate115200 = 115200,
  //% block=57600
  BaudRate57600 = 57600,
  //% block=38400
  BaudRate38400 = 38400,
  //% block=31250
  BaudRate31250 = 31250,
  //% block=28800
  BaudRate28800 = 28800,
  //% block=19200
  BaudRate19200 = 19200,
  //% block=14400
  BaudRate14400 = 14400,
  //% block=9600
  BaudRate9600 = 9600,
  //% block=4800
  BaudRate4800 = 4800,
  //% block=2400
  BaudRate2400 = 2400,
  //% block=1200
  BaudRate1200 = 1200,
  //% block=300
  BaudRate300 = 300
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

//% weight=2 color=#002050 icon="\uf287"
//% advanced=true
namespace serial {
    // note that at least one // followed by % is needed per declaration!

    /**
     * Read a line of text from the serial port and return the buffer when the delimiter is met.
     * @param delimiter text delimiter that separates each text chunk
     */
    //% help=serial/read-until
    //% blockId=serial_read_until block="serial|read until %delimiter=serial_delimiter_conv"
    //% weight=19
    String readUntil(String delimiter) {
      return PSTR(uBit.serial.readUntil(MSTR(delimiter)));
    }

    /**
    * Read the buffered received data as a string
    */
    //% help=serial/read-string
    //% blockId=serial_read_buffer block="serial|read string"
    //% weight=18
    String readString() {
      int n = uBit.serial.getRxBufferSize();
      if (n == 0) return mkString("", 0);
      return PSTR(uBit.serial.read(n, MicroBitSerialMode::ASYNC));
    }

    /**
    * Register an event to be fired when one of the delimiter is matched.
    * @param delimiters the characters to match received characters against.
    */
    //% help=serial/on-data-received
    //% weight=18 blockId=serial_on_data_received block="serial|on data received %delimiters=serial_delimiter_conv"
    void onDataReceived(String delimiters, Action body) {
      uBit.serial.eventOn(MSTR(delimiters));
      registerWithDal(MICROBIT_ID_SERIAL, MICROBIT_SERIAL_EVT_DELIM_MATCH, body);
      // lazy initialization of serial buffers
      uBit.serial.read(MicroBitSerialMode::ASYNC);
    }

    /**
     * Send a piece of text through the serial connection.
     */
    //% help=serial/write-string
    //% weight=87 blockGap=8
    //% blockId=serial_writestring block="serial|write string %text"
    //% text.shadowOptions.toString=true
    void writeString(String text) {
      if (!text) return;

      uBit.serial.send(MSTR(text));
    }

    /**
    * Send a buffer through serial connection
    */
    //% blockId=serial_writebuffer block="serial|write buffer %buffer=serial_readbuffer"
    //% help=serial/write-buffer advanced=true weight=6
    void writeBuffer(Buffer buffer) {
      if (!buffer) return;

      uBit.serial.send(buffer->data, buffer->length);
    }

    /**
    * Read multiple characters from the receive buffer. Pause until enough characters are present.
    * @param length default buffer length, eg: 64
    */
    //% blockId=serial_readbuffer block="serial|read buffer %length"
    //% help=serial/read-buffer advanced=true weight=5
    Buffer readBuffer(int length) {
      if (length <= 0)
        length = MICROBIT_SERIAL_READ_BUFFER_LENGTH;

      auto buf = mkBuffer(NULL, length);
      int read = uBit.serial.read(buf->data, buf->length);
      if (read != length) {
        auto prev = buf;
        buf = mkBuffer(buf->data, read);
        decrRC(prev);
      }

      return buf;
    }

    bool tryResolvePin(SerialPin p, PinName& name) {
      switch(p) {
        case SerialPin::USB_TX: name = USBTX; return true;
        case SerialPin::USB_RX: name = USBRX; return true;
        default: 
          auto pin = getPin(p); 
          if (NULL != pin) {
            name = pin->name;
            return true;
          }
      }
      return false;
    }

    /**
    * Set the serial input and output to use pins instead of the USB connection.
    * @param tx the new transmission pin, eg: SerialPin.P0
    * @param rx the new reception pin, eg: SerialPin.P1
    * @param rate the new baud rate. eg: 115200
    */
    //% weight=10
    //% help=serial/redirect
    //% blockId=serial_redirect block="serial|redirect to|TX %tx|RX %rx|at baud rate %rate"
    //% blockExternalInputs=1
    //% tx.fieldEditor="gridpicker" tx.fieldOptions.columns=3
    //% tx.fieldOptions.tooltips="false"
    //% rx.fieldEditor="gridpicker" rx.fieldOptions.columns=3
    //% rx.fieldOptions.tooltips="false"
    //% blockGap=8
    void redirect(SerialPin tx, SerialPin rx, BaudRate rate) {
      PinName txn;
      PinName rxn;
      if (tryResolvePin(tx, txn) && tryResolvePin(rx, rxn))
        uBit.serial.redirect(txn, rxn);
      uBit.serial.baud((int)rate);
    }

    /**
    * Direct the serial input and output to use the USB connection.
    */
    //% weight=9 help=serial/redirect-to-usb
    //% blockId=serial_redirect_to_usb block="serial|redirect to USB"
    void redirectToUSB() {
      uBit.serial.redirect(USBTX, USBRX);
      uBit.serial.baud(115200);
    }
}
