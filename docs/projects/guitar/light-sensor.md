# Light Sensor Tone control

### @description micro:bit guitar: using light sensor to control tone

### ~avatar avatar
Use the Light Sensor to control guitar Tone
* **Duration:** 30 - 45 minutes
* **Concepts:**
     * Inputs
     * Light Intensity
     * Tone/Frequency
     * Ratio Mapping
     * Forever Loop
     * Math (multiplication) with code properties  
* **Resources:**
  * [micro:bit Light Level input block](/reference/input/light-level)
  * [micro:bit Frequency & Tone blocks](/reference/music/play-tone)
  * [Forever Loop blocks](/reference/basic/forever)
### ~
![LIGHT SENSOR VIDEO]()
### The micro:bit LEDs Light Sensors 
- the micro:bit can detect external light level intensity reaching the LEDs 
- the light level block reports a reading of values 0 (*dark*) to 255 (*bright*)
- a **Forever Loop** is required to continually use the light level input value 
### Forever Loop
The forever loop does run forever and is useful when we need to continually check for an event or use an update of a changing value.
### Create a light level detector
1) Under **Basic** drag a **forever loop** block into the coding area
2) Under **Led** drag a **plot bar graph** block into the **forever loop**
3) Under **Input** drag a **light level** block into **plot bar graph *of*** 
4) Set **plot bar graph *up to*** value at **255**
5) Test the bar graph height by blocking and shining more light
6) Test the graph height after changing the **plot bar graph *up to*** value to a numbers smaller than 255
```blocks
basic.forever(() => {
    led.plotBarGraph(input.lightLevel(), 255)
})
```
### Create a light controlled guitar tuner
7) Create a forever loop with a play tone block
8) 
```blocks
basic.forever(() => {
    music.playTone(input.lightLevel() * 25, music.beat(BeatFraction.Quater))
})
```
### ~button /projects/guitar/accelerometer  
NEXT: Accelerometer Beat control  
### ~
