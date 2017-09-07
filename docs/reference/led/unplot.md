# Unplot

Turn off the LED light you say on the [LED screen](/device/screen).

```sig
led.unplot(0,0)
```

## ~hint

Use [plot](/reference/led/plot) to turn **on** an LED.

## ~

## Parameters

* ``x`` is a [number](/types/number) that means the
  horizontal spot on the LED screen (from left to right: 0, 1, 2, 3,
  or 4)
* ``y`` is a [number](/types/number) that means the vertical
  spot on the LED screen (from top to bottom: 0, 1, 2, 3, or 4)

If a parameter is [out of bounds](/reference/out-of-bounds) (a value
other than 0 to 4), then this function will do nothing.

## ~hint

The LED screen is a solid square of LEDs with five LEDs on each side.
To learn more about how you number the LEDs with ``x`` and ``y``
coordinates, see [LED screen](/device/screen).

## ~

## Example: Center off 

This program shows a picture on the LED screen, and then turns off the center LED with `unplot`.

```blocks
basic.showLeds(`
. . # . .
. . # . .
# # # # #
. . # . .
. . # . .
`)
basic.pause(500)
led.unplot(2, 2)
```

## ~hint

Use the [point](/reference/led/point) function to find out if an LED is
on or off.

## ~


## See also

[plot](/reference/led/plot), [point](/reference/led/point), [LED screen](/device/screen)
