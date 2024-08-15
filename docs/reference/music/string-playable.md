# string Playable

Created a short melody of notes composed in a string.

```sig
music.stringPlayable("D F E A E A C B ", 120)
```

The **melody** is short series of notes composed in a string. The melody is played at a rate set by the **tempo** value you give. The melody string contains a sequence of notes formatted like this:

``"E B C5 A B G A F "``

The melody is shown in the ``||music:melody||`` block as note symbols which also appear in the Melody Editor.

```block
music.stringPlayable("E F G F E G B C5 ", 120)
```

The melodies are most often created in the Melody Editor from the block so that valid notes are chosen and the correct melody length is set.

## Parameters

* **melody**: a [string](/types/string) which contains the notes of the melody.
* **tempo**: a [number](/types/number) which is the rate to play the melody at in beats per minute.

## Returns

* a [playable](/types/playable) object that contains the **melody** and **tempo**.

## Example

Play the ``Mystery`` melody continuously.

```blocks
music.play(music.stringPlayable("E F G F E G B C5 ", 120), music.PlaybackMode.LoopingInBackground)
```

## See also

[tone playable](/reference/music/tone-playable)