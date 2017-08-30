# Plot Brightness

Turn on a LED light with a specific brightness on the [LED screen](/device/screen).

```sig
led.plotBrightness(0,0, 128);
```

### Parameters

* ``x`` is a [number](/types/number) that means the
  horizontal spot on the LED screen (from left to right: 0, 1, 2, 3,
  or 4)
* ``y`` is a [number](/types/number) that means the vertical
  spot on the LED screen (from top to bottom: 0, 1, 2, 3, or 4)
* ``brightness` is a [number](/types/number) that represents the brightness of the LED, from 0 (off) to 255 (full brightness)

If a parameter is [out of bounds](/reference/out-of-bounds) (a value
other than 0 to 4), then this function will do nothing.

### ~hint

The LED screen is a solid square of LEDs with five LEDs on each side.
To learn more about how you number the LEDs with ``x`` and ``y``
coordinates, see [LED screen](/device/screen).

### ~

### Example: One LED

This program turns on the bottom right LED at 50% brightness

```blocks
led.plotBrightness(2, 2, 128)
```


### Example: Square

This program uses a [for loop](/blocks/loops/for)
and the `plotBrightness` function
to make a square around the edges of the LED screen.

```blocks
for (let i = 0; i < 5; i++) {
    led.plotBrightness(0, i, 64)
    led.plotBrightness(4, i, 128)
    led.plotBrightness(i, 0, 172)
    led.plotBrightness(i, 4, 255)
    basic.pause(500)
}
```

### ~hint

Use the [point](/reference/led/point) function to find out if an LED is
on or off.

### ~

### See also

[plot](/reference/led/plot), [unplot](/reference/led/unplot), [point](/reference/led/point), [LED screen](/device/screen)
