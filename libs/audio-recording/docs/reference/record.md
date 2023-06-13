# Audio recording

The Datalogger extension logs user data to the flash storage on the @boardname@. Each data item is stored in a column of as part of a row of data. Data is logged to storage by rows. The columns can have names to specify the meaning of data item values.

### ~ reminder

#### Works with micro:bit V2

![works with micro:bit V2 only image](/static/v2/v2-only.png)

Using these blocks requires the [micro:bit V2](/device/v2) hardware. If you use any blocks that attempt access flash memory on a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

## Data logs

A data log will represent a table of information like:

| Temperature | Acceleration | Light level |
| - | - | - |
| 20 | 3 |123 |
| 23 | 2 | 210 |
| 19 | 4 | 98 |
<br/>

A data item consits of value name, which is it's assigned column too, and the item's value. They are called "column-value" items. Here's how a column-value item is created.

```
let item = datalogger.createCV("temperature", input.temperature())
```
The order and the names of the data items are set using column titles.

```
datalogger.setColumnTitles("temperature", "acceleration", "light")
```

Data items are logged to storage as a row. Here's an example of logging a row of data. Each different data value is associated with its colunm before it's logged.

```
let temp = datalogger.createCV("temperature", input.temperature())
let accel = datalogger.createCV("acceleration", input.acceleration(Dimension.X))
let lite = datalogger.createCV("light", input.lightLevel())
datalogger.log(temp, accel, lite)
```

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