# Connect

Use the radio to send the current moisture level to a dashboard @boardname@. The dashboard will display one LED per @boardname@.

## Moisture sensor

To make it happen, we need to change the program to:
* setup the radio by choosing group 4 and sending the serial number of the device
* send the moisture level **divided by 4** as the dashboard takes values between ``0`` and ``255``.

```blocks
led.setBrightness(64)
let reading = 0
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P1, 1)
    basic.pause(1)
    reading = pins.analogReadPin(AnalogPin.P0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    led.plotBarGraph(
        reading,
        1023
    )
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(reading)
    }
    basic.pause(5000)
})
```

## The dashboard

The dashboard code is found in the [radio dashboard](/examples/radio-dashboard) example.

### Setup a dashboard @boardname@

Download the code from that example into the @boardname@ that will be used to display the results.

### Dashboard operation

When the dashboard receives a message from a @boardname@, it finds a pixel to use for that board (and remembers it). The number sent in the messages from the board are used to set the brightness of the LED.

When a message hasn't been received by the dashboard for awhile, it's pixel will start to blink. Then, after some time, it will simply turn off.

```package
radio
```