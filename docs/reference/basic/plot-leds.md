# Plot LEDs

Display an [Image](/reference/images/image) on the @boardname@'s [LED screen](/device/screen).

```sig
basic.showLeds(`
. . . . .
. # . # .
. . # . .
# . . . #
. # # # .
`)
```

## Parameters

* leds - a series of LED on/off states that form an image (see steps below)

## Example: smiley

```blocks
basic.showLeds(`
. . . . .
. # . # .
. . # . .
# . . . #
. # # # .
`)
```

## See also

[show animation](/reference/basic/show-animation), [image](/reference/images/image), [show image](/reference/images/show-image), [scroll image](/reference/images/scroll-image)

