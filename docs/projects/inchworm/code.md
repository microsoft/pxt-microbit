# Code
### @description code to make the inchworm alive

### ~avatar avatar

Add code to make the inchworm move.

### ~

## Duration: ~15 minutes

## Step 2: walk forever

In order for the inchworm to move, the @boardname@ needs to command the servo to go between ``0`` and ``180`` degrees
at a certain pace. In the code below, the user pressed button ``A`` to launch the inchworm.

```blocks
input.onButtonPressed(Button.A, () => {
    pins.servoWritePin(AnalogPin.P0, 0)
    basic.pause(500)
    pins.servoWritePin(AnalogPin.P0, 180)
    basic.pause(500)
});

### ~ hint

You may have noticed that the inchworm can be rather slow or simply won't move. Try to improve the design of your legs, teeth
so that the inchworm goes as fast as possible. Trying it on carpet also great helps avoiding skidding.

### ~

## Step 3: radio controlled inchworm

You will need 2 @boardname@ for this part. By using the radio, we can make the inchworm controlled by another @boardname@.
Download the code below to the @boardname@ on the inchworm and another "controller" @boardname@. Whenere A is pressed, the inchworm will move once.

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