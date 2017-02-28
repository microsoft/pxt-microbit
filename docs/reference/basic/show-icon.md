# Show Icon

Shows the selected icon on the LED screen

```sig
basic.showIcon(IconNames.Heart)
```

### Example

This program shows a happy face and then a sad face with the ``show icon`` function, with a one second pause in between.

```blocks
basic.showIcon(IconNames.Happy)
basic.pause(1000)
basic.showIcon(IconNames.Sad)
```

### See also

[showLeds](/reference/basic/show-leds)