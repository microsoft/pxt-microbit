# Code
### @description code to make the Milk Jar Robot alive

### ~avatar avatar

Add code to make the Milk Jar Robot move.

### ~

## Duration: ~30 minutes

## Step 1: calibrate servo

In order for the Milk Jar Robot to move, the @boardname@ needs to command the servo
between two angles. We need to determine the best opening and close angle for this.

Upload the following code to your @boardname@ and connect it to the servo on the Milk Jar Robot.
This program will allow you to open or close the servo and will display the angle value.

```blocks
let angle = 90
input.onButtonPressed(Button.A, () => {
    angle -= 5
    pins.servoWritePin(AnalogPin.P0, angle)
    led.stopAnimation()
})
input.onButtonPressed(Button.B, () => {
    angle += 5
    pins.servoWritePin(AnalogPin.P0, angle)
    led.stopAnimation()
})
basic.forever(() => {
    basic.showNumber(angle)    
})
pins.servoWritePin(AnalogPin.P0, angle)
```

## Step 2: find the best closed angle

Using the program above, press ``A`` or ``B``

## Step 2: attach rotor

The servo should be positioned on 180 degrees **before** attaching the rotor to it. This is to make sure the mouth of the Milk Jar Robot will be closed once the servo reaches 180 degrees. 

### ~ hint

You may use a philips scew driver to attach the rotor to the servo. 

### ~

TODO


## Step 6: code light sensor

Code the lightsensor on the @boardname@ to control the servo.

```blocks
basic.forever(() => {
    pins.servoWritePin(AnalogPin.P0, input.lightLevel())
    led.plotBarGraph(
        input.lightLevel(),
        0
    )
})
```

## Step 6: Ready!

Your Milky Monster is ready!

TODO

### ~button /projects/milk-jar-robot/connect
NEXT: Connect
### ~