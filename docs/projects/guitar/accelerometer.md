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

### ~hint  
## Gravity  

https://youtu.be/0SULoTKmkhI  
The acceleration block approximately measures **milli-g**, which is 1/1000 of a **g** or the 
acceleration of gravity. 

## Measuring Acceleration along different coordinates (X, Y, Z axis)  

Whenever the micro:bit changes direct there is an acceleration (change in velocity).  
The acceleration can be in different directions for the micro:bit, moving in 3 dimensions
![micro:bit x, y, z axis image](/static/mb/projects/guitar/accelleration_axis.png)  
### ~  

## Step 1: Graphing acceleration 
```blocks
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.Y), 1023)
})
```
**Create the code that measures the change in the Y axis acceleration as a graph on the LEDs**  
  
**Load the code to the micro:bit on the guitar**  
  
**Test the movements that move the graph from 1 to 5 bars on the LEDs** 

### ~hint  
## Mapping  
**It is common to map one standard to another - such as with temperature**  
![fahrenheit to celsius](/static/mb/projects/guitar/mapanalogy.jpg)  

### ~

## Step 3: Mapping acceleration to Beat
**micro:bit sensors produce signal values between 0 to 1023. The *[map block](/reference/pins/map)* converts the signal to a desired range.**    
```blocks
basic.forever(() => {
        music.setTempo(pins.map(Math.abs(input.acceleration(Dimension.Y)),
            0, 1023,
            60, 320))
         music.playTone(Note.C, music.beat(BeatFraction.Quater));
})
```  
**Create the code that *Maps*  Y axis acceleration as *tempo***  
  
**Load the code to the micro:bit on the guitar**  
  
**Test the movements that speed and slow the tempo**  

## Step 4: Combine with light sensor tone control  
**Put it all together!**

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
**Combine the code above with the light sensor tone control code from the previous activity*  
  
**Load the code to the micro:bit on the guitar**  

##  Now play the guitar adjusting tone and tempo using the light sensor and accelerometer!

### ~button /projects/guitar/pin-press
NEXT: Pin Press on/off
### ~
