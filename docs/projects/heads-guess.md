# Heads Guess!

## {Introduction @unplugged}

This is a simple remake of the famous **Heads Up!** game. The player holds the @boardname@ on the forehead and has 30 seconds to guess words displayed on the screen.
If the guess is correct, the player tilts the @boardname@ forward; to pass, the player tilts it backwards.

## {Step 1}

Put in code to ``||game:start a countdown||`` of 30 seconds.

```blocks
game.startCountdown(30000)
```

## {Step 2}

Create a new array of words to guess and name it ``||arrays:wordList||``. You will find **Arrays** under **Advanced**.

```blocks
let wordList: string[] = []
wordList = ["PUPPY", "CLOCK", "NIGHT"]
game.startCountdown(30000)
```

## {Step 3}

Add an event to run code when the @boardname@ ``||input:logo||`` is pointing ``||input:up||``.
This is the gesture to get a new word.

```blocks
input.onGesture(Gesture.LogoUp, function () {
})
```

## {Step 4}

The items in ``||arrays:wordList||`` are numbered ``0`` to ``length - 1``.
Add code to pick a ``||math:random||`` ``||variables:index||``.

```blocks
let wordList: string[] = []
let index = 0
input.onGesture(Gesture.LogoUp, function () {
    // @highlight
    index = randint(0, wordList.length - 1)
})
```

## {Step 5}

Add code to ``||basic:show||`` the value of the item stored at ``||variables:index||`` in  ``||arrays:wordList||``.

```blocks
let wordList: string[] = []
let index = 0
input.onGesture(Gesture.LogoUp, function () {
    index = randint(0, wordList.length - 1)
    // @highlight
    basic.showString(wordList[index])
})
```

## {Step 6}

Use an event to run code when the @boardname@ ``||input:screen||`` is pointing ``||input:down||``.
This is the gesture for a correct guess.

```blocks
input.onGesture(Gesture.ScreenDown, function () {
})
```

## {Step 7}

Put in code to add points to the ``||game:score||``.

```blocks
input.onGesture(Gesture.ScreenDown, function () {
    // @highlight
    game.addScore(1)
})
```

## {Step 8}

Add another event to run code when the @boardname@ ``||input:screen||`` is pointing ``||input:up||``.
This is the gesture for a pass.

```blocks
input.onGesture(Gesture.ScreenUp, function () {
})
```

## {Step 9}

For the pass gesture, add code to remove a ``||game:life||`` from the player.

```blocks
input.onGesture(Gesture.ScreenUp, function () {
    // @highlight
    game.removeLife(1)
})
```
