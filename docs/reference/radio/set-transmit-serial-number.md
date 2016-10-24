# Set Transmit Serial Number

Make the ``radio`` packet embed the board serial number with each packet of data.

```sig
radio.setTransmitSerialNumber(true);
```

### Parameters

* ``transmit`` is a [boolean](/reference/types/boolean) that represents whether the serial number needs to be transmitted.

### Simulator

This function only works on the micro:bit, not in browsers.

### Example

This program makes the ``radio`` send the serial number in each packet.

```blocks
radio.setTransmitSerialNumber(true);
```

### See also

[receive number](/reference/radio/receive-number), [send number](/reference/radio/send-number), [on data received](/reference/radio/on-data-received)

```package
radio
```