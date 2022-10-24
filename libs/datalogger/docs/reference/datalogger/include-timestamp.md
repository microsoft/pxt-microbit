# include Timestamp

Set the timestamp format for the data log entries.

```sig
datalogger.includeTimestamp(FlashLogTimeStampFormat.None)
```

A timestamp value is included as one of the data items in a log entry. You can choose which timestamp format you want for your log entries. Time units are from milliseconds to days. If you don't want a timestamp, you use this function to set the timestamp to `none`. If you haven't changed the timestamp format, the default is `milliseconds`.

## Parameters

* **format**: the format of the timestamp as time units or `none`:
>* `milliseconds`: time is recorded in milliseconds
>* `seconds`: time is recorded as seconds
>* `minutes`: time is set as minutes
>* `hours`: time is recorded in hours
>* `days`: time is recorded as days
>* `none`: a timestamp is NOT included with a log entry

## Example

### Ambient values

Record the temperature and brightness of light near the @boardname@ every minute.

```blocks
datalogger.includeTimestamp(FlashLogTimeStampFormat.Minutes)
datalogger.setColumns(["temperature", "light"])
loops.everyInterval(60000, function () {
    datalogger.logData([datalogger.createCV("temperature", input.temperature()), datalogger.createCV("light", input.lightLevel())])
})
```

### Random buttons

Randomly record the state of the button presses on the @boardname@ without a timestamp.

```blocks
datalogger.includeTimestamp(FlashLogTimeStampFormat.None)
datalogger.setColumns(["Button A", "Button B"])
basic.forever(function () {
    datalogger.logData([datalogger.createCV("Button A", input.buttonIsPressed(Button.A)), datalogger.createCV("Button B", input.buttonIsPressed(Button.B))])
    basic.pause(randint(100, 2000))
})
```

## See also

[create cv](/reference/datalogger/set-columns)

```package
datalogger
```
