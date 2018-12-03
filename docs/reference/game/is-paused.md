# is Paused

Find out if the game is paused or not.

```sig
game.isPaused()
```

## Returns

* a [boolean](/types/boolean) value that is `true` if the game is paused or `false` if not.

## Example

Resume the game if it's paused and button **B** is pressed.

```blocks
input.onButtonPressed(Button.B, function () {
	if (game.isPaused()) {
        game.resume()
    }
})
```

## See also

[is running](/reference/game/is-running),
[is game over](/reference/game/is-game-over)