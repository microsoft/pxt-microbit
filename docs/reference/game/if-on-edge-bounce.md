# If On Edge, Bounce

Make a [sprite](/reference/game/create-sprite) on the edge of the
[LED screen](/device/screen) bounce away.

```sig
let item = game.createSprite(0, 2);
item.ifOnEdgeBounce();
```

## Parameters

* a **sprite** that might be on the edge of the LED screen.

## Example

This program makes a sprite on the right edge of the screen with a
direction of 90 degrees, and bounces it so it has a direction of -90
degrees -- exactly the opposite direction.

```blocks
let ball = game.createSprite(4, 2);
basic.showNumber(ball.get(LedSpriteProperty.Direction));
input.onButtonPressed(Button.B, () => {
    ball.ifOnEdgeBounce();
    basic.showNumber(ball.get(LedSpriteProperty.Direction));
});
```

## See also

[create sprite](/reference/game/create-sprite),
[is touching](/reference/game/is-touching),
[is touching edge](/reference/game/is-touching-edge)
