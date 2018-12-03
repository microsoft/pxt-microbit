# Change Tempo By

Makes the [tempo](/reference/music/tempo) (speed of a piece of music)
faster or slower by the amount you say.

```sig
music.changeTempoBy(20)
```

## ~ hint

**Simulator**: This function only works on the @boardname@ and in some browsers.

## ~

## Parameters

* ``bpm`` is a [number](/types/number) that says how much to
  change the bpm (beats per minute, or number of beats in a minute of
  the music that the @boardname@ is playing).

## Examples

This program makes the music faster by 12 bpm.

```blocks
music.changeTempoBy(12)
```

This program makes the music _slower_ by 12 bpm.

```blocks
music.changeTempoBy(-12)
```

## See also

[play tone](/reference/music/play-tone), [ring tone](/reference/music/ring-tone) 

