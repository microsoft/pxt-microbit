# Connect

## ~avatar avatar

Remote control your inchworm with another @boardname@

## ~

## Duration: ~30 minutes

You will need one more @boardname@ for this part. By using the radio, we can control the inchworm with another @boardname@. Download the code below to the @boardname@ on the inchworm and then again onto a "controller" @boardname@. Whenever button **A** is pressed, the inchworm moves once.

```blocks
radio.onReceivedNumber(function (receivedNumber: number) {
    pins.servoWritePin(AnalogPin.P0, 0)
    basic.pause(500)
    pins.servoWritePin(AnalogPin.P0, 180)
    basic.pause(500)
})
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
})
```

```package
radio
```
