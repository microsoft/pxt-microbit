# Screen

### ~avatar avatar

There are 25 bright LEDs on the @boardname@ screen. Let's use them to create some cool animations!

### ~

### Happy unhappy face

Draw an unhappy face instead of the blank screen.  Click on the dots
in the second ``show leds`` block until it matches the blocks below.
Now you have an **animation** (cartoon) that shows a happy face,
then an unhappy one, then a happy one again, forever (or until
you turn off your @boardname@)!

```blocks
basic.forever(() => {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        # . . . #
        `)
});
```
Click **Download** to move your program to the @boardname@!

### Your turn!

Pile up more ``show leds`` blocks to create an animation! Create an
animation with at least 5 pictures.  What does this animation show?

```blocks
basic.forever(() => {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # # # # #
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        # . . . #
        `)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # # # # #
        . . . # #
        `)
    basic.showLeds(`
        . . . . .
        # . # . .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . . # . #
        . . . . .
        # . . . #
        . # # # .
        `)
});
```
Click **Download** to move your program to the @boardname@!

#### ~hint

You can find the ``show leds`` block in the **Basic** part of the editor.

#### ~

### ~button /getting-started/buttons
NEXT: BUTTONS
### ~