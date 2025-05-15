# running Time Micros

Find how long a program has run since it was started, in microseconds.

```sig
input.runningTimeMicros()
```

### ~ alert

#### Running time maximum count

The program running time counter can only count up to approximately 17 minutes of time (1,073,741,823 microseconds). After that, the running time will reset to zero and start counting up again.

Programs using the time counter should take this reset into account, even if they are only measuring short durations. The counter might reset while the program is running.

### ~

## Example

Pause for one second and then show the program running time on the screen.

```blocks
basic.pause(1000)
basic.showNumber(input.runningTimeMicros())
```

## Returns

* the [number](/types/number) of microseconds since the program started.
(One second is 1,000,000 microseconds.)

## See also

[show number](/reference/basic/show-number), [pause](/reference/basic/pause), [running time](/reference/input/running-time)