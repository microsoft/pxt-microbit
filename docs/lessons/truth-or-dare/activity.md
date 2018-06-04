# truth or dare activity

A multi-player game that forces each player to reveal a secret or something funny. 

## ~avatar avatar



Welcome! This tutorial will teach how to program a game of truth or dare on the @boardname@. Let's get started!

## ~

Begin by using Show LEDs to create an "up-arrow" image, which will point to someone.

```blocks
basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . . # . .
    . . # . .
    `)

```

Now let's create a condition to know when button `A` is pressed so that we can display "truth" or "dare" on the @boardname@. We want the @boardname@ to randomly choose whether to display "truth" or display "dare". We can use accomplish this by using `pick random (1)`.

```blocks
basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . . # . .
    . . # . .
    `)
input.onButtonPressed(Button.A, () => {
    let random = Math.randomRange(0, 2)
})
```

Now let's display the appropriate message for each scenario of `random`.

```blocks
basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . . # . .
    . . # . .
    `)
input.onButtonPressed(Button.A, () => {
    let random = Math.randomRange(0, 2)
    if (random == 0) {
        basic.showString("TRUTH")
    } else {
        basic.showString("DARE")
    }
})
```



Notice how the arrow didn't display again after pressing button `A`. Let's add a line of code that displays the arrow again.

```blocks
basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . . # . .
    . . # . .
    `)
input.onButtonPressed(Button.A, () => {
    let random = Math.randomRange(0, 2)
    if (random == 0) {
        basic.showString("TRUTH")
    } else {
        basic.showString("DARE")
    }
    basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . . # . .
    . . # . .
    `)
})

```

* Run your program: Press button A!

## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/truth-or-dare/challenges)!

## ~

