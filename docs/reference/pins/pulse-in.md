# pulse In

Get the duration, in microseconds, of a pulse (high or low) from one of the pins.

```sig
pins.pulseIn(DigitalPin.P0, PulseValue.High)
```

## ~avatar

Some pins are also used by the [LED screen](/device/screen).
Please read the [page about pins](/device/pins) carefully.

## ~

### ~ hint

#### Simulator

This function needs real hardware to work with. It's not supported in the simulator.

### ~

## Parameters

* ``name`` the name of the pin (``P0``, ``P1``, or ``P2``, up through ``P20``).
* ``value`` the value of the pulse, either ``high`` or ``low``.
* ``maxDuration``, maximum duration to wait for the pulse in microseconds. If no pulse is received, the duration returned is `0`.

## Returns

* a [number](/types/number) that is the pulse duration in microseconds.

## Example: Measuring distance with a sonar

Send a pulse on ``P0`` and read a pulse returned by a HC-SR04 sonar ultrasonic sensor. The sensor determines the distance of the object in front of it.

```blocks
basic.forever(() => {
    // send pulse
    pins.digitalWritePin(DigitalPin.P0, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P0, 0)

    // read pulse
    led.plotBarGraph(pins.pulseIn(DigitalPin.P1, PulseValue.High) / 58, 0)
    basic.pause(100)
})
```

## See also

[digital write pin](/reference/pins/digital-write-pin)
