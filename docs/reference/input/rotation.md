# Rotation

Find how much the @boardname@ is tilted in different directions.

```sig
input.rotation(Rotation.Roll);
```

## ~hint

The @boardname@ has a part called the **accelerometer** that can
check how the @boardname@ is moving.

## ~

## Parameters

* ``kind`` means which direction you are checking: `Rotation.Pitch` (up and down) or `Rotation.Roll` (left and right)

## Returns

* a [number](/types/number) that means how much the microbit is tilted in the direction you say; for `Rotation.Pitch` from `-90` to `90` degrees and for `Rotation.Roll` from `-180` to `180` degrees.

## Example: @boardname@ leveler

This program helps you move the @boardname@ until it is level.  When
it is level, the @boardname@ shows a smiley.

If you are running this program in a browser, you can tilt the
@boardname@ with your mouse.


```blocks
let pitch = 0;
basic.forever(() => {
    pitch = input.rotation(Rotation.Pitch);
    let roll = input.rotation(Rotation.Roll);
    if (Math.abs(pitch) < 10 && Math.abs(roll) < 10) {
        basic.showLeds(`
            . # . # .
            . . . . .
            . . . . .
            # . . . #
            . # # # .
            `);
    } else {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `);
        }
	});
```

## See also

[acceleration](/reference/input/acceleration), [compass-heading](/reference/input/compass-heading)

