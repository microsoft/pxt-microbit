# Send Value

Send a [string]() and [number]() together by ``radio`` to other micro:bits.
The maximum [string]() length is 12 characters.

```sig
radio.sendValue("data", 0);
```

### Parameters

* ``name`` is a [string](/reference/types/string) to send by radio
* ``value`` a [number](/reference/types/number) to send by radio

### Example: Broadcasting acceleration

This program sends your micro:bit's **acceleration** (amount it is
speeding up or slowing down) in the `x` direction (left and right) to
other micro:bits. This kind of program might be useful in a model car
or model rocket.

```blocks
radio.setGroup(99)
input.onButtonPressed(Button.A, () => {
    radio.sendValue("acc", input.acceleration(Dimension.X))
})
```

This program receives the string and number sent by the last program.
Then it shows them on the LED screen.

```blocks
radio.setGroup(99)
radio.onDataPacketReceived(({ receivedString, receivedNumber }) => {
	basic.showString(receivedString);
    basic.showNumber(receivedNumber);
});
```

### See also

[on data packet received](/reference/radio/on-data-packet-received)

```package
radio
```