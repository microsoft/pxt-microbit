# Touching Edge

Find whether the sprite is touching the edge of the [LED screen](/device/screen).

Sprites are touching the edge if they overlap with an LED on the edge
of the screen.

```sig
game.createSprite(0, 2).isTouchingEdge();
```

## Parameters

* a **sprite** that might be touching the edge of the screen.

## Returns

* `true` if the sprite is touching the edge of the screen.

## Example

This program makes a sprite in the middle of the left edge of the LED screen.
Then it says `EDGY!` if it's on the edge (which it is!), and `SAFE!` if it's
not on the edge.

```blocks
let item = game.createSprite(0, 2);
if (item.isTouchingEdge()) {
    basic.showString("EDGY!");
} else {
    basic.showString("SAFE!");
}
```
	
## See also

[create sprite](/reference/game/create-sprite),
[is touching](/reference/game/is-touching),
[if on edge, bounce](/reference/game/if-on-edge-bounce)
