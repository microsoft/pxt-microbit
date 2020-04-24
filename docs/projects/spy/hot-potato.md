# Hot Potato

### @explicitHints true

## Introduction @unplugged

In this game, you will start a timer with a random countdown of a number of seconds. When the timer is off, the game is over and whoever is holding the potato has lost!
Watch the tutorial on the [MakeCode YouTube channel](https://youtu.be/xLEy1B_gWKY).

## Step 1

Add an event to run code when ``||input:button A is pressed||``.

```spy
input.onButtonPressed(Button.A, function () {

})
```

## Step 2

Make a variable named ``||variables:timer||`` and set it to a ``||math:random value||``
between ``5`` and ``15``.

The value of ``||variables:timer||`` represents the number of seconds left before someone
is caught holding the potato.

```spy
let timer = 0
input.onButtonPressed(Button.A, function () {
    // @highlight
    timer = Math.randomRange(5, 15)
})
```

## Step 3

Add code to ``||basic:show an icon||`` to indicate that the game has started.

```spy
let timer = 0
input.onButtonPressed(Button.A, function () {
    timer = Math.randomRange(5, 15)
    // @highlight
    basic.showIcon(IconNames.Chessboard)
})
```

## Step 4

Put in a ``||loops:while||`` loop to repeat code while the value in ``||variables:timer||`` is
greater than `0`. When `timer` value becomes `0` or less, the game is over.


```spy
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

Inside the ``||loops:while||`` loop, add code to ``||variables:decrease||`` the timer
``||basic:every second||``.

```spy
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

```spy
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

`|Download|` your code to your @boardname@, tape it to a potato and play the game with your friends!
