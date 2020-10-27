# read Buffer

Read available serial data into a buffer.

```sig
serial.readBuffer(64);
```

## Parameters

* **length**: the [number](/types/number) of characters of serial data to read.
Use ``0`` to return the available buffered data.

## Returns

* a [buffer](/types/buffer) containing input from the serial port. The length of the buffer may be smaller than the requested length.
The length is 0 if any error occurs.

## ~hint
**Pause for more data**

If the desired number of characters are available, **readBuffer** returns a buffer with the expected size. If not, the calling fiber (the part of your program calling the **readBuffer** function) sleeps until the desired number of characters are finally read into the buffer.

To avoid waiting for data, set the length to ``0`` so that buffered data is returned immediately.
## ~

## Example

Read character data from the serial port one row at a time. Write the rows to an LED display connected to the I2C pins.

```typescript
let rowData: Buffer = null;
for (let i = 0; i < 24; i++) {
    rowData = serial.readBuffer(80);
    pins.i2cWriteBuffer(65, rowData, false);
}
```

## See Also

[write buffer](/reference/serial/write-buffer)
