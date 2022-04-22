# create Sound Effect

Create a sound effect from a sound expression.

```sig
soundExpression.createSoundEffect(WaveShape.Sine, 2000, 0, 1023, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear)
```

A sound expression is set of parameters that describe a **[Sound](/types/sound)** that will last for some amount of time. These parameters specify a base waveform, frequency range, sound volume, and effects. Sound data is created as a [Sound](/types/sound) object and can then be [played](/reference/music/play-sound-effect) to the speaker, headphones, or at an output pin.

## Parameters

* **waveShape**: the primary shape of the waveform:
>* `sine`: sine wave shape
>* `sawtooth`: sawtooth wave shape
>* `triangle`: triangle wave shape
>* `square`: square wave shape
>* `noise`: random noise generated wave shape
* **startFrequency**: a [number](/types/number) that is the frequency of the waveform when the sound expression starts.
* **endFrequency**: a [number](/types/number) the freqeunce of the waveform when the sound expression stops.
* **startVolume**: a [number](/types/number) the initial volume of the sound expression.
* **endVolume**: a [number](/types/number) the ending volume of the sound expression.
* **duration**: a [number](/types/number) the duration in milliseconds of the sound expression.
* **effect**: an effect to add to the waveform. These are:
>* `tremolo`: add slight changes in volume of the sound expression.
>* `vibrato`: add slight changes in frequency to the sound expression.
>* `warble`: similar to `vibrato` but with faster variations in the frequency changes.
* **interpolation**: controls the rate of frequency change in the sound expression.
>* `linear`: the change in frequency is constant for the duration of the sound.
>* `curve`: the change in freequency is faster at the beginning of the sound and slows toward the end.
>* `logrithmic`: the change in frequency is rapid during the very first part of the sound.

## Returns

* a [sound](/types/sound) expression with the the desired sound effect parameters.

## Example

Create a sound from a sound expression and assign it to a variable. Play the sound after it's created.

```blocks
let mySound: soundExpression.Sound = null
mySound = soundExpression.createSoundEffect(WaveShape.Sine, 2000, 0, 1023, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear)
soundExpression.playSoundEffect(mySound)
```

## See also

[play sound effect](/reference/music/play-sound-effect)