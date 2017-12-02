# Rock - Paper - Scissors

## Step 1

We want the @boardname@ to choose rock, paper, or scissors when you shake it.
Place a ``||input:on shake||`` block so when you click the **SHAKE** spot in the simulator, it will run part of a program.

```block
input.onGesture(Gesture.Shake, () => {
    
})
```

## Step 2

Add a ``tool`` variable to store a random number computed with ``||math:pick random||``.

When you press **SHAKE**, it should pick a random number from `0` to `2`
and store it in the variable `tool`. (This variable is named `tool` because 
rock, paper, and scissors are the tools you use to challenge your friends!)

```block
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = Math.random(3)
})
```

In a later step, each of the possible numbers (`0`, `1`, or `2`) is matched to its own picture. The picture is shown on the LEDs when its number is picked.

## Step 3

Place an ``||logic:if||`` block under the ``||math:pick random||`` and
check whether ``tool`` is equal to ``0``.

```block
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = Math.random(3)
    if (tool == 0) {
    }
})
```

## Step 4

In the ``||logic:if||`` block, place a ``||basic:show leds||`` block that shows a
picture of a piece of paper.

```block
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = Math.random(3)
    if (tool == 0) {
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

Add an ``||logic:else if||`` block to the ``||logic:if||`` block and check whether ``tool``
is equal to ``1``.

Click on the gearwheel icon to open up the ``||logic:if||`` editor; then drag and drop an ``||logic:else if||`` block in the ``||logic:if||`` editor.

```block
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = Math.random(3)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (tool == 1) {
    }
})
```

## Step 6

Place a ``||basic:show leds||`` block under the ``||logic:else if||`` and draw a **rock** image on the screen.

```block
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = Math.random(3)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (tool == 1) {
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

Add a ``||basic:show leds||`` block with a picture of scissors to the ``||logic:else||`` part.

You don't need to check if `tool` is `2` because `2` is the only number left out of `0`, `1`, and `2`.
That's why you can use an ``||logic:else||`` instead of an ``||logic:else if||``.

```block
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = Math.random(3)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (tool == 1) {
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

Your game is ready! Gather your friends and play Rock Paper Scissors! If you have a @boardname@, click `|Download|` and play your game on the board too.