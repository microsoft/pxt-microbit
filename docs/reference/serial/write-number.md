# write Number

Write a number to the [serial](/device/serial) port.

```sig
serial.writeNumber(0)
```

A number value is written to the serial port as characters in a string representation. The number `876`, for example:

```block
serial.writeNumber(876)
```

The receiving serial port will see this number as the 3 characters:

```
876
```

## Parameters

* `value` is the [number](/types/number) to write to the serial port

### ~ hint

#### Simulator data log

When a number is written to the serial port, it's sent immediately over the serial connection. However, when you code with  ``||serial:write number||`` in the Editor, the simulator's data log may not display the output data right away. The characters that represent the number may get queued in the data log buffer and won't display until:

* a 'newline' line character is received (`\n`)

-- or --

* log data buffer limit is reached (currently set at `256` characters).

If you want to see the string displayed immediately, use a ``||serial:write line||`` with an empty string right after the ``||serial:write number||``.

### ~

## Examples

### One, Two, Three

This program repeatedly writes a 3-digit number as a line to the serial port.

```blocks
basic.forever(function() {
    serial.writeNumber(123)
    serial.writeLine("")
    basic.pause(5000)
});
```

### Plot bar graph does serial

If you use the ``led.plotBarGraph`` function, it writes the number
being plotted to the serial port too.

```blocks
basic.forever(function() {
    led.plotBarGraph(input.lightLevel(), 255)
    basic.pause(10000)
})
```

## See also

[serial](/device/serial),
[write line](/reference/serial/write-line),
[write value](/reference/serial/write-value),
[write numbers](/reference/serial/write-numbers)