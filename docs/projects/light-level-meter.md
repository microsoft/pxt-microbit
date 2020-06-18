# Light Level Meter

## Introduction @unplugged

This program creates a light level meter. It uses the light sensor on the @boardname@
to detect the amount of light.

## Save a reading

Create a variable, ``||variables:reading||``, to set to the current ``||input:light level||`` inside the ``||loops:forever||`` loop.

```blocks
let reading = 0
basic.forever(function() {
    reading = input.lightLevel()
})
```

## Plot the light level

Now, ``||led:plot a bar graph||`` of the ``||variables:reading||`` for the ``||input:light level||``. Set the limit to `255`.

```blocks
let reading = 0
basic.forever(function() {
    reading = input.lightLevel()
    led.plotBarGraph(reading, 255)
})
```

## Adjust the light level

Go to the simulator and watch the bar graph change while you adjust the light level control.

## Show the reading as number

Add the code to ``||basic:show a number||`` for the ``||variables:reading||``  value
``||logic:if||`` the ``||input:button A is pressed||``.

```blocks
let reading = 0
basic.forever(function() {
    reading = input.lightLevel()
    led.plotBarGraph(reading, 255)
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(reading)
    }
})
```

## Download and try

Download the code to your @boardname@ and measure the light level around you!