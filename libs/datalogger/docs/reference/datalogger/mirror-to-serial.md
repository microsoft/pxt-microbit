# mirror To Serial

Write a copy of the logged data items to the serial output also.

```sig
datalogger.mirrorToSerial(false)
```

By default, the same data that is written to the data log is also sent to the serial output port. You can choose to not send the data to serial if you only want it logged in the @boardname@ flash memory.

## Parameters

* **on**: a [boolean](/types/boolean) that is set to `true` to write a copy of the data log items to the serial output. Otherwise, use `false` to just write to the data items to the log only.

## Example

Record the temperature and light level every minute by logging both input values. Send the data only to the data log.

```blocks
datalogger.mirrorToSerial(false)
datalogger.setColumns(["temperature", "light"])
loops.everyInterval(60000, function () {
    datalogger.logData([datalogger.createCV("temperature", input.temperature()), datalogger.createCV("light", input.lightLevel())])
})
```

```package
datalogger
```