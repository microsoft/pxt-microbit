# I2C Write Number

Write the specified number to the specified 7-bit I2C address in the
specified number format.

```sig
pins.i2cWriteNumber(0, 0, NumberFormat.Int8LE, true);
```

### Parameters

* ``address``: the 7-bit I2C address to which to send ``value``
* ``value``: the number to send to ``address``
* ``format``: the number format for ``value``. Formats include
  **Int8LE**, **UInt8LE**, **Int16LE**, **UInt16LE**, **Int32LE**,
  **Int8BE**, **UInt8BE**, **Int16BE**, **UInt16BE**, and
  **Int32BE**.
  * **Int** stands for "integer", and **UInt** stands for "unsigned integer".
  * **LE** stands for "little-endian" and **BE** stands for "big-endian".
  * The number in each format name stands for the number of bits in the format.
* ``repeated`` repeated start, true - don't send stop at end

### Example

The following example sends the value `2055` to the 7-bit I2C
address `32` in big-endian 32-bit integer format.

```blocks
pins.i2cWriteNumber(32, 2055, NumberFormat.Int32BE);
```

#### ~hint

This function is not supported in the simulator.

#### ~

### See also

[I2C](https://en.wikipedia.org/wiki/I%C2%B2C)
