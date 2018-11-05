# i2c Write Buffer

Write data from buffer to a device at an I2C address.

```sig
pins.i2cWriteBuffer(0, null, false);
```

A device connected to the I2C pins on the @boardname@ at the address is selected to write data to. If the device is ready to take in your data, some or all of the data in your buffer is written to it.

### ~hint

**Simulator**

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parameters

* **address**: the 7-bit I2C address to read the data from.
* **buffer**: a [buffer](/types/buffer) that contains the data to write to the device at the I2C address.
* **repeated**: if `true`, don't send a stop condition after the write. Otherwise, a stop condition is sent when `false` (the default).

### ~ hint

A [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure that when you want to write data miltiple times from the device at once, it can happen without interruption. A start conditon is sent (if **repeated** is `true`) each time a buffer is written without a matching stop condition. When the last buffer is written, the stop conditon can be sent by setting **repeated** to `false`. For single writes, don't use **repeated** or set it to `false`.

### ~

## Example

Tell a device connected to the I2C pins with the address of `141` to respond to a _read status_ command. The device sends the status data on the I2C wires if receives a command byte equal to `0`. `32` bytes of status data is read into a buffer.

The third byte is changed and the buffer is sent back to have the device update its status.

```blocks
const i2cDevice = 141;
pins.i2cWriteNumber(i2cDevice, NumberFormat.UInt8LE, 0)
let i2cBuffer = pins.i2cReadBuffer(i2cDevice, 32, false);
i2cBuffer.setNumber(NumberFormat.UInt8LE, 2, 0)
pins.i2cWriteBuffer(i2cDevice, i2cBuffer, false)
```

## See also

[i2c read buffer](/reference/pins/i2c-read-buffer), [buffer](/types/buffer)

[What's I2C?](http://www.i2c-bus.org/)
