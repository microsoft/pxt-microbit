# spinner challenges

Create an arrow that randomly points to a player.

## Before we get started

Complete the following [guided tutorial](/lessons/spinner/activity), your code should look like this:

```blocks
input.onGesture(Gesture.Shake, () => {
    let randomArrow = Math.randomRange(0, 4)
    if (randomArrow == 3) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            . . # . .
            . . # . .
            `)
    }
    if (randomArrow == 2) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # # # # #
            . # # # .
            . . # . .
            `)
    }
    if (randomArrow == 1) {
        basic.showLeds(`
            . . # . .
            . # # . .
            # # # # #
            . # # . .
            . . # . .
            `)

    }
})
```

## Challenge 1

Modify the random number generator so that it can include new arrows we will create in the next challenge.

```blocks
input.onGesture(Gesture.Shake, () => {
    let randomArrow = Math.randomRange(0, 8)
    if (randomArrow == 3) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            . . # . .
            . . # . .
            `)
    }
    if (randomArrow == 2) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # # # # #
            . # # # .
            . . # . .
            `)
    }
    if (randomArrow == 1) {
        basic.showLeds(`
            . . # . .
            . # # . .
            # # # # #
            . # # . .
            . . # . .
            `)

    }
})
```



* Do **not** run the code yet because it will not work until you have conditions for every random number.

## Challenge 2

Let's add more arrows that point diagonally.


```blocks
input.onGesture(Gesture.Shake, () => {
    let randomArrow = Math.randomRange(0, 8)
    if (randomArrow == 7) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            . . # . .
            . . # . .
            `)
    }
    if (randomArrow == 6) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # # # # #
            . # # # .
            . . # . .
            `)
    }
    if (randomArrow == 5) {
        basic.showLeds(`
            . . # . .
            . # # . .
            # # # # #
            . # # . .
            . . # . .
            `)

    }
    if (randomArrow == 4) {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)

    }

    if (randomArrow == 3) {
        basic.showLeds(`
            # # # # #
            # # # # .
            # # # # .
            # . . # .
            . . . . #
            `)

    }
    if (randomArrow == 2) {
        basic.showLeds(`
            # # # # #
            # # # # #
            . . # # #
            . # . # #
            # . . . #
            `)

    }
        if (randomArrow == 1) {
        basic.showLeds(`
            # . . . #
            # # . # .
            # # # . .
            # # # # .
            # # # # #
            `)

    }

})

```


* Run your code to see if it works as expected

## Challenge 3

Add some other arrows if there are more than 8 players.

