# log

Write a set data item parameters to the data log.

```sig
datalogger.log(null)
```

Data log entries are written to the log as an array of "column" and "value" data items. Each data value you want to record in the log has an column which it belongs to. The data value is attached to it's column by creating a "column-value" object with the data value matched to a column name.

A log entry is made up of one or more "column-value" objects inserted into an array. This array is sent to the data log to write as the next log entry.

## Parameters

* **data1 - data10**: one or more (up to 10) of "column-value" objects to write to the data log.

## Example

Record the state of the buttons on the @boardname@ every 500 milliseconds.

```blocks
loops.everyInterval(500, function () {
    datalogger.log(datalogger.createCV("Button A", input.buttonIsPressed(Button.A)), datalogger.createCV("Button B", input.buttonIsPressed(Button.B)))
})
```

## See also

[create cv](/reference/datalogger/create-cv), [set column titles](/reference/datalogger/set-column-titles)

```package
datalogger
```