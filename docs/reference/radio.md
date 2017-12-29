# Radio

Communicate data using radio packets

```cards
radio.sendNumber(0);
radio.sendValue("name", 0);
radio.sendString("");
radio.onDataPacketReceived(({ receivedNumber }) => {

});
radio.setGroup(0);
radio.setTransmitPower(7);
radio.setTransmitSerialNumber(false);
radio.writeReceivedPacketToSerial();
radio.sendBuffer(null);
```

```package
radio
```

## See Also

[sendNumber](/reference/radio/send-number),
[sendValue](/reference/radio/send-value),
[sendString](/reference/radio/send-string),
[sendBuffer](/reference/radio/send-buffer),
[onDataPacketReceived](/reference/radio/on-data-packet-received),
[setGroup](/reference/radio/set-group),
[setTransmitPower](/reference/radio/set-transmit-power),
[setTransmitSerialNumber](/reference/radio/set-transmit-serial-number),
[writeReceivedPacketToSerial](/reference/radio/write-received-packet-to-serial)
