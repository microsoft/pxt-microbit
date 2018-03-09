# Scroll Image

Scroll (slide) an [image](/reference/images/image) (picture) from one
side to the other of the [LED screen](/device/screen).

```sig
let item: Image = null;
item.scrollImage(5, 200);
```

## Parameters

* a [number](/types/number) that means
  how many LEDs to scroll at a time from right to left.
  You must use a positive number like `2`.
  If you use `5`, the image will scroll one **frame** at a time.
  (A frame is a part of the image. It is a square with five LEDs
  on a side). This is useful for **animation**.

* a [number](/types/number) that means
  how many milliseconds to wait before scrolling the amount that
  ``offset`` says. (1000 milliseconds is one second.) The bigger you
  make this number, the slower the image will scroll.

## Example

This program scrolls an image of two arrows five LEDs at a time,
with a pause of 200 milliseconds between each time it scrolls.
Because each frame is five LEDs wide, that means this program
will look like it's animating one arrow flipping and flopping.
Of course, you can use any two frames you want instead.


```blocks
let arrows = images.createBigImage(`
    . . # . .   . . # . .
    . # # # .   . . # . .
    # . # . #   # . # . #
    . . # . .   . # # # .
    . . # . .   . . # . .
    `);
basic.forever(() => {
    arrows.scrollImage(5, 200);
});	
```

## See also

[show image](/reference/images/show-image), [image](/reference/images/image), [create image](/reference/images/create-image), [show animation](/reference/basic/show-animation)

