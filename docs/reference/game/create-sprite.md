# Create Sprite

Create a new LED sprite pointing to the right.

A sprite is like a little LED creature you can tell what to do.
You can tell it to move, turn, and check whether it has bumped
into another sprite.

```sig
game.createSprite(2, 2);
```

## Parameters

* ``x``: The left-to-right place on the LED screen where the sprite will start out.
* ``y``: The top-to-bottom place on the LED screen where the sprite will start out.

`0` and `4` mean the edges of the screen, and `2` means in the middle.

## ~ hint

Once the game engine is started, it will render the sprites to the screen and potentially override any kind of animation you are trying to show.
Using [game pause](/reference/game/pause) and [game resume](/reference/game/resume) to disable and enable the game rendering loop.

## ~

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
[turn](/reference/game/turn),
[is-touching](/reference/game/is-touching)

