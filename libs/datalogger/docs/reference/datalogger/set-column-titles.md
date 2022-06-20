# set Column Titles

Set the names and order of the columns in the data log.

```sig
datalogger.setColumnTitles("")
```

The first entry in the data log is the "header" row which names the columns of the data values recorded. By default, the order in which the columns appear depends on the order of the column-value items appearing in the first entry written to the data log containing those items.

You can set the names and the order of the columns for the log so that data values appear in the positions that you want them to be in. This also helps keep column order when data items happen to be in different places in log entry column-value array.

## Parameters

* **col1 - col10 **: one or more (up to 10) [strings](/types/string) that are the column names in the order they will appear in the data log header.

## Example

Set the columns for the data log to `value1`, `value2`, and `value3`. Make 3 log entries with the data items set in a different order. Check the logged values to see that they all appear in the correct colunms.

```blocks
datalogger.includeTimestamp(FlashLogTimeStampFormat.None)
datalogger.setColumnTitles("value1", "value2", "value3")
datalogger.logData([datalogger.createCV("value2", 9873), datalogger.createCV("value1", 23987), datalogger.createCV("value3", 5789)])
datalogger.logData([datalogger.createCV("value3", 567), datalogger.createCV("value2", 789), datalogger.createCV("value1", 62)])
datalogger.logData([datalogger.createCV("value1", 0), datalogger.createCV("value3", 87), datalogger.createCV("value2", 8)])
```

## See also

[create cv](/reference/datalogger/create-cv), [include timestamp](/reference/datalogger/include-timestamp)

```package
datalogger
```
