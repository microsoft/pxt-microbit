# Score

Find the number of points scored in your game.

```sig
game.score()
```

## Example

This program adds one point to your score every time you press button
`A`, and shows an animation.  Then it waits 500 milliseconds (half a
second) and shows your score.

```blocks
input.onButtonPressed(Button.A, () => {
    game.addScore(1);
    basic.pause(500);
    basic.showNumber(game.score());
	});
```

## See Also

[change score by](/reference/game/score), [start countdown](/reference/game/start-countdown)
