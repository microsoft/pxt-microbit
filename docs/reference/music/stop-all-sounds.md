# stop All Sounds

Stop all the sounds that are playing right now and any others waiting to play.

```sig
music.stopAllSounds()
```

If you play sounds or sound effects more than once, the sounds you asked to play later have to wait until the sounds played earlier finish. You can stop the sound that is playing now and all the sounds waiting to play with ``||music:stop all sounds||``.

## #simnote

### ~hint

#### Simulator

``||music:stop all sounds||`` works on the @boardname@. It might not work in the simulator on every browser.

### ~

## Example #example

Play a tone but stop it right away.

```blocks
let freq = music.noteFrequency(Note.C);
music.playTone(freq, 1000)
music.stopAllSounds()
```

## See also #seealso

[play melody](/reference/music/play-melody), [play](/reference/music/play),
[play tone](/reference/music/play-tone)
