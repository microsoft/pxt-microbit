# Ring Tone

Play a musical tone on the speaker or at a sound pin of the @boardname@ with the pitch as high or low as you say. The tone will keep playing until you tell it not to.

```sig
music.ringTone(440)
```

### ~hint

#### Simulator

The ``||music:ring tone||`` block works on the @boardname@ board. It might not work in the simulator on every browser.

### ~

## Parameters

* ``frequency`` is a [number](/types/number) that says
how high-pitched or low-pitched the tone is. This
number is in **Hz** (**Hertz**), which is a measurement of frequency
or pitch.

## Example

This program checks the **accelerometer** for the @boardname@'s
**acceleration** (how much the @boardname@ is speeding up or slowing
down). Then it uses that acceleration to make a tone.  If the @boardname@
speeds up, the tone's pitch gets higher, and if it slows down, the
tone's pitch gets lower.  It's fun -- try it!

```blocks
basic.forever(() => {
    music.ringTone(input.acceleration(Dimension.X))
})
```

## Using other pins

Use [analogSetPitchPin](/reference/pins/analog-set-pitch-pin) to change that pin used to generate music.

```blocks
pins.analogSetPitchPin(AnalogPin.P1);
```

## See also

[rest](/reference/music/rest), [play tone](/reference/music/play-tone),
[tempo](/reference/music/tempo), [set tempo](/reference/music/set-tempo),
[change tempo by](/reference/music/change-tempo-by)
