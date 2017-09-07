# Servo Set Pulse

Configure the specified pin as analog output, set the period to 20
ms, and set the pulse width to the specified value.

```sig
pins.servoSetPulse(AnalogPin.P1, 1500)
```

## Parameters

* ``name``: a [string](/types/string) that specifies the pin to configure (`P0` through `P4`, or `P10`)
* ``micros``: a [number](/types/number) that specifies the analog period in microseconds.

## Example

The following code sets the servo pulse to `1000` microseconds.

```blocks
pins.servoSetPulse(AnalogPin.P0, 1000)
```

## See also

[@boardname@ pins](/device/pins),
[on pin pressed](/reference/input/on-pin-pressed),
[analog read pin](/reference/pins/analog-read-pin),
[digital read pin](/reference/pins/digital-read-pin),
[digital write pin](/reference/pins/digital-write-pin)
