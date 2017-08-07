# Create Big Image

Make a big [image](/reference/images/image) (picture) for the @boardname@
[LED screen](/device/screen). The big image made of two squares.
Each of the squares is five LEDs on a side, like a regular image.

```sig
images.createBigImage(`
    . . # . .   . . # . .
    . # # # .   . . # . .
    # . # . #   # . # . #
    . . # . .   . # # # .
    . . # . .   . . # . .
    `);
```

## Parameters

* ``leds`` is a [string](/types/string) that says which LEDs
on the screen should be on and which should be off.


## Example: Flip-flopping arrow

This program makes a big image with a picture of an arrow pointing up,
and an arrow pointing down.  If you press button `A`, the program will
show the arrow pointing up, which starts `0` LEDs from the left in the
big image.  If you press button `B`, the program will show the arrow
pointing down, which starts `5` LEDs from the left.

```blocks
let arrows = images.createBigImage(`
    . . # . .   . . # . .
    . # # # .   . . # . .
    # . # . #   # . # . #
    . . # . .   . # # # .
    . . # . .   . . # . .
    `);
input.onButtonPressed(Button.A, () => {
    arrows.showImage(0);
});
input.onButtonPressed(Button.B, () => {
    arrows.showImage(5);
});
```

## See also

[image](/reference/images/image),
[create image](/reference/images/create-image),
[show image](/reference/images/show-image),
[scroll image](/reference/images/scroll-image), [show animation](/reference/basic/show-animation)
