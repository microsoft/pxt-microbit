# remove Life

Decrease the number of lives remaining by some amount.

```sig
game.removeLife(0)
```

The life count in the game is decreased by the number of lives you say. If the life count reaches `0` when these lives are removed, then the game is over.

## Parameters

* **life**: a [number](/types/number) to remove from the count.

## Example #example

Take away `20` lives count if the player's score reaches `10000` points.

```blocks
let giveLives = true

if (game.score() > 9999) {
    if (giveLives) {
        game.removeLife(20)
        giveLives = false
    }
}
```

## See also #seealso

[set life](/reference/game/set-life),
[add life](/reference/game/add-life)