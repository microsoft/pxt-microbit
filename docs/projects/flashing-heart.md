# Flashing Heart

## Introduction @unplugged

Learn how to use the LEDs and make a flashing heart!

![Heart shape in the LEDs](/static/mb/projects/flashing-heart/show-leds.gif)

## Step 1 @fullscreen

Place the ``||basic:show leds||`` block in the ``||basic:forever||`` block and draw a heart.

![An animation that shows how to drag a block and paint a heart](/static/mb/projects/flashing-heart/showleds.gif)

## Step 2 @fullscreen

Place another ``||basic:show leds||`` block. You can leave it blank and draw what you want.

```blocks
basic.forever(function() {
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
})
```

## Step 3 @fullscreen

Look at the virtual @boardname@, you should see the heart and your drawing blink on the screen.

![Heart shape in the LEDs](/static/mb/projects/flashing-heart/show-leds.gif)

## Step 4 @fullscreen

If you have a @boardname@ connected, click ``|Download|`` to transfer your code and watch the hearts flash!
