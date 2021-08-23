# set (Sprite Property)

Set a value for a [sprite](/reference/game/create-sprite) property.

```sig
game.createSprite(0,0).set(LedSpriteProperty.X, 0);
```

## Parameters

* **property**: the property of the **Sprite** you want to store a value for, like:
>* ``x`` - the horizontal location to set the sprite at on the LED screen (`0`-`4`)
>* ``y`` - the vertical location to set the sprite at on the LED screen (`0`-`4`)
>* ``direction`` - the direction in degrees for the sprite to go when the next [move](/reference/game/move) happens. The degree range is from `-180` to `180`.
>* ``brightness`` - how bright the LED sprite is. Completely dark is `0` and very bright is `255`.
>* ``blink`` - how fast the sprite is will blink on and off. The blink rate is in milliseconds.

* **value**: the a [number](/types/number) value to set for the property.

## Example

Make an LED sprite move to random locations on the screen. Use button **A** to freeze and unfreeze the sprite while it's moving. When the sprite is frozen, it will blink and dim to half brightness.

```blocks
input.onButtonPressed(Button.A, function () {
    if (freeze) {
        sprite.set(LedSpriteProperty.Brightness, 255)
        sprite.set(LedSpriteProperty.Blink, 0)
    } else {
        sprite.set(LedSpriteProperty.Brightness, 128)
        sprite.set(LedSpriteProperty.Blink, 200)
    }
    freeze = !(freeze)
})
let freeze = false
let sprite: game.LedSprite = null
sprite = game.createSprite(0, 0)
basic.forever(function () {
    if (!(freeze)) {
        sprite.set(LedSpriteProperty.X, randint(0, 4))
        sprite.set(LedSpriteProperty.Y, randint(0, 4))
    }
    basic.pause(500)
})
```

## See also

[turn](/reference/game/turn),
[brightness](/reference/led/brightness),
[change sprite property](/reference/game/change),
[get sprite property](/reference/game/get)
