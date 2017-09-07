# Set Transmit Serial Number

Make the ``radio`` packet embed the board serial number with each packet of data.

```sig
radio.setTransmitSerialNumber(true);
```

## Parameters

* ``transmit`` is a [boolean](/types/boolean) that represents whether the serial number needs to be transmitted.

## Example

This program makes the ``radio`` send the serial number in each packet.

```blocks
radio.setTransmitSerialNumber(true);
```

## See also

[on data packet received](/reference/radio/on-data-packet-received),
[send number](/reference/radio/send-number),
[send value](/reference/radio/send-value),
[send string](/reference/radio/send-string)

```package
radio
```