# Fade out

Gradually decrease the [LED screen](/device/screen) brightness until the LED lights are turned off.

```sig
led.fadeOut(700);
```

## Parameters

* ms - [Number](/types/number); the speed that the screen brightness is decreased, expressed in milliseconds (1,000 milliseconds = 1 second). The smaller the number the faster the screen brightness decreased.

## Example: fade away letter A

The following example sets the screen brightness to the maximum brightness, displays the letter A, and then gradually fades the letter away:

```blocks
led.setBrightness(255)
basic.showString("A", 1000)
led.fadeOut(1000)
```

## See also

[brightness](/reference/led/brightness), [fade in](/reference/led/fade-in), [set brightness](/reference/led/set-brightness)

