# Turn

Turn the sprite as much as you say in the direction you say.

```sig
game.createSprite(0, 2).turn(Direction.Right, 45);
```

## Parameters

* **direction**: a choice whether the sprite should turn **left** or **right**
* **degrees**: a [number](/types/number) degrees of angle that the sprite should turn.
A straight left or right turn is 90 degrees.

## Example


This program starts a sprite in the middle of the screen.
Next, the sprite turns toward the lower-right corner.
Finally, it moves two LEDs away to the corner.

```blocks
let item = game.createSprite(2, 2);
item.turn(Direction.Right, 45);
item.move(2);
```

## See also


[move](/reference/game/move),
[create sprite](/reference/game/create-sprite)
