# Hot Potato

### @explicitHints true
### @diffs true

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
    timer = randint(5, 15)
})
```

## Step 3

Add code to ``||basic:show an icon||`` to indicate that the game has started.

```spy
let timer = 0
input.onButtonPressed(Button.A, function () {
    timer = randint(5, 15)
    basic.showIcon(IconNames.Chessboard)
})
```

## Step 4

Put in a ``||basic:pause||`` to wait the number of seconds set in the variable ``||variables:timer||``. When the ``||basic:pause||`` completes, the game is over.

```spy
let timer = 0
input.onButtonPressed(Button.A, function () {
    timer = randint(5, 15)
    basic.showIcon(IconNames.Chessboard)
    basic.pause(1000 * timer)
})
```

## Step 5

**After** the ``||basic:pause||``, add code to ``||basic:show||`` that the game is over.

```spy
let timer = 0
input.onButtonPressed(Button.A, function () {
    timer = randint(5, 15)
    basic.showIcon(IconNames.Chessboard)
    basic.pause(1000 * timer)
    basic.showIcon(IconNames.Skull)
})
```

## Step 6

You can simplify your code by replacing ``||variables:timer||`` in the ``||basic:pause||`` with a ``||math:random value||`` between ``5`` and ``15``. Now, delete the other lines using the ``||variables:timer||`` variable.

```spy
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Chessboard)
    basic.pause(1000 * randint(5, 15))
    basic.showIcon(IconNames.Skull)
})
```

## Step 7

`|Download|` your code to your @boardname@, tape it to a potato and play the game with your friends!
