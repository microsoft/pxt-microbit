# Rotation

Find how much the @boardname@ is tilted in different directions.

```sig
input.rotation(Rotation.Roll);
```

## ~hint

The @boardname@ has a part called the **accelerometer** that can
check how the @boardname@ is moving. Watch this video to learn how the accelerometer works:

https://www.youtube.com/watch?v=byngcwjO51U

## ~

## Parameters

* ``kind`` means which direction you are checking: `Rotation.Pitch` (up and down) or `Rotation.Roll` (left and right)

## Returns

* a [number](/types/number) that means how much the @boardname@ is tilted in the direction you ask for. This is a value in degrees between `-180` to `180` in either the `Rotation.Pitch` or the `Rotation.Roll` direction of rotation.

## Example: @boardname@ leveler

This program helps you move the @boardname@ until it is level. When it is level, the @boardname@ shows a smiley.

If you are running this program in a browser, you can tilt the @boardname@ with your mouse.

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

