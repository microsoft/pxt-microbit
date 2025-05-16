# analog Pin

Get an analog pin number for a pin identifier.

```sig
pins._analogPin(AnalogPin.P0)
```

## Parameters

* **pin**: a pin identifier for an analog pin (`P0` through `P20`).

## Returns

* a pin [number](/types/number) for the pin identifier.

## Example

Set an analog pin variable for `P1`, read pin `P1`, and show the input value on the LED screen.

```blocks
let myPin = AnalogPin.P1
basic.forever(function() {
    let value = pins.analogReadPin(myPin)
    basic.showNumber(value)
})
```

## See also

[analog read pin](/reference/pins/analog-read-pin),
[analog write pin](/reference/pins/analog-write-pin)