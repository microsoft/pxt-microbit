# Plot

Turn on the LED light you say on the [LED screen](/device/screen).

```sig
led.plot(0,0);
```

## ~hint

Use [unplot](/reference/led/unplot) to turn **off** an LED.

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

## Example: One LED

This program turns on the bottom right LED.

```blocks
led.plot(4, 4)
```


## Example: Square

This program uses a [for loop](/blocks/loops/for)
and the `plot` function
to make a square around the edges of the LED screen.

```blocks
for (let i = 0; i < 5; i++) {
    led.plot(0, i)
    led.plot(4, i)
    led.plot(i, 0)
    led.plot(i, 4)
    basic.pause(500)
}
```

## ~hint

Use the [point](/reference/led/point) function to find out if an LED is
on or off.

## ~

## See also

[unplot](/reference/led/unplot), [point](/reference/led/point), [LED screen](/device/screen)
