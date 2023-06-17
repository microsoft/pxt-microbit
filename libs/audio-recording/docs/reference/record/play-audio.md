# play Audio

Play the audio that was previously recorded in the audio buffer.

```sig
record.playAudio(record.BlockingState.Blocking)
```

Any audio recorded in the audio buffer is played on the speaker or at the sound output pin. If there is nothing in the buffer, no sound is played.

## Parameters

* **mode**: the blocking state for audio playback.
>* `until done`: all of the audio is first played and then the program continues.
>* `in background`: the audio is played while the program continues.

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

[start recording](/reference/record/start-recording),
[set sample rate](/reference/record/set-sample-rate)

```package
audio-recording
```
