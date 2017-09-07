# glowing pendulum block tutorial

The glowing pendulum changes the screen brightness based on the acceleration measured on the @boardname@.

## Rebuild the game!

The blocks have been shuffled! Put them back together so that...
* all LEDs are turned on
* the @boardname@ repeats code **forever** that
  * reads the acceleration along the ``y`` axis,
  * calculate the absolute value of the acceleration
  * scales down the acceleration value by a factor of `4`
  * uses the scaled value to set the screen **brightness**

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
