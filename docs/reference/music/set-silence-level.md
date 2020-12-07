# set Silence Level

Set the level for audio pin output during periods of silence.

```sig
music.setSilenceLevel(1000)
```

### ~ reminder

![works with micro:bit V2 only image](/static/v2/v2-only.png)

This function requires the [micro:bit V2](/device/v2) hardware. If you use this function with a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

Normally the output signal level at the audio pin is `0` when no sounds are playing. This is the silence level and it stays constant since actual tones have varying levels over a period of time. Some devices (headphones, external speakers, etc.) which are sensitive to slight signal changes might play sounds from signal noise encountered along the connection between the audio pin and the audio device. 

To reduce the effect of this signal noise it can be helpful to set an constant signal level for silence that is greater than `0`.

## Parameters

* **level**: a [number](/types/number) between `0` and `1024` to use as the silence level for the audio pin output when no sounds are playing. The default level is `0`.

## Example #example

Set silence level to `512` for the current audio pin.

```typescript
pins.setAudioPin(AnalogPin.P1)
music.setSilenceLevel(512)
```

## See also

[volume](/reference/music/volume), [set audio pin](/reference/pins/set-audio-pin)

```package
music
```
