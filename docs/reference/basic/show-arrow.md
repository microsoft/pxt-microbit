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

[show icon](/reference/basic/show-icon),
[show leds](/reference/basic/show-leds)