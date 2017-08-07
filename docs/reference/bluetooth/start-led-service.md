# Bluetooth LED Service 

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

The Bluetooth LED service allows another device such as a smartphone to send short text strings or patterns over a Bluetooth connection to a @boardname@ for display on its LED matrix. Text will scroll across the @boardname@ and the speed at which it scrolls can also be controlled using the Bluetooth LED service. Devices using the LED service may also read the current state of the @boardname@'s LED matrix.

So you could, for example, draw a smiley face in a smartphone app and at the press of a button, have it magically appear on your @boardname@ on the other side of the room. Or you could program your smartphone to send a message to your @boardname@ whenever your phone receives an email, SMS or social media message so you could wear your @boardname@ like a smart watch and leave your phone in your bag. 

No additional code is needed on the @boardname@ to use the Bluetooth LED service from another device.

```sig
bluetooth.startLEDService();
```

## Example: Starting the Bluetooth LED service

The following code shows the Bluetooth LED service being started:

```blocks
bluetooth.startLEDService();
```

## Video - LED service demo starts at 2:00

http://www.youtube.com/watch?v=aep_GVowKfs

## Advanced
 
For more advanced information on the @boardname@ Bluetooth LED service including information on using a smartphone, see the [Lancaster University @boardname@ runtime technical documentation](http://lancaster-university.github.io/microbit-docs/ble/led-service/)

## See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```
