# On Data Received

> Note: This API has been deprecated! Use [on received number](/reference/radio/on-received-number) instead.

Run part of a program when the @boardname@ receives a
[number](/types/number) or [string](/types/string) over ``radio``.


```sig
radio.onDataReceived(() => { });
```

## Example

This program keeps sending numbers that says how fast the @boardname@ is
slowing down or speeding up.  It also receives numbers for the same
thing from nearby @boardname@s. It shows these numbers as a
[bar graph](/reference/led/plot-bar-graph).

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.X));
})
radio.onDataReceived(() => {
    led.plotBarGraph(radio.receiveNumber(), 1023);
})
```

## See also

[on received number](/reference/radio/on-received-number),
[send number](/reference/radio/send-number), [set group](/reference/radio/set-group)

```package
radio
```