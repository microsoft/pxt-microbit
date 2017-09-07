# Pulse Duration

Gets the duration of the last pulse in microseconds.

This function should be called from an **on pulsed** handler.

```sig
pins.pulseDuration();
```

## Returns

The duration of the last pulse, measured in microseconds.

## Example

The following example waits for pin ``P0`` to be pulsed high, and then
displays the duration of the pulse in microseconds on the LED screen.

```blocks
pins.onPulsed(DigitalPin.P0, PulseValue.High, () => {
    basic.showNumber(pins.pulseDuration());
});
```

## See also

[servo set pulse](/reference/pins/servo-set-pulse),
[on pulsed](/reference/pins/on-pulsed),
[digital read pin](/reference/pins/digital-read-pin)
