# plot Bar Graph

Display a bar graph for a number value.

```sig
led.plotBarGraph(2, 20);
```

A bar graph is a kind of chart that shows numbers as lines with different lengths.

## Parameters

* **value**: a [number](/types/number) that is the value of what you
  are measuring or trying to show. For example, if you are measuring
  the temperature of ice with the @boardname@, ``value`` might be `0`
  if the temperature is 0 degrees Celsius.
* **high**: a [number](/types/number) that is the highest
  possible number (maximum) that the **value** parameter can be. The lines in the bar graph will reach their highest point when **value** reaches this number. If **high** is `0`, then the largest value recently plotted is used as the maximum.

## Example: chart acceleration

Show a bar graph of the [acceleration](/reference/input/acceleration) 
in the `x` direction of the @boardname@.
The @boardname@'s `x` direction is from left to right (or right to left).
The faster you move the @boardname@ in this direction,
the taller the lines in the bar graph will be. The **high** paramter is `1023` which sets the highest possible value of acceleration to show.

```blocks
basic.forever(() => {
    let a = input.acceleration(Dimension.X);
    led.plotBarGraph(a, 1023)
})
```

## See also

[brightness](/reference/led/brightness), [fade in](/reference/led/fade-in), [fade out](/reference/led/fade-out), [LED screen](/device/screen), [stop animation](/reference/led/stop-animation)

