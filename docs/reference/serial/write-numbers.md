# Serial Write Numbers

Write an array of numbers to the [serial](/device/serial) port.

```sig
serial.writeNumbers([0, 1, 2]);
```

## Parameters

* `values` is the array of [number](/types/number) to write to the serial port

## Example: one two three

This program repeatedly writes a 3-number array to the serial port.

```blocks
basic.forever(() => {
    serial.writeNumbers([1, 2, 3]);
    basic.pause(5000);
});
```

## Example: plot temperature and light


```blocks
serial.writeLine("temp,light")
basic.forever(() => {
    serial.writeNumbers([input.temperature(), input.lightLevel()])
})
```

## See also

[serial](/device/serial),
[serial write line](/reference/serial/write-line),
[serial write value](/reference/serial/write-value)

