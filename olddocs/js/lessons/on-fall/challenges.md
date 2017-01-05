# landslide challenges

The on fall function.

### Challenge 0

Welcome! This [guided tutorial](https://live.microbit.co.uk/td/lessons/on-fall/tutorial) will show you how to detect when the @boardname@ is falling. Your goal is to write a program that detects when the @boardname@ falls!

```
input.onFall(() => {
    images.createImage(`
. . # . .
. . # . .
. . # . .
. . . . .
. . # . .
`).showImage(0) // ***
})
```

### Challenge 1

Add a pause within `input->on fall`. This will allow us to display another image in the next challenge.

```
input.onFall(() => {
    images.createImage(`
. . # . .
. . # . .
. . # . .
. . . . .
. . # . .
`).showImage(0)
    basic.pause(2000) // ***
})
```

### Challenge 2

Create and display an `X` after the pause from Challenge 1

```
input.onFall(() => {
    images.createImage(`
. . # . .
. . # . .
. . # . .
. . . . .
. . # . .
`).showImage(0)
    basic.pause(2000)
    images.createImage(`
# . . . #
. # . # .
. . # . .
. # . # .
# . . . #
`).showImage(0) // ***
})
```

### Challenge 3

Create a loop so that the @boardname@ alternates between the exclamation point and "X" images when the @boardname@ falls. You will need a `forever` loop and a pause at the end of the loop to do this.

## See Also

[on shake](/reference/input/on-gesture)

