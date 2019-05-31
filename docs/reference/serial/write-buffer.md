# write Buffer

Write a buffer to the [serial](/device/serial) port.

```sig
serial.writeBuffer(pins.createBuffer(0));
```

You place your data characters into an existing buffer. All of the data, the length of the buffer, is written to the serial port.

## Parameters

* **buffer**: a [buffer](/types/buffer) to write to the serial port.

## Example

Read some characters of data from a device connected to the I2C pins. Write the data to the serial port.

```typescript
pins.i2cWriteNumber(132, NumberFormat.UInt8LE, 0);
let i2cBuffer = pins.i2cReadBuffer(132, 16, false);
serial.writeBuffer(i2cBuffer);
```

## See also

[read buffer](/reference/serial/read-buffer)