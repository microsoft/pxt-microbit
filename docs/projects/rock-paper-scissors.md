# rock paper scissors

### ~avatar avatar

Build a rock paper scissors game!

### ~

## Step 1: Getting started

We want the @boardname@ to choose rock, paper, or scissors when you shake it.
Try creating an ``on shake`` block so when you shake the @boardname@, it will run part of a program.

```blocks
input.onGesture(Gesture.Shake, () => {
    
})
```

Next, when you shake the @boardname@, it should pick a random number from `0` to `2`
and store it in the variable `weapon`. (This variable is named `weapon` because 
rock, paper, and scissors are the weapons you use to battle your friends!)

Add a ``set`` block with a variable. Then add a ``pick random`` block,
and store the random number in the variable,
like this:

```blocks
input.onGesture(Gesture.Shake, () => {
    let weapon = Math.random(3)
})

```

### ~hint
No one can predict random numbers. That's what makes them great for Rock Paper Scissors!
### ~

Each possible number these blocks can make (`0`, `1`, or `2`) means a different picture.
We will show the right picture for that number on the LED screen.


## Step 2: Picking paper

Put an ``if`` block after the ``let`` block that checks whether
`weapon` is `0`. Make sure the ``if`` block has an ``else if`` part
and an ``else`` part.

Next, add a ``show leds`` block that shows a
picture of a piece of paper:

```blocks
input.onGesture(Gesture.Shake, () => {
    let weapon = Math.random(3)
    if (weapon == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (false) {

    } else {

    }
})
```

## Step 3: A random rock

Now we are going to add a new picture for the @boardname@ to show
when another random number comes up.

Make the ``else if`` part check if the variable `weapon` is `1`.
Then add a ``show leds`` block with a picture of a rock.

```blocks
input.onGesture(Gesture.Shake, () => {
    let weapon = Math.random(3)
    if (weapon == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)

    } else if (weapon == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else {

    }
})
```

## Step 4: Suddenly scissors

Add a ``show leds`` block with a picture of scissors to the ``else`` part:

```blocks
input.onGesture(Gesture.Shake, () => {
    let weapon = Math.random(3)
    if (weapon == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)

    } else if (weapon == 1) {
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

```

### ~hint

You don't need to check if `weapon` is `2` because `2` is the only number left out of `0`, `1`, and `2`.
That's why you can use an ``else`` instead of an ``else if``.

### ~

Your game is ready! Have fun!

## Step 5: Are you the greatest?

Here is a way you can make your Rock Paper Scissors game better.
When button ``A`` is pressed, 
the @boardname@ will add `1` to your score.

Open the ``Game`` drawer, and then add the block ``change score by 1`` to your program,
like this:

```blocks
input.onButtonPressed(Button.A, () => {
    game.addScore(1)
})

```

## Step 6: Prove you're the greatest!

After your @boardname@ can add `1` to the score, show how many wins you have.

```blocks
input.onButtonPressed(Button.A, () => {
    game.addScore(1)
    basic.showString("WINS:")
    basic.showNumber(game.score())
})
```
## Step 7: Staying honest

Success! Your @boardname@ can track wins!
But what about losses? 
Use the ``Game`` drawer to subtract `1` from your score when you press button `B`. 

Here are all the blocks you will need:

```shuffle
input.onButtonPressed(Button.B, () => {
    game.addScore(-1)
    basic.showString("LOSSES:")
    basic.showNumber(game.score())
})
```

## Step 8: Hacking Rock Paper Scissors

How else can you make your game better?
Ever hear of [Rock Paper Scissors Spock Lizard](http://www.samkass.com/theories/RPSSL.html)?

