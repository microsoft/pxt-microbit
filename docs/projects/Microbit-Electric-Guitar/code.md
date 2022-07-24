
# Code

Let's add code so that whenever we press or touch the foil chords it will produce sound.

From the **[Electric-Guitar](/projects/Microbit-Electric-Guitar)** project, we know that whenever user touches the chords, sound will be produced and diffrent chords will produce diffrent sounds.


When you touch pin 1 or pin 2 and GND it will play a broken chord, but now you can move the chord down an octave (lowering its pitch) by pressing button A and move it up an octave (raising its pitch) by pressing button B.

The pitch (frequency) of a note doubles when you move up one octave: middle A has a frequency of 440Hz (440 vibrations per second), high A has a frequency of 880Hz. This is why making the vibrating part of guitar strings different lengths with your fingers changes the pitch of the note being played.


Code

```
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

Here's a video showing the the final project
[
https://youtu.be/7eC_VjH1eP0](https://youtu.be/Yocsl_80YsY)
