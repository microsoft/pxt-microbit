# On Gamepad Button

Register code to run when the @boardname@ receives a command from the paired gamepad.

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

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