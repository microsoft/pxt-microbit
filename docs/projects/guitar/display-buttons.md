# Buttons, Display & Sound
### @description micro:bit guitar: using buttons with display and sound

### ~avatar avatar
Use Button Events to control LED Display and play Sound  
* **Concepts:**
     * Events
     * Tone/Note
     * Sequence

### ~

![SMILEY VIDEO]()

## Duration: 30 - 45 minutes

## Materials

* A micro:bit, battery pack and 2 x AAA batteries

![](/static/mb/projects/guitar/microbit.jpg)

* 2 to 4 crocodile clips

![](/static/mb/projects/guitar/crocclips.jpg)

* Headphones

![](/static/mb/projects/guitar/headphones.jpg)

## Blocks

```cards
    basic.showLeds(`
        . # . # .
        . . . . .
        . # # # .
        . # . # .
        . # # # .
        `);
input.onButtonPressed(Button.A, () => {});
music.playTone(Note.C, music.beat(BeatFraction.Quater))
music.rest(music.beat(BeatFraction.Whole))
music.beat(BeatFraction.Quater)
```

## Step 1: Make a Smiley 
   * Open [codethemicrobit.com](https://codethemicrobit.com) in your web browser   
```blocks
    basic.showLeds(`
        . # . # .
        . . . . .
        . # # # .
        . # . # .
        . # # # .
        `);
```
   * From **Basics**, drag a **show LEDs** block into the coding area  

   * Create a face with LEDs  

![micro:bit USB connection](/static/mb/projects/guitar/connectmicrobit.jpg)  
   * Connect your micro:bit to your computer via USB and click **`Download`**. 
Follow the instructions to move the code to your micro:bit.  

## Step 2: Add Smiley LED Button Events 
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

   * From **Input**, drag an **on button 'A' pressed** block into the coding area  

   * Snap the LED face into the block  

   * Create a 'B' button block with a different LED face   

   * Download the code to your micro:bit and try the A & B buttons  


## Step 3: Add Headphone Speakers using Crocodile clips

![](/static/mb/projects/guitar/crocclipintoboard.jpg)  

![](/static/mb/projects/guitar/jacktocrocs.jpg)  
   * Connect **GND** to the **base of the headphone jack** using a second crocodile clip (usually black) 

   * Connect **pin 0** to the **tip of the headphone jack** with a crocodile clip  

https://youtu.be/zwRTmpKIaVU  
   * Attach the micro:bit, battery power and headphone speakers to the guitar body  

https://youtu.be/ewyEW_U5G9M  
   * Connect the battery Power Supply to the micro:bit (or connect via USB)  
  
## Step 4: Add Tone Playing Events for Buttons A & B

The **play tone** block allows a range letter note tones from **C** to **B5**.  Songs are played using sequences notes.
  Like the beginning of a birthday song (C, C, D, C, F, E).
```blocks
input.onButtonPressed(Button.A, () => {
    music.playTone(Note.C, music.beat(BeatFraction.Quater))
    music.rest(music.beat(BeatFraction.Whole))
    music.playTone(Note.C, music.beat(BeatFraction.Quater))
    music.rest(music.beat(BeatFraction.Whole))
    music.playTone(Note.D, music.beat(BeatFraction.Quater))
    music.rest(music.beat(BeatFraction.Whole))
    music.playTone(Note.C, music.beat(BeatFraction.Quater))
    music.rest(music.beat(BeatFraction.Whole))
    music.rest(music.beat(BeatFraction.Whole))
    music.playTone(Note.F, music.beat(BeatFraction.Half))
    music.rest(music.beat(BeatFraction.Whole))
    music.playTone(Note.E, music.beat(BeatFraction.Whole))
})
```
### Step 5: Start by creating single note tones for each button press

   * From **Music**, drag **play tone *C* for *1* beat** block under the **show leds** in **Button A Pressed**  
      - modify **tone** by choosing a note (*letter*) and experiment with high and low pitches  
      - set **beat** to 1  

   * Repeat for **Button B** event  

   * Download the code to your micro:bit and try the A & B buttons with the headphones and power connected  
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

  
## Congratulations on completing the basic guitar!   
**Challenge:** Create Samples of longer music to play for each button instead of the single tone
  - *Tip*: Search for "ABC music notation" or "Easy Music Notes" + the name of a song

## Extra

  * [Smiley Buttons tutorial](/projects/smiley-buttons)
  * [Hack your headphones](/projects/hack-your-headphones)


### ~button /projects/guitar/light-sensor
NEXT: Light Sensor Tone Control
### ~