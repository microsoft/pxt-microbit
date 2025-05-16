# Project: Boolean

![Two-Player Game Example Board](/static/courses/csintro/booleans/two-player.jpg)

In this project, you will come up with a micro:bit program that uses Boolean variables, Boolean operators, and possibly the random function.
 
## Project Expectations

Follow the design thinking approach and make sure your project meets these specifications:

* More than two Boolean variables are implemented in a meaningful way.
* The micro:bit program uses Booleans in a way that is integral to the program.
* The program compiles and runs as intended and includes meaningful comments in code.
* Provide the written Reflection Diary entry.

## Input

Don't forget to consider all the different inputs available to you through the micro:bit.

### Available inputs

* Acceleration
* Light level
* Rotation
* Button is pressed
* Compass heading
* Temperature
* Running time
* On shake
* On button pressed
* On logo down
* On logo up
* On pin pressed
* On screen down
* On screen up
* Pin is pressed

## Project Ideas

Use Boolean variables and/or random values to create:

* A board game, game pieces, and holder for the micro:bit (or improve your board game from Unit 3: Variables)
* A mod of some sort to a current/existing board game
* A micro:bit version of a Magic Eight Ball

## Project Examples

### Sunscreen Monitor

The micro:bit is attached to a bottle of sunscreen and provides information about the temperature and if you need sunscreen:

* When you shake the micro:bit, it reports the current temperature in degrees Fahrenheit.
* Button A displays an animation to tell you whether or not you should use sunscreen (on sunny or cloudy days but not at night or indoors).
* Button B measures the light level, and if it is above 70 degrees AND very bright, it will display a sun icon. If it is above 70 degrees and less bright, it will display a cloudy symbol. If it is dark, it will display a nighttime icon. Check it out in action here: [youtu.be/VmD-dcZZQFc](here) (0:18)

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

Solution link: [Sunscreen Monitor](https://makecode.microbit.org/_Atd9Wti3MiUj)

### Two-player game

This is an example of a board game in which the micro:bit displays an arrow pointing in a random direction. The paper legend indicates different actions the player must take, and it uses a Boolean variable to keep track of whose turn it is.

**Board Game:** Use boolean variables and random values as part of a board game (or improve your Board Game from the Variables lesson). Make the board and pieces and a holder for the micro:bit. Try modding a current board game.

![Two player game project](/static/courses/csintro/booleans/two-player-game.png)

#### Board game arrow code

```blocks
let player1Turn = false
let spin = 0
let delay = 0
input.onGesture(Gesture.Shake, () => {
    if (player1Turn == true && randint(0, 4) < 3) {
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
    } else if (randint(0, 4) < 3) {
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
    if (player1Turn == true && randint(0, 4) < 3) {

    }
})
```

Solution link: [Arrows Board Game](https://makecode.microbit.org/_1mY4wq4KPYiq)

## Reflection

Write a short reflection of about 150–300 words, addressing the following points:

* How did you incorporate boolean variables into your micro:bit program?
* How did you incorporate boolean operators into your micro:bit program?
* Describe something in your project that you are proud of.
* If you had more time to work on this project, describe what you might add or change.
* Publish your MakeCode program and include the link.