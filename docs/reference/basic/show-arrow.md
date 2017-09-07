# Show Arrow

Shows the selected arrow on the LED screen

```sig
basic.showArrow(ArrowNames.North)
```


## Parameters

* ``direction``, the identifier of the arrow to display
* ``interval`` (optional), the time to display in milliseconds. default is 400.

## Example

This program shows all eight arrows.

```blocks
for (let index = 0; index <= 7; index++) {
    basic.showArrow(index)
    basic.pause(300)
}
```

## See also

[showIcon](/reference/basic/show-icon),
[showLeds](/reference/basic/show-leds)