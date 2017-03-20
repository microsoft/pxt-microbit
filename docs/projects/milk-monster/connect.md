# Connect

### ~avatar avatar

Remote control your Milky Monster with another @boardname@

### ~

## Duration: ~30 minutes

You will need 2 @boardname@ for this part. By using the radio, we can make the Milky Monster controlled by another @boardname@.
Download the code below to the @boardname@ on the Milky Monster and another "controller" @boardname@. Whenere A is pressed, the Milky Monster will move once.

```blocks
radio.onDataPacketReceived(({receivedNumber}) => {
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
