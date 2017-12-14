# Serial Redirect To

Dynamically configure the serial instance to use pins other than
``USBTX`` and ``USBRX``.

```sig
serial.redirect(SerialPin.P0, SerialPin.P0, BaudRate.BaudRate115200);
```

## Parameters

* ``tx``: the [serial pin](/device/pins) on which to transmit data 
* ``rx``: the [serial pin](/device/pins) on which to receive data 
* ``rate``: the baud rate at which to transmit and receive data (either `9600` or ``115200``)

## Example

When button ``A`` is pressed, the following example reconfigures the
serial instance. The new configuration uses pin ``P1`` to transmit and
``P2`` to receive, at a baud rate of `9600`.

```blocks
input.onButtonPressed(Button.A, () => {
    serial.redirect(SerialPin.P1, SerialPin.P2, BaudRate.BaudRate9600);
});
```

## See also

[serial](/device/serial),
[redirectToUSB](/reference/serial/redirect-to-usb)

