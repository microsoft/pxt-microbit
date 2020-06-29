# Music

Generation of music tones through pin ``P0``.

```cards
music.playTone(0, 0)
music.ringTone(0)
music.rest(0)
music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
music.stopMelody(MelodyStopOptions.All)
music.onEvent(MusicEvent.MelodyNotePlayed, () => {})
music.beat(BeatFraction.Whole)
music.tempo()
music.changeTempoBy(20)
music.setTempo(120)
music.setVolume(0)
music.volume()
```

## See Also

[playTone](/reference/music/play-tone), [ringTone](/reference/music/ring-tone),
[rest](/reference/music/rest), [startMelody](/reference/music/start-melody),
[stopMelody](/reference/music/stop-melody), [onEvent](/reference/music/on-event),
[beat](/reference/music/beat), [tempo](/reference/music/tempo),
[changeTempoBy](/reference/music/change-tempo-by), [setTempo](/reference/music/set-tempo),
[setVolume](/reference/music/set-volume), [volume](/reference/music/volume)
