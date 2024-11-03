# is Sound Playing

Check if sound is playing at any sound output.

```sig
music.isSoundPlaying()
```

### ~ reminder

![works with micro:bit V2 only image](/static/v2/v2-only.png)

This function requires the [micro:bit V2](/device/v2) hardware. If you use this function with a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

Sound is played at the built-in speaker or at the selected audio output pin. You can check if any sound is currently being played at any of these outputs.

## Returns

* a [boolean](/types/boolean) value that is `true` if sound is being played at the built-in speaker or at the audio pin. The value is `false` otherwise.

## Example #example

Stop all sounds if any are currently playing.

```blocks
if (music.isSoundPlaying()) {
    music.stopAllSounds()
}
```

## See also

[set built-in speaker enabled](/reference/music/set-built-in-speaker-enabled),
[set audio pin](/reference/pins/set-audio-pin)

```package
music
```
