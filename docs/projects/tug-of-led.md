# Tug-Of-LED

## Introduction @unplugged

The ``tug-of-LED`` is a virtual variation of the popular **tug of war** rope game.
Instead of a rope, we'll use the LED screen by pulling the LED light through the center row.

![A micro:bit holding a rope](/static/mb/projects/tug-of-led.png)

## Step 1

Create a new variable ``||variables:rope||`` and put it in the ``||basic:on start||``. This will
track the progress of the game. The ``||variables:rope||`` variable will be used as the **x**
coordinate of the LED to lit so we set it to ``2`` to start.

```blocks
let rope = 2
```

## Step 2

Add a ``||basic:forever||`` loop that turns on the LED at the ``||variables:rope||`` position.

```blocks
let rope = 2
basic.forever(function() {
    basic.clearScreen();
    led.plot(rope, 2);
})
```

## Step 3

Add an event on ``||input:button A pressed||`` to change the ``||variables:rope||`` value by **-0.1**.
The @boardname@ will automatically round the ``||variables:rope||`` value to the nearest LED coordinate.

```blocks
let rope = 2
input.onButtonPressed(Button.A, function () {
    rope += -0.1
})
```

## Step 4

Add an event on ``||input:button B pressed||`` to change the ``||variables:rope||`` value by **0.1**.

```blocks
let rope = 2
input.onButtonPressed(Button.B, function () {
    rope += 0.1
})
```

## Step 5

Back in the ``||basic:forever||``, add code to test ``||logic:if||`` the ``||variables:rope||`` is negative
then ``||basic:show||``**A WINS** on the screen.

```blocks
let rope = 2
basic.forever(function() {
    basic.clearScreen();
    led.plot(rope, 2);
    // @highlight
    if (rope < 0) {
        basic.showString("A WINS")
    }
})
```

## Step 6

Add an ``||logic:else if||`` condition to test ``||logic:if||`` the ``||variables:rope||`` is greater than 4
then ``||basic:show||``**B WINS** on the screen.

```blocks
let rope = 2
basic.forever(function() {
    basic.clearScreen();
    led.plot(rope, 2);
    if (rope < 0) {
        basic.showString("A WINS")
    } else if (rope > 4) {
        // @highlight
        basic.showString("B WINS")
    }
})
```

## Step 7

Find a friend and start button smashing!