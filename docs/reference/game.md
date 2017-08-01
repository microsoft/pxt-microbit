# Game

Make games with sprites. Keep score and control gameplay. 

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

## Game control

```cards
game.startCountdown(10000);
game.gameOver();
game.pause();
game.resume();
```

### See also

[createSprite](/reference/game/create-sprite), [move](/reference/game/move), [turn](/reference/game/turn),
[ifOnEdgeBounce](/reference/game/if-on-edge-bounce), [get](/reference/game/get), [set](/reference/game/set),
[change](/reference/game/change), [isTouching](/reference/game/touching) [isTouchingEdge](/reference/game/touching-edge),
[addScore](/reference/game/change-score-by), [score](/reference/game/score), [setScore](/reference/game/set-score),
[startCountdown](/reference/game/start-countdown), [gameOver](/reference/game/game-over),
[pause](/reference/game/pause), [resume](/reference/game/resume)
