# Input

Events and data from sensors

```cards
input.onButtonPressed(Button.A, () => {
    
});
input.onGesture(Gesture.Shake, () => {
    
});
input.onPinPressed(TouchPin.P0, () => {
    
});
input.buttonIsPressed(Button.A);
input.compassHeading();
input.pinIsPressed(TouchPin.P0);
input.temperature();
input.acceleration(Dimension.X);
input.lightLevel();
input.rotation(Rotation.Pitch);
input.magneticForce(Dimension.X);
input.runningTime();
input.runningTimeMicros();
input.setAccelerometerRange(AcceleratorRange.OneG);
```

## See also

[onButtonPressed](/reference/input/on-button-pressed), [onGesture](/reference/input/on-gesture), [onPinPressed](/reference/input/on-pin-pressed), [buttonIsPressed](/reference/input/button-is-pressed), [compassHeading](/reference/input/compass-heading), [pinIsPressed](/reference/input/pin-is-pressed), [temperature](/reference/input/temperature), [acceleration](/reference/input/acceleration), [lightLevel](/reference/input/light-level), [rotation](/reference/input/rotation), [magneticForce](/reference/input/magnetic-force), [runningTime](/reference/input/running-time), [setAccelerometerRange](/reference/input/set-accelerometer-range), [calibrate-compass](/reference/input/calibrate-compass)
