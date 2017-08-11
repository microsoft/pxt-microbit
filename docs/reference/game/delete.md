# delete

Delete a sprite from the game.

```sig
let item: game.LedSprite = null;
item.delete();
```

### Parameters

* the **sprite** you want to delete from the game

### Example

This program makes a sprite and shows the number of its brightness on the screen. Then, it deletes the sprite. 

```blocks
let ball = game.createSprite(0, 2);
basic.showNumber(ball.get(LedSpriteProperty.Brightness));
ball.delete();
```

### See also

[create sprite](/reference/game/create-sprite)
