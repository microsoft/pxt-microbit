# on Received Number

Run part of a program when the @boardname@ receives a
[number](/types/number) over ``radio``.

```sig
radio.onReceivedNumber(function (receivedNumber) {})
```

## Parameters

* **receivedNumber**: The [number](/types/number) that was sent in this packet or `0` if this packet did not contain a number. See [send number](/reference/radio/send-number) and [send value](/reference/radio/send-value)

## ~ hint

Watch this video to see how the radio hardware works on the @boardname@:

https://www.youtube.com/watch?v=Re3H2ISfQE8

## ~

## Examples

### Tell me how fast

This program keeps sending numbers that say how fast the @boardname@ is
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

### What's the distance?

This program uses the signal strength from received packets to graph the
approximate distance between two @boardname@s.

```blocks
basic.forever(() => {
    radio.sendNumber(0)
})
radio.onReceivedNumber(function (receivedNumber) {
    led.plotBarGraph(
        Math.abs(radio.receivedPacket(RadioPacketProperty.SignalStrength) + 42),
        128 - 42
    )
})
```

## Troubleshooting

The ``||radio:onReceivedNumber||`` event can only be created once, due to the hardware restrictions.

The radio set group might need to be set, synchronized, before the radio events will function.

## See also

[on received string](/reference/radio/on-received-string),
[received packet](/reference/radio/received-packet),
[send number](/reference/radio/send-number),
[send string](/reference/radio/send-string),
[send value](/reference/radio/send-value),
[set group](/reference/radio/set-group)

```package
radio
```
