# Code

## Simple animation

Let's start by using a combination of [forever](/reference/basic/forever) and [show leds](/reference/basic/show-leds) to create animation:

```blocks
basic.forever(() => {
    basic.showLeds(`
        # # . # #
        # # . # #
        . # # # .
        . # . # .
        . # . # .
        `)
    basic.showLeds(`
        . . # . .
        . . # . .
        # . . . #
        # . # . #
        # . # . #
        `)
})
```

Download this code to your @boardname@ and try it out.

## Turn off animation in the pocket

If the wallet is in your pocket, you should turn off the LEDs to save energy.

How do we know that the wallet is in the pocket? It is really dark in there... We can use the [light level](/reference/input/light-level) to detect this!

Using an [if statement](/blocks/logic/if), we can test if the level of light is sufficient to turn on the screen. Otherwise, we turn off the screen for a few second to save energy.

```blocks
basic.forever(() => {
    if (input.lightLevel() > 16) {
        basic.showLeds(`
            # # . # #
            # # . # #
            . # # # .
            . # . # .
            . # . # .
            `)
        basic.showLeds(`
            . . # . .
            . . # . .
            # . . . #
            # . # . #
            # . # . #
            `)
    } else {        
        // clear screen and wait
        basic.clearScreen()
        basic.pause(3000)
    }
})
```