# Audio recording

The **audio recording** extension lets you record and play back audio with the micro:bit. If your version of the micro:bit has a microphone you can record a brief amount of audio and play it back on the speaker or at a sound output pin. Audio that you record is stored in an audio [buffer](/types/buffer) and can be played later or recorded over with new audio.

### ~ reminder

#### Works with micro:bit V2

![works with micro:bit V2 only image](/static/v2/v2-only.png)

Using these blocks requires the [micro:bit V2](/device/v2) hardware. If you use any blocks that attempt access flash memory on a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

## Blocks in this extension

### Record and play

```cards
record.startRecording(record.BlockingState.Blocking)
record.playAudio(record.BlockingState.Blocking)
```

### Settings

```cards
record.setSampleRate(11000)
record.setMicGain(record.AudioLevels.Low)
```

### Status

```cards
record.audioStatus(record.AudioStatus.Playing)
```

## See also

[start recording](/reference/record/start-recording),
[play audio](/reference/record/play-audio),
[set sample rate](/reference/record/set-sample-rate),
[set mic gain](/reference/record/set-mic-gain),
[audio status](/reference/record/audio-status)

```package
audio-recording
```