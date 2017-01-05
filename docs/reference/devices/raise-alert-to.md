# raise alert to

Raise an alert on a remote device.

### ~hint

The functions in the ``devices`` namespace allow the @boardname@ to communicate with a separate (remote) device, 
such as a smartphone, over Bluetooth (Smart).
The set of supported events will depend on the remote device and the @boardname@ apps available for the remote device.

### ~


```sig
export function raiseAlertTo(event: string)
```

### Parameters

* event - an event identifier

### Examples

To tell the connected device to display toast

```blocks
devices.raiseAlertTo("display toast")
```

To tell the connected device to vibrate

```blocks
devices.raiseAlertTo("vibrate")
```

To tell the connected device to play a sound

```blocks
devices.raiseAlertTo("play sound")
```

To tell the connected device to play a ringtone

```blocks
devices.raiseAlertTo("play ringtone")
```

To tell the connected device to find my phone

```blocks
devices.raiseAlertTo("find my phone")
```

To tell the connected device to ring alarm

```blocks
devices.raiseAlertTo("ring alarm")
```

### See also

[tell remote control to](/reference/devices/tell-remote-control-to), [tell camera to](/reference/devices/tell-camera-to)

```package
devices
```