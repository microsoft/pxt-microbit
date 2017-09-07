# flashing heart blocks challenges

Coding challenges for the flashing heart tutorial. 

## Before we get started

Complete the [flashing heart](/lessons/flashing-heart/activity) activity and your code will look like this:

```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `)
    basic.pause(500)
    basic.clearScreen()
    basic.pause(500)

})
```


## Challenge 1

Let's plot a different image. Let's display a broken heart!

To do this, you need to add a block between the last line and the end loop. Add a `show LEDs` block and then add a `pause` of 500 milliseconds.


```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `)
    basic.pause(500)
    basic.clearScreen()
    basic.pause(500)
    basic.showLeds(`
        . # . # .
        # . # # #
        # . . # #
        . # # # .
        . . # . .
        `)
    basic.pause(500)
})
```


* click *run main* to see if the code works as expected.

## Challenge 2

Now let's alternate flashing the heart and the broken heart. To do this, we need to add a `clear screen` block and then add a `pause` block of 500 milliseconds under the new code we added in Challenge 1.


```blocks
basic.forever(() => {
    basic.showLeds(`
        . # . # .
        # . # # #
        # . . # #
        . # # # .
        . . # . .
        `)
    basic.pause(500)
    basic.clearScreen()
    basic.pause(500)
    basic.showLeds(`
        . # . # .
        # . # # #
        # . . # #
        . # # # .
        . . # . .
        `)
    basic.pause(500)
    basic.clearScreen()
    basic.pause(500)
})

```


* click *run main* to see if the code works as expected.

## Challenge 3

You now have a heart and broken heart flashing! Now plot a new image to alternate in with the heart and broken heart.

