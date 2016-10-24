# On Bluetooth Disconnected 

### ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the micro:bit has, it must first be [paired with the micro:bit](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the micro:bit and exchange data relating to many of the micro:bit's features.

### ~

This block starts an [event handler](/reference/event-handler) which in this case will run when a device which is connected to your micro:bit over Bluetooth disconnects.

You could use this event handler to display a letter "D" on the micro:bit LED grid so you know that the Bluetooth connection has been closed.

```sig
bluetooth.onBluetoothDisconnected(() => {
});
```

### Example: Displaying "D" when a Bluetooth connection to the micro:bit is closed

```blocks
bluetooth.onBluetoothDisconnected(() => {
    basic.showString("D");
});
```

### Video - on Bluetooth disconnected

http://www.youtube.com/watch?v=HyBcsD9Eh6I

### See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [micro:bit Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [micro:bit Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on micro:bit resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```
