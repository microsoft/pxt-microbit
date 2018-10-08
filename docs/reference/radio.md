# Radio

Communicate data using radio packets

```cards
radio.sendNumber(0);
radio.sendValue("name", 0);
radio.sendString("");
radio.onReceivedNumber(function (receivedNumber) { });
radio.onReceivedValue(function (name, value) { });
radio.onReceivedString(function (receivedString) { });
radio.setGroup(0);
radio.setTransmitPower(7);
radio.setTransmitSerialNumber(false);
radio.writeReceivedPacketToSerial();
radio.sendBuffer(null);
radio.raiseEvent(0, 0);
```

```package
radio
```

## See Also

[sendNumber](/reference/radio/send-number),
[sendValue](/reference/radio/send-value),
[sendString](/reference/radio/send-string),
[sendBuffer](/reference/radio/send-buffer),
[onReceivedNumber](/reference/radio/on-received-number),
[onReceivedValue](/reference/radio/on-received-value),
[onReceivedString](/reference/radio/on-received-string),
[setGroup](/reference/radio/set-group),
[setTransmitPower](/reference/radio/set-transmit-power),
[setTransmitSerialNumber](/reference/radio/set-transmit-serial-number),
[writeReceivedPacketToSerial](/reference/radio/write-received-packet-to-serial),
[raiseEvent](/reference/radio/raise-event)
