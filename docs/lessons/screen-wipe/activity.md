# screen wipe blocks activity

Clear the screen by pressing buttons on the @boardname@ 

## ~avatar avatar



This activity will teach how to clear the screen by pressing button A on the @boardname@.

## ~

You can use the clear screen` function to turn off all the LED on the screen. Let's illustrate this concept with a small script where the user has to press the button A to turn off the screen. Let's start by adding the code to show an animation.

```blocks
basic.showLeds(`
    # # # # #
    # # # # #
    . . . . .
    . . . . .
    . . . . .
    `)
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    . . . . .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    # # # # #
    # # # # #
    . . . . .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    # # # # #
    # # # # #
    `)
```

We add another line of code that registers an *event handler* `on button pressed` *A* and calls `clear screen`.

```blocks
basic.showLeds(`
    # # # # #
    # # # # #
    . . . . .
    . . . . .
    . . . . .
    `)
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    . . . . .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    # # # # #
    # # # # #
    . . . . .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    # # # # #
    # # # # #
    `)
input.onButtonPressed(Button.A, () => {
    basic.clearScreen()
})

```

*Run* the script in the simulator or on the @boardname@ to see how this works!

## ~avatar boothing

Excellent, you're ready to continue with the [challenges](/lessons/screen-wipe/challenges)!

## ~

