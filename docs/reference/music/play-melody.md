# play Melody

Play a short melody of notes composed in a string.

```sig
music.playMelody("", 120);
```

The melody is short series of notes composed in a string. The melody is played at a rate set by the **tempo** value you give. The melody string contains a sequence of notes formatted like this:

``"E B C5 A B G A F "``

The melody is shown in the ``||music:play melody||`` block as note symbols which also appear in the Melody Editor.

```block
music.playMelody("E B C5 A B G A F ", 120);
```

The melodies are most often created in the Melody Editor from the block so that valid notes are chosen and the correct melody length is set.

## Parameters

* **melody**: a [string](/types/string) which contains the notes of the melody.
* **tempo**: a [number](/types/number) which is the rate to play the melody at in beats per minute.

## Example #example

Play the ``Mystery`` melody continuously.

```blocks
basic.forever(function () {
    music.playMelody("E F G F E G B C5 ", 120)
})
```

## See also #seealso

[set tempo](/reference/music/set-tempo), [play](/reference/music/play), [play until done](/reference/music/play-until-done)
