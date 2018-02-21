# On Gamepad Button

Register code to run when the @boardname@ receives a command from the paired gamepad.

## ~hint

**App required** You must use one of the [micro:bit apps](https://microbit.org/guide/mobile/) to use this functionality.

## ~

```sig
devices.onGamepadButton(MesDpadButtonInfo.ADown, () => {})
```

## Parameters

* ``body``: Action code to run when the the @boardname@ receives a command from the paired gamepad.

## See Also

[tell remote control to](/reference/devices/tell-remote-control-to), [raise alert to](/reference/devices/raise-alert-to), [signal strength](/reference/devices/signal-strength), [on signal strength changed](/reference/devices/on-signal-strength-changed)

```package
devices
```