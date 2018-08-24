# Code

## @description code to make the Milk Carton Robot alive

## ~avatar avatar

Add code to make the Milk Carton Robot move.

## ~

## Duration: ~15 minutes

## Step 1: wire up the servo

Follow the instructions in [servo 101 manual](/device/servo) to connect the servo to the @boardname@.

https://youtu.be/m-HS8OyS0pw

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

## Step 3: calibrate the servo

Download the [servo calibration program](/examples/servo-calibrator) to determine 
to opening and closing angles of the servo for your robot.

https://youtu.be/lZxWC82HDn0

We are going to map the light level range, ``[0, 255]`` to the
angle range, ``[closed, opened]`` using ``pins.map``.

```blocks
let angle = 0
let closed = 0
let opened = 0
basic.forever(() => {
    led.plotBarGraph(
        input.lightLevel(),
        0
    )
    angle = pins.map(
        input.lightLevel(),
        0,
        255,
        opened,
        closed
    )
    pins.servoWritePin(AnalogPin.P0, angle)
})
// TODO: use the angle found at calibration!
opened = 95
// TODO: use the angle found at calibration!
closed = 175
```


## ~button /projects/milk-carton-robot/connect
NEXT: Connect
## ~