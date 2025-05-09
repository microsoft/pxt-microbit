# Running Time

Find how long a program has run since it was started, in milliseconds.

```sig
input.runningTime()
```

## Returns

* the [Number](/types/number) of milliseconds since the program started.
(One second is 1000 milliseconds.)

## Example: elapsed time

When you press button `B` on the @boardname@, this
program finds the number of milliseconds since the program started
and shows it on the [LED screen](/device/screen).

```blocks
input.onButtonPressed(Button.B, function() {
    let now = input.runningTime()
    basic.showNumber(now)
})
```


## See also

[show number](/reference/basic/show-number), [pause](/reference/basic/pause), [running time micros](/reference/input/running-time-micros)

