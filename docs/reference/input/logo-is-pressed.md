# logo Is Pressed

Check if the @boardname@ logo is currently being pressed.

```sig
input.logoIsPressed()
```

## ~ reminder

![works with micro:bit V2 only image](/static/v2/v2-only.png)

This block requires the [micro:bit V2](/device/v2) hardware. If you use this block with a micro:bit v1 board, you will see the **927** error code on the screen.

## ~

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

[micro:bit V2](/device/v2),
[on logo event](/reference/input/on-logo-event),
[pin is pressed](/referene/inpu/pin-is-pressed),
[touch set mode](/referene/inpu/touch-set-mode)