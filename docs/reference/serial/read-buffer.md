# read Buffer

Read available serial data into a buffer.

```sig
serial.readBuffer(64);
```

## Parameters

* **length**: the [number](/types/number) of characters of serial data to read.

## Returns

* a [buffer](/types/buffer) containing input from the serial port. The length of the buffer may be smaller than the requested length.

## ~hint
**Pause for more data**

If the desired number of characters are available, **readBuffer** returns a buffer with the expected size. If not, the calling fiber (the part of your program calling the **readBuffer** function) sleeps until the desired number of characters are finally read into the buffer.

The need to pause for more data is set by the @boardname@ **[serial mode](https://lancaster-university.github.io/microbit-docs/ubit/serial/#serial-modes)**.
## ~

## Example

Read character data from the serial port one row at a time. Write the rows to an LED display connected to the I2C pins.

```blocks
let rowData: Buffer = null;
for (let i = 0; i < 24; i++) {
    rowData = serial.readBuffer(80);
    pins.i2cWriteBuffer(65, rowData, false);
}
```

## See Also

[write buffer](/reference/serial/write-buffer)
