# Rock Paper Scissors

## Introduction @unplugged

![Cartoon of the Rock Paper Scissors game](/static/mb/projects/a4-motion.png)

Use the accelerometer and the screen to build a **Rock Paper Scissors** game that you can play with your friends!

## Step 1 @fullscreen

Add a ``||input:on shake||`` block to run code when when you shake the @boardname@.

```blocks
input.onGesture(Gesture.Shake, () => {
    
})
```

## Step 2 @fullscreen

Add a ``hand`` variable and place the ``||variables:set hand to||`` block in the shake event.

![A animation that shows how to create a variable](/static/mb/projects/rock-paper-scissors/newvar.gif)

## Step 3 @fullscreen

Add a ``||math:pick random||`` block to pick a random number from `1` to `3` and store it in the variable named ``hand``.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, () => {
    hand = Math.randomRange(1, 3)
})

```

In a later step, each of the possible numbers (`1`, `2`, or `3`) is matched to its own picture. The picture is shown on the LEDs when its matching number is picked.

## Step 4 @fullscreen

Place an ``||logic:if||`` block under the ``||math:pick random||`` and check whether ``hand`` is equal to ``1``. Add a ``||basic:show leds||`` block that shows a picture of a piece of paper. The number `1` will mean paper.

![How to drag an if statement](/static/mb/projects/rock-paper-scissors/if.gif)

## Step 5 @fullscreen

Click on the **SHAKE** button in the simulator. If you try enough times, you should see a picture of paper on the screen.

![Shaking a @boardname@ simulator](/static/mb/projects/rock-paper-scissors/rpsshake.gif)

## Step 6 @fullscreen

Click the ``+`` button to add an ``||logic:else||`` section.

![Adding an else clause](/static/mb/projects/rock-paper-scissors/ifelse.gif)

## Step 7 @fullscreen

Add a ``||basic:show leds||`` block inside the ``||logic:else||``. Make a picture of a scissors in the LEDs.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, () => {
    hand = Math.randomRange(1, 3)
    if (hand == 1) {
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

## Step 8 @fullscreen

Click the ``+`` button again to add an ``||logic:else if||`` section. Now, add a conditional block for ``||logic:hand = 1||`` to the condition in ``||logic:else if||``. Since ``hand`` can only be `1`, `2`, or `3`, your code is covering all possible cases!

![Adding an else if clause](/static/mb/projects/rock-paper-scissors/ifelseif.gif)

## Step 9 @fullscreen

Get one more ``||basic:show leds||`` block and put it in the ``||logic:else if||``. Make a picture of a rock in the LEDs.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, () => {
    hand = Math.randomRange(1, 3)
    if (hand == 1) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (hand == 2) {
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

## Step 10 @fullscreen

Click on the **SHAKE** button in the simulator and check to see that each image is showing up.

![Shaking a @boardname@ simulator](/static/mb/projects/rock-paper-scissors/rpssim3.gif)

## Step 11 @fullscreen

If you have a @boardname@, click on ``|Download|`` and follow the instructions to get the code
onto your @boardname@. Your game is ready! Gather your friends and play Rock Paper Scissors!

![A @boardname@ in a hand](/static/mb/projects/rock-paper-scissors/hand.jpg)
