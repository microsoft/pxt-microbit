# i2c Read Number

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
* **repeated**: if `true`, don't send a stop condition after the read. Otherwise, a stop condition is sent when `false` (the default).

### ~ hint

A [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure that when you want to read multiple numbers from the device at one time, it can happen without interruption. A start conditon is sent (if **repeated** is `true`) each time a number is read without a matching stop condition. When the last number is read, the stop conditon can be sent by setting **repeated** to `false`. For single reads, don't use **repeated** or set it to `false`.

### ~

## Returns

* a number from the device with the [NumberFormat](/types/buffer/number-format) you asked for.

## Examples

### Read a big endian number from a device

The following example reads a number in big-endian, 16-bit, unsigned integer
format from the 7-bit I2C address `32`.

Read a number from the device at a 7-bit I2C address as a 16-bit number. The `16`, big-endian, and integer chosen for the format.

```blocks
let inValue = pins.i2cReadNumber(32, NumberFormat.UInt16BE, false);
```

### Repeated reads

Read three bytes from a device at address `33` at one time.

```blocks
let nums: number[] = []

nums[0] = pins.i2cReadNumber(33, NumberFormat.UInt8LE, true)
nums[1] = pins.i2cReadNumber(33, NumberFormat.UInt8LE, true)
nums[2] = pins.i2cReadNumber(33, NumberFormat.UInt8LE, false)
```

## See also

[i2c write number](/reference/pins/i2c-write-number)

[What's I2C?](http://www.i2c-bus.org/), [number format](/types/buffer/number-format)
