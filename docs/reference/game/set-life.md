# set Life

Set the game life count to this amount.

```sig
game.setLife(0)
```

Your program has a life counter which you can set to record the number of lives remaining for a player in your game. If you set the life count to `0` or less, the game ends.

## Parameters

* **value**: a [number](/types/number) to set the life count to.

## Example #example

Set the player life count to `9` lives before starting the game.

```blocks
game.setLife(9)
```

## See also #seealso

[add life](/reference/game/add-life),
[remove life](/reference/game/remove-life)