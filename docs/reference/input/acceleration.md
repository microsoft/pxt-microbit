# Acceleration

Get the acceleration value (milli g-force) in one of three dimensions, or the combined force in all directions (x, y, and z).

Find the acceleration of the @boardname@ (how fast it is speeding up or slowing down).

```sig
input.acceleration(Dimension.X);
```

## ~hint

You measure acceleration with the **milli-g**, which is 1/1000 of a **g**.
A **g** is as much acceleration as you get from Earth's gravity.

## ~

## Parameters

* **dimension**: the direction you are checking for acceleration, or the total strength of force.
>`x`: acceleration in the left and right direction.<br/>
`y`: acceleration in the forward and backward direction.<br/>
`z`: acceleration in the up and down direction.<br/>
`strength`: the resulting strength of acceleration from all three dimensions (directions).

### ~hint

**Forces in space**

Since we don't live on a flat world, forces happen in three dimensional space. If the movement of an object isn't exactly in the direction of one axis, we need a way to calculate its acceleration from the values measured for all the axes together.

If you put your @boardname@ on a level table and push it diagonally, you have an acceleration in two dimensions. You can find the acceleration in that direction just like how you calculate the long side of a triangle using the two shorter sides (**X** and **Y**): 

```strength2D = Math.sqrt((accelX * accelX) + (accelY * accelY))```

If you decide to lift your @boardname@ off the table, then you've just added another dimension, so insert the acceleration value for the **Z** axis into the equation:

```strength3D = Math.sqrt((accelX * accelX) + (accelY * accelY) + (accelZ * accelZ))```

This calculation is called the [Euclidean norm](https://en.wikipedia.org/wiki/Euclidean_norm) of acceleration.

### ~

## Returns

* a [number](/types/number) that means the amount of acceleration. When the @boardname@ is lying flat on a surface with the screen pointing up, `x` is `0`, `y` is `0`, `z` is `-1023`, and `strength` is `1023`.

## Example: bar chart

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

## See also

[set accelerometer range](/reference/input/set-accelerometer-range),
[compass heading](/reference/input/compass-heading),
[light level](/reference/input/light-level)

