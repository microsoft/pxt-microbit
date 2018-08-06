# On Notified

Register code to run when the signal strength of the paired device changes.

## ~hint

**App required** You must use one of the [micro:bit apps](https://microbit.org/guide/mobile/) to use this functionality.

## ~

```sig
devices.onNotified(MesDeviceInfo.IncomingCall, () => {})
```

## Parameters

* ``body``: code to run when the signal strength changes.

## Examples

Display the signal strength on screen:

```blocks
devices.onNotified(MesDeviceInfo.IncomingCall, () => {
    basic.showString("RING RING")
})
```

## See Also

[tell remote control to](/reference/devices/tell-remote-control-to), [raise alert to](/reference/devices/raise-alert-to), [signal strength](/reference/devices/signal-strength)

```package
devices
```