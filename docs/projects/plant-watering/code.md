# Code

Let's add the code so that _when the soil moisture level is low, the servo waters the plant._

From the **soil moisture** project, we know that the moisture is low when the ``reading`` is roughly less than ``500``.
We can use this information to add an ``if reading < 500`` in the code.

```block
let reading = 0
if (reading < 500) { }
```

The servo is connected to pin ``P2`` so we can use ``pins servo write`` block to change the angle of the servo.
We need it to change the angle to ``0``, wait until the water has fallen off, and move it back to ``80``.

```block
let reading = 0
if (reading < 500) {
    basic.showIcon(IconNames.Umbrella)
    pins.servoWritePin(AnalogPin.P2, 0);
    basic.pause(3000)
    pins.servoWritePin(AnalogPin.P2, 80)
    basic.pause(3000)
    pins.analogWritePin(AnalogPin.P2, 0)
}
```

We insert the code above in the **forever** loop of the [soil moisture code](/projects/soil-moisture/connect).

```blocks
radio.setTransmitSerialNumber(true)
radio.setGroup(4)
led.setBrightness(64)
let reading = 0
basic.forever(() => {
    pins.analogWritePin(AnalogPin.P1, 1023)
    reading = pins.analogReadPin(AnalogPin.P0)
    radio.sendNumber(reading / 4);
    pins.analogWritePin(AnalogPin.P1, 0)
    led.plotBarGraph(
        reading,
        1023
    )
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(reading)
    }
    if (reading < 500) {
        basic.showIcon(IconNames.Umbrella)
        pins.servoWritePin(AnalogPin.P2, 0);
        basic.pause(3000)
        pins.servoWritePin(AnalogPin.P2, 80)
        basic.pause(3000)
        pins.analogWritePin(AnalogPin.P2, 0)
    }
    basic.pause(5000);
})
```

https://youtu.be/7eC_VjH1eP0

```package
radio
```