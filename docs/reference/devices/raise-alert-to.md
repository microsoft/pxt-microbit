# raise alert to

Raise an alert on a remote device.

## ~hint

**App required** You must use one of the [micro:bit apps](https://microbit.org/guide/mobile/) to use this functionality.

## ~



```sig
devices.raiseAlertTo(MesAlertEvent.Vibrate)
```

## Parameters

* event - an event identifier

## Examples

To tell the connected device to display toast

```blocks
devices.raiseAlertTo(MesAlertEvent.DisplayToast)
```

To tell the connected device to vibrate

```blocks
devices.raiseAlertTo(MesAlertEvent.Vibrate)
```

To tell the connected device to play a sound

```blocks
devices.raiseAlertTo(MesAlertEvent.PlaySound)
```

To tell the connected device to play a ringtone

```blocks
devices.raiseAlertTo(MesAlertEvent.PlayRingtone)
```

To tell the connected device to find my phone

```blocks
devices.raiseAlertTo(MesAlertEvent.FindMyPhone)
```

To tell the connected device to ring alarm

```blocks
devices.raiseAlertTo(MesAlertEvent.RingAlarm)
```

## See also

[tell remote control to](/reference/devices/tell-remote-control-to), [tell camera to](/reference/devices/tell-camera-to)

```package
devices
```