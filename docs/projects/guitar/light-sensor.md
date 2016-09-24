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
     * This guitar is inspired by the [Theremin](https://en.wikipedia.org/wiki/Theremin)

### ~

https://youtu.be/pqU7bTcfQ_s

https://youtu.be/2cKg9pokVC4

## The micro:bit LEDs Light Sensors 

- the micro:bit can detect external light level intensity reaching the LEDs 
- the light level block reports a reading of values 0 (*dark*) to 255 (*bright*)
- a **Forever Loop** is required to continually use the current light level input value 

## Forever Loop

The forever loop really does run forever.  The forever loop is useful when there is a need to continually check for an event or use a changing value in code.

## Blocks

```cards
basic.forever(() => {})
input.lightLevel()
led.plotBarGraph(0, 255)
music.playTone(Note.C, music.beat(BeatFraction.Quater))
```

## Create a light level detector

1) Under **Basic** drag a **forever loop** block into the coding area  

2) Under **Led** drag a **plot bar graph** block into the **forever loop**  

3) Under **Input** drag a **light level** block into **plot bar graph *of***  

4) Set **plot bar graph *up to*** value at **255**  

5) Test the bar graph height by blocking and shining more light  

6) Experiment to see the effect on graph height when the **plot bar graph *up to*** value is changed (try numbers smaller than 255). 
Find a value that allow the graph to show each of the light levels.  

```blocks
basic.forever(() => {
    led.plotBarGraph(input.lightLevel(), 255)
})
```
## Create a light controlled guitar Frequency tuner using Math blocks
### Frequency 
**Frequency** measured in Hz  which are cycles per second or vibrations per second. 
A healthy human ear can detect frequencies in the range of 20Hz to 20,000Hz.  
- The micro:bit + headphones reliably produce detectable output ~50Hz - 6,000Hz.

**play tone** blocks can specify a specific **Frequency** by replacing the letter note with a **number** block (located under **Math**).   

261Hz represents a C note
```blocks
music.playTone(261, music.beat(BeatFraction.Half))
```
### Multiply Frequency using Math blocks
1) create a **play tone** block using a **Math** section, **multiplication** block to set *tone*   
(*Tip: also create a **B** button block that uses a different multiplier to set tone*)  
  
2) Download the code to the micro:bit and test the sound of multiples of the 261Hz **C** frequency  

 ```blocks
input.onButtonPressed(Button.A, () => {
    music.playTone(261 * 2, music.beat(BeatFraction.Half))
})
```  
  
## Control the Frequency with the light input
1) Create a **forever loop** with a **play tone** block  

2) Use a **Math** multiplication block to set tone, with light level input multiplied by 25 
(or experiment)  

3) Test on the guitar by covering the LEDs with your hand to vary the light that is measured 
and controls the tone  

```blocks
basic.forever(() => {
    music.playTone(input.lightLevel() * 25, music.beat(BeatFraction.Quater))
})
```
### ~button /projects/guitar/accelerometer  
NEXT: Accelerometer Beat control  
### ~
