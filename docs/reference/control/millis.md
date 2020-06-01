# millis

Get the number of milliseconds of time passed since the board was turned on.

```sig
control.millis()
```

## Returns

* the [number](/types/number) of milliseconds of time since the board was turned on.

## Example #example

Find how many days, hours, minutes, and seconds the @boardname@ has been running.

```blocks
let msecs = control.millis()
let seconds = msecs / 1000
let mins = seconds / 60
let hours = mins / 60
let days = hours / 24
```

## #seealso