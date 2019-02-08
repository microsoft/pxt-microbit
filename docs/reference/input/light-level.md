# Light Level

Find the light level (how bright or dark it is) where you are.
The light level ``0`` means darkness and ``255`` means bright light. 
The @boardname@ measures the light around it by using some of the
LEDs on the [LED screen](/device/screen).

The first time you use it, this function will say ``0``.
After that, it will say the real light level.
This is because the light sensor (the part that can find the light level)
has to be turned on first.

```sig
input.lightLevel();
```

Learn more about how light level is detected in this light sensor video:

https://www.youtube.com/watch?v=TKhCr-dQMBY.

## Returns

* a [Number](/types/number) that means a light level from ``0`` (dark) to ``255`` (bright).

## Example: show light level

When you press button `B` on the microbit, this
program shows the light level
on the [LED screen](/device/screen).

```blocks
input.onButtonPressed(Button.B, () => {
    let level = input.lightLevel()
    basic.showNumber(level)
})
```

## Example: chart light level

This program shows the light level with a [bar chart](/reference/led/plot-bar-graph) on the @boardname@ screen.
If you carry the @boardname@ around to different places with different light levels,
the bar chart will change.

```blocks
basic.forever(() => {
    led.plotBarGraph(input.lightLevel(), 255)
})
```

## See also

[acceleration](/reference/input/acceleration), [compass-heading](/reference/input/compass-heading)

