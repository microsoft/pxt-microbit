# On Data Packet Received

Run part of a program when the @boardname@ receives a
[number](/types/number) or [string](/types/string) over ``radio``.


```sig
radio.onDataPacketReceived(({receivedNumber, receivedString, time, serial, signal}) => { });
```

## ~hint

To add or remove the parts of the packet from the block, try clicking the blue gear in the corner!

## ~

## Callback Parameters

* ``packet`` - the [packet](/reference/radio/packet) that was received by the radio. The packet has the following properties:
  * `receivedNumber` - The [number](/types/number) that was sent in this packet or `0` if this packet did not contain a number. See [send number](/reference/radio/send-number) and [send value](/reference/radio/send-value)
  * `receivedString` - The [string](/types/string) that was sent in this packet or the empty string if this packet did not contain a string. See [send string](/reference/radio/send-string) and [send value](/reference/radio/send-value)
  * `time` - The system time of the @boardname@ that sent this packet at the time the packet was sent.
  * `serial` - The serial number of the @boardname@ that sent this packet or `0` if the @boardname@ did not include its serial number.
  * `signal` - How strong the radio signal is from `-128` (weak) to `-42` (strong).

## Example

This program keeps sending numbers that says how fast the @boardname@ is
slowing down or speeding up.  It also receives numbers for the same
thing from nearby @boardname@s. It shows these numbers as a
[bar graph](/reference/led/plot-bar-graph).

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.X));
})
radio.onReceivedNumber(function (receivedNumber) {
    led.plotBarGraph(receivedNumber, 1023);
})
```

## Example

This program uses the signal strength from received packets to graph the
approximate distance between two @boardname@s.

```blocks
basic.forever(() => {
    radio.sendNumber(0)
})
radio.onDataPacketReceived(({ signal, receivedNumber }) => {
    led.plotBarGraph(
        Math.abs(signal + 42),
        128 - 42
    )
})
```

## Troubleshooting

The on radio data event can only be created once, due to the hardware restrictions.

The radio set group might need to be set, synchronized , before the radio events will function.

## See also

[send number](/reference/radio/send-number),
[send string](/reference/radio/send-string),
[send value](/reference/radio/send-value),
[set group](/reference/radio/set-group)

```package
radio
```
