# compass Heading

Find which direction on a compass the @boardname@ is facing.

The @boardname@ measures the **compass heading** from `0` to `359`
degrees with its **magnetometer** chip. Different numbers mean North,
East, South, and West.

```sig
input.compassHeading()
```

## Returns

* a [number](/types/number) from `0` to `359` degrees, which means the compass heading. If the compass isn't ready, it returns `-1003`.

## Compass points

In history, a compass was a device that pointed in the direction of the magnetic North Pole. A needle or or a spot on a moving dial was magnetically attracted to the pole. Using a circular card or diagram arranged with direction indications you could align the indicator with the mark that meant "North" and see which direction the heading you wanted was in.

![Modern plastic compass](/static/device/compass/plastic-compass.jpg)</br>
**Magnetic compass**<br>
_by Evan Amos, Public Domain_

The compass pointer (needle) is always pointing to magnetic North. The compass dial might not have alignment with the needle. Once the needle is aligned with the dial, the compass will show what the direction is for a heading. The basic 4 compass points are **North (W), East (E), South (S),** and **West (W)**. These are also called the _Four Cardinal Directions_.

In the compass examples below, the needle is pointing toward magnetic North. Next, the needle becomes aligned with the "N" symbol. If you wanted to walk East, you would take the compass and turn it so the "E" symbol is pointing directly ahead of you. While you walk East, keep the needle aligned with the "N" symbol.

| Needle Heading | Compass Aligned |
|-|-|
| ![Unaligned compass](/static/device/compass/compass-needle.png) | ![Aligned compass](/static/device/compass/compass-align.png)

## Directions and degrees

Modern compasses also use degree markings along with direction symbols. The compass dial shows degree markings from `0°` to `360°`.

![Compass with degree markings](/static/device/compass/compass-degrees.png)

The degree markings map to directions. Below is a list of directions and their degree values.

|Direction|Symbol|Degrees|
|-|-|-|
|North|N|0°|
|Northeast|NE|45°|
|East|E|90°|
|Southeast|SE|135°|
|South|S|180°|
|Southwest|SE|225°|
|West|W|270°|
|Northwest|NW|315°|

</br>

Besides the 4 Cardinal Directions, there are *Intercardinal Directions* like Northeast (shown in the list above). Additionally, there are direction names between the Cardinal and Intercardinal ones. One of these is North-Northeast (NNE) whose degree value is 22.5° and another is West-Southwest (WSW) at 247.5°.

### ~tip 

#### Running compass programs on the @boardname@

When testing and using your compass programs on the board, hold the @boardname@ face up (logo side up) and the top edge toward the direction to measure (bottom edge connector side is toward your body).

### ~

### ~hint

#### Compass simulation

When you run a program in the simulator that uses ``||input:compassHeading||``, a compass direction needle appears on the screen. Click and rotate the direction needle to change the compass heading.

```sim
basic.forever(function () {
    basic.showNumber(input.compassHeading())
    basic.pause(5000)
})
```

### ~

## Examples

### Digital compass

Display the current compass heading in degrees `0` - `359`.

```blocks
basic.forever(function () {
    basic.showNumber(input.compassHeading())
    basic.pause(1000)
})
```

### Analog compass

Find the compass heading and then show an arrow
that means whether the @boardname@ is facing north (🠉), south (🠋),
east (🠊), or west (🠈).

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

Every time you start to use the compass (for example, if you have just turned the @boardname@ on),
the @boardname@ will start a [calibrate compass](/reference/input/calibrate-compass)
(adjust itself).
The [calibration step](https://support.microbit.org/support/solutions/articles/19000008874-calibrating-the-micro-bit-compass)
will ask you to draw a fill pattern on the screen by tilting the @boardname@.

If you are calibrating or using the compass near metal, it might
confuse the @boardname@.

### ~ hint

#### Make a calibration tool

Keep the calibration current by running it when the user pressed **A+B**.

```block
input.onButtonPressed(Button.AB, () => {
    input.calibrateCompass();
})
```

### ~

## See also

[acceleration](/reference/input/acceleration), [calibrate compass](/reference/input/calibrate-compass)
