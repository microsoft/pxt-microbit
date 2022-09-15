# Code

Let's add code so that whenever we press or touch the foil chords it will produce sound.

From the [Make](/projects/electric-guitar/make.md) project, we know that whenever user touches the chords, sound will be produced and diffrent chords will produce diffrent sounds.

## Code your electric guitar

Download this code to your micro:bit. It creates the tones that play when you press the foil strips on the guitar.

```blocks
input.onButtonPressed(Button.A, function () {
    F = F / 2
    A = A / 2
    C = C / 2
    E = E / 2
})
input.onPinPressed(TouchPin.P2, function () {
    music.playTone(988, music.beat(BeatFraction.Whole))
    music.playTone(165, music.beat(BeatFraction.Whole))
    music.playTone(932, music.beat(BeatFraction.Whole))
})
input.onButtonPressed(Button.B, function () {
    F = F * 2
    A = A * 2
    C = C * 2
    E = E * 2
})
input.onPinPressed(TouchPin.P1, function () {
    music.playTone(F, music.beat(BeatFraction.Half))
    music.playTone(A, music.beat(BeatFraction.Half))
    music.playTone(C, music.beat(BeatFraction.Half))
})
let E = 0
let C = 0
let A = 0
let F = 0
F = 349
A = 440
C = 523
E = 659
```
