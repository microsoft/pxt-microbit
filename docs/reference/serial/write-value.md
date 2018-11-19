# write Value

Write a **name:value** pair and a newline character (`\r\n`) to the [serial](/device/serial) port.

```sig
serial.writeValue("x", 0);
```

It is common when reporting or recording data to use a _Name Value Pair_ (NVP). They appear as a text output string in the form of a _name_ and a _value_ together. The name and the value are separated in the string with a _colon_, `:`. A name value pair reporting a temperature of `-15` degrees could look like:

``temperature:-15``

Associating a name with a value helps to identify related data when different data sources are recorded. For example, if you're reporting both temperature and light intensity, the _name:value_ format helps spreadsheets or other data analysis programs distinguish between them and group the same types of values together properly. Reporting two data sources might look like this in the output:

```
temperature:-15
temperature:-12
light:154
temperature:-11
light:152
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
