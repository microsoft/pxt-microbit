# stop Melody

Stop playing a musical melody.

```sig
music.stopMelody(MelodyStopOptions.All)
```

Melodies are played either in the _foreground_ or _background_. This allows more than one melody to be active at once. If a melody is set to play in the background, it can be interrupeted, or paused, temporarily while a melody set for the foreground is played. If the foreground melody is not set to play ``forever``, then the background melody resumes when the foreground melody is finished.

When a melody begins, it has an option set for how the melody is to play. The melody plays just one time, ``once``, or it will keep repeating, ``forever``. With these options the melody will play in the foreground either once or continue to repeat. Of course, if you set ``forever``, any melody that was started in background will never play unless you stop the foreground melody.

You can stop either a ``foreground`` melody, a ``background`` melody, or ``all`` melodies.

## ~ hint

**Simulator**: This function only works on the @boardname@ and in some browsers.

## ~

## Parameters

* **options**: specify which melodies (foreground, background or both) to stop:
>* ``all``: stop all melodies
>* ``foreground``: stop the foreground melody
>* ``background``: stop the background melody

## Example

Play the ``Entertainer`` built-in melody and then stop it after 5 seconds.

```blocks
music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Forever)
basic.pause(5000)
music.stopMelody(MelodyStopOptions.All)
```

## See also

[start melody](/reference/music/begin-melody)
