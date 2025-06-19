# digital Pin

Get an digital pin number for a pin identifier.

```sig
pins._digitalPin(DigitalPin.P3)
```

## Parameters

* **pin**: a pin identifier for an digital pin (`P0` through `P20`).

## Returns

* a pin [number](/types/number) for the pin identifier.

## Example: football score keeper

This program reads pin `P0` to find when a goal is scored. When `P0`
is `1`, the program makes the score bigger and plays a buzzer sound
through `P2` with ``||pins:digital write pin||``. Use pin variables
to set the read and write pin numbers.

```blocks
let score = 0
let readPin = DigitalPin.P0
let writePin = DigitalPin.P2
basic.showNumber(score)
basic.forever(() => {
    if (pins.digitalReadPin(readPin) == 1) {
        score++;
        pins.digitalWritePin(writePin, 1)
        basic.showNumber(score)
        basic.pause(1000)
        pins.digitalWritePin(writePin, 0)
    }
})
```

## See also

[digital read pin](/reference/pins/digital-read-pin),
[digital write pin](/reference/pins/digital-write-pin)
