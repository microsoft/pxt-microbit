# On Data Received

Run part of a program when the micro:bit receives a
[number](/reference/types/number) or [string](/reference/types/string) over ``radio``.


```sig
radio.onDataReceived(() => { });
```

### Simulator

This function only works on the micro:bit, not in browsers.

### Example

This program keeps sending numbers that says how fast the micro:bit is
slowing down or speeding up.  It also receives numbers for the same
thing from nearby micro:bits. It shows these numbers as a
[bar graph](/reference/led/plot-bar-graph).

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.X));
})
radio.onDataReceived(() => {
    led.plotBarGraph(radio.receiveNumber(), 1023);
})
```

### See also

[receive number](/reference/radio/receive-number),
[send number](/reference/radio/send-number), [set group](/reference/radio/set-group)

```package
radio
```