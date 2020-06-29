# volume

Get the current volume level of the sound synthesizer.

```sig
music.volume()
```

### ~hint

#### Simulator

Using ``||music:volume||`` works on the @boardname@. It might not work in the simulator on every browser.

### ~

## Returns

* a [number](/types/number) that is the current volume level of output from the sound synthesizer. The value can be between `0` for silent and `255` for the loudest sound.

## See also

[set volume](/reference/music/set-volume)

```package
music
```
