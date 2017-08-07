# Image

An image for the @boardname@ screen.

## @parent blocks/language

An *Image* is a matrix of pixels to show on the [LED screen](/device/screen)

## Block Editor: Show LEDs

To display an image:

* click `Basic` , `Show LEDs`, and tap on the LEDs`

```blocks
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
```

## Creating an image

To create an image that you can later modify, see the [create image](/reference/images/create-image) function.

1. Click the **Images** category on the left.

2. Drag and drop the **show image** block into your code.

3. Drag and drop the **create image** or **create big image** block onto the **show image** block so that they connect.

4. Make an image on the **create image** block by clicking on the squares.

You should see code similar to this:

![](/static/mb/blocks/image-0.png)

## Image functions

* [create image](/reference/images/create-image): create an image from a series of on/off LED states
* [clear](/reference/basic/clear-screen): turn off all the pixels in an image
* [pixel](/reference/images/pixel): get the state of a pixel in an image
* [show-leds](/reference/basic/show-leds): show a single-frame image on the LED screen
* [show image](/reference/images/show-image): show an image on the screen
* [scroll image](/reference/images/scroll-image): scroll an image on the screen

## See also

[Show LEDs](/reference/basic/show-leds), [create image](/reference/images/create-image), [show image](/reference/images/show-image), [LED screen](/device/screen)

