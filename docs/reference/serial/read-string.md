# Serial Read String

Read the buffered serial data as a string.

```sig
serial.readString();
```

## Returns

* a [string](/types/string) containing input from the serial port. The string is empty if no data is available.

## Example

The following program scrolls text on the screen as it arrives from serial.

```blocks
basic.forever(() => {
    basic.showString(serial.readString());
});
```

## See also

[serial](/device/serial),
[serial write line](/reference/serial/write-line),
[serial write value](/reference/serial/write-value)
