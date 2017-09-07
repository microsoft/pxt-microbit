# Clear

The clear function for images.

Turn off all the pixels in an [Image](/reference/images/image).

## JavaScript

```sig
export function clear(img: micro_bit.Image)
```

## Parameters

* none

## Example

The following example turns off the pixels of `img` when the A input button is pressed:

```blocks
let img = images.createImage(`
. . . . .
. # # # .
. # # # .
. # # # .
. . . . .
`)
img.showImage(0)
input.onButtonPressed(Button.A, () => {
    img.clear()
    img.showImage(0)
})
```

## See also

[Image](/reference/images/image), [show animation](/reference/basic/show-animation), [show image](/reference/images/show-image), [scroll image](/reference/images/scroll-image), [create image](/reference/images/create-image)

