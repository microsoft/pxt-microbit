# I2C Read Number

Read one number from an I2C address using a specified number format.

```sig
pins.i2cReadNumber(0, NumberFormat.Int8LE, false);
```

### ~hint
**Simulator**

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parameters

* **address**: the 7-bit I2C address of the device you want to read a number from.
* **format**: the [NumberFormat](/types/buffer/number-format) of the number value to read.
* **repeated**: repeated start, true - don't send stop at end.
* **repeated**: if `true`, a [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure the number is read from the device with out an interruption. If set to `false` (the default), the number is read without setting a start condition more than once.

## Returns

* a number from the device with the [NumberFormat](/types/buffer/number-format) you asked for.

## Example

The following example reads a number in big-endian, 16-bit, unsigned integer
format from the 7-bit I2C address `32`.

Read a number from the device at a 7-bit I2C address as a 16-bit number. The `16`, big-endian, and integer chosen for the format.

```blocks
pins.i2cReadNumber(32, NumberFormat.UInt16BE, false);
```

## See also

[What's I2C?](http://www.i2c-bus.org/), [number format](/types/buffer/number-format)
