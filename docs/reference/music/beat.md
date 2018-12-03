# Beat

Returns the duration of a beat in milli-seconds

```sig
music.beat(BeatFraction.Whole)
```

## ~ hint

**Simulator**: This function only works on the @boardname@ and in some browsers.

## ~

## Parameters

* ``BeatFraction`` means fraction of a beat (BeatFraction.Whole, BeatFraction.Sixteenth etc) 

## Returns

* a [number](/types/number) that means the amount of milli-seconds a beat fraction represents.


## Example

```blocks
music.playTone(Note.C, music.beat(BeatFraction.Quarter))
```

## See also

[play tone](/reference/music/play-tone), [ring tone](/reference/music/ring-tone), [rest](/reference/music/rest), [set tempo](/reference/music/set-tempo), [change tempo by](/reference/music/change-tempo-by)