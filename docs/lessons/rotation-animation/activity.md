# rotation animation block activity

Rotate images with a while loop. 

## ~avatar avatar

Welcome! This tutorial will teach how to rotate images with a **while loop**. Let's get started!

## ~

Let's start by creating a global variable called `rotating` and initialize it to true. This well indicate when the animation should be displaying.

```blocks
let rotating = true;
```

Now we need a while loop that will be executed only if the variable rotating is true.

```blocks
let rotating = true;
while (rotating) {
    basic.pause(20)
    
}
```

Let's create and show an animation of a diagonal line that rotates clockwise. We need a pause so that the battery does not burn out.

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

## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/rotation-animation/challenges)!

## ~

