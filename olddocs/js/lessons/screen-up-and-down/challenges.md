# screen up and down challenges

The on screen up function.

**Challenge 0**

Congratulations! You have completed the  [Screen Up/Down tutorial](/hqjwkb) . You should have an image of a heart created and shown when the screen is moved up.

```
input.onScreenUp(() => {
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

Now have the @boardname@ do something when the screen is moved downward. You can do this by calling the on screen down method. Do not do anything when you call the on screen down method.

```
input.onScreenUp(() => {
    images.createImage(`
# # . # #
# # # # #
# # # # #
. # # # .
. . # . .
`).showImage(0)
})
input.onScreenDown(() => {

})
```

**Challenge 2**

When the @boardname@ is moved downward, create and show an image of an upside down heart.

```
input.onScreenUp(() => {
    images.createImage(`
# # . # #
# # # # #
# # # # #
. # # # .
. . # . .
`).showImage(0)
})
input.onScreenDown(() => {
    images.createImage(`
. . # . .
. # # # .
# # # # #
# # # # #
# # . # #
`).showImage(0) // ***
})
```

