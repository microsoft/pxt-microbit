# sound Level

Find out what the the level of sound heard by microphone is.

```sig
input.soundLevel()
```

## Returns

* a ``number`` between `0` (low sound) and `255` (loud sound) which tells how loud the sounds are that the microphone hears.

## Example

Show a checkerboard icon while the sound level is greater than `100`.

```blocks
basic.forever(function () {
    if (input.soundLevel() > 100) {
        basic.showIcon(IconNames.Chessboard)
    } else {
        basic.clearScreen()
    }
})
```

## See also

[on sound](/reference/input/on-sound), [set sound threshold](/reference/input/sound-level)

```package
microphone
```