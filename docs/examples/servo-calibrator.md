# Servo calibrator

```blocks
let angle = 90
input.onButtonPressed(Button.A, () => {
    angle -= 5
    pins.servoWritePin(AnalogPin.P0, angle)
    led.stopAnimation()
})
input.onButtonPressed(Button.B, () => {
    angle += 5
    pins.servoWritePin(AnalogPin.P0, angle)
    led.stopAnimation()
})
basic.forever(() => {
    basic.showNumber(angle)    
})
pins.servoWritePin(AnalogPin.P0, angle)
basic.showString("Press A or B to change servo angle")
```
