# sound

A **sound** is a data object that is created from a sound expression. A sound expression is group of parameters that define a sound sound, such as wave shape, sound volume, frequency, and duration.

A sound is generated from an expression based on a fundamental wave shape, or waveform. To make a sound wave, the sound data must change from a high peak to a low trough over a period of time and repeat. The peaks and troughs are the positive amplitudes and negative amplitudes of the wave across the zero line. The volume controls the amplitude of the wave.

When the sound is played on a speaker or headphones, the vibrations create the pressures our ears detect as sound.

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

The noise wave is created using random frequenices and volume. Setting the frequency parameters for the sound expression has no effect on sounds created with the noise wave.

![Noise wave](/static/types/sound/noise-wave.png)

## Duration

The sound has a length of time that it plays for. This is set as a number of milliseconds.

## Volume

The volume controls the loudness (amplitude) of the sound. The sound can start with one volume setting and end with another. It can begin loud and end quiet, or the other way around.

## Frequency

Frequency is how fast a wave cycles from the zero line to its peak down to its trough and back to the zero line. If it does this 1000 times in one second then the frequency has 1000 cycles per second and is measured in units of Hertz (1000 Hz). The frequency of the sound at any point in time is its current _pitch_. Musical notes are different frequecies that last for short periods of time in a sound.

A sound expression has both a starting frequency and an ending frequecy. The frequency can start low and end high, start high and end low, or remain the same for the duration of the sound.

### Effect

Effects add small changes to the waveform but can make a big change in how it sounds to a listener. There are a few effects available to apply to a sound.

* **Tremolo**: add slight changes in volume of the sound expression.
* **Vibrato**: add slight changes in frequency to the sound expression.
* **Warble**: similar to Vibrato but with faster variations in the frequency changes.

### Interpolation

* **Linear**
* **Curve**
* **Logrithmic**
