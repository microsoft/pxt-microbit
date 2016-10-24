# On Data Packet Received

Run part of a program when the micro:bit receives a
[number](/reference/types/number) or [string](/reference/types/string) over ``radio``.


```sig
radio.onDataPacketReceived((packet: Packet) => { });
```

### Callback Parameters

* ``packet`` - the [packet](/reference/radio/packet) that was received by the radio

### Example

This program keeps sending numbers that says how fast the micro:bit is
slowing down or speeding up.  It also receives numbers for the same
thing from nearby micro:bits. It shows these numbers as a
[bar graph](/reference/led/plot-bar-graph).

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.X));
})
radio.onDataPacketReceived(({ receivedNumber }) => {
    led.plotBarGraph(receivedNumber, 1023);
})
```

### See also

[send number](/reference/radio/send-number),
[send string](/reference/radio/send-string),
[send value](/reference/radio/send-value),
[set group](/reference/radio/set-group)

```package
radio
```