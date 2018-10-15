# Connect

## ~avatar avatar

Remotely control your Milky Monster with another @boardname@

## ~

## Duration: ~30 minutes

You will need a second @boardname@ for this part. By using the radio, we can control the Milky Monster with another @boardname@.
Download the code below to the @boardname@ that's on the Milky Monster and again to another "controller" @boardname@. Whenever button **A** is pressed, the Milky Monster will move one time.

```blocks
radio.onReceivedNumber(({ receivedNumber }) => {
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
