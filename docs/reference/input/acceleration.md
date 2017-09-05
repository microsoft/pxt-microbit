# Acceleration

Get the acceleration value (milli g-force) in one of three dimensions, or the combined force in all directions.

Find the acceleration of the @boardname@ (how fast it is speeding up or slowing down).

```sig
input.acceleration(Dimension.X);
```

## ~hint

You measure acceleration with the **milli-g**, which is 1/1000 of a **g**.
A **g** is as much acceleration as you get from Earth's gravity.

## ~

### Parameters

* **dimension**: the direction you are checking for acceleration, or the total strength of force.
>`x`: acceleration in the left and right direction.<br/>
`y`: acceleration in the forward and backward direction.<br/>
`z`: acceleration the up and down direction.<br/>
`strength`: the total of all the forces in every dimension (direction) together.

### Returns

* a [number](/types/number) that means the amount of acceleration. When the @boardname@ is lying flat on a surface with the screen pointing up, `x` is `0`, `y` is `0`, `z` is `-1023`, and `strength` is `1023`.

### Example: bar chart

This example shows the acceleration of the @boardname@ with a bar graph.

```blocks
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.X), 1023)
})
```
### Example: quake meter

Every 5 seconds, with the @boardname@ facing upward on a flat surface, show how much the earth is shaking (if at all).

```blocks
basic.forever(() => {
    basic.showNumber(input.acceleration(Dimension.Strength))
    basic.pause(5000)
})
```

### See also

[set accelerometer range](/reference/input/set-accelerometer-range),
[compass heading](/reference/input/compass-heading),
[light level](/reference/input/light-level)

