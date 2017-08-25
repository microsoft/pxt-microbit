# Connect


https://youtu.be/XXesoUC0XBU

We are going to use radio to remote control the toy car. 
A second @microbit@ will send commands to control the throttle and the steering.

```blocks
let steering = 0
let throttle = 0
radio.onDataPacketReceived( ({ receivedString: name, receivedNumber: value }) =>  {
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
