# landslide challenges

Coding challenges for the landslide tutorial.

### ~avatar avatar fail

Don't drop me on the ground without protection! I'm very fragile. Ouch!

### ~

## Before we get started

Complete the following guided tutorial:

* [tutorial](/lessons/landslide/tutorial)

At the end of the tutorial, click `keep editing`. Your code should look like this:

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

Add a pause within `input->on fall` after displaying `!`. This will allow us to display another image in the next challenge.

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

Create and show an `X` image after the pause from Challenge 1.

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

* `Run` the program to see if it works as expected.

### Challenge 3

Now let's display a third image when the @boardname@ falls! First, add `basic->pause(2000)` followed by another image of your choice. Be creative!

