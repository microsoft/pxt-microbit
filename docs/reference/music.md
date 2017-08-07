# Music

Generation of music tones through pin ``P0``.

```cards
music.playTone(0, 0);
music.ringTone(0);
music.rest(0);
music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once);
music.onEvent(MusicEvent.MelodyNotePlayed, () => {});
music.beat(BeatFraction.Whole);
music.tempo();
music.changeTempoBy(20);
music.setTempo(120);
```

## See Also

[playTone](/reference/music/play-tone), [ringTone](/reference/music/ring-tone), [rest](/reference/music/rest),
[beginMelody](/reference/music/begin-melody), [onEvent](/reference/music/on-event),
[beat](/reference/music/beat), [tempo](/reference/music/tempo), [changeTempoBy](/reference/music/change-tempo-by), [setTempo](/reference/music/set-tempo),
