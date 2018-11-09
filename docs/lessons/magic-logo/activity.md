# magic logo activity

Show an image that points up when the logo is up. 

## ~avatar avatar

Welcome! This tutorial will help you display an arrow pointing toward the logo! Let's get started.

## ~

Using the **accelerometer** sensor, the @boardname@ can detect when the **logo** is oriented **up**. We call that the **logo up** event. We will use ``||input:on logo up||`` to register an event handler that will run when the **logo up** event happens.

```blocks
input.onGesture(Gesture.LogoUp, () => {
    
})
```

When the @boardname@ goes logo up, the code nested under the ``||input:on logo up||`` function will run. Let's add a line of code to show LEDs in there.

```blocks
input.onGesture(Gesture.LogoUp, () => {
    basic.showLeds(`
        . . # . .
        . # # # .
        # # # # #
        . . # . .
        . . # . .
        `)
})
```

Run your code and try to turn around the @boardname@ to see the **logo up** event in action!

## ~avatar boothing

Excellent, you're ready to continue with the [challenges](/lessons/magic-logo/challenges)!

## ~

