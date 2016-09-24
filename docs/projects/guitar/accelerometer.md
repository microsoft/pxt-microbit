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
     * Mapping
     * Graphing
     * Absolute value

### ~


https://youtu.be/h_gPkBaVkoo
TODO: add sound to video
## Blocks

```cards
input.acceleration(Dimension.Y)
music.setTempo(120)
pins.map(0, 0, 1023,60, 320)
Math.abs(1)            
```

## Step 1: Measuring Acceleration along different coordinates (X, Y, Z axis)

https://youtu.be/0SULoTKmkhI  
The acceleration block approximately measures **milli-g**, which is 1/1000 of a **g** or the 
acceleration of gravity.  

Whenever the micro:bit changes direct there is an acceleration (change in velocity).  
The acceleration can be in different directions for the micro:bit, moving in 3 dimensions
![micro:bit x, y, z axis image](/static/mb/projects/guitar/accelleration_axis.png)  


```blocks
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.Y), 1023)
})

```
VIDEO: ACCELEROMETER - MAP TO BEAT
```blocks
basic.forever(() => {
        music.setTempo(pins.map(Math.abs(input.acceleration(Dimension.Y)),
            0, 1023,
            60, 320))
        music.playTone(
            input.lightLevel() * 25,
            music.beat(BeatFraction.Quater)
        );
})
```
## Extra  
* [map](/reference/pins/map)

### ~button /projects/guitar/pin-press
NEXT: Pin Press on/off
### ~
