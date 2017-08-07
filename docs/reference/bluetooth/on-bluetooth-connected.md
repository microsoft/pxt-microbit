# On Bluetooth Connected 

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

This block starts an [event handler](/reference/event-handler) which in this case will run 
when something connects to your @boardname@ using Bluetooth.

```sig
bluetooth.onBluetoothConnected(() => {});
```

## Example

You could use this event handler to display a letter "C" on the @boardname@ LED grid so you know you have a Bluetooth connection. Or you might want to send some data you've been accumulating to your smartphone as soon as it connects to your @boardname@. Maybe you've been using the accelerometer in your @boardname@ to count your steps for example. Using this event handler you could send the accumulated step count to your phone when it establishes a Bluetooth connection.     

```blocks
bluetooth.onBluetoothConnected(() => {
    basic.showString("C");
});
```

## Video - on Bluetooth connected

http://www.youtube.com/watch?v=HyBcsD9Eh6I

## See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```