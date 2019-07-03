# set (Sprite Property)

Make a [sprite](/reference/game/create-sprite) store the kind of [number](/types/number) you say.

```sig
game.createSprite(0,0).set(LedSpriteProperty.X, 0);
```

## Parameters

* **property**: the property of the **Sprite** you want to store a value for, like:
>* ``x`` - how far up or down the sprite is on the screen (`0`-`4`)
>* ``y`` - how far left or right the sprite is on the screen (`0`-`4`)
>* ``direction`` - which way the sprite is pointing (this works the same way as the [turn](/reference/game/turn) function)
>* ``brightness`` - how bright the LED sprite is (this works the same way as the [brightness](/reference/led/brightness) function)
>* ``blink`` - how fast the sprite is blinking (the bigger the number is, the faster the sprite is blinking)

## Example

This program makes a sprite on the left side of the screen,
waits two seconds (2000 milliseconds),
and then moves it to the right side of the screen.

```blocks
let ball = game.createSprite(0, 2);
basic.pause(2000);
ball.set(LedSpriteProperty.X, 4);
```

## See also

[turn](/reference/game/turn),
[brightness](/reference/led/brightness),
[change sprite property](/reference/game/change),
[get sprite property](/reference/game/get)
