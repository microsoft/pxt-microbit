# Radio

Send and receive data using radio packets.

```cards
radio.sendNumber(0);
radio.sendValue("name", 0);
radio.sendString("");
radio.onReceivedNumber(function (receivedNumber) { });
radio.onReceivedValue(function (name, value) { });
radio.onReceivedString(function (receivedString) { });
radio.receivedPacket(RadioPacketProperty.SignalStrength)
radio.setGroup(0);
```

## Advanced

```cards
radio.writeReceivedPacketToSerial();
radio.setTransmitPower(7);
radio.setTransmitSerialNumber(false);
radio.raiseEvent(0, 0);
```

```package
radio
```

## See Also

[send number](/reference/radio/send-number),
[send value](/reference/radio/send-value),
[send string](/reference/radio/send-string),
[on received number](/reference/radio/on-received-number),
[on received value](/reference/radio/on-received-value),
[on received string](/reference/radio/on-received-string),
[received packet](/reference/radio/received-packet),
[set group](/reference/radio/set-group),
[set transmit power](/reference/radio/set-transmit-power),
[set transmit serial number](/reference/radio/set-transmit-serial-number),
[write received packet to serial](/reference/radio/write-received-packet-to-serial),
[raise event](/reference/radio/raise-event)
