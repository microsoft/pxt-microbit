# Snap the Dot

## Introduction @unplugged

Snap the dot is a game of skill where the player has to press **A** exactly when the dot reaches the center of the screen.

This tutorial shows how to use the game engine.

## Create a sprite @fullscreen

Drag a ``||game:create sprite||`` block onto the workspace. A sprite is a single pixel that can move on the screen. It has an ``x`` and ``y`` position along with a direction of motion.

```blocks
let sprite: game.LedSprite = null
sprite = game.createSprite(2, 2)
```

## Move the dot @fullscreen

The sprite starts in the center facing right. Put a ``||game:move||`` block into the ``||basic:forever||`` to make it move. Notice how it moves to the right but does not bounce back.

```blocks
let sprite: game.LedSprite = null
sprite = game.createSprite(2, 2)
basic.forever(function () {
    sprite.move(1)
})
```

## Bounce @fullscreen

Grab a ``||game:if on edge, bounce||`` block to make the sprite bounce on the side of the screen. Also, add a ``||basic:pause||`` block to slow down the sprite.

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

Use the simulator to find the best speed. If you have a @boardname@, press ``|Download|`` to try it out on the device.

## Button handling @fullscreen

When **A** is pressed, we test if the sprite is in the center or not.

Use a ``||input:on button pressed||`` block to handle the **A** button. Put in a ``||logic:if||`` block and test if ``||game:x||`` is equal to `2`.

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

Finally, pull out an ``||game:add score||`` and a ``||game:game over||`` block to handle both success (sprite in the center) and failure (sprite not in the center).

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

Your game is ready! If you have a @boardname@, press ``|Download|`` to try it out on the device.
