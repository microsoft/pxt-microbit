# Bluetooth On UART Data Received

Runs some code in an event when a delimiter is matched in the received data.

```sig
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function() {})
```

## Parameters

* **delimiters**: a [string](/types/string) containing the delimiter characters to match in the received data.

### ~ hint

#### Delimiters

Delimiters are characters in a received data string which divide the string into smaller strings to form separate data items.

Although multiple delimiter characters can be set in the **delimiters** string, it is common to have received data separated using just one delimiter character, such as a comma:

``"data1,data2,data3,data4"``

So, you can specify a delimiter character using the ``||serial:serial delimiters||`` which create a single character delimiter string for you...

```block
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Comma), function () {
})
```
Or, maybe...

```block
let delim = serial.delimiters(Delimiters.NewLine)
basic.showString(bluetooth.uartReadUntil(delim))
```

### ~

## Example

Read the data items separated by a comma (`,`):

```blocks
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Comma), function () {
    basic.showString(bluetooth.uartReadUntil(serial.delimiters(Delimiters.Space)))
})
```

```package
bluetooth
```
