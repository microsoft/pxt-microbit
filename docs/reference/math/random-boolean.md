# random Boolean

Returns a pseudo-random boolean value that is either `true` or `false`.

```sig
Math.randomBoolean()
```

## Returns

* a pseudo-random [boolean](types/boolean) that is either `true` or `false`.

### ~ hint

#### What is pseudo-random?

Random numbers generated on a computer are often called pseudo-random. This because the method to create the number is based on some starting value obtained from the computer itself. The formula for the random number could use some amount of mathematical operations on a value derived from a timer or some other input. The resulting "random" number isn’t considered entirely random because it started with some initial value and a repeatable set of operations on it. Therefore, it’s called a pseudo-random number.

A random boolean is created by choosing a [random int](/reference/math/randint) ranging from `0` to `1`.

### ~

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

[random int](/reference/math/randint)