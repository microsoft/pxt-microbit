# Signal Strength

Returns the signal strength reported by the paired device from ``0`` (no signal) to ``4`` (full strength).

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

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