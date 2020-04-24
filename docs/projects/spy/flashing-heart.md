# Flashing Heart

### @explicitHints true

## Introduction @unplugged

Learn how to use the LEDs and make a flashing heart! 
(Want to learn how lights work? [Watch this video](https://youtu.be/qqBmvHD5bCw)).

![Heart shape in the LEDs](/static/mb/projects/flashing-heart/sim.gif)

## Step 1 @fullscreen

Put in a ``||basic:forever||`` event to repeat code.

```spy
basic.forever(function() {

})
```

## Step 2

Put ``||basic:show leds||`` in the ``||basic:forever||`` loop and draw a heart. An image is drawn
by placing a `#` for the LED you want to turn on in the 5 rows by 5 columns of periods - `.`. These
represent each LED on the display.

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

Put in one more ``||basic:show leds||``. You can either leave it blank or draw in a new image.

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