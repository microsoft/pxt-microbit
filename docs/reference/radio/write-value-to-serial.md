# Write Value To Serial

Writes the data received by ``radio`` to serial in JSON format.

```sig
radio.writeValueToSerial();
```

### ~hint

This method only works for [send number](/reference/radio/send-number)
and [send value](/reference/radio/send-value). It does not work for
[send string](/reference/radio/send-string), although you can send a
string as part of [send value](/reference/radio/send-value).

### ~

### Data received format

The format for received data printed to serial is as follows:

- [send number](/reference/radio/send-number): ```{v:ValueSent,t:MicrobitTimeAlive,s:Unused}```
- [send value](/reference/radio/send-value): ```{v:ValueSent,t:MicrobitTimeAlive,s:Unused,n:"Name"}```

### Simulator

This function only works on the micro:bit, not in browsers.

### Examples

When ```radio``` data is received (after pressing the ``A`` button on
the second micro:bit), this program sends temperature data to
serial.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(input.temperature());
});
radio.onDataReceived(() => {
    radio.writeValueToSerial();
});
```
Sample output to serial when ``A`` button pressed:

```Text
{v:27,t:323,s:0}
```

### See also

[send number](/reference/radio/send-number),
[send value](/reference/radio/send-value),
[on data received](/reference/radio/on-data-received)

```package
radio
```