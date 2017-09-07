# Toggle All

Toggle all the 25 LEDs on the [LED screen](/device/screen) - if an LED is on before the function is called, it will be off after; if an LED is off before the function is called, it will be on after.

```sig
led.toggleAll()
```

## Parameters

* none

## Example

The following code will result in every LED being on except for the LED at coordinate (2,2)

```blocks
basic.clearScreen()
led.plot(2, 2)
led.toggleAll()
```

```sim
basic.clearScreen()
led.plot(2, 2)
led.toggleAll()
```

## See also

[toggle](/reference/led/toggle), [LED screen](/device/screen), [clear screen](/reference/basic/clear-screen)

