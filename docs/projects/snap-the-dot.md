# Snap the dot

## Introduction @unplugged

Snap the dot is a kill game where the player has to press **A** exactly when the dot
is in the center of the screen.

This is a tutorial to learn how to use the game engine.

## Create a sprite @fullscreen

Drag a ``||game:create sprite||`` block in the workspace. A sprite is a single pixel that can move on the screen. It has a ``x``, ``y`` position and a direction.

```blocks
let sprite: game.LedSprite = null
sprite = game.createSprite(2, 2)
```

## Move the dot @fullscreen

The sprite starts in the center facing right. Drag a
``||game:move||`` block in the forever to make it move.
Notice how it moves to the right but does not bounce back.

```blocks
let sprite: game.LedSprite = null
sprite = game.createSprite(2, 2)
basic.forever(function () {
    sprite.move(1)
})
```

## Bounce @fullscreen

Drag a ``||game:ifOnEdgeBounce||`` block to make the sprite
bounce on the side of the screen. Add also a ``||basic:pause||`` block to slow down the sprite.

```blocks
let sprite: game.LedSprite = null
sprite = game.createSprite(2, 2)
basic.forever(function () {
    sprite.move(1)
    sprite.ifOnEdgeBounce()
    basic.pause(100)
})
```

## Test and download

Use the simulator to find the best speed. If you have a @boardname@, press ``Download``
to try it out on the device.

## Button handling @fullscreen

When **A** is pressed, we test if the sprite is in the center or not.

Drag a ``||input:on button pressed||`` block to handle the **A** button.
Drag a ``||logic:if||`` block and test if ``||game:x||`` is equal to 2.

```blocks
let sprite: game.LedSprite = null
input.onButtonPressed(Button.A, function () {
    if (sprite.get(LedSpriteProperty.X) == 2) {
    } else {
    }
})
sprite = game.createSprite(2, 2)
basic.forever(function () {
    sprite.move(1)
    basic.pause(100)
    sprite.ifOnEdgeBounce()
})
```
 ## Score and game over

Drag a ``||game:add score||`` and a ``||game:game over||`` block to handle success
(sprite in the center) and failure (sprite not in the center)

 ```blocks
let sprite: game.LedSprite = null
input.onButtonPressed(Button.A, function () {
    if (sprite.get(LedSpriteProperty.X) == 2) {
        game.addScore(1)
    } else {
        game.gameOver()
    }
})
sprite = game.createSprite(2, 2)
basic.forever(function () {
    sprite.move(1)
    basic.pause(100)
    sprite.ifOnEdgeBounce()
})
```

## Test and download

Your game is ready! Use the simulator to find the best speed. If you have a @boardname@, press ``Download`` to try it out on the device.
