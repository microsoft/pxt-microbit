# flashing heart blocks activity

Control images with a variable.

## ~avatar avatar

In this activity, you will learn how to blink an image on the LED screen.

## ~

Let's start by adding code that plots a heart image on the screen using `show LEDs`. Once you are done coding, don't forget to run your code in the simulator or the @boardname@.


```blocks
basic.showLeds(`
. # . # .
# # # # #
# # # # #
. # # # .
. . # . .`);
```

We want to leave the image on the screen for 0.5 seconds (500 milliseconds), then clear the screen. We can use `pause` to wait and `clear screen` to turn off the LEDs.


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
})


```


Finally, we can surround this code with a `forever` loop to repeat it and add a pause after `clear screen` to keep the screen off for a little while. Modify your code so that your code looks like this.


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


## ~avatar boothing

Excellent, you're ready to continue with the [challenges](/lessons/flashing-heart/challenges)!

## ~

