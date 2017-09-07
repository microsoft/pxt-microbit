# rotation animation block challenges

Coding challenges for the rotation animation.

## Before we get started

Complete the following guided activity:

* [activity](/lessons/rotation-animation/activity)

At the end of the activity, your code should look like this:


```blocks
let rotating = true;
while (rotating) {
    basic.pause(20)
    basic.showLeds(`
        # . . . .
        . # . . .
        . . # . .
        . . . # .
        . . . . #
        `)
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        `)
    basic.showLeds(`
        . . . . #
        . . . # .
        . . # . .
        . # . . .
        # . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
}
```


## Challenge 1

Now let's add to this by creating a condition for on button pressed `A` before the while loop. We will also introduce serial writeLine for the while loop and input OnButtonPressed 

```blocks

let rotating = true;
while (rotating) {
    serial.writeLine("loop")
    basic.showLeds(`
        # . . . .
        . # . . .
        . . # . .
        . . . # .
        . . . . #
        `)
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        `)
    basic.showLeds(`
        . . . . #
        . . . # .
        . . # . .
        . # . . .
        # . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
}
input.onButtonPressed(Button.A, () => {
    serial.writeLine("hello")
})

```

## Challenge 2



Now that we have the on button pressed condition, let's make the animation stop rotating by setting the rotating global variable to false when button `A` is pressed.

```blocks
let rotating = true;
while (rotating) {
    serial.writeLine("loop")
    basic.showLeds(`
        # . . . .
        . # . . .
        . . # . .
        . . . # .
        . . . . #
        `)
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        `)
    basic.showLeds(`
        . . . . #
        . . . # .
        . . # . .
        . # . . .
        # . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
}
input.onButtonPressed(Button.A, () => {
    serial.writeLine("hello")
    rotating = false
})

```

* Run the code to see the awesome rotation.

## Challenge 3

Let's also make the image rotate the opposite way when button A is pressed! We can do this with another while loop that is only executed while `not rotating`.

