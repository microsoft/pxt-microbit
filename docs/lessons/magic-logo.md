# magic logo lesson

show an image that points up when the logo is up.



## Topic

On Logo Up

## Quick Links

* [activity](/lessons/magic-logo/activity)
* [challenges](/lessons/magic-logo/challenges)
* [quiz](/lessons/magic-logo/challenges)
* [quiz answers](/lessons/magic-logo/challenges)

## Prior learning/place of lesson in scheme of work

Learn how to plot an image using ``||input:on logo up||`` to run code when the @boardname@ screen is facing up and vertically orientated. We will be learning how to plot an image with the logo up, basic show LEDs, and logo down.

## Documentation
```cards
input.onGesture(Gesture.LogoUp, function () {})
input.onGesture(Gesture.LogoDown, function () {})
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
```

## Objectives

* learn how to display an image on the @boardname@'s LED screen
* learn how to run code when the @boardname@ screen is facing down and vertically orientated
* learn how to run code when the @boardname@ screen is facing up and vertically orientated

