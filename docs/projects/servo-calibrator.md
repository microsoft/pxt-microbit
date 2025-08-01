# Servo Calibrator

Use this program to calibrate the angles of a servo.
Press ``A`` to reduce the angle by 5 and ``B`` to
increase it by 5.

The current angle is displayed on the screen
in a loop.

```blocks
let angle = 90
input.onButtonPressed(Button.A, function () {
    angle = Math.max(0, angle - 5)
    pins.servoWritePin(AnalogPin.P0, angle)
    led.stopAnimation()
})
input.onButtonPressed(Button.B, function () {
    angle = Math.min(180, angle + 5)
    pins.servoWritePin(AnalogPin.P0, angle)
    led.stopAnimation()
})
basic.forever(function () {
    basic.showNumber(angle)    
})
pins.servoWritePin(AnalogPin.P0, angle)
```

## See also

[Brief Guide to Servos](https://kitronik.co.uk/blogs/resources/servos-brief-guide)
