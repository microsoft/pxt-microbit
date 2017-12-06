# Code

## @description Code to make the light monster come alive

## ~avatar avatar

Add code to open the mouth when light is detected.

## ~

## Duration: ~30 minutes

We are going to add code to open the mouth proportionally to the amount of light on the @boardname@. The code is in a loop so we'll continually read the light level and map it to an angle using the ``||pins:map||`` function.

```blocks
basic.forever(() => {
    pins.servoWritePin(AnalogPin.P0, pins.map(
        input.lightLevel(),
        0,
        255,
        30,
        150
    ))
})
```

## ~button /projects/light-monster/connect
NEXT: Connect
## ~