# i2c Write Number

Write a number to a device at an I2C address using a specified number format.

```sig
pins.i2cWriteNumber(0, 0, NumberFormat.Int8LE, true);
```

### ~ hint

**Simulator**: This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parameters

* **address**: the 7-bit I2C address of the device to send to send **value** to.
* **value**: the number to send to **address**.
* **format**: the [NumberFormat](/types/buffer/number-format) for **value**.
* **repeated**: if `true`, don't send a stop condition after the write. Otherwise, a stop condition is sent when `false` (the default).

### ~ hint

#### Repeated start

A [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure that when you want to write multiple numbers from the device at one time, it can happen without interruption. A start conditon is sent (if **repeated** is `true`) each time a number is written without a matching stop condition. When the last number is written, the stop conditon can be sent by setting **repeated** to `false`. For single writes, don't use **repeated** or set it to `false`.

#### Reserved addresses

Some sensors on your @boardname@ use the same I2C bus that is connected to the pins that you program. This means that you should be careful to **NOT** use an address for your device that is the same as the any of the ones used by the sensors on the board. Check the [I2C sensor addresses](https://tech.microbit.org/hardware/i2c/) list before you assign one to your device. This will help you keep the addresses separate.

#### Bus address format

The @boardname@ uses 7-bit values to address the devices connected on the I2C bus. Before an address is transmitted, it is adjusted temporarily to an 8-bit value so that the valid address bits are sent properly. This means that the value of an 8-bit address present on the bus will appear as twice that of what you specified. This is fine though, since the device you are addressing will decode it to match the address you gave. If your device address is specified as an 8-bit address, you will need to use an address that is half that value when you read to or write from it.
### ~

## Examples

### Write a big endian number to a device

Send the value `2055` to the 7-bit I2C address as a 32-bit number. The `32`, big-endian, and integer chosen for the format.

```blocks
pins.i2cWriteNumber(32, 2055, NumberFormat.Int32BE, false);
```

### Repeated writes

Send three byte values to a device at address `33`.

```blocks
pins.i2cWriteNumber(33, 19, NumberFormat.Int32BE, true);
pins.i2cWriteNumber(33, 61, NumberFormat.Int32BE, true);
pins.i2cWriteNumber(33, 87, NumberFormat.Int32BE, false);
```

## See also

[i2c read number](/reference/pins/i2c-read-number)

[What's I2C?](http://www.i2c-bus.org/), [number format](/types/buffer/number-format)
