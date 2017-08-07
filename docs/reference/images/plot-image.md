# Plot Image

The plot image function.

Display an [Image](/reference/images/image) on the @boardname@'s [LED screen](/device/screen)

## JavaScript

```sig
export function plotImage(_this: micro_bit.Image, xOffset: number)
```

## Parameters

* x offset - [Number](/types/number); the horizontal starting point of an image; use 0 for the first frame of the image, 5 for the second frame of the image, 10 for the third frame and so on.

## Difference from `show image`

The `show image` function has a built in delay of 400ms after display of the image, whereas `plot image` has no built-in delay.

## Example

```blocks
let img = images.createImage(`
# . . . # # . . . #
. # . # . . # # # .
. . # . . . # # # .
. # . # . . # # # .
# . . . # # . . . #
`)
img.plotImage(0)
```

## See also

[create image](/reference/images/create-image), [show animation](/reference/basic/show-animation), [image](/reference/images/image), [show image](/reference/images/show-image), [scroll image](/reference/images/scroll-image)

