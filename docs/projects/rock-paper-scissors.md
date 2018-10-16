# Rock Paper Scissors

## Introduction @unplugged

![Cartoon of the Rock Paper Scissors game](/static/mb/projects/a4-motion.png)

Use the accelerometer and the screen to build a **Play Rock Paper Scissors**
that you can play with your friends!

## Step 1 @fullscreen

Add a ``||input:on shake||`` block to run code when when you shake the @boardname@.

```blocks
input.onGesture(Gesture.Shake, () => {
    
})
```

## Step 2 @fullscreen

Add a ``tool`` variable to store a random number computed with ``||math:pick random||``.

When you shake the @boardname@, it should pick a random number from `0` to `2`
and store it in the variable `tool`.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = Math.randomRange(0, 2)
})

```

In a later step, each of the possible numbers (`0`, `1`, or `2`) is matched to its own picture. The picture is shown on the LEDs when its number is picked.

## Step 3 @fullscreen

Place an ``if`` block under the ``||math:pick random||`` and
check whether ``tool`` is equal to ``0``.

Add a ``||basic:show leds||`` block that shows a
picture of a piece of paper.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = Math.randomRange(0, 3)
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

## Step 4 @fullscreen

Click on the **SHAKE** button in the simulator. If you try enough times, you should see
the paper drawing.

![Shaking a @boardname@ simulator](/static/mb/projects/rock-paper-scissors/rpsshake.gif)

## Step 5 @fullscreen

Click the ``+`` button to add an ``else`` section.

![Adding an else clause](/static/mb/projects/rock-paper-scissors/ifelse.gif)

## Step 6 @fullscreen

Add a ``||basic:show leds||`` block that shows a scissor.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = Math.randomRange(0, 3)
    if (tool == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
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

## Step 7 @fullscreen

Click the ``+`` button to add an ``else if`` section.
Since ``tool`` can only be ``0``, ``1`` or ``2``, your code is covering all possible cases!

![Adding an else if clause](/static/mb/projects/rock-paper-scissors/ifelseif.gif)

## Step 8 @fullscreen

Add a ``||basic:show leds||`` block with a picture of scissors to the ``else`` part.

```blocks
let tool = 0;
input.onGesture(Gesture.Shake, () => {
    tool = Math.randomRange(0, 3)
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

## Step 9 @fullscreen

Click on the **SHAKE** button in the simulator and check each image is showing up.

![Shaking a @boardname@ simulator](/static/mb/projects/rock-paper-scissors/rpssim3.gif)

## Step 10 @fullscreen

If you have a @boardname@, click on ``|Download|`` and follow the instruction to get the code
onto your @boardname@. Your game is ready! Gather your friends and play Rock Paper Scissors!

![A @boardname@ in a hand](/static/mb/projects/rock-paper-scissors/hand.jpg)