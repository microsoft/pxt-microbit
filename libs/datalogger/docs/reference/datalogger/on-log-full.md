# on Log Full

Run code in an event when the data log is full.

```sig
datalogger.onLogFull(function() {})
```

## Example

Notify the user when the data log is full. Wait 2 seconds to let them clear the log by pressing the **B** button.

```blocks
datalogger.onLogFull(function () {
    basic.showString("Data Log is FULL! Press B to clear")
    for (let index = 0; index < 20; index++) {
        if (input.buttonIsPressed(Button.B)) {
            datalogger.deleteLog()
            break;
        } else {
            basic.pause(100)
        }
    }
    basic.clearScreen()
})
```

## See also

[delete log](/reference/datalogger/delete-log)

```package
datalogger
```