# set Audio Pin Enabled

Enable a pin on the edge connector to output audio.

```sig
pins.setAudioPinEnabled(false)
```

You can enable the @boardname@ to output audio to a pin on the edge connector. 

### ~ hint

#### micro:bit V2 speaker

With the [micro:bit V2](/device/v2) hardware, the built-in speaker will play (mirror) the same tones and music sent to the audio pin.

### ~

## Parameters

* **enabled**: audio is output to a pin is enabled if `true`, disabled if `false`.

## Example

Enable audio output to a pin on the edge connector and play a tone for the "A4" note at pin **P0** for 1 second.

```blocks
pins.setAudioPinEnabled(false)
pins.setAudioPin(AnalogPin.P0)
let frequency = 440
let duration = 1000
pins.analogPitch(frequency, duration)
```

## See also

[@boardname@ pins](/device/pins), [set audio pin](/reference/pins/set-audio-pin),
[analog set pitch pin](/reference/pins/analog-set-pitch-pin)
