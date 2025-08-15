# Project: Radio project

For this project, you'll be coding two micro:bits and making use of the Radio blocks to send and receive data between them. Some projects may even have two separate programs: One that receives data, and one that sends data.

## Project Ideas

### Stop, thief!
Design an alarm system for your bedroom that alerts you with a screen animation when someone opens your door. You can mount one micro:bit on your door and use the accelerometer to send a signal over the radio when it is being moved.

### Interactive art
Create a piece of interactive artwork that receives something as input over the radio from another micro:bit, and displays something based on that as output. 

### 3-Note keyboard
This is a simple three-note keyboard that uses wooden paint stirrers and copper tape to make a connection to each of the three pins on the micro:bit.

![Keyboard with copper tape](/static/courses/csintro/radio/keyboard-copper-tape.png)
_Keyboard with copper tape connections_
 
When a key is pressed, it sends a number over the radio to a second micro:bit that plays the appropriate tone. This allows you to use each of the three pins on the first micro:bit to play a different tone.

![Second micro:bit that plays notes](/static/courses/csintro/radio/microbit-number-two.png)
_Second micro:bit that plays the notes_

### ~ hint

#### Bonus

This project uses touch pin inputs. See how the micro:bit detects a press at a pin or on something connected to a pin in this video:

https://www.youtube.com/watch?v=GEpZrvbsO7o

### ~

#### 3-Note keyboard program

```blocks
let sound = 0
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        sound = 349
        music.playTone(sound, music.beat(BeatFraction.Half))
    } else if (receivedNumber == 1) {
        sound = 392
        music.playTone(sound, music.beat(BeatFraction.Half))
    } else if (receivedNumber == 2) {
        sound = 440
        music.playTone(sound, music.beat(BeatFraction.Half))
    }
})
input.onPinPressed(TouchPin.P0, () => {
    sound = 0
    radio.sendNumber(sound)
    basic.showLeds(`
        . . # . .
        . # . # .
        . # . # .
        . # . # .
        . . # . .
        `)
    basic.pause(500)
    basic.clearScreen()
})
input.onPinPressed(TouchPin.P1, () => {
    sound = 1
    radio.sendNumber(sound)
    basic.showLeds(`
        . . # . .
        . # # . .
        . . # . .
        . . # . .
        . # # # .
        `)
    basic.pause(500)
    basic.clearScreen()
})
input.onPinPressed(TouchPin.P2, () => {
    sound = 2
    radio.sendNumber(sound)
    basic.showLeds(`
        . # # # .
        # . . # .
        . . # . .
        . # . . .
        # # # # .
        `)
    basic.pause(500)
    basic.clearScreen()
})
basic.showLeds(`
    # # # # #
    # # # # #
    . . . . .
    . . . . .
    . . . . .
    `)
basic.clearScreen()
```

Solution link: [makecode.microbit.org/_iXKbWu8f2H60]()

### Radio tennis
In this project, the tennis racquets alternate displaying a ball on the micro:bit LED screen.  When you swing the racquet, the ball disappears from one micro:bit display and shows up on the other micro:bit's display.

![Radio tennis racquets](/static/courses/csintro/radio/radio-tennis-racquets.jpg)
_Radio Tennis racquets (made from cardboard)_

## Reflection

Write a short reflection of about 150–300 words, addressing the following points:

* What kind of project did you do? How did you decide what to pick?
* How does your project use radio communication?
* Are there separate programs for the Sender and the Receiver micro:bits? Or one program for both?
* Describe something in your project that you are proud of.
* Describe a difficult point in the process of designing this program and explain how you resolved it.
* What feedback did your testers give you? How did that help you improve your design?
* How would you improve your project, given more time?
* Publish your MakeCode program and include the link.