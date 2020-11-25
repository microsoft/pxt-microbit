# set Audio Pin

Set the [pin](/device/pins) (P0, P1, P2) that is used to play music and generate tones.

```sig
pins.setAudioPin(AnalogPin.P0)
```

### ~ hint

#### micro:bit V2 speaker

With the [micro:bit V2](/device/v2) hardware, the built-in speaker will play (mirror) the same tones and music sent to the audio pin.

### ~

## Parameters

* **name**: the pin to set for audio output: `P0`, `P1`, or `P2`.

## Example

Play a tone for the "A4" note at pin **P0** for 1 second.

```blocks
pins.setAudioPin(AnalogPin.P0)
let frequency = 440
let duration = 1000
pins.analogPitch(frequency, duration)
```

## See also

[@boardname@ pins](/device/pins), [analog set pitch pin](/reference/pins/analog-set-pitch-pin)
