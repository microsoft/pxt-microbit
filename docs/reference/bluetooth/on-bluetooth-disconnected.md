# On Bluetooth Disconnected 

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

This block starts an [event handler](/reference/event-handler) which in this case will run when a device which is connected to your @boardname@ over Bluetooth disconnects.

You could use this event handler to display a letter "D" on the @boardname@ LED grid so you know that the Bluetooth connection has been closed.

```sig
bluetooth.onBluetoothDisconnected(() => {
});
```

## Example: Displaying "D" when a Bluetooth connection to the @boardname@ is closed

```blocks
bluetooth.onBluetoothDisconnected(() => {
    basic.showString("D");
});
```

## Video - on Bluetooth disconnected

http://www.youtube.com/watch?v=HyBcsD9Eh6I

## See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```
