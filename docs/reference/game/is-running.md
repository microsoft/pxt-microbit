# is Running

Find out if the game is currently running or not.

```sig
game.isRunning()
```

## Returns

* a [boolean](/types/boolean) value that is `true` if the game is running or `false` if not.

## Example

If the game is currently running, end the game if button **B** is pressed.

```blocks
input.onButtonPressed(Button.B, function () {
	if (game.isRunning()) {
        game.gameOver()
    }
})
```

## See also

[is paused](/reference/game/is-paused),
[is game over](/reference/game/is-game-over)