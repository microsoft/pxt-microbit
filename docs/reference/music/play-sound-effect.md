# play Sound Effect

Play a sound that is generated from a sound expression.

```sig
music.playSoundEffect("", SoundExpressionPlayMode.UntilDone)
```

This will play a **[Sound](/types/sound)** object created from a sound expression. The sound will play for the duration that was set in the sound expression. The sound can play on the speaker or at a pin that is set for sound output.

You can also play [built-in sound effects](/reference/music/builtin-sound-effect) like `giggle`, `happy`, or `twinkle`.

Your program can wait for the sound to finish before it runs its next step. To do this, set the play mode to `until done`. Otherwise, use `background` for the program to continue immediately after the sound starts.

### ~ reminder

#### Works with micro:bit V2

![works with micro:bit V2 only image](/static/v2/v2-only.png)

This block requires the [micro:bit V2](/device/v2) hardware. If you use this block with a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

## Parameters

* **sound**: a [string](/types/string) that is the sound expression for the sound you want to play.
* **mode**: the play mode for the sound, either `until done` or `background`.

## Examples

### Simple waveform sound

Play the sound effect from a sine wave sound expression for `1` second.

```blocks
music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 2000, 0, 1023, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
```

### Complex waveform sound

Play a `triangle` wave sound effect with `vibrato` and a `curve` interpolation.

```typescript
music.playSoundEffect(music.createSoundEffect(
    WaveShape.Triangle,
    1000,
    2700,
    255,
    255,
    500,
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Curve
    ), SoundExpressionPlayMode.UntilDone)
```

### Built-in sounds

Play the `giggle` [built-in sound effect](/reference/music/builtin-sound-effect) until it finishes.

```blocks
music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.UntilDone)

```

## See also

[create sound effect](/reference/music/create-sound-effect),
[built-in sound effect](/reference/music/builtin-sound-effect),
[set built in speaker enabled](/reference/music/set-built-in-speaker-enabled),
[analog set pitch pin](/reference/pins/analog-set-pitch-pin)
