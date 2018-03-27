# Compass Heading

Find which direction on a compass the @boardname@ is facing.

The @boardname@ measures the **compass heading** from `0` to `359`
degrees with its **magnetometer** chip. Different numbers mean north,
east, south, and west.

```sig
input.compassHeading();
```

## Returns

* a [number](/types/number) from `0` to `359` degrees, which means the compass heading. If the compass isn't ready, it returns `-1003`.

## Example

This program finds the compass heading and stores it in the
`degrees` variable.

```blocks
let degrees = input.compassHeading()
```

## ~hint 

When you run a program that uses this function in a browser, click and drag
the compass needle on the screen to change the compass heading.

## ~

## Example: compass

This program finds the compass heading and then shows a letter
that means whether the @boardname@ is facing north (N), south (S),
east (E), or west (W).

```blocks
let degrees = 0
basic.forever(() => {
    degrees = input.compassHeading()
    if (degrees < 45) {
        basic.showArrow(ArrowNames.North)
    } else if (degrees < 135) {
        basic.showArrow(ArrowNames.East)
    } else if (degrees < 225) {
        basic.showArrow(ArrowNames.South)
    } else if (degrees < 315) {
        basic.showArrow(ArrowNames.West)
    } else {
        basic.showArrow(ArrowNames.North)
    }
})
```

## Calibration

Every time you start to use the compass (for example, if you have just
turned the @boardname@ on), the @boardname@ will start to [calibrateCompass](/reference/input/calibrate-compass)
(adjust itself).  It will ask you to draw a circle by tilting the
@boardname@.

If you are calibrating or using the compass near metal, it might
confuse the @boardname@.

## ~ hint

Keep the calibration handy by running it when the user pressed **A+B**.

```block
input.onButtonPressed(Button.AB, () => {
    input.calibrateCompass();
})
```

## ~

## See also

[acceleration](/reference/input/acceleration), [calibrateCompass](/reference/input/calibrate-compass)
