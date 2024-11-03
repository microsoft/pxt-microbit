# Activity: Rock, paper, scissors

In this micro:bit activity, you will create a *Rock, Paper, Scissor* game program with conditionals. In *Unit 3: Variables*, you coded your micro:bit to keep score, and in this unit you will code to play *Rock, Paper, Scissors* with the micro:bit.

![Rock, paper, scissors](/static/courses/csintro/conditionals/rock-paper-scissors-items.png)

## Introduction

Let's come up with some pseudocode to describe the behavior of the classic *Rock, Paper, Scissors* game. Your code might look something like this:

>Example pseudocode:<br/>
On shake: choose random number from 0-2
IF random number = 0, THEN display rock icon,
ELSE if random number = 1, THEN display paper icon,
ELSE display scissors icon.

Because there are only three possibilities, we don’t need to do a separate check to see if random number = 2. So, we just use ELSE.

## micro:bit

You should now have the information you need in order to begin coding a Rock, Paper, Scissors game on your own. If you get stuck, or if you would prefer to work along with a tutorial, you can find one here: [rock, paper, scissors](/projects/rock-paper-scissors) (steps 1 through 4)

Once you've finished, play a few games against your program!

The solution code can be found here: [makecode.microbit.org/_D2DCDoJbEYat]()

## Ideas for Mods

* Add a way to keep score: Steps 5 through 7 in the tutorial
* Mod the game to use different images or to add more options like ‘Rock Paper Scissors Lizard Spock’, Step 8 in the tutorial

Here's an example mod:

```blocks
let hand = 0
input.onGesture(Gesture.Shake, () => {
    hand = randint(0, 3)
    if (hand == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (hand == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
    }
})
input.onButtonPressed(Button.A, () => {
    game.addScore(1)
    basic.pause(100)
    basic.showString("Wins:")
    basic.showNumber(game.score())
})
```
