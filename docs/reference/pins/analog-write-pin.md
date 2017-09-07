# Analog Write Pin

Write an **analog** signal (`0` through `1023`) to the
[pin](/device/pins) you say.

```sig
pins.analogWritePin(AnalogPin.P0, 400)
```

## Parameters

* ``name`` is a [string](/types/string) that is the pin name you say (`P0` through `P4`, or `P10`)
* ``value`` is a [number](/types/number) from `0` through `1023`

## Example

This program writes `1023` to pin `P0`.

```blocks
pins.analogWritePin(AnalogPin.P0, 1023)
```

### ~hint

When you tell it to write `256` (for example), this function does not
_really_ write `256`.  Instead, it writes a lot of different numbers,
and their average is `256`.

### ~

## See also

[@boardname@ pins](/device/pins), [on pin pressed](/reference/input/on-pin-pressed), [analog read pin](/reference/pins/analog-read-pin), [digital read pin](/reference/pins/digital-read-pin), [digital write pin](/reference/pins/digital-write-pin)

