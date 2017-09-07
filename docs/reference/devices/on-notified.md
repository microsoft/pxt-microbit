# On Signal Strength Changed

Register code to run when the signal strength of the paired device changes.

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

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