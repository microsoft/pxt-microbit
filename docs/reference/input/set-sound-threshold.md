# set Sound Threshold

Tell how loud it should be for your board to detect a loud sound.

```sig
input.setSoundThreshold(SoundThreshold.Loud, 0)
```

When the microphone hears a sound, it sets a number for how loud the sound was at that moment.
This number is the sound level and has a value from `0` (low sound) to `255` (loud sound). You can use
a sound level number as a _threshold_ (just the right amount of sound) to make the
[on sound](/reference/input/on-sound) event happen. To set a threshold, you choose the type of sound
to detect, `loud` or `quiet`, and then the sound level for that type.

### ~ reminder

![works with micro:bit V2 only image](/static/v2/v2-only.png)

This block requires the [micro:bit V2](/device/v2) hardware. If you use this block with a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

## Parameters

* **sound**: the type of sound to dectect: `loud` or `quiet`.
* **threshold**: the sound level [number](/types/number) which makes a sound event happen.

## Example #example

Show an icon animation when the microphone detects a sound louder than a sound level of `200`.

```blocks
input.setSoundThreshold(SoundThreshold.Loud, 200)
input.onSound(DetectedSound.Loud, function () {
    basic.showIcon(IconNames.Square)
    basic.showIcon(IconNames.SmallSquare)
    basic.showIcon(IconNames.SmallDiamond)
    basic.clearScreen()
})
```

# See also #seealso

[on sound](/reference/input/on-sound), [sound level](/reference/input/sound-level)

```package
microphone
```