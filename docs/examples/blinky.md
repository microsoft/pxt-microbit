# Blinky

Flash a pattern on the LEDs.

```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`
        );
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .`
        );
})
```