# Is Deleted

Find out if the sprite is deleted from the game engine or not.

```sig
game.createSprite(0,0).isDeleted()
```

## Returns

* a [boolean](/types/boolean) value that is `true` if the sprite is deleted from the game engine or `false` if not.

## Example

This game has 5 sprites initially. After 1 second, the third sprite is deleted and all remaining sprites are moved by 1.

```blocks
let sprites: game.LedSprite[] = []
for (let i = 0; i <= 4; i++) {
    sprites.push(game.createSprite(0, i))
}
basic.pause(1000)
sprites[2].delete()
for (let sprite of sprites) {
    if (!(sprite.isDeleted())) {
        sprite.move(1)
    }
}
```

## See also

[delete sprite](/reference/game/delete)