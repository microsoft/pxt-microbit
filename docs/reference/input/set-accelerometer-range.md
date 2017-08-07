# Set Accelerometer Range

Set up the part of the @boardname@ that measures
[acceleration](/reference/input/acceleration) (how much the microbit
is speeding up or slowing down), in case you need to measure high
or low acceleration.

```sig
input.setAccelerometerRange(AcceleratorRange.OneG);
```

## Parameters

* ``range`` means the biggest number of gravities of acceleration you
  will be measuring (either `1g`, `2g`, `4g`, or `8g`).  Any bigger numbers
  will be ignored by your @boardname@, both when you are picking a
  number of gravities, and when you are measuring acceleration.

## Example

This program sets the highest acceleration that your @boardname@
will measure is 4G. Then it shows acceleration from side to side
until you stop the program.

```blocks
input.setAccelerometerRange(AcceleratorRange.FourG);
basic.forever(() => {
    basic.showNumber(input.acceleration(Dimension.X));
});
```

### ~hint

This program does not work in the simulator, only in a @boardname@.

### ~

## See Also

[compass heading](/reference/input/compass-heading),
[light level](/reference/input/light-level)
