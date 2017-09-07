# Analog Read Pin

Read an **analog** signal (`0` through `1023`) from the
[pin](/device/pins) you say.

```sig
pins.analogReadPin(AnalogPin.P0)
```

## Parameters

* ``name`` is a [string](/types/string) with the name of the pin
  you say (`P0` through `P4`, or `P10`)

## Returns

* a [number](/types/number) from `0` through `1023`

This program reads pin `P1` and shows the number
on the LED screen.

```blocks
basic.forever(() => {
    let value = pins.analogReadPin(AnalogPin.P1)
    basic.showNumber(value)
});
```

### ~hint

If you are using **analog read pin** with another @boardname@ running **analog write pin**, then things can get tricky. Remember that the @boardname@ that runs **analog set pin** writes 0's and 1's at a very high frequency to achieve an average of the desired value. Sadly, if you try to read that average from another @boardname@, then the @boardname@ will either read 0 or 1023. You could try to read a higher number of values (e.g. a million) in a loop, then computer then average. Alternatively, you can plug in a capacitor in-between the two @boardname@s.

### ~

## See also

[@boardname@ pins](/device/pins),
[on pin pressed](/reference/input/on-pin-pressed),
[analog write pin](/reference/pins/analog-write-pin),
[digital read pin](/reference/pins/digital-read-pin),
[digital write pin](/reference/pins/digital-write-pin)
