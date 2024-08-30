# built In Melody

Get a melody string for a built-in melody.

```sig
music.builtInMelody(Melodies.Dadadadum)
```

A collection of built-in melodies are available. You choose one by selecting the name of the melody.

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

* a [string](/types/string) that contains the melody.

## Example

Play the built-in melody for **blues**.

```blocks
music.startMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once)
```

## See also

[start melody](/reference/music/start-melody),
[built-in sound effect](/reference/music/builtin-sound-effect)