# end Row

Finish formatting a log row and write it to flash storage.

```sig
flashlog.endRow()
```

Ending a row assembles the logged data values, adds the timestamp if selected, and writes the complete formatted row to flash storage.

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

[begin row](/reference/flashlog/begin-row)

```package
flashlog
```