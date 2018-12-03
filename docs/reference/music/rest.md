# Rest

Rest (play no sound) through pin `PO` for the amount of time you say.

```sig
music.rest(400)
```

### ~ hint

**Simulator**: This function only works on the @boardname@ and in some browsers.

## ~

## Parameters

* ``ms`` is a [number](/types/number) saying how many
  milliseconds the @boardname@ should rest. One second is 1000
  milliseconds.

## Example

```blocks
let frequency = music.noteFrequency(Note.C)
music.playTone(frequency, 1000)
music.rest(1000)
```

## See also

[play tone](/reference/music/play-tone), [ring tone](/reference/music/ring-tone) , [tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)

