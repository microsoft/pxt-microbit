# change (Sprite Property)

Change a value for a [sprite](/reference/game/create-sprite) property by some amount.

```sig
game.createSprite(0,0).change(LedSpriteProperty.X, 0);
```

The value of a sprite propery is changed by using either a positive or negative number. Giving `1` will increase a property value by `1` and giving a `-1` will decrease it by `1`.

## Parameters

* **property**: the property of the **Sprite** you want to change, like:
>* ``x`` - the change in horizontal location to set the sprite at on the LED screen (`0`-`4`)
>* ``y`` - the change vertical location to set the sprite at on the LED screen (`0`-`4`)
>* ``direction`` - the change of direction in degrees for the sprite to go when the next [move](/reference/game/move) happens. Direction degree range is from `-180` to `180`.
>* ``brightness`` - the change in brightness for the LED sprite. Completely dark is `0` and very bright is `255`.
>* ``blink`` - the change in how fast the sprite is will blink on and off. The blink rate is in milliseconds.

* **value**: a [number](/types/number) value that is the amount of change for the property.

## Example

This program makes a sprite on the left side of the screen,
waits two seconds (2000 milliseconds),
and then moves it to the middle of the screen.

```blocks
let ball = game.createSprite(0, 2);
basic.pause(2000);
ball.change(LedSpriteProperty.X, 2);
```

## See also

[turn](/reference/game/turn),
[brightness](/reference/led/brightness),
[get sprite property](/reference/game/get),
[set sprite property](/reference/game/set)
