# Measuring Stride

In order to compute the distance travelled, we need to calibrate
the relationship between speed and stride. In this experiment, the runner
needs to run a distance at various speeds with a constant stride.
On each run, the @boardname@ will measure the running time and the number of foot strikes.

https://youtu.be/hAyxRNvlzRE

## Find a running track!

Find a location where you can run at least 20m at a constant pace. A good example would be a run between the free-throw areas on a basketball court. It is important that the runner is able to enter, run through, and leave the track at a constant speed.

Measure the distance between the start and the end of the track and store this value as ``TD``.

### ~ hint

#### Feet vs Meters

It does not matter whether you use feet or meters as long as you use the same unit everywhere!

### ~

## Code the @boardname@ s

The experiment will be operated with 2 @boardname@ that communicate via radio.

* The first @boardname@, slipped inside in the runner's sock, measures the foot strikes. It runs continuously and the runner does not have to do anything, aside from focusing on their running.
* The second @boardname@ is operated on the sideline and, just like a stopwatch, measures the start and stop times of the run.

### Runner @boardname@

```blocks
input.onGesture(Gesture.ThreeG, function () {
    game.addScore(1)
    radio.sendNumber(game.score())
})
radio.setGroup(1)
radio.setTransmitPower(7)
basic.showString("RUNNER")
```

### Operator @boardname@

The operator needs to press button ``A`` when the runner enters the track
and ``B`` when the runner leaves the track. Then the @boardname@ displays the measurement
in a loop.

```blocks
input.onButtonPressed(Button.B, function () {
    recording = false
    time = (input.runningTime() - start) / 1000
    while(true) {
        basic.showString("TIME")
        basic.showNumber(time)
        basic.showString("STEPS")
        basic.showNumber(game.score())
    }
})
radio.onReceivedNumber(function (receivedNumber) {
    if (recording) {
        game.addScore(1)
    }
})
input.onButtonPressed(Button.A, function () {
    start = input.runningTime()
    game.setScore(0)
    recording = true
    basic.showIcon(IconNames.Butterfly)
})
let start = 0
let time = 0
let recording = false
basic.showString("OPERATOR")
radio.setGroup(1)
```

### Recording!

Bring both @boardname@ connected to their battery packs. Slip the runner's @boardname@ into the sock of the runner and have the runner get ready to do a few runs.
The operator should be positioned so that they have a clear view of the start and end of the track. The operator should also have a notebook or computer to write down the data of each run.

* When the runner crosses the start of the track, the operator presses on button ``A``.
* When the runner leaves the track they press ``B``.
* After pressing ``B``, the @boardname@ will display the time and number of steps twice. Take note of those values and record them in a table.

```package
radio
```