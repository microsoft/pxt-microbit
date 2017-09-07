# glowing pendulum blocks challenges

Coding challenges for the glowing pendulum tutorial. 

## Before we get started

Complete the following [glowing pendulum activity](/lessons/glowing-pendulum/activity) and your code should look like this:

```blocks
basic.forever(() => {
    let acceleration = input.acceleration(Dimension.Y);
    acceleration = Math.abs(acceleration);
    acceleration = acceleration / 4;
    led.setBrightness(acceleration)
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
});


```

## Challenge 1

![](/static/mb/lessons/glowing-pendulum-0.jpg)

Hold the @boardname@ in your hand in a dark room. Move the @boardname@ like a pendulum and produce a slow image that captures the pattern of the @boardname@ LEDs.

## Challenge 2

Replace "y" in `acceleration(y)` with "x" or "z". Changing the axis will cause the @boardname@ to measure the force in a different direction. What differences in the resulting pattern does this replacement make?

