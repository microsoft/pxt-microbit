# Signal Strength

Returns the signal strength reported by the paired device from ``0`` (no signal) to ``4`` (full strength).

## ~hint

**App required** You must use one of the [micro:bit apps](https://microbit.org/guide/mobile/) to use this functionality.

## ~


```sig
devices.signalStrength();
```

## Returns

* the signal strength from ``0`` (no signal) to ``4`` (full strength).

## Examples

Display the signal strength on screen:

```blocks
devices.onSignalStrengthChanged(() => {
    basic.showNumber(devices.signalStrength())
})
```

## See Also

[tell remote control to](/reference/devices/tell-remote-control-to), [raise alert to](/reference/devices/raise-alert-to), [on signal strength changed](/reference/devices/on-signal-strength-changed)

```package
devices
```