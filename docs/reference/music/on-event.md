# On Event

Raises events for melodies or music events.

```sig
music.onEvent(MusicEvent.MelodyNotePlayed, () => {})
```

## Parameters

* ``value`` the kind of event
* ``handler`` the code to run when the event is raised.

## Example

This example prints all the events to the serial output.

```blocks
music.onEvent(MusicEvent.MelodyRepeated, () => {
    serial.writeLine("melody repeated")
})
music.onEvent(MusicEvent.MelodyEnded, () => {
    serial.writeLine("melody ended")
})
music.onEvent(MusicEvent.MelodyStarted, () => {
    serial.writeLine("melody started")
})
music.onEvent(MusicEvent.MelodyRepeated, () => {
    serial.writeLine("background melody repeated")
})
music.onEvent(MusicEvent.BackgroundMelodyStarted, () => {
    serial.writeLine("background started")
})
music.onEvent(MusicEvent.BackgroundMelodyEnded, () => {
    serial.writeLine("background ended")
})
music.onEvent(MusicEvent.BackgroundMelodyPaused, () => {
    serial.writeLine("background paused")
})
music.onEvent(MusicEvent.BackgroundMelodyResumed, () => {
    serial.writeLine("background resumed")
})
music.onEvent(MusicEvent.BackgroundMelodyRepeated, () => {
    serial.writeLine("background repeated")
})
input.onButtonPressed(Button.A, () => {
    music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
})
music.setTempo(100)
music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.ForeverInBackground)
```
