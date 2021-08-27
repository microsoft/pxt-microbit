# set Baud Rate

Set the baud rate of the serial connection.

```sig
serial.setBaudRate(BaudRate.BaudRate115200)
```

The baud rate of the serial connection is the speed at which it will transmit data. You can set one of several standard rates for the transmit speed. The receiving @boardname@ or device must be set to receive data at the same speed as the sending @boardname@.

### ~ hint

#### Bits and bauds

Baud, or _baud rate_, is a very old measure of data speed. It originates from the early days of _teletype_ when characters of the alphabet were transmitted over telegraph wires. Signal changes on the wires are used to encode a sequence of bits that represented a character in a message. The baud rate is how many times per second these signal changes happen. When binary data (digital bits) is transmitted over an analog system, like telegraph or telephone wires, the bits are _modulated_ by
a signal changing scheme to represent them. Sometimes mutliple bits are transmitted in a signal
change which makes the actual _bit rate_ faster than the baud rate.

### ~

## Parameters

* **rate**: The baud rate to set for the serial connection. The default rate is `115200` baud, The rates to choose from are:
>* `1200` baud
>* `2400` baud
>* `4800` baud
>* `9600` baud
>* `14400` baud
>* `19200` baud
>* `28800` baud
>* `31250` baud
>* `38400` baud
>* `57600` baud
>* `115200` baud

### ~reminder

#### Logging serial data

In order for the serial console log to record your serial data, the baud rate MUST remain
at `115200` (the default).

### ~

## Example

Set the baud rate to `9600` and send a message over USB serial to a computer.

```blocks
serial.setBaudRate(BaudRate.BaudRate9600)
serial.writeString("This is my SERIAL message!")
```

## See also

[redirect](/reference/serial/redirect)