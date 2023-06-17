# set Mic Gain

Set the sensitivity for the microphone to detect and record sounds.

```sig
record.setMicGain(record.AudioLevels.Low)
```

The microphone will detect sounds at a certain loudness level. You can decide if you want to record only loud sounds or quieter sounds too by setting the microphone gain.

Setting the microphone to `low` sensitivity will make the microphone pick up louder sounds. Setting the microphone to `high` sensitivity will make the microphone pick up all sorts of noise that you might not hear!

## Parameters

* **gain**: the sensitivity level for the microphone to detect and record sounds.
>* `low`: set the gain level to detect only loud sounds.
>* `medium` set the gain level to detect most sounds.
>* `high`: set the gain level to detect quiet and loud sounds.

## Example

Use buttons `A` and `B` to record and play audio. Set the microphone gain to `low` so that only loud sounds are recorded.

```blocks
record.setMicGain(record.AudioLevels.Low)
input.onButtonPressed(Button.A, function () {
    record.startRecording(record.BlockingState.Blocking)
})
input.onButtonPressed(Button.B, function () {
    record.playAudio(record.BlockingState.Blocking)
})
```

## See also

[start recording](/reference/record/start-recording)

```package
audio-recording
```
