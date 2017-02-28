# Show Arrow

Shows the selected arrow on the LED screen

```sig
basic.showArrow(ArrowNames.North)
```

### Example

This program shows all eight arrows.

```blocks
for (let index = 0; index <= 7; index++) {
    basic.showArrow(index)
    basic.pause(300)
}
```

### See also

[showIcon](/reference/basic/show-icon),
[showLeds](/reference/basic/show-leds)