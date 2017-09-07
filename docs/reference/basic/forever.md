# Forever

Keep running part of a program 
[in the background](/reference/control/in-background).

```sig
basic.forever(() => {
})
```

## Example: compass

The following example constantly checks the 
[compass heading](/reference/input/compass-heading) 
and updates the screen with the direction.

```blocks
basic.forever(() => {
    let heading = input.compassHeading()
    if (heading < 45) {
        basic.showString("N")
    } else if (heading < 135) {
        basic.showString("E")
    }
    else if (heading < 225) {
        basic.showString("S")
    }
    else {
        basic.showString("W")
    }
})
```

## Example: counter

The following example keeps showing the [number](/types/number) stored in a global variable.
When you press button `A`, the number gets bigger.
You can use a program like this to count things with your @boardname@.

```blocks
let num = 0
basic.forever(() => {
    basic.showNumber(num)
})
input.onButtonPressed(Button.A, () => {
    num = num + 1
})
```

## Competing for the LED screen

If different parts of a program are each trying 
to show something on the LED screen at the same time, 
you may get unexpected results.
Try this on your @boardname@:

```blocks
basic.forever(() => {
    basic.showNumber(6789)
})
input.onButtonPressed(Button.A, () => {
    basic.showNumber(2)
})
```

## See also

[while](/blocks/loops/while), [on button pressed](/reference/input/on-button-pressed), [in background](/reference/control/in-background)

