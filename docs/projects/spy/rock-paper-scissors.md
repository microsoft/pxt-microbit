# Rock Paper Scissors

### @explicitHints true

## Introduction @unplugged

![Cartoon of the Rock Paper Scissors game](/static/mb/projects/a4-motion.png)

Use the accelerometer and the screen to build a **Rock Paper Scissors** game that you can play with your friends!

## Step 1 @fullscreen

Add an ``||input:on shake||`` event to run code when you shake the @boardname@.

```spy
input.onGesture(Gesture.Shake, () => {
    
})
```

## Step 2

Inside the ``||input:on shake||``, a choose a ``||math:random||`` number in the range of `1` to `3`
and store it in a variable named ``hand``. The random numbers are used to select a picture to show
on the LEDs.

```spy
let hand = 0;
input.onGesture(Gesture.Shake, () => {
    hand = Math.randomRange(1, 3)
})
```

## Step 3

``||logic:if||`` the ``||math:random||`` number in ``hand`` is `1`, ``||basic:show||`` a picture of a piece of paper on the ``||basic:LEDs||``.

```spy
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
    }
})
```

## Step 4 @fullscreen

Click on the **SHAKE** button in the simulator. If you try enough times, you should see a picture of paper on the screen.

![Shaking a @boardname@ simulator](/static/mb/projects/rock-paper-scissors/rpsshake.gif)

## Step 5 @fullscreen

``||logic:if||`` the ``||math:random||`` number is not `1`, then the number is something
``||logic:else||`` so ``||basic:show on the LEDs||`` a picture of some scissors.

```spy
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

## Step 6

Now, when the ``||math:random||`` number in ``hand`` is `2` we want to ``||basic:show on the LEDs||`` a picture of a rock. Change the way you check the value for ``hand`` so that the picture is a piece of paper ``||logic:if||`` it is `1`, ``||logic:else if||`` it is `2` the picture is a rock, or ``||logic:else||`` the picture is scissors.

```spy
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

## Step 7 @fullscreen

Click on the **SHAKE** button in the simulator and check to see that each image is showing up.

![Shaking a @boardname@ simulator](/static/mb/projects/rock-paper-scissors/rpssim3.gif)

## Step 8 @fullscreen

If you have a @boardname@, click on ``|Download|`` and follow the instructions to get the code
onto your @boardname@. Your game is ready! Gather your friends and play Rock Paper Scissors!

![A @boardname@ in a hand](/static/mb/projects/rock-paper-scissors/hand.jpg)
