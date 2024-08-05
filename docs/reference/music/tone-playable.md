# tone Playable

Create a musical tone that will play for some amount of time.

```sig
music.tonePlayable(262, music.beat(BeatFraction.Whole))
```

## Parameters

* **note**: is the note frequency as a [number](/types/number) of [Hertz](https://wikipedia.org/wiki/Hertz) (how high or low the tone is, also known as _pitch_). If **note** is less or equal to zero, no sound is played.
* **duration**: is the [number](/types/number) of milliseconds (one-thousandth of a second) that the tone lasts for. If **duration** is negative or zero, the sound will play continuously.

## Returns

* a [playable](/types/playable) object that contains the tone.

## Example

Store the musical note 'C' in the variable `note` and play that note for 1000 milliseconds (one second).

```blocks
let note = music.noteFrequency(Note.C);
music.play(music.tonePlayable(note, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
```

## See also

[string playable](/reference/music/string-playable)