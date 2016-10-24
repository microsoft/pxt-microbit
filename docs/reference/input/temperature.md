# Temperature

Find the temperature where you are. The temperature is measured in Celsius (metric).
The micro:bit can find the temperature nearby by checking how hot its computer chips are.

```sig
input.temperature();
```

### Returns

* a [Number](/reference/types/number) that means the Celsius temperature.

### How does it work?

The BBC micro:bit checks how hot its CPU (main computer chip) is.
Because the micro:bit does not usually get very hot, the temperature of the CPU
is usually close to the temperature of wherever you are.
The micro:bit might warm up a little if you make it work hard, though!

### Example: micro:bit thermometer

The following example uses `temperature` and `show number` to show the temperature of the room.

```blocks
basic.forever(() => {
    let temp = input.temperature()
    basic.showNumber(temp)
})
```
### Example: Fahrenheit thermometer

This program measures the temperature using Fahrenheit degrees.
Fahrenheit is a way of measuring temperature that is commonly used in the United States.
To make a Celsius temperature into a Fahrenheit one, multiply the Celsius temperature by
``18``, divide by ``10`` and add ``32``.

```blocks
basic.forever(() => {
    let c = input.temperature()
    let f = (c * 18) / 10 + 32
    basic.showNumber(f)
})
```

### ~hint

Try comparing the temperature your micro:bit shows to a real thermometer in the same place.
You might be able to figure out how much to subtract from the number the micro:bit
shows to get the real temperature. Then you can change your program so the micro:bit is a 
better thermometer.

### ~

### See also

[compass-heading](/reference/input/compass-heading), [acceleration](/reference/input/acceleration)

