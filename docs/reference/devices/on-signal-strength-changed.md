# On Signal Strength Changed

Register code to run when the signal strength of the paired device changes.

## ~hint

**App required** You must use one of the [micro:bit apps](https://microbit.org/guide/mobile/) to use this functionality.

## ~



```sig
devices.onSignalStrengthChanged(() => {})
```

## Parameters

* ``body``: code to run when the signal strength changes.

## Examples

Display the signal strength on screen:

```blocks
devices.onSignalStrengthChanged(() => {
    basic.showNumber(devices.signalStrength())
})
```

## See Also

[tell remote control to](/reference/devices/tell-remote-control-to), [raise alert to](/reference/devices/raise-alert-to), [signal strength](/reference/devices/signal-strength)

```package
devices
```