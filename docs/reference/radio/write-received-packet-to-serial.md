# Write Received Packet To Serial

Writes the last packet received by the ``radio`` to serial in JSON format.
Should be called within a callback to
[on data packet received](/reference/radio/on-data-packet-received).

```sig
radio.writeReceivedPacketToSerial();
```

## Data received format

The format for received data printed to serial is as follows:

- [send number](/reference/radio/send-number): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber}```
- [send value](/reference/radio/send-value): ```{v:ValueSent,t:MicrobitTimeAlive,s:SerialNumber,n:"Name"}```
- [send string](/reference/radio/send-string): ```{t:MicrobitTimeAlive,s:SerialNumber,n:"Text"}```

## Examples

When ```radio``` data is received (after pressing the ``A`` button on
the second @boardname@), this program sends temperature data to
serial.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(input.temperature());
});
radio.onDataPacketReceived(() => {
    radio.writeReceivedPacketToSerial();
});
```
Sample output to serial when ``A`` button pressed:

```Text
{v:27,t:323,s:0}
```

## See also

[send number](/reference/radio/send-number),
[send value](/reference/radio/send-value),
[send string](/reference/radio/send-string),
[on data packet received](/reference/radio/on-data-packet-received)

```package
radio
```