# log Data

Add a data value to the current log row.

```sig
flashlog.logData("", "")
```

Data values are added to a row as name/value pairs. These pairs are a combination of a name (key) as the first parameter and the value as the second parameter. The value parameter is represented as [string](/types/string) when added to the log.

## Parameters

* **key**: a [string](/types/string) that is the value's name, like "temperature" or "acceleration".
* **value**: The value of the data to log with the **key** name. This any single value data such as a [number](/types/number), [boolean](/types/boolean), or a [string](/types/string).

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

[log string](/reference/flashlog/log-string)

```package
flashlog
```. 