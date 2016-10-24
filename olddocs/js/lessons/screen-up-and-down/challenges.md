# screen up and down challenges

The on screen up function.

**Challenge 0**

Congratulations! You have completed the  [Screen Up/Down tutorial](/hqjwkb) . You should have an image of a heart created and shown when the screen is moved up.

```
input.onGesture(Gesture.ScreenUp, () => {
    images.createImage(`
# # . # #
# # # # #
# # # # #
. # # # .
. . # . .
`).showImage(0)
})
```

**Challenge 1**

Now have the Micro:bit do something when the screen is moved downward. You can do this by calling the on screen down method. Do not do anything when you call the on screen down method.

```
input.onGesture(Gesture.ScreenUp, () => {
    images.createImage(`
# # . # #
# # # # #
# # # # #
. # # # .
. . # . .
`).showImage(0)
})
input.onGesture(Gesture.ScreenDown, () => {

})
```

**Challenge 2**

When the Micro:bit is moved downward, create and show an image of an upside down heart.

```
input.onGesture(Gesture.ScreenUp, () => {
    images.createImage(`
# # . # #
# # # # #
# # # # #
. # # # .
. . # . .
`).showImage(0)
})
input.onGesture(Gesture.ScreenDown, () => {
    images.createImage(`
. . # . .
. # # # .
# # # # #
# # # # #
# # . # #
`).showImage(0) // ***
})
```

