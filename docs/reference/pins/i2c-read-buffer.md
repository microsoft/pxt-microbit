# i2c Read Buffer

Read data into a buffer from a device at an I2C address.

```sig
pins.i2cReadBuffer(0, 0, false);
```

A device connected to the I2C pins on the @boardname@ at the address is selected to read data from. If it has data available to transfer, the data is received and copied into a buffer for your program to use. Your program says how big (how many bytes to receive) the buffer should be. You won't get back that many bytes of data if the connected device has less to send than what you asked for.

### ~hint

**Simulator**

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parameters

* **address**: the 7-bit I2C address to read the data from.
* **size**: the [number](/types/number) of bytes to read into the buffer from the device.
* **repeated**: if `true`, don't send a stop condition after the read. Otherwise, a stop condition is sent when `false` (the default).

### ~ hint

A [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure that when you want to read data miltiple times from the device at once, it can happen without interruption. A start conditon is sent (if **repeated** is `true`) each time a buffer is read without a matching stop condition. When the last buffer is read, the stop conditon can be sent by setting **repeated** to `false`. For single reads, don't use **repeated** or set it to `false`.

### ~

## Returns

* a [buffer](/types/buffer) that contains the data read from the device at the I2C address. The number of bytes returned to you is less than or equal to amount you asked for in the **size** parameter.

## Example

Tell a device connected to the I2C pins with the address of `141` to respond to a _read status_ command. The device sends the status data on the I2C wires if receives a command byte equal to `0`. `32` bytes of status data are read into a buffer.

```blocks
const i2cDevice = 141;
pins.i2cWriteNumber(i2cDevice, NumberFormat.UInt8LE, 0)
let i2cBuffer = pins.i2cReadBuffer(i2cDevice, 32, false);
```

## See also

[i2c write buffer](/reference/pins/i2c-write-buffer), [buffer](/types/buffer)

[What's I2C?](http://www.i2c-bus.org/)
