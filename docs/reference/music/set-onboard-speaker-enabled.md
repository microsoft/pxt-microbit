# set On Board Speaker Enabled

Enable the speaker on the @boardname@ to play music and sounds.

```sig
music.setOnBoardSpeakerEnabled(false)
```

The microbit v2 has a speaker on the board itself. You can enable the onboard speaker to play sounds instead having them an external speaker connected to the pitch pin.

### ~ reminder

#### micro:bit v2 required

This block requires the [micro:bit v2](/device/v2) hardware. If you use this block with a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

## Parameters

* **enabled**: a [boolean](/types/boolean) value that is ``true`` to enable the onboard speaker, or ``false`` to send sounds to the pitch pin.

## Example #example

Enable the onboard speaker play sounds.

```blocks
music.setOnBoardSpeakerEnabled(true)
```

## See also

[analog-set-pitch-pin](/reference/pins/analog-set-pitch-pin)

```package
music
```
