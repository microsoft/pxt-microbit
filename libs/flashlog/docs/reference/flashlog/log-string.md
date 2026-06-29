# log String

Add a string into the current log row.

```sig
flashlog.logString("")
```

You can log a string value into the a log row. It is inserted into the row with other data items (name/value pairs) and strings.

## Parameters

* **value**: a [string](/types/value) that is added to the current log row.

## Returns

* returns **DEVICE_OK** if successful. Otherwise, some other device condition is returned.

## Example

See if the accelerometer detects any shaking and record a comment to the log every second.

```blocks
let shakey = 0
flashlog.setSerialMirroring(false)
flashlog.seTimeStamp(FlashLogTimeStampFormat.Seconds)
loops.everyInterval(1000, function () {
    flashlog.beginRow()
    shakey = input.acceleration(Dimension.Strength)
    if (shakey < 256) {
        flashlog.logString("It's seems calm this second.")
    }
    else if (shakey < 684) {
        flashlog.logString("It's a somewhat unstable.")
    }
    else {
        flashlog.logString("It's really shaking!")
    }
    flashlog.endRow()
})
```

## See also

[log data](/reference/flashlog/log-data)

```package
flashlog
```