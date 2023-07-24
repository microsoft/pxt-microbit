# audio Status

Check to see if a certain audio status is true or not.

```sig
record.audioStatus(record.AudioStatus.Playing)
```

The audio status is related to what operation is happening to the audio [buffer](/types/buffer) at the current moment. The audio buffer has several status conditions that you can check. It will return `true` or `false` to tell you if the audio is playing, recording, stopped, or the buffer has nothing in it.

## Parameters

* **status**: the audio status to check for.
>* `playing`: audio is currently playing.
>* `recording`: audio is currently recording.
>* `stopped`: audio playback is stopped.
>* `empty`: there is no audio recorded.

## Returns

* a [boolean](/types/boolean) value indicating whether the audio status type requested is either `true` or `false`.

## Example

Use buttons `A` and `B` to record and play audio. If no audio is recorded, skip the playback when button `B` is pressed.

```blocks
input.onButtonPressed(Button.A, function () {
    record.startRecording(record.BlockingState.Blocking)
})
input.onButtonPressed(Button.B, function () {
    if (!(record.audioStatus(record.AudioStatus.BufferEmpty))) {
        record.playAudio(record.BlockingState.Blocking)
    }
})
```

## See also

[start recording](/reference/record/start-recording),
[play audio](/reference/record/play-audio)

```package
audio-recording
```
