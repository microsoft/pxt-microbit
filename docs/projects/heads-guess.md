# Heads Guess!

## Introduction @unplugged

This is a small remake of the famous **Heads Up!** game. The player holds the @boardname@ on the forehead and has 30 seconds to guess words displayed on the screen.
If the guess is correct, the player tilts the @boardname@ forward; to pass the player tilts it backwards.

## Step 1

Add code to ``||game:start a countdown||`` of 30 seconds.

```blocks
game.startCountdown(30000)
```

## Step 2

Create a ``||arrays:text list||`` of words to guess. You will find **Arrays** under **Advanced**.

```blocks
game.startCountdown(30000)
let text_list: string[] = []
text_list = ["PUPPY", "CLOCK", "NIGHT", "CAT", "COW"]
```

## Step 3

Add an event to run code when the @boardname@ ``||input:logo||`` is pointing ``||input:up||``.
This is the gesture to get a new word.

```blocks
input.onGesture(Gesture.LogoUp, function () {
})
```

## Step 4

The item in ``||arrays:text list||`` are numbered ``0`` to ``length - 1``. 
Add code to pick a ``||math:random||`` ``||variables:index||``.

```blocks
let text_list: string[] = []
let index = 0
input.onGesture(Gesture.LogoUp, function () {
    // @highlight
    index = Math.randomRange(0, text_list.length - 1)
    basic.showString(text_list[index])
})
```

## Step 5

Add code to ``||basic:show||`` the value stored at ``||variables:index||`` in  ``||arrays:text list||``.

```blocks
let text_list: string[] = []
let index = 0
input.onGesture(Gesture.LogoUp, function () {
    index = Math.randomRange(0, text_list.length - 1)
    // @highlight
    basic.showString(text_list[index])
})
```

## Step 6

Add an event to run code when the @boardname@ ``||input:screen||`` is pointing ``||input:down||``.
This is the gesture for a successful guess.

```blocks
input.onGesture(Gesture.ScreenDown, function () {
})
```

## Step 7

Add code to add points to the ``||game:score||``.

```blocks
input.onGesture(Gesture.ScreenDown, function () {
    // @highlight
    game.addScore(1)
})
```

## Step 8

Add an event to run code when the @boardname@ ``||input:screen||`` is pointing ``||input:up||``.
This is the gesture for a pass.

```blocks
input.onGesture(Gesture.ScreenUp, function () {
})
```

## Step 9

Add code to remove a ``||game:life||`` from the player.

```blocks
input.onGesture(Gesture.ScreenUp, function () {
    // @highlight
    game.removeLife(1)
})
```
