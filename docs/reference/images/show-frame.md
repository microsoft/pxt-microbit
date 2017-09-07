# Show Frame

The show frame function.

Display an [Image](/reference/images/image) on the @boardname@'s [LED screen](/device/screen)

## JavaScript

```sig
export function showFrame(img: micro_bit.Image, frame: number)
```

## Parameters

* index - [Number](/types/number); which frame of the image to display

## Difference from `plot frame`

The `show frame` function is the same as [plot frame](/reference/images/plot-frame), but contains a built-in delay after the LED screen has been updated (whereas `plot frame` has no built-in delay)

## Example

```blocks
let img = images.createImage(`
# . . . # # . . . #
. # . # . . # # # .
. . # . . . # # # .
. # . # . . # # # .
# . . . # # . . . #
`)
img.showFrame(1)
```

## See also

[create image](/reference/images/create-image), [show animation](/reference/basic/show-animation), [image](/reference/images/image), [show image](/reference/images/show-image), [scroll image](/reference/images/scroll-image)

