# Digital Write Pin

Write a **digital** (`0` or `1`) signal to a [pin](/device/pins) on
the @boardname@ board.

```sig
pins.digitalWritePin(DigitalPin.P1, 1)
```

## ~avatar

Some pins are also used by the [LED screen](/device/screen).
Please read the [page about pins](/device/pins) carefully.

## ~

## Parameters

* ``name`` is a [string](/types/string) that stores the name of the pin (``P0``, ``P1``, or ``P2``, up through ``P20``)
* ``value`` is a [number](/types/number) that can be either `0` or `1`

## Example: football score keeper

This program reads pin `P0` to find when a goal is scored.  When `P0`
is `1`, the program makes the score bigger and plays a buzzer sound
through `P2` with ``digital write pin``.

```blocks
let score = 0
basic.showNumber(score)
basic.forever(() => {
    if (pins.digitalReadPin(DigitalPin.P0) == 1) {
        score++;
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.showNumber(score)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
})
```

This program is a remote control for the score keeper program.  If you
connect `P1` on the remote control @boardname@ to `P0` on the score
keeper @boardname@, you can press button `B` on the remote. This program
will use ``digital write pin`` to make the other @boardname@ buzz and
make the score bigger.

```blocks
input.onButtonPressed(Button.B, () => {
    pins.digitalWritePin(DigitalPin.P1, 1);
    basic.pause(500);
    pins.digitalWritePin(DigitalPin.P1, 0);
});
```

## See also

[@boardname@ pins](/device/pins),
[digital read pin](/reference/pins/digital-read-pin),
[analog read pin](/reference/pins/analog-read-pin),
[analog write pin](/reference/pins/analog-write-pin),
[on pin pressed](/reference/input/on-pin-pressed)

