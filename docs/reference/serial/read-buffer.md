# Serial Read Buffer

Read the buffered serial data as a buffer.

```sig
serial.readBuffer(64);
```

## Returns

* a Buffer containing input from the serial port. The length of the buffer may be smaller than the requested length.

## Remarks

 If the desired number of characters are available, this will return a string with the expected size. Otherwise, the calling fiber sleeps until the desired number of characters have been read.

## See Also

[micro:bit DAL documentation](https://lancaster-university.github.io/microbit-docs/ubit/serial/#managedstring-read-int-size-microbitserialmode-mode)
