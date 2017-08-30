# Project: Musical instrument

This is a project in which students are challenged to create a musical instrument that uses arrays to store sequences of notes. The array of notes can be played when an input occurs, such as one of the buttons being pressed, or if one or more of the pins is activated.
 
Ideally, the micro:bit should be mounted in some kind of housing, perhaps a guitar shape or a music box.  Start by looking at different kinds of musical instruments to get a sense of what kind of shape you might want to build around your micro:bit.

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
You can create an array of notes by attaching Music blocks to an array.  Musical notes are described in words (e.g., Middle C, High C) but they are actually numbers.  You can do Math operations on those numbers to change the pitch of your song.
 
Here is an example of how to create an array with musical notes.  Button A plays every note in the array.  Button B plays the notes at twice the frequency (but doesn't alter the original notes.)

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

Remember that a 'for element value of list' loop makes a temporary copy of the value, so even if you change a value, it will not change the original element in the array. If students want to permanently change the values in their array (transpose music to increasingly higher keys, for example) they can use a for loop like this:

```blocks
let list: number[] = []
input.onButtonPressed(Button.AB, () => {
    for (let index = 0; index <= list.length - 1; index++) {
        list[index] = list[index] * 2
    }
})
```

## Reflection
Have students write a reflection of about 150–300 words, addressing the following points:

* Explain how you decided on your musical instrument. What brainstorming ideas did you come up with? 
* What properties does it share with a real musical instrument? What is unique?
* Describe the type of array you used (Numbers, Strings, or Notes) and how it functions in your project.
* What was something that was surprising to you about the process of creating this program?
* Describe a difficult point in the process of designing this program, and explain how you resolved it.
* What feedback did your beta testers give you? How did that help you improve your musical instrument?

## Assessment

**Competency scores**: 4, 3, 2, 1

### Array

**4 =** Stores and iterates through each element of the array successfully.<br/>
**3 =** Stores each element of the array successfully.<br/>
**2 =** Array skips values or has other problems with storing and/or retrieving elements.<br/>
**1 =** Array doesn't work at all or no array present.

### Maker component

**4 =** Tangible component is tightly integrated with the micro:bit and each relies heavily on the other to make the project complete.<br/>
**3 =** Tangible component is somewhat integrated with the micro:bit but is not essential.<br/>
**2 =** Tangible component does not add to the functionality of the program.<br/>
**1 =** No tangible component.

### micro:bit program

**4 =** The program:<br/>
`*` Uses at least one array in a fully integrated and meaningful way<br/>
`*` Compiles and runs as intended<br/>
`*` Meaningful comments in code<br/>
**3 =** Uses an array in a tangential way that is peripheral to function of project and/or program lacks 1 of the required elements.<br/>
**2 =** Array is poorly implemented and/or peripheral to function of project, and/or lacks 2 of the required elements.<br/>
**1 =** micro:bit program lacks 3 or more of the required elements.

### Collaboration reflection

**4 =** Reflection piece addresses all prompts.<br/>
**3 =** Reflection piece lacks 1 of the required elements.<br/>
**2 =** Reflection piece lacks 2 of the required elements.<br/>
**1 =** Reflection piece lacks 3 of the required elements.
