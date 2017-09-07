# game counter activity

Have you ever tried to create a game counter? The concept is fairly simply: increase the game `score` with `on button pressed` .

Let's start by adding `on button (A) pressed` will run each time the user presses A. Let's add a line of code that increments `score` by `1`.

```blocks
input.onButtonPressed(Button.A, () => {
    game.addScore(1);
});
```


Let's add a `add points to score` block to keep track of the current count. Since the count will change with the `add points to score` blocks, add a game block `score` to display the count on screen.



```blocks
input.onButtonPressed(Button.A, () => {
    game.addScore(1);
    basic.showNumber(game.score())
});
```



## ~avatar boothing

Excellent, you're ready to continue with the [challenges](/lessons/game-counter/challenges)!

## ~

