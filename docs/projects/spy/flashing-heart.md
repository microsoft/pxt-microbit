# Flashing Heart

## Introduction @unplugged

Learn how to use the LEDs and make a flashing heart! 
(Want to learn how lights work? [Watch this video](https://youtu.be/qqBmvHD5bCw)).

![Heart shape in the LEDs](/static/mb/projects/flashing-heart/sim.gif)

## Step 1 @fullscreen

Put a ``||basic:forever||`` event to repeat code.

```spy
basic.forever(function() {
})
```

## Step 2

Put ``||basic:show leds||`` in the ``||basic:forever||`` and draw a heart.

```spy
basic.forever(function() {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .`);
})
```

## Step 3

Place in another ``||basic:show leds||``. You can leave it blank and draw what you want.

```spy
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

## Step 4

Look at the virtual @boardname@, you should see the heart and your drawing blink on the screen.

![Heart shape in the LEDs](/static/mb/projects/flashing-heart/show-leds.gif)

## Step 5

If you have a @boardname@ connected, click ``|Download|`` and transfer your code to the @boardname@!