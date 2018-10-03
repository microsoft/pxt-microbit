# game counter challenges

Coding challenges for the game counter. 

## Before we get started

Complete the following [activity](/lessons/game-counter/activity) . Your code should look like this:

```blocks
input.onButtonPressed(Button.A, () => {
    game.addScore(1);
    basic.showNumber(game.score())
});
```

## Challenge 1

Let's add the code to `score` when `B` is pressed. Add an event handler with `on button (B) pressed` then add the code to `score`.


```blocks
input.onButtonPressed(Button.A, () => {
    game.addScore(1);
    basic.showNumber(game.score())
});

input.onButtonPressed(Button.B, () => {
    game.addScore(-1);
    basic.showNumber(game.score())
});
```


## Challenge 2

Now let's try to reset the counter when the @boardname@ is shaken. You will need to register an event handler with `on shake`.

