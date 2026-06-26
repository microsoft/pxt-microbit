# set Time Stamp

Enable and set the time units for the flash log timestamp.

```sig
flashlog.seTimeStamp(FlashLogTimeStampFormat.None)
```

If you want a timestamp added to the rows in the log, then select the uint of time to use. Otherwise, if the value for time **format** is `none`, no timestamp is added to the logged row data.

## Parameters

* **format**: the unit of time to use for the timestamp added to the logged row data:
>* `milliseconds`: time is recorded in milliseconds
>* `seconds`: time is recorded as seconds
>* `minutes`: time is set as minutes
>* `hours`: time is recorded in hours
>* `days`: time is recorded as days
>* `none`: a timestamp is NOT included with a log entry

## Example

Record the temperature and light level every minute by logging both input values. Use a timestamp of `minutes`.

```blocks
flashlog.setSerialMirroring(false)
flashlog.seTimeStamp(FlashLogTimeStampFormat.Minutes)
loops.everyInterval(60000, function () {
    flashlog.beginRow()
    flashlog.logData("temperature", input.temperature())
    flashlog.logData("light", input.lightLevel())
    flashlog.endRow()
})
```

## See also

[end row](/reference/flashlog/end-row)

```package
flashlog
```