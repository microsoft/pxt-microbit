# Rock Paper Scissors

## Step 1

We want the @boardname@ to choose rock, paper, or scissors when you shake it.
Place a ``||input:on shake||`` block so when you shake the @boardname@, it will run part of a program.

```blocks
input.onGesture(Gesture.Shake, () => {
    
})
```

## Step 2

Add a ``weapon`` variable to store a random number computed with ``||math:pick random||``.

When you shake the @boardname@, it should pick a random number from `0` to `2`
and store it in the variable `weapon`. (This variable is named `weapon` because 
rock, paper, and scissors are the weapons you use to battle your friends!)

```blocks
let weapon = 0;
input.onGesture(Gesture.Shake, () => {
    weapon = Math.random(3)
})

```

Each possible number these blocks can make (`0`, `1`, or `2`) means a different picture.
We will show the right picture for that number on the LED screen.


## Step 3

Place an ``if`` block under the ``||math:pick random||`` and
check whether ``weapon`` is equal to ``0``.

```blocks
let weapon = 0;
input.onGesture(Gesture.Shake, () => {
    let weapon = Math.random(3)
    if (weapon == 0) {
    }
})
```

## Step 4

In the ``if`` block, place a ``||basic:show leds||`` block that shows a
picture of a piece of paper.

```blocks
let weapon = 0;
input.onGesture(Gesture.Shake, () => {
    let weapon = Math.random(3)
    if (weapon == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    }
})
```

## Step 5

Add an ``else if`` block to the ``if`` block and check whether ``weapon``
is equal to ``1``.

Click on the gearwheel icon to open up the ``if`` editor; then drag and drop an ``else if`` block in the ``if`` editor.

```blocks
let weapon = 0;
input.onGesture(Gesture.Shake, () => {
    let weapon = Math.random(3)
    if (weapon == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (weapon == 1) {
    }
})
```

## Step 6

Place a ``||basic:show leds||`` block under the else if and draw a **rock** image on the screen.

```blocks
let weapon = 0;
input.onGesture(Gesture.Shake, () => {
    let weapon = Math.random(3)
    if (weapon == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (weapon == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    }
})
```

## Step 7

Add a ``||basic:show leds||`` block with a picture of scissors to the ``else`` part.

You don't need to check if `weapon` is `2` because `2` is the only number left out of `0`, `1`, and `2`.
That's why you can use an ``else`` instead of an ``else if``.

```blocks
let weapon = 0;
input.onGesture(Gesture.Shake, () => {
    let weapon = Math.random(3)
    if (weapon == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (weapon == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
    }
})

```

## Step 8

Your game is ready! Gather your friends and play Rock Paper Scissors!