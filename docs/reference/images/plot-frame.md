# Plot Frame

The plot frame function.

Display an [Image](/reference/images/image) on the @boardname@'s [LED screen](/device/screen)

## JavaScript

```sig
export function plotFrame(_this: micro_bit.Image, index: number)
```

## Parameters

* index - [Number](/types/number); which frame of the image to display

## Difference from `plot image`

The `plot frame` function takes the index of the frame (if there are two frames, then the possible indices are 0 and 1), whereas `plot image` accepts an offset (if there are two frames, the offset would range between 0 and 9).

## Example

```blocks
let img = images.createImage(`
# . . . # # . . . #
. # . # . . # # # .
. . # . . . # # # .
. # . # . . # # # .
# . . . # # . . . #
`)
img.plotFrame(1)
```

## See also

[create image](/reference/images/create-image), [show animation](/reference/basic/show-animation), [image](/reference/images/image), [show image](/reference/images/show-image), [scroll image](/reference/images/scroll-image)

