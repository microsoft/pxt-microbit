# Activity: Rock, paper, scissors

For this activity, each student will need a micro:bit. 
Everyone will create the same program, the classic rock paper scissor game.

![Rock, paper, scissors](/static/courses/csintro/conditionals/rock-paper-scissors-items.png)

## Introduce activity

* Have students recall the classic rock paper scissors game.
* What are the rules of the game? What are the conditionals?
>Example: If Player A gets rock, and Player B gets scissors, Then Player A wins.
* Have students write the pseudocode for how to play the game on the micro:bit.
>Example pseudocode:<br/>
On button A press: choose random number from 0-2
If random number = 0, then display rock icon,
Else if random number = 1, then display paper icon, 
Else display scissors icon.
* Point out that because there are only three possibilities, we don’t need to do a separate check to see if random number = 2. So we just use an else.

## micro:bit

* Working from the specifications, have students work in pairs to try to code a Rock Paper Scissors game on their own.
* If students get stuck, there is a tutorial at [rock, paper, scissors](/projects/rock-paper-scissors) (steps 1 through 4), that leads students step-by-step through the process of coding a working rock paper scissor game for their micro:bit.
* Let them play the game against their program.

## Ideas for Mods

* Add a way to keep score: Steps 5 through 7 in the tutorial
* Mod the game to use different images or to add more options like ‘Rock Paper Scissors Lizard Spock’, Step 8 in the tutorial

Here's an example mod:

```blocks
let hand = 0
input.onGesture(Gesture.Shake, () => {
    hand = Math.randomRange(0, 3)
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
