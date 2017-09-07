# Write Value

Write a name/value pair and a newline character (`\r\n`) to the [serial](/device/serial) port.

```sig
serial.writeValue("x", 0);
```

## Parameters

* `name` is the [string](/types/string) to write to the serial port
* `value` is the [number](/types/number) to write to the serial port




## Example: streaming data

Every 10 seconds, the example below sends the temperature and light level
to the serial port.

```blocks
basic.forever(() => {
    serial.writeValue("temp", input.temperature())
    serial.writeValue("light", input.lightLevel())
    basic.pause(10000);
})
```

### ~hint

The [send value](/reference/radio/send-value) function broadcasts
string/number pairs.  You can use a second @boardname@ to receive them,
and then send them directly to the serial port with ``write value``.

### ~

## See also

[serial](/device/serial),
[serial write line](/reference/serial/write-line),
[serial write number](/reference/serial/write-number),
[send value](/reference/radio/send-value)
