# Pin Is Pressed

Find whether the pin you say is pressed or not pressed.

If you hold the `GND` pin with one hand and touch pin `0`, `1`, or `2` with the other,
a very small (safe) amount of electricity will flow through your body and back into
the @boardname@. This is called **completing a circuit**. It's like you're a big wire!

```sig
input.pinIsPressed(TouchPin.P0);
```

## ~hint

This function works best when the @boardname@ is using batteries for power,
instead of the USB cable.

## ~

## Parameters

* a [string](/types/string) that holds the pin name (**P0**, **P1**, or **P2**)

## returns

* a [boolean](/blocks/logic/boolean) that means whether the pin you say is pressed (`true` or `false`)

## Example

This program shows `1` if `P0` is pressed, and `0` if `P0` is not pressed:

```blocks
basic.forever(() => {
    if (input.pinIsPressed(TouchPin.P0)) {
        basic.showNumber(1)
    } else {
        basic.showNumber(0)
    }
})
```

## See also

[@boardname@ pins](/device/pins), [on pin pressed](/reference/input/on-pin-pressed), [analog read pin](/reference/pins/analog-read-pin), [analog write pin](/reference/pins/analog-write-pin), [digital read pin](/reference/pins/digital-read-pin), [digital write pin](/reference/pins/digital-write-pin)

