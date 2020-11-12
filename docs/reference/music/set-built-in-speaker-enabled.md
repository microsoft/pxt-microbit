# set Built In Speaker Enabled

Enable the speaker on the @boardname@ to play music and sounds.

```sig
music.setBuiltInSpeakerEnabled(false)
```

The microbit v2 has a speaker on the board itself. You can enable the built-in speaker to play sounds instead having them an external speaker connected to the pitch pin.

### ~ reminder

![works with micro:bit V2 only image](/static/v2/v2-only.png)

This block requires the [micro:bit V2](/device/v2) hardware. If you use this block with a micro:bit v1 board, you will see the **927** error code on the screen.

### ~

## Parameters

* **enabled**: a [boolean](/types/boolean) value that is ``true`` to enable the built-in speaker, or ``false`` to send sounds to the pitch pin.

## Example #example

Enable the built-in speaker play sounds.

```blocks
music.setBuiltInSpeakerEnabled(true)
```

## See also

[analog-set-pitch-pin](/reference/pins/analog-set-pitch-pin)

```package
music
```
