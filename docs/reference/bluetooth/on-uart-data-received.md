# Bluetooth On UART Data Received

Registers an event to be fired when one of the delimiter is matched.

```sig
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), () => {})
```

## Parameters

* `delimiters` is a [string](/types/string) containing any of the character to match

## Example

Read values separated by `,`:

```blocks
bluetooth.startUartService()
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Comma), function () {
    basic.showString(serial.readUntil(serial.delimiters(Delimiters.Comma)))
})
```
