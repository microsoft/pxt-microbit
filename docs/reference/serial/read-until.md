# Serial Read Until

Read a text from the serial port until a delimiter is found.

```sig
serial.readUntil(",");
```

## Returns

* a [string](/types/string) containing input from the serial port, such as a response typed by a user

## Example

The following example reads strings separated by commands (``,``).

```blocks
basic.forever(() => {
    let answer = serial.readUntil(",");
    serial.writeLine(answer);
});
```

## See also

[serial](/device/serial),
[serial write line](/reference/serial/write-line),
[serial write value](/reference/serial/write-value)
