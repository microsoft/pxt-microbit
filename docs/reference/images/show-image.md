# Show Image

Show an [image](/reference/images/image) (picture) on the
[LED screen](/device/screen).  After the @boardname@ shows an image, it
will pause for 400 milliseconds (1000 milliseconds is one second).

```sig
let item: Image = null;
item.showImage(0);
```

## Parameters

* an [image](/reference/images/image) (picture). It is usually a square with five LEDs on a side, but it might be wider. 
* a [number](/types/number) that says how many LEDs from the left of the picture the @boardname@ should start. `0` means start at the first **frame** of the picture, `5` means start at the second frame, `10` means start at the third, and so on.

## Example: Flip-flopping arrow

This program makes a big image with a frame of an arrow pointing up,
and a frame of an arrow pointing down.  If you press button `A`, the
program will use ``show image`` to show the arrow pointing up. (It
starts `0` LEDs from the left in the big image.) If you press button
`B`, the program will use ``show image`` to show the arrow pointing
down, which starts `5` LEDs from the left.

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
[create big image](/reference/images/create-big-image),
[scroll image](/reference/images/scroll-image), [show animation](/reference/basic/show-animation)
