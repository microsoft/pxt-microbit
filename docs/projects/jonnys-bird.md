# Jonny's Bird

The ``||music:play sound||`` block lets you create and play complex sounds beyond the simple sequence of tones in a melody. You can choose a sound waveform, change its frequency or volume, and add custom effects. Here's a program you can code to create fun bird sounds when you shake or tilt the @boardname@!

## Use acceleration to set frequency

The acceleration in the `X`and `Y` dimensions are used to set the frequencies of the sound. Make two variables named ``||variables:currFreq||`` and ``||variables:lastFreq||``. One variable will hold the value for the current freqency as an input of accleration in the `X` direction. The other will remember the previous frequency value.

Get a ``||loops:forever||`` block and pull the ``||variables:set currFreq||`` and ``||variables:set lastFreq||`` blocks into it. Change the value for ``||variables:set lastFreq||`` from `0` to ``||variables:currFreq||``.

```blocks
let currfreq = 0
let lastfreq = 0
basic.forever(function () {
    currfreq = 0
    lastfreq = currfreq
})
```

Pull a ``||math:map from to||`` block into the value slot of the ``||variables:set currFreq||``. Use ``||input:acceleration (mg) x||`` as the mapping value, set the `from` value range as `-1024` and `1023`. Set the `to` value range as `0` and `5000`.

```blocks
let currfreq = 0
let lastfreq = 0
basic.forever(function () {
    currfreq = Math.map(input.acceleration(Dimension.X), -1024, 1023, 1, 5000)
    lastfreq = currfreq
})
```

Go get a ``||music:play sound until done||`` block and place it in between the ``||variables:set currFreq||`` and ``||variables:set lastFreq||``.

```blocks
let currFreq = 0
let lastFreq = 0
basic.forever(function () {
    currFreq = Math.map(input.acceleration(Dimension.X), -1024, 1023, 0, 5000)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    lastFreq = currFreq
})
```

Expand the sound effect parameters in ``||music:play sound until done||`` by clicking the **(+)** symbol. Duplicate **2** ``||math:map from to||`` blocks from ``||variables:set currFreq||`` and place one in the `start frequency` value and the other in the `end frequency` value. Change the acceleration direction in the `end frequency` value to the `y` direction.

```blocks
let currFreq = 0
let lastFreq = 0
basic.forever(function () {
    currFreq = Math.map(input.acceleration(Dimension.X), -1024, 1023, 0, 5000)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sine,
        Math.map(input.acceleration(Dimension.X), -1024, 1023, 0, 5000),
        Math.map(input.acceleration(Dimension.Y), -1024, 1023, 0, 5000),
        255,
        0,
        500,
        SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    lastFreq = currFreq
})
```

## Add duration and volume

Click the **(+)** symbol again on the sound effect block inside of ``||music:play sound until done||``. This will show the volume parameters.

Pull out **3** ``||math:pick random||`` blocks and put them in for the values of `duration`, `start volume`, and `end volume`. For `duration`, use a range of `40` to `100`. For both `start volume` and `end volume`, use a random range of `0` to `1024`. 

```blocks
let currFreq = 0
let lastFreq = 0
basic.forever(function () {
    currFreq = Math.map(input.acceleration(Dimension.X), -1024, 1023, 0, 5000)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sine,
        Math.map(input.acceleration(Dimension.X), -1024, 1023, 0, 5000),
        Math.map(input.acceleration(Dimension.Y), -1024, 1023, 0, 5000),
        randint(0, 1024),
        randint(0, 1024),
        randint(40, 100),
        SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    lastFreq = currFreq
})
```

## Set the effects

Once again, click the **(+)** symbol again on the sound effect block inside of ``||music:play sound until done||``. The effects parameters will appear. Change the setting for `effect` to `vibrato` and change `interpolation` to `curve`.


```blocks
let currfreq = 0
let lastfreq = 0
basic.forever(function () {
    currfreq = Math.map(input.acceleration(Dimension.X), -1024, 1023, 1, 5000)
    music.playSoundEffect(music.createSoundEffect(
    WaveShape.Sine,
    Math.map(input.acceleration(Dimension.X), -1024, 1023, 1, 5000),
    Math.map(input.acceleration(Dimension.Y), -1024, 1023, 1, 5000),
    randint(0, 1024),
    randint(0, 1024),
    randint(40, 100),
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Curve
    ), 
    SoundExpressionPlayMode.UntilDone)
    lastfreq = currfreq
})
```

## Birds are singing!

Transfer you program to the @boardname@, shake and tilt it. The birds are singing!