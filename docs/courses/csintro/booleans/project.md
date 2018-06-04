# Project: Boolean

![Two-Player Game Example Board](/static/courses/csintro/booleans/two-player.jpg)

This is an assignment for students to come up with a micro:bit program that uses Boolean variables, Boolean operators, and possibly the random function. 
 
## Input
Remind the students of all the different inputs available to them through the micro:bit.

![micro:bit input list](/static/courses/csintro/variables/input-list.png)
 
## Project Ideas

### Sunscreen Monitor

When you shake the micro:bit, it reports the current temperature in degrees Fahrenheit.  Button B measures the light level and if it is above 70 degrees AND very bright, it will display a sun icon.  If it is above 70 degrees and less bright, it will display a cloudy symbol. If it is dark, it will display a nighttime icon.

[**micro:bit Sunscreen Monitor**](https://youtu.be/VmD-dcZZQFc)
https://youtu.be/VmD-dcZZQFc

#### Sunscreen code

```blocks
input.onButtonPressed(Button.B, () => {
    if (128 > input.lightLevel() && 0 < input.lightLevel() && input.temperature() > 22) {
        basic.showLeds(`
            . # . # .
            # . . . #
            . . . . .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            . # # # .
            # . . . #
            . . . . .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            . # # # .
            # . . . #
            . # . # .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            . # # # .
            # . . . #
            . # # # .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
    } else {
        basic.showLeds(`
            # . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            . # . . .
            # # . . .
            . . . . .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            . . # . .
            . . # . .
            # # # . .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            . . # # .
            . . # . .
            # # # . .
            # . . # .
            . . . . .
            `)
basic.showLeds(`
            . . # # #
            . . # . .
            # # # . .
            # . . # .
            # . . . #
            `)
basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
    }
})
input.onButtonPressed(Button.A, () => {
    if (input.temperature() < 22 && input.temperature() > 6) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
            `)
basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    }
})
input.onGesture(Gesture.Shake, () => {
    basic.clearScreen()
    basic.showNumber(input.temperature() * 2 + 32)
})
```

Button A displays an animation to tell you whether or not you should use sunscreen (on sunny or cloudy days but not at night or indoors.)

Make a holder that can hold the micro:bit and a bottle of sunscreen.

This example uses boolean operations because both light level AND temperature must be high in order to trigger the sun icon:

```block
if (128 > input.lightLevel() && 0 < input.lightLevel() && input.temperature() > 22) {}
```
 
### Two-player game

Create a game in which two players take turns on the same micro:bit. You can use a boolean variable called PlayerATurn to keep track of whose turn it is.

**Board Game:** Use boolean variables and random values as part of a board game (or improve your Board Game from the Variables lesson). Make the board and pieces and a holder for the micro:bit. Try modding a current board game.

![Two player game project](/static/courses/csintro/booleans/two-player-game.png)
Board Game with Arrows

#### Board game arrow code

```blocks
let player1Turn = false
let spin = 0
let delay = 0
input.onGesture(Gesture.Shake, () => {
    if (player1Turn == true && Math.randomRange(0, 4) < 3) {
        basic.clearScreen()
        delay = 0
        while (delay < 500) {
            basic.showLeds(`
                . . # . .
                . # # . .
                # # # # .
                . # # . .
                . . # . .
                `)
            delay += 50
            basic.pause(delay)
            basic.showLeds(`
                . . # . .
                . # # # .
                # # # # #
                . . # . .
                . . . . .
                `)
            delay += 50
            basic.pause(delay)
            basic.showLeds(`
                . . # . .
                . . # # .
                . # # # #
                . . # # .
                . . # . .
                `)
            delay += 50
            basic.pause(delay)
            basic.showLeds(`
                . . . . .
                . . # . .
                # # # # #
                . # # # .
                . . # . .
                `)
            basic.pause(delay)
            delay += 50
            player1Turn = false
        }
    } else if (player1Turn) {
        basic.showString("Crash!")
        player1Turn = false
    } else if (Math.randomRange(0, 4) < 3) {
        basic.clearScreen()
        delay = 0
        while (delay < 500) {
            basic.showLeds(`
                . . # . .
                . # # . #
                # # # # #
                . # # . #
                . . # . .
                `)
            delay += 50
            basic.pause(delay)
            basic.showLeds(`
                . . # . .
                . # # # .
                # # # # #
                . . # . .
                . # # # .
                `)
            delay += 50
            basic.pause(delay)
            basic.showLeds(`
                . . # . .
                # . # # .
                # # # # #
                # . # # .
                . . # . .
                `)
            delay += 50
            basic.pause(delay)
            basic.showLeds(`
                . # # # .
                . . # . .
                # # # # #
                . # # # .
                . . # . .
                `)
            basic.pause(delay)
            delay += 50
            player1Turn = true
        }
    } else {
        basic.showString("Crash!")
        player1Turn = true
    }
})
basic.forever(() => {
	
})
delay = 0
spin = 0
player1Turn = true
```


This is an example of a board game in which the micro:bit displays an arrow pointing in a random direction. The paper legend indicates different actions the player must take. 


Here is a portion of the board game's code. A boolean variable is used to determine whose turn it is. If player1Turn is false, then it's player 2's turn. A random number is generated to show the arrow seventy-five percent of the time (for values of 0, 1, or 2).

```blocks
let player1Turn = false;
input.onGesture(Gesture.Shake, () => {
    if (player1Turn == true && Math.randomRange(0, 4) < 3) {

    }
})
```
## Reflection

Have students write a reflection of about 150–300 words, addressing the following points:
* How did you incorporate boolean variables into your micro:bit program?
* How did you incorporate boolean operators into your micro:bit program?
* Describe something in your project that you are proud of.
* If you had more time to work on this project, describe what you might add or change.

## Assessment
 
**Competency scores**: 4, 3, 2, 1
 
### Boolean

**4 =** More than 2 Boolean variables are implemented in a meaningful way.<br/>
**3 =** At least 2 Boolean variables are implemented in a meaningful way.<br/>
**2 =** At least 1 Boolean variable is implemented in a meaningful way.<br/>
**1 =** No Boolean variables are implemented.
			 
### micro:bit program

**4 =** micro:bit program:<br/>
`*` Uses Booleans in a way that is integral to the program.<br/>
`*` Compiles and runs as intended<br/>
`*` Meaningful comments in code<br/>
**3 =** micro:bit program lacks 1 of the required element.<br/>
**2 =** micro:bit program lacks 2 of the required elements.<br/>
**1 =** micro:bit program lacks all of the required elements.

### Collaboration reflection

**4 =** Reflection piece addresses all prompts.<br/>
**3 =** Reflection piece lacks 1 of the required elements.<br/>
**2 =** Reflection piece lacks 2 of the required elements.<br/>
**1 =** Reflection piece lacks 3 of the required elements. 
