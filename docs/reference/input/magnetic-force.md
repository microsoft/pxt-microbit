# magnetic Force

Find the amount of magnetic force (the strength of a magnet) in one of the three directions.

```sig
input.magneticForce(Dimension.X);
```

The @boardname@ measures magnetic force in **microteslas**.

### ~hint

#### Compass calibration

The magnetometer doesn't automatically calibrate to the Earth's magnetic field when reading magnetic force. This is so you can detect localized magnetic attractions in your tests and experiments. If you want to calibrate for magnetic polar alignment before measuring magnetic force, you need to first calibrate using:

```block
input.calibrateCompass()
```

When you run this block you will be asked to [calibrate](https://support.microbit.org/support/solutions/articles/19000008874-calibrating-the-micro-bit-compass) for the compass.

### ~

## Parameters

* **dimension**: this is the direction the @boardname@ should measure
  magnetic force in: either `Dimension.X` (the left-right direction),
  `Dimension.Y` (the forward/backward direction), or `Dimension.Z`
  (the up/down direction)

## Returns

* a [number](/types/number) of microteslas that is the strength of the magnetic force.

## Example

Create a metal detector my measuring the strength of magnetic force in the `X` direction.
Display a bar graph to show the current level of magnetic force measured by the magnetometer.

```blocks
basic.forever(function() {
    led.plotBarGraph(input.magneticForce(Dimension.X) / 2000, 0)
})
```

## See also

[compass heading](/reference/input/compass-heading),
[calibrate compass](/reference/input/calibrate-compass)
