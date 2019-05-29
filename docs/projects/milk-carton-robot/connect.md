# Connect

## ~avatar avatar

Remote control your Milk Carton Robot with another @boardname@

## ~

## Duration: ~30 minutes

You will need 2 @boardname@ for this part. By using the radio, we can make the Milk Carton Monster controlled by another @boardname@.
Download the code below to the @boardname@ on the Milk Carton Monster and another "controller" @boardname@. Whenever ``A`` is pressed, the Milk Carton Monster will move once.

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
