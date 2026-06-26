# begin Row

Initialize a new row for adding log data.

```sig
flashlog.beginRow()
```

Beginning a row resets the data value count and allocates temporary memory for the row's logged data values.

**Note**: Using a ``||flashlog:begin row||`` before using an ``||flashlog:end row||`` on the current row will  **end** the current row and write it to the flash log before beginning the new row.

## Returns

* returns **DEVICE_OK** if successful. Otherwise, some other device condition is returned.

## Example

Record the temperature and light level every minute by logging both input values. Send the data only to the data log.

```blocks
flashlog.setSerialMirroring(false)
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