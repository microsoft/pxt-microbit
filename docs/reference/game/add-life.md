# add Life

Increase the number of lives remaining by some amount.

```sig
game.addLife(0)
```

The life count in the game is increased by the number of lives you say.

## Parameters

* **life**: a [number](/types/number) to remove from the count.

## Example #example

Add `20` more lives to the life count if the player's score reaches `10000` points.

```blocks
let giveLives = true

if (game.score() > 9999) {
    if (giveLives) {
        game.addLife(20)
        giveLives = false
    }
}
```

## See also #seealso

[set life](/reference/game/set-life),
[remove life](/reference/game/remove-life)