# note Frequency

Get the frequency of a musical note.

```sig
music.noteFrequency(Note.C)
```

## Parameters

* ``name`` is the name of the **Note** you want a frequency value for.

## Returns

* a [number](/types/number) that is the frequency (in [Hertz](https://wikipedia.org/wiki/Hertz))
of a note you chose.

## Example #example

Play a 'C' note for one second, rest for one second, and then play an 'A' note for one second.

```blocks
music.playTone(music.noteFrequency(Note.C), 1000)
music.rest(1000)
music.playTone(music.noteFrequency(Note.A), 1000)
```
## See also #seealso

[play tone](/reference/music/play-tone), [ring tone](/reference/music/ring-tone),
[rest](/reference/music/rest), [tempo](/reference/music/tempo),
[change tempo by](/reference/music/change-tempo-by)
