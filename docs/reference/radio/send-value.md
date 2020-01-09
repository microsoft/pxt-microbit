# send Value

Send a [string]() and [number]() together by ``radio`` to other @boardname@s.
The maximum [string]() length is 8 characters.

```sig
radio.sendValue("name", 0);
```

## Parameters

* **name**: a [string](/types/string) that is the name of the value to send.
* **value**: a [number](/types/number) that is the value to send.

## ~ hint

Watch this video to see how the radio hardware works on the @boardname@:

https://www.youtube.com/watch?v=Re3H2ISfQE8

## ~

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