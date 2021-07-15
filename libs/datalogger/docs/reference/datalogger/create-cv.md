# create CV

Create a column-value data log item for a data value.

```sig
datalogger.createCV("", 0)
```

Data values that are written to the data log are assigned to a _column_ in order to identify what their value is related to. Before logging a data value, it is formatted as a "CV" or "column-value" data item. A column name is attached to a data value this way.

A data log entry is written to the data log as an array of one or more "column-value" data item objects. This function creates the data item for the value you want to include in a log entry.

## Parameters

* **colunm**: a [string](types/string) name that idenifies the data value.
* **value**: a data value of _any_ type that is logged with the `colunm` name.

## Example

### Button states

Record the state of the buttons on the @boardname@ every 500 milliseconds.

```blocks
loops.everyInterval(500, function () {
    datalogger.logData([datalogger.createCV("Button A", input.buttonIsPressed(Button.A)), datalogger.createCV("Button B", input.buttonIsPressed(Button.B))])
})
```

### Mood experiment

Create an experiment to record a person's moods and relate them to current enviromental factors. Set 3 button options for moods of "happy", "sad", and "angry". When the user signals their mood by pressing a button, read the current temperature, light level, and sound level to establish a relationship between those factors and mood.

```blocks
input.onButtonPressed(Button.A, function () {
    logMood("happy")
})
function logMood (mood: string) {
    columns[0] = datalogger.createCV("mood", mood)
    columns[1] = datalogger.createCV("light", input.lightLevel())
    columns[2] = datalogger.createCV("sound", input.soundLevel())
    columns[3] = datalogger.createCV("temperature", input.temperature())
    datalogger.logData(columns)
}
input.onButtonPressed(Button.AB, function () {
    logMood("angry")
})
input.onButtonPressed(Button.B, function () {
    logMood("sad")
})
let columns: datalogger.ColumnValue[] = []
datalogger.setColumns([
"mood",
"light",
"sound",
"temperature"
])
columns = [
datalogger.createCV("", 0),
datalogger.createCV("", 0),
datalogger.createCV("", 0),
datalogger.createCV("", 0)
]
```

## See also

[log data](/reference/datalogger/log-data), [set columns](/reference/datalogger/set-columns)

```package
datalogger
```