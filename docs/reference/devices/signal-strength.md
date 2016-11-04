# Signal Strength

Returns the signal strength reported by the paired device from ``0`` (no signal) to ``4`` (full strength).

### ~hint

The functions in the ``devices`` namespace allow the @boardname@ to communicate with a separate (remote) device, 
such as a smartphone, over Bluetooth (Smart).
The set of supported events will depend on the remote device and the @boardname@ apps available for the remote device.

### ~

```sig
devices.signalStrength();
```

### Returns

* the signal strength from ``0`` (no signal) to ``4`` (full strength).

### Examples

Display the signal strength on screen:

```blocks
devices.onSignalStrengthChanged(() => {
    basic.showNumber(devices.signalStrength(), 150)
})
```

### See Also

[tell remote control to](/reference/devices/tell-remote-control-to), [raise alert to](/reference/devices/raise-alert-to), [on signal strength changed](/reference/devices/on-signal-strength-changed)

```package
devices
```