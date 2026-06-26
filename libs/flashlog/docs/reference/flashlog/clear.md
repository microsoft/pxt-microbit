# clear

Clear the contents of log data in flash storage.

```sig
flashlog.clear(true)
```

The contents of the flash log are cleared by resetting the log's current position to the beginning to overwrite old data. Also, you can reset all of the data in the log to zeros (0x00000000). Resetting the log's data position is much faster than clearing the entire flash log storage.

## Parameters

* **fullErase**: a [boolean](/types/boolean) that if set to `true` will reset the entire log storage. Otherwise, use `false` to reset the log data position and overwrite older logged data.

## Example

Clear out the last logged data from the flash log. Start a new log to record the temperature and light level every minute by logging both input values.

```blocks
flashlog.clear(false)
flashlog.setSerialMirroring(false)
loops.everyInterval(60000, function () {
    flashlog.beginRow()
    flashlog.logData("temperature", input.temperature())
    flashlog.logData("light", input.lightLevel())
    flashlog.endRow()
})
```

```package
flashlog
```