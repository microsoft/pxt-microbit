# Toggle

Toggle a LED light on the [LED screen](/device/screen), meaning to turn it on  (off) if it is off (on). Specify which LED using x, y coordinates.

```sig
led.toggle(0,0)
```

## Parameters

* x - [Number](/types/number); the *x coordinate* or horizontal position (0, 1, 2, 3, 4)
* y - [Number](/types/number); the *y coordinate* or vertical position (0, 1, 2, 3, 4)

If a parameter is [out of bounds](/reference/out-of-bounds) (a value other than 0-4), then this function will do nothing.

## x, y coordinates?

The LED screen is made up of 25 LEDs arranged in a 5x5 grid. To figure out the ``x``, ``y`` coordinates, see [LED screen](/device/screen).

## Example

This code toggles the centre LED:

```blocks
led.toggle(2, 2)
```

## See also

[toggle all](/reference/led/toggle-all), [plot](/reference/led/plot), [unplot](/reference/led/unplot), [point](/reference/led/point), [LED screen](/device/screen),

