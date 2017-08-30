# Get Sprite Property

Find something out about a [sprite](/reference/game/create-sprite).

```sig
let item: game.LedSprite = null;
item.get(LedSpriteProperty.X);
```

## Parameters

* the **sprite** you want to know something about
* the kind of [number](/types/number) you want to know about the sprite, like
    * ``x``, how far up or down the sprite is on the screen (`0`-`4`)
    * ``y``, how far left or right the sprite is on the screen (`0`-`4`)
    * ``direction``, which way the sprite is pointing (this works the same way as the [turn](/reference/game/turn) function)
    * ``brightness``, how bright the LED sprite is (this works the same way as the [brightness](/reference/led/brightness) function)
    * ``blink``, how fast the sprite is blinking (the bigger the number is, the faster the sprite is blinking)

## Returns

The [number](/types/number) you asked for.

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

