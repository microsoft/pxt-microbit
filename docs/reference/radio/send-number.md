# Send Number

Broadcast a [number](/reference/types/number) to other micro:bits connected via ``radio``.

```sig
radio.sendNumber(0);
```

### Parameters

* ``value`` - a [number](/reference/types/number) to send.

### Simulator

This function only works on the micro:bit, not in browsers.

### Example: Broadcasting acceleration

This example broadcasts the value of your micro:bit's ``acceleration``
in the `x` direction (left and right) to other micro:bits.  This kind
of program might be useful in a model car or model rocket.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(input.acceleration(Dimension.X))
})
```

### Light level sender

This example broadcasts the level of the light around it.
You can do some interesting things with it if you use it along with the
[Mailbot](/reference/radio/receive-number) example.

```blocks
radio.setGroup(99)
basic.forever(() => {
    let level = input.lightLevel()
    radio.sendNumber(level)
})
```

### See also

[receive number](/reference/radio/receive-number), [on data received](/reference/radio/on-data-received)

```package
radio
```