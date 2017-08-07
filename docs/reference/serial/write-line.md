# Serial Write Line

Write a string to the [serial](/device/serial) port and start a new line of text
by writing `\r\n`.

```sig
serial.writeLine("");
```

## Parameters

* `text` is the [string](/types/string) to write to the serial port

## Example: simple serial

This program writes the word `BOFFO` to the serial port repeatedly.

```blocks
basic.forever(() => {
    serial.writeLine("BOFFO");
    basic.pause(5000);
});
```

## Example: streaming data

This program checks the
[compass heading](/reference/input/compass-heading) and sends the
direction to the serial port repeatedly.

```blocks
basic.forever(() => {
    let heading = input.compassHeading()
    if (heading < 45) {
        serial.writeLine("N");
    } else if (heading < 135) {
        serial.writeLine("E");
    }
    else if (heading < 225) {
        serial.writeLine("S");
    }
    else {
        serial.writeLine("W");
    }
})
```
## See also

[serial](/device/serial),
[serial write number](/reference/serial/write-number),
[serial write string](/reference/serial/write-string),
[serial write value](/reference/serial/write-value)
