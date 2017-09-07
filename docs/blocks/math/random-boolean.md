# random Boolean

Returns a pseudo-random boolean value that is either `true` or `false`.

```sig
Math.randomBoolean()
```

## Returns

* a pseudo-random [boolean](types/boolean) that is either `true` or `false`.

## Example

Make your @boardname@ do a coin toss when it's dropped softly. Have the LEDs show 'heads' or 'tails' as the result of the toss.

```blocks
input.onGesture(Gesture.FreeFall, () => {
    if (Math.randomBoolean()) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Sword)
    }
})
```

## See Also

[random](/reference/math/random)