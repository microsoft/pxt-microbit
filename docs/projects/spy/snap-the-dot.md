# Snap the Dot

### @explicitHints true

## Introduction @unplugged

Snap the dot is a game of skill where the player has to press **A** exactly when the dot reaches the center of the screen.

This tutorial shows how to use the game engine.

## Make a sprite variable

Create a new variable called ``||variables:sprite||``.

```spy
let sprite = 0
```

## Create a sprite

Set the ``||variables:sprite||`` variable to the value returned by ``||game:create sprite||``. A sprite is a single pixel that can move on the screen. It has an ``x`` and ``y`` position along with a direction of motion. Use the value
of `2` for both ``x`` and ``y``.

```spy
let sprite = game.createSprite(2, 2)
```

## Move the dot

The sprite starts in the center facing right. Put a ``||game:sprite move||`` into a ``||basic:forever||`` loop to make the sprite by `1` pixel. Notice how it moves to the right but does not bounce back.

```spy
let sprite = game.createSprite(2, 2)
basic.forever(function () {
    sprite.move(1)
})
```

## Bounce

Set ``||game:if on edge, bounce||`` to make the sprite bounce on the side of the screen. Also, add a ``||basic:pause||`` for `100` milliseconds to slow down the sprite.

```spy
let sprite = game.createSprite(2, 2)
basic.forever(function () {
    sprite.move(1)
    sprite.ifOnEdgeBounce()
    basic.pause(100)
})
```

## Test and download

Use the simulator to find the best speed. If you have a @boardname@, press ``|Download|`` to try it out on the device.

## Button handling

When **A** is pressed, we test if the sprite is in the center or not.

Use a ``||input:on button pressed||`` event to run code when the **A** button is presses. In the event,
check ``||logic:if||`` the  ``||game:led sprite property x||`` is equal to `2`.

```spy
let sprite = game.createSprite(2, 2)
input.onButtonPressed(Button.A, function () {
    if (sprite.get(LedSpriteProperty.X) == 2) {
    } else {
    }
})
basic.forever(function () {
    sprite.move(1)
    basic.pause(100)
    sprite.ifOnEdgeBounce()
})
```

## Score and game over

Finally, ``||game:add to score||`` by `1` when ``||game:led sprite property x||`` is `2` and then make the
``||game:game over||`` when it's not `2`. This is to handle both success (sprite in the center = 2) and failure (sprite not in the center != 2).

```spy
let sprite = game.createSprite(2, 2)
input.onButtonPressed(Button.A, function () {
    if (sprite.get(LedSpriteProperty.X) == 2) {
        game.addScore(1)
    } else {
        game.gameOver()
    }
})
basic.forever(function () {
    sprite.move(1)
    basic.pause(100)
    sprite.ifOnEdgeBounce()
})
```

## Test and download

Your game is ready! If you have a @boardname@, press ``|Download|`` to try it out on the device.
