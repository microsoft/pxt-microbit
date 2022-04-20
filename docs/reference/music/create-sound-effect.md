# create Sound Effect

Create a sound effect from a sound expression.

```block
soundExpression.createSoundEffect(WaveShape.Sine, 2000, 0, 1023, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear)
```

A sound expression is 

## Parameters

* **waveShape**: the primary shape of the waveform:
>* `sine`: sine wave shape
>* `sawtooth`: 
>* `triangle`
>* `square`
>* `noise`
* **startFrequency**: a [number](/types/number) that is the frequency of the waveform when the sound expression starts.
* **endFrequency**: a [number](/types/number) the freqeunce of the waveform when the sound expression stops.
* **startVolume**: a [number](/types/number) the initial volume of the sound expression.
* **endVolume**: a [number](/types/number) the ending volume of the sound expression.
* **duration**: a [number](/types/number) the duration in milliseconds of the sound expression.
* **effect**: an effect to add to the waveform. These are:
>* `tremolo`: add slight changes in volume of the sound expression
>* `vibrato`: add slight changes in frequency to the sound expression
>* `warble`: similar to `vibrato` but with faster variations in the frequency changes.
* **interpolation**: controls the rate of frequency change in the sound expression.
>* `linear`: the change in frequency is constant for the duration of the sound.
>* `curve`: the change in freequency is faster at the beginning of the sound and slows toward the end
>* `logrithmic`: the change in frequency is rapid during the very first part of the sound.

## Returns

* a [sound](/types/sound) expression with the the desired sound effect parameters.

## See also

[play sound effect](/reference/music/play-sound-effect)
