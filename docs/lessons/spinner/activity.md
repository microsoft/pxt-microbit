# spinner activity

Create an arrow that randomly points to a player. 

## ~avatar avatar



## ~

Welcome! This guided tutorial will teach how to program a script that randomly points to a player. Let's get started!

Let's begin by adding an `on shake` condition to know when the @boardname@ is shaken.

```blocks
input.onGesture(Gesture.Shake, () => {
    
})
```

Now let's randomly generate a number from 0 to 3 so that we can randomly display an arrow in a given direction.

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
})
```



Now let's handle each of the cases by displaying the appropriate arrow. (Let's display an up arrow if `random arrow` is 0.

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
})
```


Now let's handle the rest of the cases for `random arrow`.


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


## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/spinner/challenges)!

## ~

