# Code
### @description code to make the coffee cup monster alive

### ~avatar avatar

Add code to open the mouth when light is detected.

### ~

## Duration: ~30 minutes

We are going to add code to open the mouth proportionally to the amount of light on the @boardname@.
In a loop, we will read the light and map it to an angle using the ``pins.map`` function.

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

### ~button /projects/light-monster/connect
NEXT: Connect
### ~