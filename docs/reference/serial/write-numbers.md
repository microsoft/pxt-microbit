# Serial Write Numbers

Write an array of numbers to the [serial](/device/serial) port.

```sig
serial.writeNumbers([0, 1, 2]);
```

Instead of writing a single number at a time using [write number](/reference/serial/write-number), you can write multiple numbers to the serial port at once. They are written as _Comma Separated Values (CSV)_.

You can write the numbers `0` through `5` together and they will appear as one line of serial output:

``0,1,2,3,4,5``

This makes a line of CSV data where the commas between the numbers are the separators for each value.

## Parameters

* `values`: the array of [numbers](/types/number) to write to the serial port

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
