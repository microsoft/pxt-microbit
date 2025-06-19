# plot Bar Graph

Display a bar graph for a number value.

```sig
led.plotBarGraph(2, 20);
```

A bar graph is a kind of chart that shows numbers as lines with different lengths. The value is plotted in LEDs as a ratio of a **value** to the **high** value you set as a maximum range. So, if there are 25 LEDs on the screen, then plotting `9` for the high value of `50` would display about 5 LEDs on the screen.

## Parameters

* **value**: a [number](/types/number) that is the value of what you
  are measuring or trying to show. For example, if you are measuring
  the temperature of ice with the @boardname@, ``value`` might be `0`
  if the temperature is 0 degrees Celsius.
* **high**: a [number](/types/number) that is the highest
  possible number (maximum) that the **value** parameter can be. The lines in the bar graph will reach their highest point when **value** reaches this number. If **high** is `0`, then the largest value recently plotted is used as the maximum.
* **valueToConsole**: a [boolean](/types/boolean) value that when `true` will also send the **value** to the serial port. A value of `false` will prevent the number in **value** from going to the serial output.

### ~hint

#### Serial Output

The ``||led:plot bar graph||`` block will also write the number from **value** to the [serial](/reference/serial) port if you set the **valueToConsole** parameter to `true`. This is a way to help you record the values you've plotted.

### ~

## Example: chart acceleration

Show a bar graph of the [acceleration](/reference/input/acceleration) 
in the `x` direction of the @boardname@.
The @boardname@'s `x` direction is from left to right (or right to left).
The faster you move the @boardname@ in this direction,
the taller the lines in the bar graph will be. The **high** paramter is `1023` which sets the highest possible value of acceleration to show. Also, record the acceleration value by sending it to the serial port.

```blocks
basic.forever(() => {
    let a = input.acceleration(Dimension.X);
    led.plotBarGraph(a, 1023, true)
})
```

## See also

[brightness](/reference/led/brightness), [fade in](/reference/led/fade-in), [fade out](/reference/led/fade-out), [LED screen](/device/screen), [stop animation](/reference/led/stop-animation)

