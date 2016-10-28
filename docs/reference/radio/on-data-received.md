# On Data Received

> Note: This API has been deprecated! Use [on data packet received](/reference/radio/on-data-packet-received) instead.

Run part of a program when the micro:bit receives a
[number](/reference/types/number) or [string](/reference/types/string) over ``radio``.


```sig
radio.onDataReceived(() => { });
```

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

[on data packet received](/reference/radio/on-data-packet-received),
[send number](/reference/radio/send-number), [set group](/reference/radio/set-group)

```package
radio
```