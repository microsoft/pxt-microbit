# i2c Write Number

Write a number to a device at an I2C address using a specified number format.

```sig
pins.i2cWriteNumber(0, 0, NumberFormat.Int8LE, true);
```

### ~hint
**Simulator**

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parameters

* **address**: the 7-bit I2C address of the device to send to send **value** to.
* **value**: the number to send to **address**.
* **format**: the [NumberFormat](/types/buffer/number-format) for **value**.
* **repeated**: if `true`, a [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure the number is written to the device with out an interruption. If set to `false` (the default), the data is written without setting a start condition more than once.

## Example

Send the value `2055` to the 7-bit I2C address as a 32-bit number. The `32`, big-endian, and integer chosen for the format.

```blocks
pins.i2cWriteNumber(32, 2055, NumberFormat.Int32BE, false);
```

## See also

[What's I2C?](http://www.i2c-bus.org/), [number format](/types/buffer/number-format)