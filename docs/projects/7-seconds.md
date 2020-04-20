# 7 seconds game

## Introduction @unplugged

The goal of this game is press a button after **exactly** 7 seconds!

![A micro:bit looking at a 7 second stopwatch](/static/mb/projects/7-seconds.png)

This game is inspired from the [flipping panckakes game](https://www.elecfreaks.com/store/blog/post/flipping-pancakes-microbit-game.html).

## Step 1

The player starts the timer by pressing button **A**. Add the code to run code when ``||input:button A is pressed||``.

```blocks
input.onButtonPressed(Button.A, function () {
	
})
```

## Step 2

We need to remember the time when the button was pressed so that we can compute the elapsed time later on.
Add code to store the ``||input:running time||`` in a ``||variables:start||`` variable.

```blocks
let start = 0
input.onButtonPressed(Button.A, function () {
    // @highlight
    start = input.runningTime()
})
```

## Step 3

Show something on the screen so that the user knows that the timer has started...

```blocks
let start = 0
input.onButtonPressed(Button.A, function () {
    start = input.runningTime()
    // @highlight
    basic.showIcon(IconNames.Chessboard)
})
```

## Step 4

The player stops the timer by pressing button **B**. Add the code to run code when ``||input:button B is pressed||``.

```blocks
input.onButtonPressed(Button.B, function () {
	
})
```

## Step 5

Compute the elapsed time as ``||input:running time||`` ``||math:minus||`` ``||variables:start||`` and store it into a new variable ``||variables:elapsed||``.

```blocks
let start = 0
let elapsed = 0
input.onButtonPressed(Button.B, function () {
    // @highlight
    elapsed = input.runningTime() - start
})
```

## Step 6

Compute the ``||variables:score||`` of the game as the ``||math:absolute value||`` of the ``||math:difference||`` of ``||variables:elapsed||`` time from 7 seconds, which is 7000 milliseconds.

```blocks
let start = 0
let elapsed = 0
let score = 0
input.onButtonPressed(Button.B, function () {
    elapsed = input.runningTime() - start
    // @highlight
    score = Math.abs(elapsed - 7000)
})
```

## Step 7

Display the score on the screen and your game is ready!

```blocks
let start = 0
let elapsed = 0
let score = 0
input.onButtonPressed(Button.B, function () {
    elapsed = input.runningTime() - start
    score = Math.abs(elapsed - 7000)
    // @highlight
    basic.showNumber(score)
})
```
