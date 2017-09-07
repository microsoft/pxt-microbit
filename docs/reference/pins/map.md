# Map

Remaps the specified value from one range to another. This function
maps the value of ``from low`` to the value of ``to low``, the value
of ``from high`` to the value of ``to high``, and intermediate values
to intermediate values.

This function does not constrain values to the ranges, because
out-of-range values are sometimes intended and useful.  If you need to
limit a range, you can use the ``Math.clamp`` function before or after
calling this function.

```sig
pins.map(0, 0, 4, 0, 1023);
```

## Parameters

* ``value``: a [number](/types/number) that specifies the value to map
* ``fromLow``: a [number](/types/number)  that specifies the lower bound of the origin interval
* ``fromHigh``: a [number](/types/number)  that specifies the upper bound of the origin interval
* ``toLow``: a [number](/types/number)  that specifies the lower bound of the target interval
* ``toHigh``: a [number](/types/number)  that specifies the upper bound of the target interval

## Example

This example maps the value read from the analog pin `P0` to an LED
coordinate between `0` and `4`.

```blocks
let value1 = pins.analogReadPin(AnalogPin.P0)
let index = pins.map(value1, 0, 1023, 0, 4)
led.plot(0, index)
```

## See also

[analog read pin](/reference/pins/analog-read-pin)

