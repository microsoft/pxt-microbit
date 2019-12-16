# Magnetic Force

Find the amount of magnetic force (the strength of a magnet) in one of the three directions.

```sig
input.magneticForce(Dimension.X);
```

## ~hint

The @boardname@ measures magnetic force with **microteslas**.

You are asked to [calibrate](https://support.microbit.org/support/solutions/articles/19000008874-calibrating-the-micro-bit-compass) the compass the first time run a program
that uses the compass.

## ~

## Parameters

* **dimension**: this is the direction the @boardname@ should measure
  magnetic force in: either `Dimension.X` (the left-right direction),
  `Dimension.Y` (the forward/backward direction), or `Dimension.Z`
  (the up/down direction)

## Returns

* a [number](/types/number) of microteslas that means the strength of the magnet

## Example

Create a metal detector my measuring the strength of magnetic force in the `X` direction.
Display a bar graph to show the current level of magnetic force measured by the magnetometer.

```blocks
basic.forever(function() {
    led.plotBarGraph(input.magneticForce(Dimension.X) / 2000, 0)
})
```

## See also

[compass heading](/reference/input/compass-heading)
