# On Pin Pressed

Start an [event handler](/reference/event-handler) (part of the
program that will run when something happens, like when a button is
pressed).  This handler works when you touch pin `0`, `1`, or `2`
together with `GND`, and release it within 1 second.
When you are using this function in a web
browser, click the pins on the screen instead of the ones on the
@boardname@.

If you hold the `GND` pin with one hand and touch pin `0`, `1`, or `2`
with the other, a very small (safe) amount of electricity will flow
through your body and back into the @boardname@. This is called
**completing a circuit**. It's like you're a big wire!

```sig
input.onPinPressed(TouchPin.P0, () => {
})
```

## ~hint

This function works best when the @boardname@ is using batteries for power,
instead of the USB cable.

## ~

## Parameters

* ``name`` means the pin that is being pressed, either `P0`, `P1`, or `P2`

## Pin presses in action

See how the @boardname@ detects a press at a pin or on something connected to a pin in this video:

https://www.youtube.com/watch?v=GEpZrvbsO7o

## Example: pin pressed counter

This program counts how many times you press the `P0` pin. 
Every time you press the pin, the program shows the number of times on the screen.

```blocks
let count = 0
basic.showNumber(count)
input.onPinPressed(TouchPin.P0, () => {
    count = count + 1
    basic.showNumber(count)
})
```

## See also

[@boardname@ pins](/device/pins), [pin is pressed](/reference/input/pin-is-pressed), [analog read pin](/reference/pins/analog-read-pin), [analog write pin](/reference/pins/analog-write-pin), [digital read pin](/reference/pins/digital-read-pin), [digital write pin](/reference/pins/digital-write-pin)

