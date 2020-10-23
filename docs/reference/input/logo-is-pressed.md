# logo Is Pressed

Check if the @boardname@ logo is currently being pressed.

```sig
input.logoIsPressed()
```

The logo on the @boardname@ works just like a touch pin. You can check the whether or not the logo is currently being pressed. You use the [boolean](/types/boolean) value for the status of the logo press to make a logical decision in your program.

## Returns

* a [boolean](types/boolean) value that is `true` if the logo is pressed, `false` if the logo is not pressed.

## Example

Show an icon on the LEDs while the logo is pressed.

```blocks
basic.forever(function () {
    if (input.logoIsPressed()) {
        basic.showIcon(IconNames.Diamond)
    } else {
        basic.clearScreen()
    }
})
```

## See also

[on logo pressed](/reference/input/on-logo-pressed),
[on logo released](/reference/input/is-pin-released),
[pin is pressed](/referene/inpu/pin-is-pressed)