# Analog Set Period

Configure the period of Pulse Width Modulation (PWM) on the specified 
analog [pin](/device/pins).
Before you call this function, you should set the specified pin as analog.

```sig
pins.analogSetPeriod(AnalogPin.P0, 20000)
```

## Parameters

* ``name``: a [string](/types/string) that specifies the pin to configure (`P0` through `P4`, or `P10`)
* ``micros``: a [number](/types/number) that specifies the analog period in microseconds.

The following code first sets `P0` to analog with **analog write
pin**, and then sets the PWM period of `P0` to 20,000 microseconds.

```blocks
pins.analogWritePin(AnalogPin.P0, 512)
pins.analogSetPeriod(AnalogPin.P0, 20000)
```

## See also

[@boardname@ pins](/device/pins),
[on pin pressed](/reference/input/on-pin-pressed),
[analog read pin](/reference/pins/analog-read-pin),
[analog write pin](/reference/pins/analog-write-pin),
[digital read pin](/reference/pins/digital-read-pin),
[digital write pin](/reference/pins/digital-write-pin)
