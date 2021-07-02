# delete Log

Delete the contents of the data log from the flash memory on the @boardname@.

```sig
datalogger.deleteLog(DeleteType.Fast)
```

## Example

Clear the entire data log when it becomes full.

```blocks
datalogger.onLogFull(function() {
    datalogger.deleteLog()
})
```

```package
datalogger
```