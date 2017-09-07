# night light activity

Change the brightness of the @boardname@.

## ~avatar avatar

Welcome! This tutorial will teach you how to change the brightness of the @boardname@. Let's get started!

## ~

The brightness of the LED screen can be changed by using the `set brightness` function. This function takes a number between ``0`` (off) and ``255`` (full brightness).

Let's build a little app that dims the screen when pressing button ``A``.

Add the code `show LEDs` and select all LEDs to turn on all the LEDs. Don't hesitate to run your code to see what happens.

```blocks
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
```

The screen starts with a 50% brightness value by default (128). Add a new line of code to set the full brightness (255) using `set brightness`.

```blocks
led.setBrightness(255)
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
```

Add a new event handler for `on button pressed(A)` and add the code to set the brightness to `64`.


```blocks
led.setBrightness(255)
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
input.onButtonPressed(Button.A, () => {
    led.setBrightness(64)
})

```



## ~avatar boothing

Excellent, you're ready to continue with the [challenges](/lessons/night-light/challenges)!

## ~

