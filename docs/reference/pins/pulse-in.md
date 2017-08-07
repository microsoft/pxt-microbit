# Pulse In

Returns the duration of a pulse (high or low) from a [pin](/device/pins) on
the @boardname@ board in microseconds.

```sig
pins.pulseIn(DigitalPin.P0, PulseValue.High)
```

## ~avatar

Some pins are also used by the [LED screen](/device/screen).
Please read the [page about pins](/device/pins) carefully.

## ~

## Parameters

* ``name`` is a [string](/types/string) that stores the name of the pin (``P0``, ``P1``, or ``P2``, up through ``P20``)
* ``value`` is the value of the pulse, ``high`` or ``low``
* ``maxDuration``, maximum duration in micro-seconds. If no pulse is received 

## Returns

* a [number](/types/number) that represents the pulse duration in micro-seconds

## Example: Measuring distance with a sonar

The following script sends a pulse on ``P0`` and reads the pulse returned by a HC-SR04 sonar to determine the distance of the object in front of the sensor.

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

### ~hint

This function is not supported in the simulator.

### ~

## See also

[digital write pin](/reference/pins/digital-write-pin),
