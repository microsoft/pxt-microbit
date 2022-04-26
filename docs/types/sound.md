# Sound

A **Sound** is a data object that is created from a sound expression. A sound expression is group of parameters that define a sound, such as wave shape, sound volume, frequency, and duration.

A sound is generated from an expression based on a fundamental wave shape, or waveform. To make a sound wave, the sound data must change from a high peak to a low trough over a period of time and repeat. The peaks and troughs are the positive amplitudes and negative amplitudes of the wave across the zero line. The volume controls the amplitude of the wave.

When the sound is played on a speaker or headphones, the vibrations create the pressures our ears detect as sound.

### ~ hint

#### Sounds and Sound Expressions

In code, a **Sound** type is a complex data object that includes data for all the elements that represent a sound. This includes information about the frequencies and volumes at various points in time for the duration of the sound. A **SoundExpression** is another data type that helps create a **Sound**. It has the elements of how to make the sound. Many of them you specify when you edit a sound.

Code for creating and playing a sound from a sound expression could look like this:

```typescript-ignore
let mySound = music.createSoundEffect(WaveShape.Sine, 2000, 0, 1023, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear)
music.playSoundEffect(mySound, SoundExpressionPlayMode.UntilDone)
```

### ~

## Sound Editing

When you click on the waveform in the ``||music:play sound||`` block, the sound editor will display. The sound editor defines the sound expression parameter with choices for the **waveform**, sound **duration** time, **frequency** range, **volume** range, **effect**, and **interpolation**.

![Sound Editor](/static/types/sound/sound-editor.png)

Both the frequency and volume can start and end with different values across the duration of the sound.

## Wave shape

The wave shape is chosen to create a natural sound or a synthetic sound. Some wave shapes can also serve to generate signals when played to a pin instead of a speaker or headphones.

### Sine wave

The waveform that matches natural sound is the sine wave. This is the wave type in music and voice.

![Sine wave](/static/types/sound/sine-wave.png)

### Sawtooth wave

A sawtooth wave has a vertical rising edge and a linear falling edge. It's shape looks like the teeth on a saw.

![Sawtooth wave](/static/types/sound/sawtooth-wave.png)

### Triangle wave

The triangle wave is has symmetrical a rising and a falling edge. It makes the shape of triangles in the waveform.

![Triangle wave](/static/types/sound/triangle-wave.png)

### Square wave

A square wave has both verical rising and falling edges with a flat section on the top and bottom. The flat sections match the volume set for the sound. Square waves are sometimes used to represent digital data and will make an "electronic" sound.

![Square wave](/static/types/sound/square-wave.png)

### Noise wave

The noise wave is created using random frequenices and volume. Setting the frequency parameters for the sound expression creates a "tuning" range for the noise sound effect.

![Noise wave](/static/types/sound/noise-wave.png)

## Duration

The sound has a length of time that it plays for. This is set as a number of milliseconds (**ms**).

## Volume

The volume controls the loudness (amplitude) of the sound. The sound can start with one volume setting and end with another. It can begin loud and end quiet, or the other way around. The volume control has start and end points that can be adjusted higher and lower. Grab them and move them up or down.

### High to low

![Volume from high to low](/static/types/sound/volume-hilo.png)

### Low to High

![Volume from low to high](/static/types/sound/volume-lohi.png)

### Constant volume

![Constant volume](/static/types/sound/volume-constant.png)

## Frequency

Frequency is how fast a wave repeats itself from the zero line to its peak down to its trough and back to the zero line. If it does this 1000 times in one second then the frequency has 1000 cycles per second and is measured in units of Hertz (1000 Hz). The frequency of the sound at any point in time is its current _pitch_. Musical notes and parts of speech are different frequecies that last for short periods of time in a sound.

A sound expression has both a starting frequency and an ending frequecy. The frequency can start low and end high, start high and end low, or remain the same for the duration of the sound.

### High to low

![Frequency from high to low](/static/types/sound/freq-hilo.png)

### Low to High

![Frequency from low to high](/static/types/sound/freq-lohi.png)

### Effect

Effects add small changes to the waveform but can make a big change in how it sounds to a listener. There are a few effects available to apply to a sound.

* **Tremolo**: add slight changes in volume of the sound expression.

>![Tremolo effect setting](/static/types/sound/effect-tremolo.png)

* **Vibrato**: add slight changes in frequency to the sound expression.

>![Vibrato effect setting](/static/types/sound/effect-vibrato.png)

* **Warble**: similar to Vibrato but with faster variations in the frequency changes.

>![Warble effect setting](/static/types/sound/effect-warble.png)

### Interpolation

Interpolation is how the sound expression will make the changes in frequency or volume of the sound. These changes can occur at a constant rate along duration of the sound or more suddenly at the beginning.

* **Linear**: The change in frequency is constant for the duration of the sound.

>![Frequency from low to high](/static/types/sound/interp-linear.png)

* **Curve**: The change in frequency is faster at the beginning of the sound and slows toward the end.

>![Frequency from low to high](/static/types/sound/interp-curve.png)

* **Logarithmic**: The change in frequency is rapid during the very first part of the sound.


>![Frequency from low to high](/static/types/sound/interp-log.png)

## See also

[play sound effect](/reference/music/play-sound-effect),
[create sound effect](/reference/music/create-sound-effect)