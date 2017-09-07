# raise alert to

Raise an alert on a remote device.

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

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