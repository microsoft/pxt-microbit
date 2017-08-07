# Acceleration

Get the acceleration value (milli g-force), in one of three specified dimensions.

Find the acceleration of the @boardname@ (how fast it is speeding up or slowing down).

```sig
input.acceleration(Dimension.X);
```

## ~hint

You measure acceleration with the **milli-g**, which is 1/1000 of a **g**.
A **g** is as much acceleration as you get from Earth's gravity.

## ~



## Parameters

* ``dimension`` means which direction you are checking for acceleration, either `Dimension.X` (left and right), `Dimension.Y` (forward and backward), or `Dimension.Z` (up and down)

## Returns

* a [number](/types/number) that means the amount of acceleration. When the @boardname@ is lying flat on a surface with the screen pointing up, `x` is `0`, `y` is `0`, and `z` is `-1023`.

## Example: bar chart

This example shows the acceleration of the @boardname@ with a bar graph.

```blocks
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.X), 1023)
})
```


## See also

[set accelerometer range](/reference/input/set-accelerometer-range),
[compass heading](/reference/input/compass-heading),
[light level](/reference/input/light-level)

