# On Signal Strength Changed

Register code to run when the signal strength of the paired device changes.

### ~hint

The functions in the ``devices`` namespace allow the BBC micro:bit to communicate with a separate (remote) device, 
such as a smartphone, over Bluetooth (Smart).
The set of supported events will depend on the remote device and the BBC micro:bit apps available for the remote device.

### ~


```sig
devices.onSignalStrengthChanged(() => {})
```

### Parameters

* ``body``: code to run when the signal strength changes.

### Examples

Display the signal strength on screen:

```blocks
devices.onSignalStrengthChanged(() => {
    basic.showNumber(devices.signalStrength(), 150)
})
```

### See Also

[tell remote control to](/reference/devices/tell-remote-control-to), [raise alert to](/reference/devices/raise-alert-to), [signal strength](/reference/devices/signal-strength)

```package
devices
```