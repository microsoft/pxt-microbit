# rock paper scissors book version

My script. #docs

Welcome! This guide will show you how to complete the challenges for the game of rock, paper, scissors!

## Challenge 1

### Step 16

Awesome! You have just created your game of rock paper scissors. However, why don't we add a little more to it? We can keep track of your score against the @boardname@ using global variables. Create a global variable to keep track of the wins against the @boardname@. To do so, click on `add new`, then `Data`, and then `Number`.

```
var wins: number = 0
```

### Step 17

At the beginning of the game, you don't have any wins against the @boardname@. As a result, let's set the `data->wins` variable to 0 at the top of your main function.

```
wins = 0 // ***
input.onGesture(Gesture.Shake, () => {
    let img = images.createImage(`
. . . . . # # # # # . . . . #
. # # # . # . . . # # # . # .
. # # # . # . . . # . # # . .
. # # # . # . . . # # # . # .
. . . . . # # # # # . . . . #
`)
    let offset = 5 * Math.random(3)
    img.showImage(offset)
})
```

### Step 18

Now let's keep track of wins by using button `A`. Every time button `A` is pressed, we want to increment `data->wins` by 1. We can begin by adding a condition `input->on button pressed("A")`.

```
wins = 0
input.onGesture(Gesture.Shake, () => {
    let img1 = images.createImage(`
. . . . . # # # # # . . . . #
. # # # . # . . . # # # . # .
. # # # . # . . . # . # # . .
. # # # . # . . . # # # . # .
. . . . . # # # # # . . . . #
`)
    let offset1 = 5 * Math.random(3)
    img1.showImage(offset1)
})
input.onButtonPressed(Button.A, () => {
}) // ***
```

### Step 19

Nice! Now that we added the condition for when button `A` is pressed, we can increment `data->wins` by 1. Add the following statement in the condition.

```
wins = 0
input.onGesture(Gesture.Shake, () => {
    let img2 = images.createImage(`
. . . . . # # # # # . . . . #
. # # # . # . . . # # # . # .
. # # # . # . . . # . # # . .
. # # # . # . . . # # # . # .
. . . . . # # # # # . . . . #
`)
    let offset2 = 5 * Math.random(3)
    img2.showImage(offset2)
})
input.onButtonPressed(Button.A, () => {
    wins = wins + 1 // ***
})
```

### Step 20

You have tracked the number of wins you have against the @boardname@. However, how will you ever know how many wins you have? After we increment `data->wins`, let's display the total number of wins you have.

```
wins = 0
input.onGesture(Gesture.Shake, () => {
    let img3 = images.createImage(`
. . . . . # # # # # . . . . #
. # # # . # . . . # # # . # .
. # # # . # . . . # . # # . .
. # # # . # . . . # # # . # .
. . . . . # # # # # . . . . #
`)
    let offset3 = 5 * Math.random(3)
    img3.showImage(offset3)
})
input.onButtonPressed(Button.A, () => {
    wins = wins + 1
    basic.showString("WINS:", 150) // ***
    basic.showNumber(wins, 150) // ***
})
```

* Tap `run` to run the program on the simulator. Notice the number of wins you have against the @boardname@.

## Challenge 2

### Step 21

You have managed to keep score of the number of wins you have against the @boardname@. However, what about losses? Let's begin by creating another global variable to keep track of losses.

```
var losses: number = 0
```

### Step 22

Add a condition for when button `B` is pressed. When this occurs, we will increment your losses against the @boardname@ by 1. Let's hope that this button will not be pressed too often!

```
wins = 0
input.onGesture(Gesture.Shake, () => {
    let img4 = images.createImage(`
. . . . . # # # # # . . . . #
. # # # . # . . . # # # . # .
. # # # . # . . . # . # # . .
. # # # . # . . . # # # . # .
. . . . . # # # # # . . . . #
`)
    let offset4 = 5 * Math.random(3)
    img4.showImage(offset4)
})
input.onButtonPressed(Button.A, () => {
    wins = wins + 1
    basic.showString("WINS:", 150)
    basic.showNumber(wins, 150)
})
input.onButtonPressed(Button.B, () => {
}) // ***
```

### Step 23

Now let's continue where we left off. Just as we did for `data->wins` when button `A` is pressed, we need to increment `losses` by 1 when button `B` is pressed.

```
wins = 0
input.onGesture(Gesture.Shake, () => {
    let img5 = images.createImage(`
. . . . . # # # # # . . . . #
. # # # . # . . . # # # . # .
. # # # . # . . . # . # # . .
. # # # . # . . . # # # . # .
. . . . . # # # # # . . . . #
`)
    let offset5 = 5 * Math.random(3)
    img5.showImage(offset5)
})
input.onButtonPressed(Button.A, () => {
    wins = wins + 1
    basic.showString("WINS:", 150)
    basic.showNumber(wins, 150)
})
input.onButtonPressed(Button.B, () => {
    losses = losses + 1 // ***
})
```

### Step 24

Let's also display the score when button `B` is pressed, just as we have done for button `A`. This will help us keep track of the number of wins and losses you have against the @boardname@.

```
wins = 0
input.onGesture(Gesture.Shake, () => {
    let img6 = images.createImage(`
. . . . . # # # # # . . . . #
. # # # . # . . . # # # . # .
. # # # . # . . . # . # # . .
. # # # . # . . . # # # . # .
. . . . . # # # # # . . . . #
`)
    let offset6 = 5 * Math.random(3)
    img6.showImage(offset6)
})
input.onButtonPressed(Button.A, () => {
    wins = wins + 1
    basic.showString("WINS:", 150)
    basic.showNumber(wins, 150)
})
input.onButtonPressed(Button.B, () => {
    losses = losses + 1
    basic.showString("WINS", 150) // ***
    basic.showNumber(wins, 150) // ***
    basic.showString("LOSSES:", 150) // ***
    basic.showNumber(losses, 150) // ***
})
```

### Step 25

You have managed to keep track of both the wins and losses you have against the @boardname@! But did you notice that you haven't updated something? Take a look at condition of `input->on button pressed("A")`.

```
wins = 0
input.onGesture(Gesture.Shake, () => {
    let img7 = images.createImage(`
. . . . . # # # # # . . . . #
. # # # . # . . . # # # . # .
. # # # . # . . . # . # # . .
. # # # . # . . . # # # . # .
. . . . . # # # # # . . . . #
`)
    let offset7 = 5 * Math.random(3)
    img7.showImage(offset7)
})
input.onButtonPressed(Button.A, () => {
    wins = wins + 1
    basic.showString("WINS:", 150)
    basic.showNumber(wins, 150)
    basic.showString("LOSSES:", 150) // ***
    basic.showNumber(losses, 150) // ***
})
input.onButtonPressed(Button.B, () => {
    losses = losses + 1
    basic.showString("WINS", 150)
    basic.showNumber(wins, 150)
    basic.showString("LOSSES:", 150)
    basic.showNumber(losses, 150)
})
```

* Tap the `run` button to run your game on the simulator. See if you can get more wins than the @boardname@ can!

Congratulations! You have successfully created a fully functional game of rock, paper, scissors against the @boardname@. Challenge your friends to see who can get a better score against the @boardname@.

