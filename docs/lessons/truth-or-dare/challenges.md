# truth or dare challenges

A multi-player game that forces each player to reveal a secret or something funny. 

## Before we get started

Complete the following [guided tutorial](/lessons/truth-or-dare/activity), and your code should look like this


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

## Challenge 1

Let's make the word "DARE" appear a little more often than "TRUTH". Change the line of code with `pick random (1)` to `pick random (2)`.

```blocks
basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . . # . .
    . . # . .
    `)
input.onButtonPressed(Button.A, () => {
    let random = Math.randomRange(0, 3)
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


## Challenge 2

Instead of just saying "TRUTH" or "DARE", let's sometimes say "SKIP". This would allow the skipped person to spin the @boardname@ without completing a truth or dare. Modify the if statement as shown.

``` blocks
basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . . # . .
    . . # . .
    `)
input.onButtonPressed(Button.A, () => {
    let random = Math.randomRange(0, 2)
    if (random == 1) {
        basic.showString("TRUTH")
    } else if (random == 0) {
        basic.showString("DARE")
    } else {
        basic.showString("SKIP")
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



* Run your code to see if it works as expected

## Challenge 3

Add some other messages, such as "TWO DARES" for the @boardname@ to show. You will need to modify the parameter inside `pick random (3)` as well as adding another `if` condition.

