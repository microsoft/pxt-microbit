# i2c Write Buffer

Write data from buffer to a device at an I2C address.

```sig
pins.i2cWriteBuffer(0, null, false);
```

A device connected to the I2C pins on the @boardname@ at the address is selected to write data to. If the device is ready to take in your data, some or all of the data in your buffer is written to it.

### ~ hint

**Simulator**: This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parameters

* **address**: the 7-bit I2C address to read the data from.
* **buffer**: a [buffer](/types/buffer) that contains the data to write to the device at the I2C address.
* **repeated**: if `true`, don't send a stop condition after the write. Otherwise, a stop condition is sent when `false` (the default).

### ~ hint

#### Repeated start

A [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure that when you want to write data miltiple times from the device at once, it can happen without interruption. A start conditon is sent (if **repeated** is `true`) each time a buffer is written without a matching stop condition. When the last buffer is written, the stop conditon can be sent by setting **repeated** to `false`. For single writes, don't use **repeated** or set it to `false`.

#### Reserved addresses

Some sensors on your @boardname@ use the same I2C bus that is connected to the pins that you program. This means that you should be careful to **NOT** use an address for your device that is the same as the any of the ones used by the sensors on the board. Check the [I2C sensor addresses](https://tech.microbit.org/hardware/i2c/) list before you assign one to your device. This will help you keep the addresses separate.

#### Bus address format

The @boardname@ uses 7-bit values to address the devices connected on the I2C bus. Before an address is transmitted, it is adjusted temporarily to an 8-bit value so that the valid address bits are sent properly. This means that the value of an 8-bit address present on the bus will appear as twice that of what you specified. This is fine though, since the device you are addressing will decode it to match the address you gave. If your device address is specified as an 8-bit address, you will need to use an address that is half that value when you read to or write from it.

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
