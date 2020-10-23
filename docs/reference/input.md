# Input

Events and data from sensors

```cards
input.onButtonPressed(Button.A, function () {})
input.onGesture(Gesture.Shake, function () {})
input.onPinPressed(TouchPin.P0, function() {})
input.onPinReleased(TouchPin.P0, function() {})
input.buttonIsPressed(Button.A)
input.pinIsPressed(TouchPin.P0)
input.isGesture(Gesture.Shake)
input.compassHeading()
input.temperature()
input.acceleration(Dimension.X)
input.lightLevel()
input.rotation(Rotation.Pitch)
input.magneticForce(Dimension.X)
input.runningTime()
input.runningTimeMicros()
input.setAccelerometerRange(AcceleratorRange.OneG)
```

## See also

[onButtonPressed](/reference/input/on-button-pressed), [onGesture](/reference/input/on-gesture),
[onPinPressed](/reference/input/on-pin-pressed), [onPinReleased](/reference/input/on-pin-released),
[buttonIsPressed](/reference/input/button-is-pressed), [pinIsPressed](/reference/input/pin-is-pressed),
[is gesture](/reference/input/is-gesture),
[compassHeading](/reference/input/compass-heading), [temperature](/reference/input/temperature),
[acceleration](/reference/input/acceleration), [lightLevel](/reference/input/light-level),
[rotation](/reference/input/rotation), [magneticForce](/reference/input/magnetic-force),
[runningTime](/reference/input/running-time), [setAccelerometerRange](/reference/input/set-accelerometer-range),
[calibrate-compass](/reference/input/calibrate-compass)
