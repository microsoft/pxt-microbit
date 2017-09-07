# Fade in

Gradually increase the [LED screen](/device/screen) brightness until the LED lights are at full brightness.

```sig
led.fadeIn(700);
```

## Parameters

* ms - [Number](/types/number); the speed by which the screen brightness is increased, expressed in milliseconds (1,000 milliseconds = 1 second). The smaller the number the faster the screen brightness increased.

## Example: fading dot

The following code turns on centre LED and then gradually increases and decreases the screen brightness (the centre LED pulses 5 times):

```blocks
led.plot(2, 2)
for (let i = 0; i < 5; i++) {
    led.setBrightness(0)
    led.fadeIn(100)
    basic.pause(100)
    led.fadeOut(100)
}
```

## See also

[brightness](/reference/led/brightness), [fade out](/reference/led/fade-out), [set brightness](/reference/led/set-brightness)

