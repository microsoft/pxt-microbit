# Bluetooth

Support for additional Bluetooth services.

### ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

### ~


```cards
bluetooth.startAccelerometerService();
bluetooth.startButtonService();
bluetooth.startIOPinService();
bluetooth.startLEDService();
bluetooth.startMagnetometerService();
bluetooth.startTemperatureService();
bluetooth.onBluetoothConnected(() => {});
bluetooth.onBluetoothDisconnected(() => {});
```

## UART 

```cards
bluetooth.startUartService();
bluetooth.uartReadUntil("");
bluetooth.uartWriteString("");
bluetooth.uartWriteNumber(0);
bluetooth.uartWriteValue("", 0);
```

```package
bluetooth
```

## Apps and SDKs

Here is a non-exhaustive list of apps and SDKs leveraging the Bluetooth services.

### [micro:bit for Android](https://play.google.com/store/apps/details?id=com.samsung.microbit&hl=en) by Samsung Electronics UK

Create games on your phone then ‘flash’ them on to your micro:bit to get playing.

### [micro:bit for iOS](https://itunes.apple.com/us/app/micro-bit/id1092687276?mt=8) by Science Scope

Create games on your phone then ‘flash’ them on to your micro:bit to get playing.

### [Bitty Software](http://www.bittysoftware.com/apps.html)

Bitty Audio Prank, Bitty Game Controller, Bitty Mood Lighting, Bitty Data Logger are apps that leverage the Bluetooth services. Available for Android and iOS.

### [node-bbc-microbit](https://github.com/sandeepmistry/node-bbc-microbit)

Control a BBC micro:bit from Node.JS using BLE.

### Advanced
 
For more advanced information on the @boardname@ Bluetooth UART service including information on using a smartphone, see the [Lancaster University @boardname@ runtime technical documentation](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

### See Also

[startAccelerometerService](/reference/bluetooth/start-accelerometer-service), [startButtonService](/reference/bluetooth/start-button-service), [startIOPinService](/reference/bluetooth/start-io-pin-service), [startLEDService](/reference/bluetooth/start-led-service), [startMagnetometerService](/reference/bluetooth/start-magnetometer-service), [startTemperatureService](/reference/bluetooth/start-temperature-service), 
[startUartService](/reference/bluetooth/start-uart-service),
[uartReadUntil](/reference/bluetooth/uart-read-until), 
[uartWriteString](/reference/bluetooth/uart-write-string), 
[uartWriteNumber](/reference/bluetooth/uart-write-number), 
[uartWriteValue](/reference/bluetooth/uart-write-value), 
[onBluetoothConnected](/reference/bluetooth/on-bluetooth-connected), [onBluetoothDisconnected](/reference/bluetooth/on-bluetooth-disconnected)
