# Write Received Packet To Serial

Writes the last packet received by the ``radio`` to serial in JSON format.
Should be called within a callback to
[on data packet received](/reference/radio/on-data-packet-received).

```sig
radio.writeReceivedPacketToSerial();
```

## Data received format

The format for received data when these send functions are used:

- [send number](/reference/radio/send-number): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber}```
- [send value](/reference/radio/send-value): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber,n:"Name"}```
- [send string](/reference/radio/send-string): ```{t:MicrobitTimeAlive,s:SerialNumber,n:"Text"}```

### ~hint

The serial number value sent in the packet is set to `0` unless transmission of the serial number is enabled with ``||radio:radio set transmit serial number||``.

### ~

## Example

When ```radio``` data is received (after pressing the ``A`` button on
the second @boardname@), this program sends temperature data to the 
serial port.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(input.temperature());
    radio.sendValue("temperature", input.temperature());
    radio.sendString("It's warm now");


});
radio.onReceivedNumber(function (receivedNumber) {
    radio.writeReceivedPacketToSerial();
});
```
Sample output to serial when ``A`` button pressed:

```json
{"t":323,"s":0,"v":27}
{"t":325,"s":0,"n":"temperature","v":27}
{"t":326,"s":0,"n":"It's warm now"}
```

## See also

[send number](/reference/radio/send-number),
[send value](/reference/radio/send-value),
[send string](/reference/radio/send-string),
[on data packet received](/reference/radio/on-data-packet-received),
[set transmit serial number](/reference/radio/set-transmit-serial-number)

```package
radio
```