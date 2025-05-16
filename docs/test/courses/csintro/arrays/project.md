# Project: Musical instrument

This is a project in which you are challenged to create a musical instrument that uses arrays to store sequences of notes. The array of notes can be played when an input occurs, such as one of the buttons being pressed, or if one or more of the pins is activated.
 
Ideally, the micro:bit should be mounted in some kind of housing, perhaps a guitar shape or a music box. Start by looking at different kinds of musical instruments to get a sense of what kind of shape you might want to build around your micro:bit.

![micro:bit guitar](/static/courses/csintro/arrays/microbit-guitar.png)

Here are some examples of guitars that were made out of cardboard and colored, patterned duct tape that you can buy in craft stores. 

## Example guitar code

This is an example of a project that uses the micro:bit accelerometer to play different tones when the guitar is held and tilted while playing. Pressing the A button will save the current tone to an array. After ten tones, a repeating melody will be performed. Press the B button to clear the array and start over.

### Song-maker

```blocks
let currentNote = 0
let list: number[] = []
basic.forever(() => {
    if (list.length < 10) {
        currentNote = input.acceleration(Dimension.X) + 1300
        music.ringTone(currentNote)
    } else {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . # . # .
            . . # . .
            `)
        for (let value of list) {
            music.playTone(value, music.beat(BeatFraction.Whole))
        }
    }
})
input.onButtonPressed(Button.A, () => {
    if (list.length < 10) {
        list.push(currentNote)
        basic.showNumber(10 - list.length)
    }
})
input.onButtonPressed(Button.B, () => {
    list = []
    basic.clearScreen()
})
```

## Using arrays with musical notes

You can create an array of notes by attaching Music blocks to an array. Musical notes are described in words (e.g., Middle C, High C) but they are actually numbers.  You can do Math operations on those numbers to change the pitch of your song.
 
Here is an example of how to create an array with musical notes.  Button A plays every note in the array. Button B plays the notes at twice the frequency (but doesn't alter the original notes.)

```blocks
let list: number[] = []
let value = 0
input.onButtonPressed(Button.A, () => {
    for (let value of list) {
        music.playTone(value, music.beat(BeatFraction.Whole))
    }
    basic.pause(1000)
})
input.onButtonPressed(Button.B, () => {
    for (let value of list) {
        music.playTone(value * 2, music.beat(BeatFraction.Whole))
    }
    basic.pause(1000)
})
list = [262, 392, 330, 392, 262]
```

Remember that a 'for element value of list' loop makes a temporary copy of the value, so even if you change a value, it will not change the original element in the array. If you'd like to permanently change the values in your array (transpose music to increasingly higher keys, for example) you can use a for loop like this:

```blocks
let list: number[] = []
input.onButtonPressed(Button.AB, () => {
    for (let index = 0; index <= list.length - 1; index++) {
        list[index] = list[index] * 2
    }
})
```

## Reflection
Write a short reflection of about 150–300 words, addressing the following points:

* Explain how you decided on your musical instrument. What brainstorming ideas did you come up with? 
* What properties does it share with a real musical instrument? What is unique?
* Describe the type of array you used (Numbers, Strings, or Notes) and how it functions in your project.
* What was something that was surprising to you about the process of creating this program?
* Describe a difficult point in the process of designing this program, and explain how you resolved it.
* What feedback did your beta testers give you? How did that help you improve your musical instrument?
* Publish your MakeCode program and include the link.