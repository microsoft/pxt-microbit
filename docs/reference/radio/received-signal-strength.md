# received Signal Strength

Find how strong the radio signal is.

```sig
radio.receivedSignalStrength();
```

## ~ hint

**Deprecated**

This API has been deprecated! Use [received packet](/reference/radio/received-packet) instead.

## ~

Find how strong the ``radio`` signal is, from `-128` to `-42`.
(`-128` means a weak signal and `-42` means a strong one.)

The @boardname@ finds the signal strength by checking how strong it was
the last time it ran the
[on received number](/reference/radio/on-received-number) function. That means
it needs to run **receive number** first.



## Returns

* a [number](/types/number) between `-128` and `-42` that means
how strong the signal is.

## Simulator

This function only works on the @boardname@, not in browsers.

## Example

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

## See also

[on received number](/reference/radio/on-received-number), [send number](/reference/radio/send-number), [on data received](/reference/radio/on-data-received)

```package
radio
```