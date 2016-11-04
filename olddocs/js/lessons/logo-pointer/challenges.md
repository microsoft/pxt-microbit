# magic logo challenges

These challenges will help you show arrows that point which way the logo is pointing! #docs

## Challenge 0

This [guided tutorial](/zysycw) will help you display an arrow pointing the direction the logo is oriented!

Let's display and upward pointing arrow when the logo is up!

```
input.onGesture(Gesture.LogoUp, () => {
    images.createImage(`
. . # . .
. # # # .
# # # # #
. . # . .
. . # . .
`).showImage(0)
})
```

**Challenge 1**

How about when the logo is down? We should display the arrow pointing downward!

Let's start by adding a condition for if the logo is down.

```
input.onGesture(Gesture.LogoUp, () => {
    images.createImage(`
. . # . .
. # # # .
# # # # #
. . # . .
. . # . .
`).showImage(0)
})
input.onGesture(Gesture.LogoDown,  () => {
}) // ***
```

## Challenge 2

Now we need to display the arrow!

```
input.onGesture(Gesture.LogoUp, () => {
    images.createImage(`
. . # . .
. # # # .
# # # # #
. . # . .
. . # . .
`).showImage(0)
})
input.onGesture(Gesture.LogoDown,  () => {
    images.createImage(`
. . # . .
. . # . .
# # # # #
. # # # .
. . # . .
`).showImage(0) // ***
})
```

**Challenge 3**

Let's show a spinning arrow when the @boardname@ is shaken. We can do this by adding an on shake condition and showing an animation of the arrow spinning!

