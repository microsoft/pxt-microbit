# Flashing Heart

## Introduction @unplugged

Learn how to use the LEDs and make a flashing heart!

![Heart shape in the LEDs](/static/mb/projects/flashing-heart/show-leds.gif)

## Step 1 @fullscreen

Place the ``||basic:show leds||`` block in the ``||basic:on start||`` block and draw a heart.

![An animation that shows how to drag a block and paint a heart](/static/mb/projects/flashing-heart/showleds.gif)

## Step 2 @fullscreen

Place another ``||basic:show leds||`` block under the heart to make it blink. Check in the simulator to see the heart blink.

```blocks
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .`);
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .`);
```

## Step 3 @fullscreen

But we only see the heart blink once. To have it continue to blink, move the blocks inside the ``||basic:forever||`` to make the animation repeat.

```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`
        );
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .`
        );
})
```

## Step 4 @fullscreen

Now let's get fancy and place more ``||basic:show leds||`` blocks to create your own animation.

```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`
        );
    basic.showLeds(`
        . # . # .
        # . # . #
        # . . . #
        . # . # .
        . . # . .`);
    basic.showLeds(`
        . . . . .
        . # . # .
        . # # # .
        . . # . .
        . . . . .`);
})
```

## Step 5 @fullscreen

If you have a @boardname@ connected, click ``|Download|`` to transfer your code and watch the hearts flash!
