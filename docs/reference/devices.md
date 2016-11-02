# Devices

Control a phone with the @boardname@ via Bluetooth.

```cards
devices.tellCameraTo(MesCameraEvent.TakePhoto);
devices.tellRemoteControlTo(MesRemoteControlEvent.play);
devices.raiseAlertTo(MesAlertEvent.DisplayToast);
devices.onNotified(MesDeviceInfo.IncomingCall, () => {
    
});
devices.onGamepadButton(MesDpadButtonInfo.ADown, () => {
    
});
devices.signalStrength();
devices.onSignalStrengthChanged(() => {
    
});
```

```package
devices
```

### See Also

[tellCameraTo](/reference/devices/tell-camera-to), [tellRemoteControlTo](/reference/devices/tell-remote-control-to), [raiseAlertTo](/reference/devices/raise-alert-to), [onNotified](/reference/devices/on-notified), [onGamepadButton](/reference/devices/on-gamepad-button), [signalStrength](/reference/devices/signal-strength), [onSignalStrengthChanged](/reference/devices/on-signal-strength-changed)
