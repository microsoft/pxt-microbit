# Light Sensor Tone control

## @description @boardname@ guitar: using light sensor to control tone

## ~avatar avatar

Use the Light Sensor to the control tone for this [Theremin](https://en.wikipedia.org/wiki/Theremin) inspired guitar

* **Concepts:**
     * Inputs
     * Light Intensity
     * Tone/Frequency
     * Ratio Mapping
     * Forever Loop
     * Math (multiplication) with code properties
## ~

## Duration: 30 - 45 minutes

*playing tones with light sensor*
https://youtu.be/2cKg9pokVC4

## The @boardname@ LEDs Light Sensors

- the @boardname@ can detect external light level intensity reaching the LEDs
- the light level block reports a reading of values 0 (*dark*) to 255 (*bright*)
- a **Forever Loop** is required to continually measure the current light level and control the tone

## Forever Loop

The forever loop really does run forever.  The forever loop is useful when there is a need to continually check for an event or use a changing value in code.

## Blocks

```cards
basic.forever(() => {})
input.lightLevel()
led.plotBarGraph(0, 255)
music.playTone(Note.C, music.beat(BeatFraction.Quarter))
```

## Step 1: Create a light level detector
```blocks
basic.forever(() => {
    led.plotBarGraph(input.lightLevel(), 255)
})
```
**Build the  blocks**
  * From **Basic** drag a **forever loop** block into the coding area
  * From **Led** drag a **plot bar graph** block into the **forever loop**
  * From **Input** drag a **light level** block into **plot bar graph *of***

**Set the *plot bar graph* value *up to* = *255* **

## Step 2: Test the light required to move the bar graph height

*graphing light input*
https://youtu.be/pqU7bTcfQ_s
Experiment to see the effect on graph height when the **plot bar graph** value ***up to*** is changed

**255 is the maximum light input reading**, try numbers smaller than 255
**Find a value** that allows the graph to show 1 - 5 bars

## ~hint
## Frequency
**Frequency** measured in Hz which are cycles per second or vibrations per second
  * A healthy human ear can detect frequencies in the range of 20Hz to 20,000Hz.
  * The @boardname@ + headphones reliably produce detectable output ~50Hz - 6,000Hz.

**261Hz** represents a C note
```blocks
music.playTone(261, music.beat(BeatFraction.Half))
```
**play tone** blocks can specify a numeric  **Frequency**
by replacing the letter **C** note with a **number** block that has the value it represents
```blocks
music.playTone(261, music.beat(BeatFraction.Half))
```
## ~

## Step 3: Multiply Frequency using Math blocks
```blocks
input.onButtonPressed(Button.A, () => {
    music.playTone(261 * 2, music.beat(BeatFraction.Half))
})
```
Create a **play tone** block using a **Math** section, **multiplication** block to set *tone*

## Next
**Add** a **B** button block that multiplies the **261** tone by a number other than 2 to set tone

**Download the code to the @boardname@**

**Test the sound for multiples of the 261Hz *C* frequency**

## Step 4: Control the Frequency with the light input
```blocks
basic.forever(() => {
    music.playTone(input.lightLevel() * 25, music.beat(BeatFraction.Quarter))
})
```
**Create a *forever loop* containing a *play tone* block**

**Set *tone*, using *Math* multiplication block that multiplies *light level* input by 25**
or experiment with multipliers larger and smaller than 25

**Test light tone control on the guitar**
Cover the LEDs with your hand to vary light detected to control the tone

## Good work, this guitar is sounding good!
**Challenge:** Create a variable for the light level multiplier that you can change using buttons (optional)

## ~button /projects/guitar/accelerometer
NEXT: Accelerometer Beat control
## ~
