# Connect

We are going to use radio to send the current moisture
level to a dashboard @boardname@. The dashboard
will display one LED per @boardname@.

## Moisture sensor

To make it happen, we need to change the program to 
* setup the radio by choosing group 4 and sending the serial number of the device
* send the moisture level **divided by 4** 
as the dashboard takes values between ``0`` and ``255``.

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
    basic.pause(5000);
})
```

## The dashboard

The dashboard code can be found at [/examples/radio-dashboard](/examples/radio-dashboard).

Download the code from that example into the @boardname@ that will be used to display the result.

When the dashboard receives a message from a @boardname@, it find a pixel for that board (and remembers it)
and uses the number received as the brightness of the LED.

When a message hasn't been received by a board for some time, it's pixel will start to blink. After more time, it will simply turn off. 


```package
radio
```