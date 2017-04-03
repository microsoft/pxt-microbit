# I2C Read Number

Read one number from the specified 7-bit I2C address, in the specified
number format.

```sig
pins.i2cReadNumber(0, NumberFormat.Int8LE, false);
```

### Parameters

* ``address``: the 7-bit I2C address from which to read the number.
* ``format``: the number format. Formats include
  **Int8LE**, **UInt8LE**, **Int16LE**, **UInt16LE**, **Int32LE**,
  **Int8BE**, **UInt8BE**, **Int16BE**, **UInt16BE**, and
  **Int32BE**.
  * **Int** stands for "integer", and **UInt** stands for "unsigned integer".
  * **LE** stands for "little-endian" and **BE** stands for "big-endian".
  * The number in each format name stands for the number of bits in the format.
* ``repeated`` repeated start, true - don't send stop at end

### Example

The following example reads a number in big-endian, 16-bit, unsigned integer
format from the 7-bit I2C address `32`.

```blocks
pins.i2cReadNumber(32, NumberFormat.UInt16BE, false);
```

#### ~hint

This function is not supported in the simulator.

#### ~

### See also

[I2C](https://en.wikipedia.org/wiki/I%C2%B2C)
