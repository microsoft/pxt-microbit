# Set Pull

Configure the electrical pull of the specified pin.

Many @boardname@ pins can be configured as _pull-ups_.  For example, a
pull-up can set a pin's voltage to high (3.3 volts, or `1` when
calling [digital read pin](/reference/pins/digital-read-pin)).  If one
end of a button is connected to ``P0`` (set to high) and the other end
is connected to ``GND`` (0 volts), then when you press the button,
``P0`` is driven to 0 volts, and the @boardname@ software can detect a
button press.

```sig
pins.setPull(DigitalPin.P9, PinPullMode.PullDown);
```

The pull-up and -down resistors are about 13kOhm.

## Parameters

* ``name``: The @boardname@ hardware pin to configure (``P0``-``P20``)
* ``pull``: The pull to which to set the pin (**down**, **up**, or **none**)

## Example

The following example sets the pull of pin ``P0`` to **up** (high).

```blocks
pins.setPull(DigitalPin.P0, PinPullMode.PullUp);
```

## See also

[@boardname@ | mbed](https://developer.mbed.org/platforms/Microbit/)
