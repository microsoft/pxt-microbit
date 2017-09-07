# screen wipe blocks challenges

Coding challenges for screen wipe. 

## Before we get started

Complete the [screen wipe](/lessons/screen-wipe/activity) activity and your code will look like this:

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

## Challenge 1

Create an event handler for Button B.

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
input.onButtonPressed(Button.B, () => {

})

```

## Challenge 2



Replay the animation when the "B" button is pressed placing the `show LEDs` block on the canvas.

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
input.onButtonPressed(Button.B, () => {
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
})

```


## Challenge 3

Show an animation that scrolls back up when you press button "B".

* tap the *run* button to view your final product!
