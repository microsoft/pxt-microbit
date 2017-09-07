# Serial On Data Received

Registers an event to be fired when one of the delimiter is matched.


```sig
serial.onDataReceived(",", () => {})
```

## Parameters

* `delimiters` is a [string](/types/string) containing any of the character to match

## Example

Read values separated by `,`:

```blocks
serial.onDataReceived(serial.delimiters(Delimiters.Comma), () => {
    basic.showString(serial.readUntil(serial.delimiters(Delimiters.Comma)))
})
```

## See also

[serial](/device/serial),
[serial write line](/reference/serial/write-line),
[serial write value](/reference/serial/write-value)

