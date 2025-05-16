# start Recording

Begin recording sound in the audio buffer.

```sig
record.startRecording(record.BlockingState.Blocking)
```

Audio recording starts and is recorded for a short period of time. Any previous audio is overwritten and the new audio takes its place. Audio is recorded on the micro:bit as a sequence of [numbers](/types/number) that represent sound and its loudness at a particular moment in time. This is called a sound "sample". The number of "samples" used to record sounds during one second is called the [sample rate](/reference/record/set-sample-rate).

When audio is recorded, the audio buffer will contain enough samples that, when played back, will approximate natural sound waves as you listen to it. Any previous audio that was recorded is replaced with new audio.

## Parameters

* **mode**: the blocking state for the recording operation.
>* `until done`: the audio is recorded first and then the program continues.
>* `in background`: the audio is recorded while the program continues.

## Example

Use the micro:bit as a sound recorder. Record sound when button `A` is pressed and play sound when button `B` is pressed.

```blocks
input.onButtonPressed(Button.A, function () {
    record.startRecording(record.BlockingState.Blocking)
})
input.onButtonPressed(Button.B, function () {
    record.playAudio(record.BlockingState.Blocking)
})
```

## See also

[play audio](/reference/record/play-audio),
[set sample rate](/reference/record/set-sample-rate)

```package
audio-recording
```