# show Animation

Show a group of image frames (pictures) one after another on the [LED screen](/device/screen). It pauses the amount of time you tell it after each frame.

```sig
basic.showAnimation(`
. . # . . . # # # . . # # # .
. # # . . . . . # . . . . # .
. . # . . . . # . . . # # # .
. . # . . . # . . . . . . # .
. . # . . . # # # . . # # # .
`)
```

## Parameters

* `leds` is a [string](/types/string) that shows which LEDs are on and off, in groups one after another.
* `interval` is an optional [number](/types/number). It means the number of milliseconds to pause after each image frame.

## Example: Animating a group of image frames

In this animation, each row is 15 spaces wide because
there are three frames in the animation, and each frame is
five spaces wide, just like the screen on the @boardname@.

```blocks
basic.showAnimation(`
. . # . . . # # # . . # # # .
. # # . . . . . # . . . . # .
. . # . . . . # . . . # # # .
. . # . . . # . . . . . . # .
. . # . . . # # # . . # # # .
`)
```

## ~hint 

If the animation is too fast, make `interval` bigger.

## ~

## Example: animating frames with a pause

This example shows six frames on the screen, pausing 500 milliseconds after each frame.

In this animation, each row is 30 spaces wide because
there are six frames in the animation, and each frame is
five spaces wide, just like the screen.

```blocks
basic.showAnimation(`
. . . . . # . . . . . . . . . . . . . # . . . . . # . . . .
. . # . . . . . . . . . # . . . . . . . . . # . . . . . . .
. # . # . . . # . . . # . # . . . # . . . # . # . . . # . .
. . # . . . . . . . . . # . . . . . . . . . # . . . . . . .
. . . . . . . . . # . . . . . # . . . . . . . . . . . . . #
`, 500)
```

## ~hint 

Use [forever](/reference/basic/forever) to show an animation over and over.

## ~
