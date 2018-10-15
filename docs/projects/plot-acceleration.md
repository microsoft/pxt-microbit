# Plot Acceleration

The ``||led:plot bar graph||`` uses the screen to display magnitude of a value (positive or negative). 
This is a great tool to understand the data returned by sensors... like the accelerometer.

## Acceleration

This example plots the acceleration in the ``x`` dimension on the LEDs.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.acceleration(Dimension.X),
        0
    )
})
```

## Console

Click on the ``||Show Console||`` button to see a time chart of the value passed in the block.

## Maximum value

If you specify the maximum value, the block can do a better job at displaying the data. 
For example, we can tell the block that we don't expect values beyond 1000 mg.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.acceleration(Dimension.X),
        1000
    )
})
```

## Other sensors

You can use this block for pretty much any data. Try it out! We pass the light level to play with the light sensor. 

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.lightLevel(),
        0
    )
})
```
