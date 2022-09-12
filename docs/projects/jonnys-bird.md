# Jonny's Bird

```blocks
let currfreq = 0
let lastfreq = 0
basic.forever(function () {
    currfreq = Math.map(input.acceleration(Dimension.X), -1024, 1023, 1, 5000)
    soundExpression.playSoundEffect(soundExpression.createSoundEffect(
    WaveShape.Sine,
    Math.map(input.acceleration(Dimension.X), -1024, 1023, 1, 5000),
    Math.map(input.acceleration(Dimension.Y), -1024, 1023, 1, 5000),
    randint(0, 1024),
    randint(0, 1024),
    randint(40, 100),
    SoundExpressionEffect.Vibrato,
    InterpolationCurve.Curve
    ))
    lastfreq = currfreq
})
```

