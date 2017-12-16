# redirect

Configure the serial port to use the pins instead of USB.

```sig
serial.redirect(SerialPin.P0, SerialPin.P0, BaudRate.BaudRate115200);
```
The default connection for the serial port is over a USB cable. You can have the serial data go across wires connected to pins on the @boardname@ instead. To set the input and output for the serial connection to be on the pins, you redirect it to the pins. Also, you decide how fast you want to send and receive the data on the pins by choosing a _baud_ rate.

## Parameters

* **tx**: the transmit [pin](/device/pins) to send serial data on.
* **rx**: the receive [pin](/device/pins) to receive serial data on.
* **rate**: the baud rate for transmitting and receiving data. Baud rates you can choose from are:
>`300`, `1200`, `2400`, `4800`, `9600`, `14400`, `19200,`, `28800`, `31250`, `38400`, `57600`, or `115200`

## ~hint
**Baud rate**

Serial communication transmits data by sending one bit of a [digital number](/types/buffer/number-format) (usually a byte sized number), at a time. So, the data bytes are sent as a series of their bits. Serial communication uses just one wire to send these bits so only one bit can travel across the wire at a time.

When pins on your @boardname@ are configured for serial communication, they make a serial port for data. The port switches the voltage on the pins to represent a new bit to send on the wire. A series of these voltage changes eventually sends a complete byte of data. The speed at which the voltage changes create a signal to communicate the bits is called the _baud_ rate.

You will typically use `9600` or `115200` for your baud rate. Sometimes the device you connect to can figure out what your baud rate is. Most of the time though, you need to make sure the device you connect to is set to match your baud rate.

## ~

## Example

Change where serial data is sent to and received from. When button **A** is pressed, reconfigure the
serial port to use the pins. The new configuration uses pin ``P1`` to transmit and
``P2`` to receive. The baud rate is set to `9600`.

```blocks
input.onButtonPressed(Button.A, () => {
    serial.redirect(SerialPin.P1, SerialPin.P2, BaudRate.BaudRate9600);
});
```

## See also

[serial](/device/serial),
[redirectToUSB](/reference/serial/redirect-to-usb)

