# Connect

### ~avatar avatar

Remote control your monster with another @boardname@

### ~

## Duration: ~30 minutes

You will need 2 @boardname@ for this part. By using the radio, we can make the inchworm controlled by another @boardname@.
Download the code below to the @boardname@ on the inchworm and another "controller" @boardname@. 
Whenere A is pressed, the monster will open and close it's mouth will move once.

```blocks
radio.onDataPacketReceived(({receivedNumber}) => {
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