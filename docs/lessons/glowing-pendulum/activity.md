# glowing pendulum block activity

Construct a pendulum that glows using acceleration. 

Welcome! This activity will teach how to construct a pendulum that glows using acceleration. Let's get started!

Turn on all the LEDs.

```blocks
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
```

Create a **forever** loop that will constantly display the appropriate brightness on the LED display.


```blocks
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
basic.forever(() => {
    
})
```

Now let's measure the acceleration on the `y` axis and store that value in a variable. The `acceleration(y)` function will provide the value.

```blocks
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
basic.forever(() => {
    let acceleration = input.acceleration(Dimension.Y);
});
```

Since the @boardname@ will be swinging back and forth, the acceleration will only be positive half of the time. Thus, to always get a positive value, we want to take the absolute value of the acceleration.


```blocks
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
basic.forever(() => {
    let acceleration = input.acceleration(Dimension.Y);
    acceleration = Math.abs(acceleration)
});
```

The function `acceleration(y)` returns a number between 0 and 1024. We want to use this value for the brightness of the @boardname@, but the `set brightness()` only accepts a value between 0 and 256. Thus, we need to divide the acceleration by 4 to ensure we will be in the appropriate range.

```blocks
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
basic.forever(() => {
    let acceleration = input.acceleration(Dimension.Y);
    acceleration = Math.abs(acceleration);
    acceleration = acceleration / 4;
});

```

Now let's use our acceleration value to set the brightness on the @boardname@.

```blocks
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
basic.forever(() => {
    let acceleration = input.acceleration(Dimension.Y);
    acceleration = Math.abs(acceleration);
    acceleration = acceleration / 4;
    led.setBrightness(acceleration)
});
```

## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/glowing-pendulum/challenges)!

## ~

