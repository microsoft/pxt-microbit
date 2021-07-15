# delete Log

Delete the contents of the data log from the flash memory on the @boardname@.

```sig
datalogger.deleteLog(DeleteType.Fast)
```

If the data log becomes full or you decide to start logging again from the beginning, you can delete the contents of the log. There are two methods for deleting the log. You can use the `fast` method to simply start logging again at the beginning of the log and overwrite the existing log entries. If you want to first clear the log by deleting all of the log entries before writing to the log again, use the `full` method.

## Parameters

* **deleteType**: (optional) the method used to delete the log. There are two methods:
>* ``fast``: (default) mark the log to be overwitten with any new log data items.
>* ``full``: delete all data items from the log.

## Example

Clear the entire data log when it becomes full.

```blocks
datalogger.onLogFull(function() {
    datalogger.deleteLog()
})
```

## See also

[on log full](/reference/datalogger/on-log-full)

```package
datalogger
```