# create CV

Create a column-value data item to log data values.

```sig
datalogger.createCV("", 0)
```

Data values that are written to the data log are assigned to a _column_ in order to identify what their value is related to. Before logging a data value, it is formatted as a "CV" or "column-value" data item. A column name is attached to a data value this way.

## Parameters

* **colunm**: a [string](types/string) name that idenifies the data value.
* **value**: a data value of _any_ type that is logged with the `colunm` name.

## Example

Record the state of the buttons on the @boardname@ every 500 milliseconds.

```blocks
loops.everyInterval(500, function () {
    datalogger.logData([datalogger.createCV("Button A", input.buttonIsPressed(Button.A)), datalogger.createCV("Button B", input.buttonIsPressed(Button.B))])
})
```

```package
datalogger
```