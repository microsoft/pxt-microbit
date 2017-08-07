# Set Brightness

Make the [LED screen](/device/screen) as bright as you say when it is
turned on.

```sig
led.setBrightness(121)
```

## Parameters

* ``value`` is a [number](/types/number) that means how
  bright the screen is when it is turned on, from `0` (darkest) to
  `255` (brightest). For example, the number `127` means the screen is
  halfway bright when it is turned on.

## ~ hint

The brightness is not supported in the simulator. You will need to try it on the @boardname@ itself!

## ~

## Example: change brightness

This program makes the screen brightness 100% (`255`).  Then it turns on
the center LED (`2, 2`), waits for one second, and then sets the screen
brightness to 50% (`128`):

```blocks
led.setBrightness(255)
led.plot(2, 2)
basic.pause(1000)
led.setBrightness(led.brightness() / 2)
```

## See also

[brightness](/reference/led/brightness), [fade in](/reference/led/fade-in), [fade out](/reference/led/fade-out), [LED screen](/device/screen)
