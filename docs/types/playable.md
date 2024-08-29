# playable

The **playable** data object provides a common format to play tones, melodies, and songs. Each of these music sources are created in different ways but are transformed into playable objects so that a single playback method is used to [play](/refernece/music/play) them.

## Music sources for playable objects

The blocks used to create playable music sources are the following:

### Tone

A tone is a musical note, or a sound frequency, and a duration. The duration is often set as the length of a `beat`.

```block
music.tonePlayable(262, music.beat(BeatFraction.Whole))
```

### Melody

Melodies are a series of notes and a tempo to play them at.

```block
music.stringPlayable("D F E A E A C B ", 120)
```

## Play the music

In your programs, you can simply use the ``||music:play||`` blocks for each playable object. Like this one for tone:

```block
music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
```

## Example

Put 2 different playable music sources in an array. Play one after the other.

```blocks
let playables = [
music.tonePlayable(262, music.beat(BeatFraction.Whole)),
music.stringPlayable("D F E A E A C B ", 120)
]
for (let someMusic of playables) {
    music.play(someMusic, music.PlaybackMode.UntilDone)
    basic.pause(500)
}
```

## See also

[play](/reference/music/play), [tone playable](/reference/music/tone-playable),
[string playable](/reference/music/string-playable)