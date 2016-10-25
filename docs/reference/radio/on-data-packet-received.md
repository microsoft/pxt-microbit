# On Data Packet Received

Run part of a program when the micro:bit receives a
[number](/reference/types/number) or [string](/reference/types/string) over ``radio``.


```sig
radio.onDataPacketReceived(({receivedNumber, receivedString, time, serial, signal}) => { });
```

### ~hint

To add or remove the parts of the packet from the block, try clicking the blue gear in the corner!

### ~

### Callback Parameters

* ``packet`` - the [packet](/reference/radio/packet) that was received by the radio. The packet has the following properties:
  * `receivedNumber` - The [number](/reference/types/number) that was sent in this packet or `0` if this packet did not contain a number. See [send number](/reference/radio/send-number) and [send value](/reference/radio/send-value)
  * `receivedString` - The [string](/reference/types/string) that was sent in this packet or the empty string if this packet did not contain a string. See [send string](/reference/radio/send-string) and [send value](/reference/radio/send-value)
  * `time` - The system time of the micro:bit that sent this packet at the time the packet was sent.
  * `serial` - The serial number of the micro:bit that sent this packet or `0` if the micro:bit did not include its serial number.
  * `signal` - How strong the radio signal is from `255` (weak) to `0` (strong).

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