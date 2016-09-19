# Buttons, Display & Sound
### @description micro:bit guitar: using buttons with display and sound

### ~avatar avatar
Use Button Events to control LED Display and play Sound  
* **Duration:** 30 - 45 minutes
* **Materials:**
  * Micro:bit (USB cable to attach micro:bit to computer)
  * Headphones (ear buds work great)
  * 2 Crocodile cables  
* **Concepts:**
     * Events
     * Tone/Frequency/Note
     * Sequence
* **Resources:**
  * [Smiley Buttons tutorial](docs/projects/smiley-buttons)
  * [Hack your headphones](docs/projects/hack-your-headphones)
### ~
![SMILEY VIDEO]()

### Make a Smiley
1) Open the [block editor](https://codethemicrobit.com) 
2) Under **Basics**, drag a **show leds** block into the coding area
3) Create a face with leds  
```blocks
    basic.showLeds(`
        . # . # .
        . . . . .
        . # # # .
        . # . # .
        . # # # .
        `);
```  
![GUITAR BUTTON VIDEO]()
### Add Smiley LED Button Events  
4) Under **Input**, drag **on button 'A' pressed** block into the coding area
5) Snap the LED face into the block
6) Create a 'B' button with a different LED face  
```blocks
input.onButtonPressed(Button.A, () => {
    basic.showLeds(`
        . # . # .
        . . . . .
        . # # # .
        . # . # .
        . # # # .
        `)
})
input.onButtonPressed(Button.B, () => {
    basic.showLeds(`
        . # . # .
        . . . . .
        . . . . .
        # . . . #
        . # # # .
        `)
})
```

![CROC-CLIP VIDEO]() 
### Add Headphone Speakers using Crocodile clips
7) Connect **pin 0** to the **tip of the headphone jack** with a crocodile clip
8) Connect **GND** to the **base of the headphone jack** using a second crocodile clip (usually black) 
9) Connect the battery Power Supply to the micro:bit (or connect via USB)
### Add Tone Playing Events for Buttons A & B
10) Under **Music**, drag **play tone *C* for *1* beat** block under the **show leds** in **Button A Pressed**  
  a) modify **tone** by choosing a note (*letter*) and experiment with high and low pitches  
  b) set **beat** to 1
11) Repeat for **Button B** event
```blocks
input.onButtonPressed(Button.A, () => {
    basic.showLeds(`
        . # . # .
        . . . . .
        . # # # .
        . # . # .
        . # # # .
        `)
    music.playTone(Note.A, music.beat(BeatFraction.Whole))
})
input.onButtonPressed(Button.B, () => {
    basic.showLeds(`
        . # . # .
        . . . . .
        . . . . .
        # . . . #
        . # # # .
        `)
    music.playTone(Note.G, music.beat(BeatFraction.Whole))
})
```
12) Attach the micro:bit, battery power and headphone speakers to the guitar body 
  
### Congratulations on completing the basic guitar   
  
**Challenge:** Create Samples of longer music to play for each button instead of the single tone.
  - *Tip*: Search for "ABC music notation" or "Easy Music Notes" + the name of a song

### ~button /projects/guitar/light-sensor
NEXT: Light Sensor Tone Control
### ~