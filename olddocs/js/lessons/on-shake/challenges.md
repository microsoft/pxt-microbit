# flipping bird challenges

These challenges will allow you to create and display a flipping image of a bird when the @boardname@ is shaken. #docs

### Challenge 0

Greetings! This [guided tutorial](/lessons/flipping-bird/tutorial) will begin to show you how to flip a bird.

```
counter = 0
input.onGesture(Gesture.Shake, () => {
    counter = counter + 1
    if (math.mod(counter, 2) == 1) {
        images.createImage(`
# # . # #
. . # . .
. . . . .
. . . . .
. . . . .
`).showImage(0)
    }
})
```

### Challenge 1

We handled the case of when `math->mod(counter,2) = 1`. We haven't done anything when the remainder is 0! Add an if statement to handle this case.

```
counter = 0
input.onGesture(Gesture.Shake, () => {
    counter = counter + 1
    if (math.mod(counter, 2) == 1) {
        images.createImage(`
# # . # #
. . # . .
. . . . .
. . . . .
. . . . .
`).showImage(0)
    }
    if (math.mod(counter, 2) == 0) {
    }
})
```

### Challenge 2

Inside of that `if` statement you created in challenge 1, add `image->create image()->show image(0)` and display an upside down flying bird.

```
counter = 0
input.onGesture(Gesture.Shake, () => {
    counter = counter + 1
    if (math.mod(counter, 2) == 1) {
        images.createImage(`
# # . # #
. . # . .
. . . . .
. . . . .
. . . . .
`).showImage(0)
    }
    if (math.mod(counter, 2) == 0) {
        images.createImage(`
. . . . .
. . . . .
. . . . .
. . # . .
# # . # #
`).showImage(0) // ***
    }
})
```

* Run the code to see if it works as expected.

### Challenge 3

Display a check mark and question mark instead of flipping birds. Or better yet, come up with your own pair of opposites to display!

