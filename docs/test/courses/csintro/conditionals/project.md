# Project: Board Game

![Close-up of game tokens](/static/courses/csintro/conditionals/game-pieces.jpg)

## Introduction
Many board games use an electronic toy to signal moves, or provide clues. There are some funny examples online if you search for “electronic board game”. Here are some examples:

[Dark Tower](https://youtu.be/cxrY7MWEkwE) (featuring Orson Welles): This is an example of a circular board game in which the pieces start on the edges and move in toward the middle.

[Electronic Dream Phone Board Game Commercial - 1992](https://www.youtube.com/watch?v=pqYsQgDqlmg): This board game is really a logic puzzle. There are printed clues that illustrate relationships and the phone provides clues that help you to narrow down possibilities by a process of elimination.

[Stop Thief Electronic Board Game commercial 1979](https://www.youtube.com/watch?v=q3wpPRdDy4E): This board game uses a device to give audio clues that help you to figure out what to do on the game board. It’s a good example of how you might use sound as a clue.

## Assignment
Create an original board game project in which micro:bit is a central feature. The rules of your board game should use Conditionals.

Come up with:

* A set of written rules (how to play)
* A game board
* A program for the micro:bit
* Photo documentation of the different game pieces, cards, or other components of the game with the micro:bit included as well as a screenshot of your micro:bit code. Each photo should have a caption that describes what the photo is documenting.
* Reflection: A text entry describing your game-making process from brainstorming ideas, through construction, programming, and beta testing.

The micro:bit needs to work in conjunction with the game board and/or game pieces and should be a central feature of the game. Ideally, it should be more than a simple substitute for a six-sided die.

The micro:bit might:

* Simulate the results of a battle between two pieces
* Randomly point in a different direction of travel
* Generate a result based on its current incline
* Point randomly at players and eliminate them
* Display a dynamic score
* ...let your imagination run wild!

Try to code your micro:bit to do something original. Here is one example:

![Close-up of game tokens](/static/courses/csintro/conditionals/battle-pieces.jpg)

### Battle pieces

In this example, pieces start out at full strength and lose points based on random events on the board.

Rules: When two pieces meet on the same space, they battle.

* Press A to enter the strength of piece A.

* Then press B to enter the strength of piece B.

* Shake the micro:bit to determine the winner of the battle, which is proportionately random to the strength of each piece.

```blocks
let p2 = 0
let p1 = 0
input.onButtonPressed(Button.A, () => {
    p1 += 1
    basic.showNumber(p1)
})
input.onButtonPressed(Button.B, () => {
    p2 += 1
    basic.showNumber(p2)
})
input.onGesture(Gesture.Shake, () => {
    if (randint(0, p1 + p2) <= p1) {
        basic.showString("A")
    } else {
        basic.showString("B")
    }
})
```
Solution link: [https://makecode.microbit.org/_0fx9hY9EbM5T]()

### Bonus

The micro:bit uses its accelerometer to detect when you're shaking it. How does an accelerometer actually work?

[https://www.youtube.com/watch?v=byngcwjO51U]()

### Space Race

How to win: Starting from Earth, your goal is to progress to Mars. The first person to reach Mars is the winner.

Rules:

* Shake the micro:bit to randomize how far you get to advance.
* If you land on a pink square, press B on the micro:bit until your previous roll number appears. Then press A and B at the same time to see whether or not you move based upon the number on the square.
* Up to four players.

![Space race game](/static/courses/csintro/conditionals/space-race.jpg)
Finished game

![micro:bit holder square](/static/courses/csintro/conditionals/microbit-holder.jpg)
micro:bit holder

![Game pieces](/static/courses/csintro/conditionals/game-pieces.jpg)
Game pieces

```blocks

let yes_or_no = 0
let current_roll = 0
let previous_roll = 0
input.onButtonPressed(Button.AB, () => {
    previous_roll = 0
    if (4 <= previous_roll) {
        yes_or_no = randint(0, 8)
    }
    if (4 > previous_roll) {
        yes_or_no = randint(0, 5)
    }
    if (2 < yes_or_no) {
        basic.showString("YES")
        basic.clearScreen()
    } else {
        basic.showString("NO")
        basic.clearScreen()
    }
})
input.onGesture(Gesture.Shake, () => {
    current_roll = randint(0, 6)
    basic.showNumber(current_roll + 1)
    basic.pause(5000)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, () => {
    previous_roll += 1
    basic.showNumber(previous_roll)
})
input.onButtonPressed(Button.A, () => {
    previous_roll += -1
    basic.showNumber(previous_roll)
})
basic.showString("SPACE RACE")
previous_roll = 0
```
Solution link: [makecode.microbit.org/_H7kPewAyifhk]()

## Journal Prompt

Write a short reflection in your journal (about 150–300 words), addressing the following points:

* Explain how you decided on your particular board game idea.
* What was something that was surprising to you about the process of creating this game?
* Describe a difficult point in the process of designing this game, and explain how you resolved it.
* If you had other poeple play your game, what feedback did they give you? How did that help you improve your game? What were the Conditionals that you used as part of your game rules?
* Publish your MakeCode program and include the link.

