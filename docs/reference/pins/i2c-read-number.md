# i2c Read Number

Read one number from an I2C address using a specified number format.

```sig
pins.i2cReadNumber(0, NumberFormat.Int8LE, false);
```

### ~ hint

**Simulator**: This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parameters

* **address**: the 7-bit I2C address of the device you want to read a number from.
* **format**: the [NumberFormat](/types/buffer/number-format) of the number value to read.
* **repeated**: if `true`, don't send a stop condition after the read. Otherwise, a stop condition is sent when `false` (the default).

### ~ hint

#### Repeated start

A [repeated start condition](http://www.i2c-bus.org/repeated-start-condition/) is set to help make sure that when you want to read multiple numbers from the device at one time, it can happen without interruption. A start conditon is sent (if **repeated** is `true`) each time a number is read without a matching stop condition. When the last number is read, the stop conditon can be sent by setting **repeated** to `false`. For single reads, don't use **repeated** or set it to `false`.

#### Reserved addresses

Some sensors on your @boardname@ use the same I2C bus that is connected to the pins that you program. This means that you should be careful to **NOT** use an address for your device that is the same as the any of the ones used by the sensors on the board. Check the [I2C sensor addresses](https://tech.microbit.org/hardware/i2c/) list before you assign one to your device. This will help you keep the addresses separate.

#### Bus address format

The @boardname@ uses 7-bit values to address the devices connected on the I2C bus. Before an address is transmitted, it is adjusted temporarily to an 8-bit value so that the valid address bits are sent properly. This means that the value of an 8-bit address present on the bus will appear as twice that of what you specified. This is fine though, since the device you are addressing will decode it to match the address you gave. If your device address is specified as an 8-bit address, you will need to use an address that is half that value when you read to or write from it.

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
