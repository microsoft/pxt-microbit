# Project: Board Game

![Close-up of game tokens](/static/courses/csintro/conditionals/game-pieces.jpg)

This is an assignment for students to create a board game. It should take two to three class periods. If your school has a makerspace or an art classroom where students can access materials such as cardboard, poster paints, or markers, you might schedule your classes to work there. 

Once students have finished the first version of their games, schedule time for students to play each other’s games. Ideally, give them some time to give and gather feedback, then revise their games accordingly.

## Introduction
Many board games use an electronic toy to signal moves, or provide clues. There are some funny examples online if you search for “electronic board game”. Here are some examples:

[Dark Tower](https://youtu.be/cxrY7MWEkwE) (featuring Orson Welles): This is an example of a circular board game in which the pieces start on the edges and move in toward the middle.

[Electronic Dream Phone Board Game Commercial - 1992](https://www.youtube.com/watch?v=pqYsQgDqlmg): This board game is really a logic puzzle. There are printed clues that illustrate relationships and the phone provides clues that help you to narrow down possibilities by a process of elimination.

[Stop Thief Electronic Board Game commercial 1979](https://www.youtube.com/watch?v=q3wpPRdDy4E): This board game uses a device to give audio clues that help you to figure out what to do on the game board. It’s a good example of how you might use sound as a clue.

## Assignment
Students should work in pairs to create an original board game project in which micro:bit is a central feature, and the rules of their board game should use Conditionals.

Students will need to work together to come up with:
* A set of written rules (how to play)
* A game board
* A program for the micro:bit
* Photo documentation of the different game pieces, cards, or other components of the game with the micro:bit included as well as a screenshot of your micro:bit code. Each photo must have a caption that describes what the photo is documenting.
* Reflection: A text entry describing your team’s game making process and each teammate’s part in the creation of the game from brainstorming ideas, through construction, programming, and beta testing.
	
The micro:bit needs to work in conjunction with the game board and/or game pieces and should be a central feature of the game. Ideally, it should be more than a simple substitute for a six-sided die.

The micro:bit might:
* Simulate the results of a battle between two pieces
* Randomly point in a different direction of travel
* Generate a result based on its current incline
* Point randomly at players and kill them
* Display a dynamic score
* ... let your imaginations run wild!
	
Ideally, students should be writing their own versions of micro:bit programs to do something original. 
Here is one simple program to discuss and use as an example:

![Close-up of game tokens](/static/courses/csintro/conditionals/battle-pieces.jpg)

### Battle pieces

In this example, pieces start out at full strength and lose points based on random events on the board. When two pieces meet on the same space, they battle. 
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
    if (Math.randomRange(0, p1 + p2 - 1 + 1) + 1 <= p1) {
        basic.showString("A")
    } else {
        basic.showString("B")
    }
})
```

## Beta Testing

Give students a chance to play each other’s games. The following process works well:
* Have each pair of students set up their own project at their table. 
* Leave a clipboard or a laptop on the table for taking notes.
* Rotate the students through each project, moving clockwise around the room:
>* Play the game (5 min)
>* Fill out a survey form (5 min)

Sample Survey questions
* How easy was it to figure out what to do?
* What is something about this project that works really well?
* What is something that would make this project even better?
* Any other comments or suggestions?
	
Many online survey tools will allow you to sort the comments by project and share them with project creators so they can make improvements based on that feedback.

## Reflection

Have students write a reflection of about 150–300 words, addressing the following points:
* Explain how you decided, as a pair, on your particular board game idea.
* What was something that was surprising to you about the process of creating this game?
* Describe a difficult point in the process of designing this game, and explain how you resolved it.
* What feedback did your beta testers give you? How did that help you improve your game? What were the Conditionals that you used as part of your game rules?

## Board game example

Space Race by K. and S.
* How to win:  Starting from Earth, your goal is to progress to Mars.  The first person to reach Mars is the winner.
* Rules:<br/>
>**1** - Shake the micro:bit to randomize how far you get to advance.<br/>
**2** - If you land on a pink square, press “B” on the micro:bit until your previous roll number appears. Then press A and B at the same time to see whether or not you move based upon the number on the square.<br/>
**3** - Up to four players.
	
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
        yes_or_no = Math.randomRange(0, 8)
    }
    if (4 > previous_roll) {
        yes_or_no = Math.randomRange(0, 5)
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
    current_roll = Math.randomRange(0, 6)
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

## Assessment

**Competency scores**: 4, 3, 2, 1

### Rules

>**4 =** All game rules are clear and complete.<br/>
**3 =** A game rule is missing or not complete or not clear.<br/>
**2 =** More than one game rule is missing or not complete or not clear<br/>
**1 =** Most of the game rules are missing or it is not clear what the rules are.

### Game board

>**4 =** Game board is:<br/>
`*` Complete<br/>
`*` Neat<br/>
`*` Fits with the theme of the game<br/>
`*` micro:bit is a central part of the game<br/>
**3 =** Game board meets only 3 of the conditions listed for a score of 4.<br/>
**2 =** Game board meets only 2 of the conditions listed for a score of 4.<br/>
**1 =** Game board meets only 1 of the conditions listed for a score of 4.

### micro:bit program

>**4 =** micro:bit program:<br/>
`*` Uses the micro:bit in a way that is integral to the game<br/>
`*` Uses conditionals correctly<br/>
`*` Compiles and runs as intended<br/>
`*` JavaScript includes comments in code<br/>
**3 =** micro:bit program lacks 1 of the required elements.<br/>
**2 =** micro:bit program lacks 2 of the required elements.<br/>
**1 =** micro:bit program lacks 3 of the required elements. 

### Photo documentation

>**4 =** Complete photo documentation that includes photos of game board and code and captions.<br/>
**3 =** A photo is missing or of poor quality or a caption is missing.<br/>
**2 =** Multiple photos and/or captions missing or of poor quality.<br/>
**1 =** Most photos and/or captions missing or of poor quality.

### Collaboration reflection
>**4 =** Reflection piece includes:<br/>
`*` Brainstorming ideas<br/>
`*` Construction<br/>
`*` Programming<br/>
`*` Beta testing<br/>
**3 =** Reflection piece lacks 1 of the required elements.<br/>
**2 =** Reflection piece lacks 2 of the required elements.<br/>
**1 =** Reflection piece lacks 3 of the required elements. 


