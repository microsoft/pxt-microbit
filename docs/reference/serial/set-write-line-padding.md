# set Write Line Padding

Sets the padding length for text lines written to the serial port.

```sig
serial.setWriteLinePadding(0)
```

When text is written to the serial port as a "line", it can have an amount of padding to keep the line at a certian length. If the write line padding is set to `32` and the length of text sent with [write line](/reference/serial/write-line) is only `15` characters, then additional `space` characters are added to make the line length `32` characters.

Also, the padding length will account for the NEWLINE characters that terminate the line.

### ~ hint

#### Serial input buffers

Some devices that you connect a @boardname@ to with the serial port might collect the text you send to them in a buffer before they transfer it to a program that will process it. You can ensure that the connected device will respond to your messege by using padding to make the text you sent transfer out of the connected device's input buffer right away. If you know that the device connected to your @boardname@ will release the text in its input buffer when `64` characters are collected, you can set the write line padding length to `64` before you send your message.

### ~

In this example, the a line of text `"Hello Serial!"` is written to the serial port.

```block
serial.setWriteLinePadding(24)
serial.writeLine("Hello Serial!")
```

In this case, the output will NOT be:

`Hello Serial!\r\n`

Instead, it will include addtional space characters to make the line length `24` characters:

`Hello Serial!           \r\n`

## Parameters

* **length**: a [number](/types/number) between `0` and `128` that sets the padding length for lines of text written to the serial port. The default padding length is `32`.

## Example

Set the write line padding to `48` characters and write a message line to the serial port.

```block
serial.setWriteLinePadding(48)
serial.writeString("This is my SERIAL message!")
```

## See also

[write line](/reference/serial/write-line)