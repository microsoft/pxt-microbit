# game of chance challenges

Coding challenges for the answering machine tutorial. 

## Before we get started

Complete the [game of chance](/lessons/game-of-chance/activity) activity and your code will look like this:

```blocks
basic.showString("SELECT A BUTTON")
```


## Challenge 1

Now we need to to play the game of chance by responding to the message. We want to respond `YOU WIN` when button `A` is pressed. Add a condition for button `A` and inside it show the string `YOU WIN`.


```blocks
basic.showString("SELECT A BUTTON")
input.onButtonPressed(Button.A, () => {
    basic.showString("YOU WIN")
})

```

* `Run` the code to see if it works as expected.

## Challenge 2

What if @boardname@'s answer to the question is GAME OVER? Let's have `GAME OVER` be displayed when button `B` is pressed. Add a condition for button `B` and inside it show the `GAME OVER`.

```blocks
basic.showString("SELECT A BUTTON")
input.onButtonPressed(Button.A, () => {
    basic.showString("YOU WIN")
})
input.onButtonPressed(Button.B, () => {
    game.gameOver()
})
```

* `Run` the code to see if it works as expected.

## Challenge 3

When you are asked a yes or no question, do you always say yes or no? Add a condition for `on shake` that displays `TRY AGAIN`.

