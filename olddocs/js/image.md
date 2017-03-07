# Image

An image for the @boardname@ screen.

### @parent javascript/language

An *Image* is a matrix of pixels to show on the [LED screen](/device/screen)

### Touch Develop editor: plot an image

To display an image using the [Touch Develop editor](/js/editor):

* click `image` , `plot image`, and then `edit`
* click the rectangles to create an image
* when you're done, click **ok** to return to your code

![](/static/mb/plot-leds-0.png)

You should see code similar to this:

```
basic.plotImage(`
. . . . .
. # . # .
. . # . .
. # . # .
. . . . .
`)
```

### Creating an image

To create an image that you can later modify, see the [create image](/reference/images/create-image) function.

### Block editor: create and show images

To create images using the [Block editor](/blocks/editor):

1. Click the **Images** category on the left.

2. Drag and drop the **show image** block into your code.

3. Drag and drop the **create image** or **create big image** block onto the **show image** block so that they connect.

4. Make an image on the **create image** block by clicking on the squares.

### Global image variables

Images that you create in the [Touch Develop editor](/js/editor) are [local variables](/reference/variables/var). To promote a local image variable to a global variable, select the local image variable and click `promote to data`. The *var* keyword changes to the [data](/js/data) symbol `data->`.

### Image functions

* [create image](/reference/images/create-image): create an image from a series of on/off LED states
* [clear](/reference/basic/clear-screen): turn off all the pixels in an image
* [set pixel](/reference/images/set-pixel): set the state of a pixel in an image
* [pixel](/reference/images/pixel): get the state of a pixel in an image
* [plot-image](/reference/led/plot-image): show a single-frame image on the LED screen
* [show animation](/reference/basic/show-animation): show a series of image frames
* [show image](/reference/images/show-image): show an image on the screen
* [scroll image](/reference/images/scroll-image): scroll an image on the screen
* [width](/functions/width): get the width of an image

### Lessons

* [offset image](/lessons/offset-image)

### See also

[plot image](/reference/led/plot-image), [create image](/reference/images/create-image), [show image](/reference/images/show-image), [LED screen](/device/screen)

