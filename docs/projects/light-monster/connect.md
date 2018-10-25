# Connect

## ~avatar avatar

Remote control your monster with another @boardname@.

## ~

## Duration: ~30 minutes

You will need one more @boardname@ for this part. By using the radio, we can control the monster with another @boardname@. Download the code below to the @boardname@ on the monster and then again onto a "controller" @boardname@. Whenever button **A** is pressed, the monster's mouth moves once.

```blocks
radio.onReceivedNumber(({ receivedNumber }) => {
    pins.servoWritePin(AnalogPin.P0, 30)
    basic.pause(500)
    pins.servoWritePin(AnalogPin.P0, 150)
    basic.pause(500)
})
input.onButtonPressed(Button.A, () => {
    radio.sendNumber(0)
})
```

```package
radio
```