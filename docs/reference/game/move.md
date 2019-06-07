# Move

Move the sprite the number of LEDs you say.

```sig
game.createSprite(0, 2).move(1);
```

## Parameters

* **leds**: a [number](/types/number) that means how many LEDs the sprite should move.

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

[turn](/reference/game/turn),
[create sprite](/reference/game/create-sprite)
