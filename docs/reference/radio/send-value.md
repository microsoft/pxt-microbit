# Send Value

Send a [string]() and [number]() together by ``radio`` to other micro:bits.

```sig
radio.sendValue("data", 0);
```

### Parameters

* ``name`` is a [string](/reference/types/string) to send by radio
* ``value`` a [number](/reference/types/number) to send by radio

### Simulator

This function only works on the micro:bit, not in browsers.

### Example: Broadcasting acceleration

This program sends your micro:bit's **acceleration** (amount it is
speeding up or slowing down) in the `x` direction (left and right) to
other micro:bits. This kind of program might be useful in a model car
or model rocket.

```blocks
radio.setGroup(99)
input.onButtonPressed(Button.A, () => {
    radio.sendValue("acc",input.acceleration(Dimension.X))
})
```

This program receives the string and number sent by the last program.
Then it shows them on the LED screen.

```blocks
radio.setGroup(99)
radio.onDataReceived(() => {
	basic.showString(radio.receiveString());
    basic.showNumber(radio.receiveNumber());
});
```

### See also

[receive number](/reference/radio/receive-number), [on data received](/reference/radio/on-data-received)

```package
radio
```