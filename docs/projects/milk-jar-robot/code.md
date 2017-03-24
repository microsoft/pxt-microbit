# Code
### @description code to make the Milk Jar Robot alive

### ~avatar avatar

Add code to make the Milk Jar Robot move.

### ~

## Duration: ~15 minutes

## Step 1: wire up the servo

Follow the instructions in [servo 101 manual](/device/servo) to connect the servo to the @boardname@.

## Step 2: code light sensor

Code the lightsensor on the @boardname@ to control the servo.

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.lightLevel(),
        0
    )
    pins.servoWritePin(AnalogPin.P0, input.lightLevel())
})
```

https://youtu.be/Ah4fEbJtklU

It works but your servo might be trying to move too much. Let's calibrate it.

### ~button /projects/milk-jar-robot/connect
NEXT: Connect
### ~