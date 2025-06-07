# play

Play a song, melody, tone, or a sound effect from a playable music source.

```sig
music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
```

Music is played for a simple tone, a melody, or a song. Each of these music sources is called a [playable](/types/playable) object. The ``||music:play||`` block can take any of these playable objects and play them as sound output for your game.

### ~ reminder

#### For micro:bit v2 only

![works with micro:bit V2 only image](/static/v2/v2-only.png)

This block requires the [micro:bit V2](/device/v2) hardware. If you use this block with a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

The simplest music source is a **tone**, on note play for a duration of time:

```block
music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
```

Then, there is the **melody** which is a series of notes played at a certain speed, or `tempo`. You can create your own melody of choose a built-in one to play:

```block
music.play(music.stringPlayable("D F E A E A C B ", 120), music.PlaybackMode.UntilDone)
music.play(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.UntilDone)
```

The most complex playable object is a **sound expression**. [Sound expressions](/reference/music/create-sound-expression) are composed in the [Sound Editor](/types/sound#sound-editing) using different parameters for making sound waves and effects..

```block
music.play(music.createSoundExpression(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
```

## Parameters

* **toPlay**: the [playable](/types/playable) object, or music source, to play.
* **playbackMode**: the playback mode for continuing the program:
>* `play until done`: play the music source in **toPlay** but wait to run the next part of the program until music play is done.
>* `in background`: play the music source in **toPlay** but continue with the rest of the program before music play is done.
>* `looping in background`: play the music source in **toPlay** but continue with the rest of the program before music play is done. The music will remain playing, returning to the first note of the music after its duration.

### ~ hint

#### Stop the music!

You can stop any music currently playing with the ``||music:stop all sounds||`` block. This is useful if **playbackMode** is set to `in background looping` and you wish to stop the music for a scene change or respond to an event with a different sound.

### ~

## Examples #example

### Play a melody

Play a short melody created in the Melody Editor.

```blocks
music.play(music.stringPlayable("D F E A E A C B ", 120), music.PlaybackMode.UntilDone)
```

### Different music sources, one block to play them all

Put 4 different playable music sources in an array. Play one after the other.

```blocks
let playables = [
music.tonePlayable(262, music.beat(BeatFraction.Whole)),
music.stringPlayable("D F E A E A C B ", 120),
music.builtInPlayableMelody(Melodies.BaDing),
music.createSoundExpression(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear)
]
for (let someMusic of playables) {
    music.play(someMusic, music.PlaybackMode.UntilDone)
    basic.pause(500)
}
```

### Looping music play

Play a simple song in the background. When the @boardname@ is shaken, stop the song an play the `power down` melody.

```blocks
music.play(music.stringPlayable("C5 A B G A F A C5 ", 120), music.PlaybackMode.LoopingInBackground)
input.onGesture(Gesture.Shake, function () {
    music.stopAllSounds()
    music.play(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
})
```
### Play a sound effect

Play a sine wave sound effect for `5` seconds.

```blocks
music.play(music.createSoundExpression(WaveShape.Sine, 5000, 0, 255, 0, 5000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
```

## See also

[tone playable](/reference/music/tone-playable),
[string playable](/reference/music/string-playable),
[melody playable](/reference/music/built-in-melody-playable),
[create song](/reference/music/create-song),
[stop all sounds](/reference/music/stop-all-sounds),
[sound editor](/reference/types/sound#sound-editing),
[create sound expression](/reference/music/create-sound-expression)