# on logo up and down challenges

My script. #docs

**Challenge 0**

This [guided tutorial](/zysycw) will help you display an arrow pointing the direction the logo is orientated!

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
})
```

**Challenge 2**

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

