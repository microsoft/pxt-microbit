# Received Signal Strength

> Note: This API has been deprecated! Use [on data packet received](/reference/radio/on-data-packet-received) instead.

Find how strong the ``radio`` signal is, from `255` to `0`.
(`255` means a weak signal and `0` means a strong one.)

The micro:bit finds the signal strength by checking how strong it was
the last time it ran the
[on data packet received](/reference/radio/on-data-packet-received) function. That means
it needs to run **receive number** first.

```sig
radio.receivedSignalStrength();
```

### Returns

* a [number](/reference/types/number) between `255` and `0` that means
how strong the signal is.

### Simulator

This function only works on the micro:bit, not in browsers.

### Example

This example shows how strong the radio signal of the
[light level sender example](/reference/radio/send-number) is.

```blocks
let x = 0;
radio.setGroup(99);
basic.forever(() => {
    x = radio.receiveNumber();
    basic.showNumber(radio.receivedSignalStrength());
});
```

### See also

[on data packet received](/reference/radio/on-data-packet-received), [send number](/reference/radio/send-number), [on data received](/reference/radio/on-data-received)

```package
radio
```