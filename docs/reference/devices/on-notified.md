# On Signal Strength Changed

Register code to run when the signal strength of the paired device changes.

### ~hint

The functions in the ``devices`` namespace allow the @boardname@ to communicate with a separate (remote) device, 
such as a smartphone, over Bluetooth (Smart).
The set of supported events will depend on the remote device and the @boardname@ apps available for the remote device.

### ~


```sig
devices.onNotified(MesDeviceInfo.IncomingCall, () => {})
```

### Parameters

* ``body``: code to run when the signal strength changes.

### Examples

Display the signal strength on screen:

```blocks
devices.onNotified(MesDeviceInfo.IncomingCall, () => {
    basic.showString("RING RING")
})
```

### See Also

[tell remote control to](/reference/devices/tell-remote-control-to), [raise alert to](/reference/devices/raise-alert-to), [signal strength](/reference/devices/signal-strength)

```package
devices
```