# Plot Bar Graph

Displays a bar graph of the numbers you say.
A bar graph is a kind of chart that shows numbers as lines with different lengths.

```sig
led.plotBarGraph(2, 20);
```

## Parameters

* ``value`` is a [number](/types/number) that means what you
  are measuring or trying to show. For example, if you are measuring
  the temperature of ice with the @boardname@, ``value`` might be `0`
  because the temperature might be 0 degrees centigrade.
* ``high`` is a [number](/types/number) that means the highest
  possible number that the ``value`` parameter can be. This number is
  also the tallest that the lines in the bar chart can be.

## Example: chart acceleration

This program shows a bar graph of the [acceleration](/reference/input/acceleration) 
in the `x` direction of the @boardname@.
The @boardname@'s `x` direction is from left to right (or right to left).
The more you speed up moving the @boardname@ in this direction,
the taller the lines in the bar graph will be, 
until they are as tall as the parameter `high` says they can be.

```blocks
basic.forever(() => {
    let a = input.acceleration(Dimension.X);
    led.plotBarGraph(a, 1023)
})
```

## See also

[brightness](/reference/led/brightness), [fade in](/reference/led/fade-in), [fade out](/reference/led/fade-out), [LED screen](/device/screen), [stop animation](/reference/led/stop-animation)

