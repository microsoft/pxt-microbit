# get (Sprite Property)

Get a value for a [sprite](/reference/game/create-sprite) property.

```sig
game.createSprite(0,0).get(LedSpriteProperty.X);
```

## Parameters

* **property**: the property of the **Sprite** you want to know about, like:
>* ``x`` - the horizontal location to set the sprite at on the LED screen (`0`-`4`)
>* ``y`` - the vertical location to set the sprite at on the LED screen (`0`-`4`)
>* ``direction`` - the direction in degrees for the sprite to go when the next [move](/reference/game/move) happens. The degree range is from `-180` to `180`.
>* ``brightness`` - how bright the LED sprite is. Completely dark is `0` and very bright is `255`.
>* ``blink`` - how fast the sprite is will blink on and off. The blink rate is in milliseconds.

## Returns

* a [number](/types/number) value of the property you asked for.

## Example

This program makes a sprite and shows the number of its brightness on the screen. 

```blocks
let ball = game.createSprite(0, 2);
basic.showNumber(ball.get(LedSpriteProperty.Brightness));
```

## See also

[turn](/reference/game/turn),
[brightness](/reference/led/brightness),
[change sprite property](/reference/game/change),
[set sprite property](/reference/game/set)

