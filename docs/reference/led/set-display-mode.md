# set Display Mode

Set the display mode to either black and white or greyscale for rendering [LEDs](/device/screen).

```sig
led.setDisplayMode(DisplayMode.Greyscale)
```

The LED screen can create a sense of color depth with the display mode setting. Color depth is the difference in darkness between the pixels in the display. The `greyscale` mode makes the pixels appear
to have some amount of brightness to represent the grey value of real color. The `black and white` mode just shows an image on the pixels with the LEDs either on or off.

## Parameters

* ``mode`` the display mode type. This is either `BlackAndWhite` or `GreyScale`.

## Example

Set the display mode to `black and white`.

```blocks
led.setDisplayMode(DisplayMode.BackAndWhite)
```

## See also

[set brightness](/reference/led/set-brightness)