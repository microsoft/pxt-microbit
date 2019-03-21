# Is Gesture

Tests if a gesture is currently detected.

```sig
input.isGesture(Gesture.Shake)
```

## Parameters

* ``gesture`` means the way you hold or move the @boardname@. This can be `shake`, `logo up`, `logo down`, `screen up`, `screen down`, `tilt left`, `tilt right`, `free fall`, `3g`, or `6g`.

## Example: random number

This program shows a number from `2` to `9` when you shake the @boardname@.

```blocks
forever(function() {
    if (input.isGesture(Gesture.Shake)) {
        let x = Math.randomRange(2, 9)
        basic.showNumber(x)
    }
})
```

## See Also

[on gesture](/reference/input/on-gesture)
