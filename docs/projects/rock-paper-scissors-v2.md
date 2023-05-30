# Rock Paper Scissors V2

## Introduction @unplugged

![Cartoon of the Rock Paper Scissors game](/static/mb/projects/a4-motion-v2.png)

Build a "Rock Paper Scissors" game with ADDED BONUS SOUNDS using the **micro:bit V2** buzzer!

## Step 1 @fullscreen

Use the ``||input:on shake||`` block in the Workspace to run code when you shake the @boardname@.

```blocks
input.onGesture(Gesture.Shake, function () {

})
```

## Step 2 @fullscreen

Make a new variable called ``hand`` and place the ``||variables:set hand to||`` block in the shake event.

![A animation that shows how to create a variable](/static/mb/projects/rock-paper-scissors/newvar.gif)

## Step 3 @fullscreen

Add a ``||math:pick random||`` block to pick a random number from `1` to `3` and store it in the variable named ``hand``.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function () {
    hand = randint(1, 3)
})
```

In a later step, each of the possible numbers (`1`, `2`, or `3`) is matched to its own picture. The picture is shown on the LEDs when its matching number is picked.

## Step 4 @fullscreen

Place an ``||logic:if||`` block under the ``||math:pick random||`` and check whether ``hand`` is equal to ``1``. Add a ``||basic:show leds||`` block that shows a picture of a piece of paper. The number `1` is the value for paper.

![How to drag an if statement](/static/mb/projects/rock-paper-scissors/if.gif)

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function () {
    hand = randint(1, 3)
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

## Step 5 @fullscreen

Place a ``||music:play sound||`` block under ``||basic:show leds||`` and edit it to make it sound like paper.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function () {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 4120, 1266, 255, 148, 500, SoundExpressionEffect.Warble, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
    }
})
```

## Step 6 @fullscreen

Click on the **SHAKE** button in the simulator. If you try enough times, you should see a picture of paper on the screen.

![Shaking a @boardname@ simulator](/static/mb/projects/rock-paper-scissors/rpsshake.gif)


## Step 7 @fullscreen

Click the **(+)** button to add an ``||logic:else||`` section.

![Adding an else clause](/static/mb/projects/rock-paper-scissors/ifelse.gif)

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function () {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 4120, 1266, 255, 148, 500, SoundExpressionEffect.Warble, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
    } else {

    }
})
```

## Step 8 @fullscreen

Add both a ``||basic:show leds||`` block and a ``||music:play sound||`` block inside the ``||logic:else||``. Make a picture for **scissors** using LEDs and create a scissors sound.

```blocks
let hand = 0;
input.onGesture(Gesture.Shake, function () {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 4120, 1266, 255, 148, 500, SoundExpressionEffect.Warble, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
    } else {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 4417, 1, 0, 255, 266, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    }
})
```

## Step 9 @fullscreen

Click the **(+)** button again to add an ``||logic:else if||`` section. Now, add a conditional block for ``||logic:hand = 2||`` to the empty slot in the ``||logic:else if||``. Since ``hand`` can only be `1`, `2`, or `3`, your code is now covering all possible cases!

![Adding an else if clause](/static/mb/projects/rock-paper-scissors/ifelseif.gif)

## Step 10 @fullscreen

Get one more ``||basic:show leds||`` block and ``||music:play sound||`` block and put them inside the ``||logic:else if||``. Make a picture of a rock in the LEDs and create a rock-like sound.

```blocks
let hand = 0
input.onGesture(Gesture.Shake, function () {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 4120, 1266, 255, 148, 500, SoundExpressionEffect.Warble, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
    } else if (hand == 2) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 4417, 1, 0, 255, 266, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    } else {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Triangle, 1177, 4967, 0, 206, 266, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    }
})
```

## Step 11 @fullscreen

Click on the **SHAKE** button in the simulator and check to see that each image is showing up.

![Shaking a @boardname@ simulator](/static/mb/projects/rock-paper-scissors/rpssim3.gif)

## Step 12 @fullscreen

If you have a @boardname@ V2, click on ``|Download|`` and follow the instructions to get the code
onto your @boardname@. 

Your game is ready! Gather your friends and play Rock Paper Scissors!

![A @boardname@ in a hand](/static/mb/projects/rock-paper-scissors/hand.jpg)

```template
input.onGesture(Gesture.Shake, function() {})
```
