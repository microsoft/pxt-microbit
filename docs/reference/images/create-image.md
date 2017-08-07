# Create Image

Make an [image](/reference/images/image) (picture) for the @boardname@
[LED screen](/device/screen).

```sig
images.createImage(`
. . # . .
. # # # .
# # # # #
. # # # .
. . # . .
`)
```

## Parameters

* ``leds`` is a [string](/types/string) that says which LEDs
on the screen should be on and which should be off.

## Example: Flip-flopping arrow

If you press button `A`, this program will make a picture of an
arrow and show it on the LED screen. If you press button `B`, the
program will show a picture of the arrow upside-down.

```blocks
input.onButtonPressed(Button.A, () => {
    images.createImage(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `).showImage(0);
});
input.onButtonPressed(Button.B, () => {
    images.createImage(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `).showImage(0);
});
```

## See also

[image](/reference/images/image),
[create big image](/reference/images/create-big-image),
[show image](/reference/images/show-image),
[scroll image](/reference/images/scroll-image), [show animation](/reference/basic/show-animation)

