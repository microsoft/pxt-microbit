# on Sound

Run some code when the microphone hears a sound.

```sig
input.onSound(function () {})
```

The microphone will detect sounds that are quiet or loud. You can have the microphone detect
a sound at a certain level and run some code in and event when it hears the sound. There are
two sound ranges you can detect for: `loud` or `quiet`.

## Parameters

* **sound**: the type of sound to detect: `loud` or `quiet`.
* **handler**: the code to run when a sound is heard.

## Example

Show an icon animation when the microphone detects a sound.

```blocks
input.onSound(DetectedSound.Loud, function () {
    basic.showIcon(IconNames.Square)
    basic.showIcon(IconNames.SmallSquare)
    basic.showIcon(IconNames.SmallDiamond)
    basic.clearScreen()
})
```

# See also #seealso

[sound level](/reference/input/sound-level), [set sound threshold](/reference/input/sound-level)

```package
microphone
```