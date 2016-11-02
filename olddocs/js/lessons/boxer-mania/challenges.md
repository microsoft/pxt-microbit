# boxer mania challenges

My script. #docs

This [guided tutorial](/lessons/boxer-mania/tutorial) will help you create an animation!

**Challenge 0**

Let's create and show a series of frames on the LED screen; this is an animation!

We will use multiple frames to make it look like a square is rotating on the @boardname@ screen!

```
basic.showAnimation(`
. # . . .
# . . . .
. # . . .
. . # . #
. . . # .
`, 400)
```

**Challenge 1**

Let's create the next frame to make it look like the square is spinning clock-wise!

```
basic.showAnimation(`
. # . . .
# . . . .
. # . . .
. . # . #
. . . # .
`, 400)
basic.showAnimation(`
# # # # #
# . . . #
# . . . #
# . . . #
# # # # #
`, 400) // ***
```

**Challenge 2**

Add the next two frames to show a complete rotation for the square!

```
basic.showAnimation(`
. # . . .
# . . . .
. # . . .
. . # . #
. . . # .
`, 400)
basic.showAnimation(`
# # # # #
# . . . #
# . . . #
# . . . #
# # # # #
`, 400)
basic.showAnimation(`
. # . . . # # # # #
# . # . . # . . . #
. . . # . # . . . #
. . . . # # . . . #
. . . # . # # # # #
`, 400) // ***
```

**Challenge 3**

Do you want to show the same animation with fewer lines of codes? We can do this by combining all the frames into one show animation function call!

```
basic.showAnimation(`
. # . . . # # # # # . # . . . # # # # #
# . . . . # . . . # # . # . . # . . . #
. # . . . # . . . # . . . # . # . . . #
. . # . # # . . . # . . . . # # . . . #
. . . # . # # # # # . . . # . # # # # #
`, 400) // ***
```

