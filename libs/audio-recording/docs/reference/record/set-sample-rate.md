# set Sample Rate

Set the sample rate for audio recording and playback.

```sig
record.setSampleRate(11000)
```

While recording, the sample rate determines how many audio "samples", or moments in time, of sound are recorded each second. If the sample rate is set to `1000`, then only 1000 moments of sound are recorded during a second. The higher the sample rate, the closer to the actual natural sound the playback will be. However, if a high sample rate is used, the audio buffer will have less duration of time for sound because more samples are used per second.

When playing back, the sample rate sets the speed at which the sound is taken from the audio buffer and sent to the speaker or sound output pin. If the audio in the buffer was recorded at `11000` samples per second but the current sample rate is set at `22000`, the playback of the audio is twice as fast as it was recorded and it will sound different. The sound will play slower that the recorded sound if the playback sample rate is set to `550` before playing the audio back.

## Parameters

* **hz**: the [number](/types/number) of samples per second for recording or playback.
* **scope**: an optional operation scope for the sample rate.
>* `everything`: (default) set the same sample rate for both recording and playback.
>* `playback`: set the sample rate only for audio playback.
> * `recording`: set the sample rate only for audio recording.

## Example

Record audio at `22000` samples per second but play it back at `11000` samples per second.

```blocks
record.setSampleRate(22000, record.AudioSampleRateScope.Recording)
record.setSampleRate(11000, record.AudioSampleRateScope.Playback)
input.onButtonPressed(Button.A, function () {
    record.startRecording(record.BlockingState.Blocking)
})
input.onButtonPressed(Button.B, function () {
    record.playAudio(record.BlockingState.Blocking)
})
```

## See also

[start recording](/reference/record/start-recording),
[play audio](/reference/record/play-audio)

```package
audio-recording
```
