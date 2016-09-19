# Accelerometer Beat control

### @description micro:bit guitar: using accelerometer to control tempo

### ~avatar avatar
Use the Accelerometer to control guitar tempo
* Duration: 30 - 45 minutes
* Concepts:
     * Gravity
     * Acceleration
     * X, Y, Z coordinates
     * Tempo
     * Beat
     * Graphing
### ~
VIDEO: ACCELEROMETER PLOT

```blocks
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.Y), 1023)
})
```
VIDEO: ACCELEROMETER - MAP TO BEAT
basic.forever(() => {
        music.setTempo(pins.map(Math.abs(input.acceleration(Dimension.Y)),
            0, 1023,
            60, 320))
        music.playTone(
            input.lightLevel() * 25,
            music.beat(BeatFraction.Quater)
        );
})

LIGHT SENSOR + ACCELEROMETER VIDEO

### ~button /projects/guitar/pin-press
NEXT: Pin Press on/off
### ~