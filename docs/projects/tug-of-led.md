# Tug-Of-LED

## Introduction @unplugged

The ``tug-of-LED`` is a virtual variation of the popular **tug of war** rope game.
Instead of a rope, we'll use the LED screen by pulling the LED light through the center row.

## Step 1

Create a new variable ``rope`` track the progress of the game. 
The ``rope`` variable will be used as the **x** coordinate of the LED to lit
so we set it to ``2`` to start.

```blocks
let rope = 2
```

## Step 2

Add a forever loop that turns on the LED at the ``rope`` position.

```blocks
let rope = 2
basic.forever(function() {
    basic.clearScreen();
    led.plot(rope, 2);
})
```

## Step 3

Add an event on ``||input:button A pressed||`` to change the ``||variables:rope||`` value by **-1**.

```blocks
let rope = 2
input.onButtonPressed(Button.A, function () {
    rope += -1
})
```

## Step 3=4

Add an event on ``||input:button B pressed||`` to change the ``||variables:rope||`` value by **1**.

```blocks
let rope = 2
input.onButtonPressed(Button.B, function () {
    rope += 1
})
```
