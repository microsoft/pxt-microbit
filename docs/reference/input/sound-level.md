# sound Level

Find out what the the level of sound heard by the microphone is.

```sig
input.soundLevel()
```

### ~ reminder

![works with micro:bit V2 only image](/static/v2/v2-only.png)

This block requires the [micro:bit V2](/device/v2) hardware. If you use this block with a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

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

[on sound](/reference/input/on-sound), [set sound threshold](/reference/input/set-sound-threshold)

```package
microphone
```