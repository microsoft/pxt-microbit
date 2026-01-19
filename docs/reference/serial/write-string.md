# write String

Write a string to the [serial](/device/serial) port,
without starting a new line afterward.

```sig
serial.writeString("")
```

### ~ hint

#### Simulator data log

When a string is written to the serial port, it's sent immediately over the serial connection. However, when you code with  ``||serial:write string||`` in the Editor, the simulator's data log may not display the output data right away. The characters that represent the string may get queued in the data log buffer and won't display until:

* a 'newline' line character is received (`\n`)

-- or --

* log data buffer limit is reached (currently set at `256` characters).

If you want to see the string displayed immediately, use a ``||serial:write line||`` with an empty string right after the ``||serial:write string||``.

### ~

## Parameters

* `text` is the [string](/types/string) to write to the serial port

## Example: simple serial

This program writes the word `JUMBO` to the serial port repeatedly,
without any new lines.

```blocks
basic.forever(function() {
    serial.writeString("JUMBO")
    basic.pause(1000)
})
```

## See also

[serial](/device/serial),
[write line](/reference/serial/write-line),
[write number](/reference/serial/write-number),
[write value](/reference/serial/write-value)
