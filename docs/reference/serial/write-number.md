# Serial Write Number

Write a number to the [serial](/device/serial) port.

```sig
serial.writeNumber(0);
```

## Parameters

* `value` is the [number](/types/number) to write to the serial port

## Example: one two three

This program repeatedly writes a 3-digit number to the serial port.

```blocks
basic.forever(() => {
    serial.writeNumber(123);
    basic.pause(5000);
});
```

## Example: plot bar graph does serial

If you use the ``led.plotBarGraph`` function, it writes the number
being plotted to the serial port too.

```blocks
basic.forever(() => {
    led.plotBarGraph(input.lightLevel(), 255)
    basic.pause(10000);
})
```

## See also

[serial](/device/serial),
[serial write line](/reference/serial/write-line),
[serial write value](/reference/serial/write-value),
[serial write numbers](/reference/serial/write-numbers)

