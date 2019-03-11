# send Number

Broadcast a [number](/types/number) to other @boardname@s connected via ``radio``.

```sig
radio.sendNumber(0);
```

## Parameters

* **value**: a [number](/types/number) to send.

## ~ hint

Watch this video to see how the radio hardware works on the @boardname@:

https://www.youtube.com/watch?v=Re3H2ISfQE8

## ~

## Examples

### Broadcasting acceleration

This example broadcasts the value of your @boardname@'s ``acceleration``
in the `x` direction (left and right) to other @boardname@s.  This kind
of program might be useful in a model car or model rocket.

```blocks
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(input.acceleration(Dimension.X))
})
```

### Light level sender

This example broadcasts the level of the light around it.
You can do some interesting things with it if you use it along with the
[on received number](/reference/radio/on-received-number) example.

```blocks
radio.setGroup(99)
basic.forever(() => {
    let level = input.lightLevel()
    radio.sendNumber(level)
})
```

## See also

[on received number](/reference/radio/on-received-number)

```package
radio
```