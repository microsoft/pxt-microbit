# zoomer block activity

Measure the acceleration on the @boardname@ in the "z" direction. 

## ~avatar avatar



## ~

Welcome! This activity will teach how to measure the acceleration on the @boardname@ in the "z" direction. Let's get started!

We want to display the acceleration forever. In order to do so, we need a `forever` loop.

```blocks
basic.forever(() => {
    
})
```

Let's measure the acceleration and then store in it a variable `az`. The acceleration is measured in **milli-gravities**, so a value of `-1000` is equivalent to `-1g` or `-9.81m/s^2`.

```blocks
basic.forever(() => {
    let az = input.acceleration(Dimension.Z)
})
```

Show the value of `az` on the screen.

```blocks
basic.forever(() => {
    let az = input.acceleration(Dimension.Z)
    basic.showNumber(az)
})
```

## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/zoomer/challenges)!

## ~

