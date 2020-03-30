# Hot Potato

## Introduction @unplugged

Throw the @boardname@ around before the timer goes off!

https://youtu.be/xLEy1B_gWKY

## Step 1

Add an event to run code when ``||input:button A is pressed||``.

```blocks
input.onButtonPressed(Button.A, function () {
})
```

## Step 2

Make a ``||variables:timer||`` variable and ``||variables:set||`` it to 
a ``||math:random value||`` between ``5`` and ``15``.

The value of ``||variables:timer||`` represents the number of seconds left before the potato sets off.

```blocks
let timer = 0
input.onButtonPressed(Button.A, function () {
    // @highlight
    timer = Math.randomRange(5, 15)
})
```

## Step 3

Add code to ``||basic:show||`` that the game started.

```blocks
let timer = 0
input.onButtonPressed(Button.A, function () {
    timer = Math.randomRange(5, 15)
    // @highlight
    basic.showIcon(IconNames.Chessboard)
})
```

## Step 4

Add a loop to repeat code ``||loops:while||``  ``||variables:timer||`` ``||logic:is positive||``. When `timer` is negative, the game is over.


```blocks
let timer = 0
input.onButtonPressed(Button.A, function () {
    timer = Math.randomRange(5, 15)
    basic.showIcon(IconNames.Chessboard)
    // @highlight
    while (timer > 0) {
    }
})
```

## Step 5

Add code in the ``||loops:while||`` loop to ``||variables:decrease||`` the timer ``||basic:every second||``.

```blocks
let timer = 0
input.onButtonPressed(Button.A, function () {
    timer = Math.randomRange(5, 15)
    basic.showIcon(IconNames.Chessboard)
    while (timer > 0) {
        // @highlight
        timer += -1
        // @highlight
        basic.pause(1000)
    }
})
```

## Step 5

**After** the ``||loops:while||`` loop is done, add code to ``||basic:show||`` that the game is over.

```blocks
let timer = 0
input.onButtonPressed(Button.A, function () {
    timer = Math.randomRange(5, 15)
    basic.showIcon(IconNames.Chessboard)
    while (timer > 0) {
        timer += -1
        basic.pause(1000)
    }
    // @highlight
    basic.showIcon(IconNames.Skull)
})
```

## Step 6

`|Download|` your code to your @boardname@, tape it to a potato and play with your friends!