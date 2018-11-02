# Game

Make games with sprites. Keep score and controls gameplay. 

## ~ hint

Once the game engine is started, it will render the sprites to the screen and potentially override any kind of animation you are trying to show.
Using [game pause](/reference/game/pause) and [game resume](/reference/game/resume) to disable and enable the game rendering loop.

## ~

## Sprites

```cards
game.createSprite(0,0);
game.createSprite(0,0).delete();
game.createSprite(0,0).move(0);
game.createSprite(0,0).turn(Direction.Left,0);
game.createSprite(0,0).ifOnEdgeBounce();
game.createSprite(0,0).get(LedSpriteProperty.X);
game.createSprite(0,0).set(LedSpriteProperty.X, 0);
game.createSprite(0,0).change(LedSpriteProperty.X, 0);
game.createSprite(0,0).isTouching(null);
game.createSprite(0,0).isTouchingEdge();
```

## Scoring

```cards
game.addScore(1);
game.score();
game.setScore(0);
```

## Life

```cards
game.setLife(0)
game.addLife(0)
game.removeLife(0)
```

## Game control

```cards
game.startCountdown(10000);
game.gameOver();
game.pause();
game.resume();
```

## See also

[create sprite](/reference/game/create-sprite), [move](/reference/game/move), [turn](/reference/game/turn),
[ifOnEdgeBounce](/reference/game/if-on-edge-bounce), [get](/reference/game/get), [set](/reference/game/set),
[change](/reference/game/change), [is touching](/reference/game/is-touching) [is touching edge](/reference/game/is-touching-edge),
[add score](/reference/game/add-score), [score](/reference/game/score), [set score](/reference/game/set-score),
[set life](/reference/game/set-life), [add life](/reference/game/add-life), [remove life](/reference/game/remove-life),
[start countdown](/reference/game/start-countdown), [game over](/reference/game/game-over),
[pause](/reference/game/pause), [resume](/reference/game/resume)
