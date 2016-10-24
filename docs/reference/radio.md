# Radio

Communicate data using radio packets

```cards
radio.sendNumber(0);
radio.sendValue("data", 0);
radio.sendString("");
radio.onDataReceived(() => {
    
});
radio.receiveNumber();
radio.receivedNumberAt(0);
radio.receiveString();
radio.receivedSignalStrength();
radio.setGroup(0);
radio.setTransmitPower(7);
radio.setTransmitSerialNumber(false);
radio.writeValueToSerial();
```

```package
radio
```

### See Also

[sendNumber](/reference/radio/send-number), [sendValue](/reference/radio/send-value), [sendString](/reference/radio/send-string), [onDataReceived](/reference/radio/on-data-received), [receiveNumber](/reference/radio/receive-number), [receiveString](/reference/radio/receive-string), [receivedSignalStrength](/reference/radio/received-signal-strength), [setGroup](/reference/radio/set-group), [setTransmitPower](/reference/radio/set-transmit-power), [setTransmitSerialNumber](/reference/radio/set-transmit-serial-number), [writeValueToSerial](/reference/radio/write-value-to-serial)
