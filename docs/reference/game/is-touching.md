# Touching

Find whether the sprite is touching another sprite you say.

Sprites are touching if they share the same LED.

```sig
game.createSprite(0, 2).isTouching(null);
```

## Parameters

* another **sprite** that might be touching the one you are checking.

## Returns

* `true` if the two sprites are touching.

## Example

This program creates two sprites called ``matter`` and ``antimatter``,
and then checks whether they are touching.  If they are, there is an
explosion.

```blocks
let matter = game.createSprite(2, 2);
let antimatter = game.createSprite(2, 2);
if (matter.isTouching(antimatter)) {
    basic.pause(500);
    basic.clearScreen();
    basic.showString("BOOM!");
}
```

## See also

[create sprite](/reference/game/create-sprite),
[is touching edge](/reference/game/is-touching-edge),
[if on edge, bounce](/reference/game/if-on-edge-bounce)
