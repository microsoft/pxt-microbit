# Plot Acceleration

Plot acceleration in the ``x`` dimension on the LEDs.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.acceleration(Dimension.X),
        1023
    )
})
```
