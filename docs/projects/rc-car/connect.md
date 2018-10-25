# Connect

## Step 4: Remote control

https://youtu.be/XXesoUC0XBU

We can use the radio on the @boardname@ to control the toy car remotely.
A second @boardname@ will send commands to control the throttle and the steering.

```blocks
let steering = 0
let throttle = 0
radio.onReceivedValue(function (name: string, value: number) {
    led.toggle(0, 0)
    if (name == "throttle") {
        if (value > 0) {
            kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 100);
        } else if (value < 0) {
            kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, 100);
        } else {
            kitronik.motorOff(kitronik.Motors.Motor1);
        }
    } else if (name == "steering") {
        if (value > 0) {
            kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 100);
        } else if (value < 0) {
            kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 100);
        } else {
            kitronik.motorOff(kitronik.Motors.Motor2);
        }
    }
})
basic.forever(() => {
    throttle = 0
    if (input.buttonIsPressed(Button.A)) {
        throttle = 100
    } else if (input.buttonIsPressed(Button.B)) {
        throttle = -100
    }
    radio.sendValue("throttle", throttle)
    steering = 0
    if (input.acceleration(Dimension.X) < -512) {
        steering = -100
    } else if (input.acceleration(Dimension.X) > 512) {
        steering = 100
    }
    radio.sendValue("steering", steering)
})
radio.setGroup(12)
```

```package
radio
pxt-kitronik-motor-driver=github:kitronikltd/pxt-kitronik-motor-driver#v0.0.3
```
