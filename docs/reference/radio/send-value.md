# send Value

Send a [string]() and [number]() together by ``radio`` to other @boardname@s.
The maximum [string]() length is 12 characters.

```sig
radio.sendValue("name", 0);
```

## Parameters

* ``name`` is a [string](/types/string) to send by radio
* ``value`` a [number](/types/number) to send by radio

## Example: Broadcasting acceleration

This program sends your @boardname@'s **acceleration** (amount it is
speeding up or slowing down) in the `x` direction (left and right) to
other @boardname@s. This kind of program might be useful in a model car
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
radio.onReceivedValue(function (name, value) {
	basic.showString(name);
    basic.showNumber(value);
});
```

## See also

[on received value](/reference/radio/on-received-value)

```package
radio
```