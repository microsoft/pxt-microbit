# tell camera to

Access the photo/video-taking functionality of a remote device using the ``tell camera to`` function.

### ~hint

The functions in the ``devices`` namespace allow the BBC micro:bit to communicate with a separate (remote) device, 
such as a smartphone, over Bluetooth (Smart).
The set of supported events will depend on the remote device and the BBC micro:bit apps available for the remote device.

### ~

```sig
devices.tellCameraTo()
```

### Parameters

* event - an event identifier

### Examples

To tell the connected device to take a picture:

```blocks
devices.tellCameraTo("take photo")
```

To tell the connected device to start recording a video

```blocks
devices.tellCameraTo("start video capture")
```

To tell the connected device to stop recording a video

```blocks
devices.tellCameraTo("stop video capture")
```

To tell the connected device to toggle front-rear

```blocks
devices.tellCameraTo("toggle front-rear")
```

To tell the connected device to launch photo mode

```blocks
devices.tellCameraTo("launch photo mode")
```

To tell the connected device to launch video mode

```blocks
devices.tellCameraTo("launch video mode")
```

To tell the connected device to stop photo mode

```blocks
devices.tellCameraTo("stop photo mode")
```

To tell the connected device to stop video mode

```blocks
devices.tellCameraTo("stop video mode")
```

### See Also

[tell remote control to](/reference/devices/tell-remote-control-to), [raise alert to](/reference/devices/raise-alert-to)

```package
devices
```
