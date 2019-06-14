# get (Sprite Property)

Find something out about a [sprite](/reference/game/create-sprite).

```sig
game.createSprite(0,0).get(LedSpriteProperty.X);
```

## Parameters

* **property**: the property of the **Sprite** you want to know about, like:
>* ``x`` - how far up or down the sprite is on the screen (`0`-`4`)
>* ``y`` - how far left or right the sprite is on the screen (`0`-`4`)
>* ``direction`` - which way the sprite is pointing (this works the same way as the [turn](/reference/game/turn) function)
>* ``brightness`` - how bright the LED sprite is (this works the same way as the [brightness](/reference/led/brightness) function)
>* ``blink`` - how fast the sprite is blinking (the bigger the number is, the faster the sprite is blinking)

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

