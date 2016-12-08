# The amazing coin flipper

### ~avatar avatar

Are you trying to choose whether to play soccer or go to the movies
instead, or which toppings to have on your pizza?  Build a coin
flipping machine with the @boardname@ to choose for you!

### ~

Here are the blocks to make your coin flipper.  When you press button
`B`, the coin flipper will show either `H` for heads or `T` for tails
on the LED screen.

```blocks
input.onButtonPressed(Button.B, () => {
    if (Math.randomBoolean()) {
        basic.showString("H");
    } else {
        basic.showString("T");
    }
});
```
### ~hint

The ``pick random true or false`` block randomly tells the ``if``
block `true` or `false`.  If the ``pick`` block picked `true`, the
``if`` block shows the letter `H`. Otherwise, it shows the letter `T`.

That's it!

### ~

### Keeping score

#### ~avatar

To keep track out of how many guesses you've won,
add these blocks to your coin flipper:

#### ~

Click on the ``+`` button in the toolback and add the **game** package 
to get the game blocks.

```blocks
input.onButtonPressed(Button.A, () => {
    game.addScore(1);
});
input.onButtonPressed(Button.AB, () => {
    basic.showNumber(game.score());
});
```

These blocks mean that if you press button `A`, you will add `1` to
your score, and if you press `A` and `B` together, the @boardname@ will
show your score.

When you're done, your coin flipping program should look like this:

```blocks
input.onButtonPressed(Button.B, () => {
    if (Math.randomBoolean()) {
        basic.showString("H");
    } else {
        basic.showString("T");
    }
});
input.onButtonPressed(Button.A, () => {
    game.addScore(1);
});
input.onButtonPressed(Button.AB, () => {
    basic.showNumber(game.score());
});
```

Flip until your thumbs get tired!

### ~button /getting-started/rock-paper-scissors
NEXT: ROCK PAPER SCISSORS
### ~

```package
game
```
