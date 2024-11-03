# built In Playable Melody

Get a playable sound object for a built-in melody.

```sig
music.builtInPlayableMelody(Melodies.Dadadadum)
```

A collection of built-in melodies are available as [playable](/types/playable) sound objects. You choose one by selecting the name of the melody.

## Parameters

* **melody**: A melody name. The available melodies are:

>* `dadadum`
>* `entertainer`
>* `prelude`
>* `ode`
>* `nyan`
>* `ringtone`
>* `funk`
>* `blues`
>* `birthday`
>* `wedding`
>* `funeral`
>* `punchline`
>* `baddy`
>* `chase`
>* `ba ding`
>* `wawawawaa`
>* `jump up`
>* `jump down`
>* `power up`
>* `power down`

## Returns

* a [playable](/types/playable) object that contains the melody.

## Example

Play the built-in melody for **blues**.

```blocks
music.play(music.builtInPlayableMelody(Melodies.Blues), music.PlaybackMode.InBackground)
```

## See also

[built-in sound effect](/reference/music/builtin-sound-effect)