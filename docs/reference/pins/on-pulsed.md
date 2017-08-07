# On Pulsed

Configure the specified pin for digital input, and then
execute the associated code block whenever the pin
pulses **High** or **Low** (as specified).

```sig
pins.onPulsed(DigitalPin.P0, PulseValue.High, () => { });
```

## Parameters

* ``name``: The @boardname@ hardware pin to configure (``P0`` through ``P20``)
* ``pulse``: Which state will cause the associated block to execute (**High** or **Low**)

## Example

The following example configures pin ``P2`` for digital input,
and then displays the string `LOW` whenever ``P2`` pulses low.

```blocks
pins.onPulsed(DigitalPin.P2, PulseValue.Low, () => {
    basic.showString("LOW");
});
```

## See also

[servo set pulse](/reference/pins/servo-set-pulse),
[pulse duration](/reference/pins/pulse-duration),
[digital read pin](/reference/pins/digital-read-pin)
