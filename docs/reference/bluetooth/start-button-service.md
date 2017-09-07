# Bluetooth Button Service 

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

The Bluetooth button service makes it possible for another device such as a smartphone to be notified wirelessly whenever a button on the front of a @boardname@ is pressed. Each of the two @boardname@ buttons can be in one of three possible states:

* Not pressed
* Pressed
* Long press - pressed and held down for at least 2 seconds  

The button service allows you to make other things which are connected to your @boardname@ using Bluetooth respond in some way when you press either of the buttons. You could, for example, hide your smartphone somewhere in the room and have it make an amusing noise when you press either of the buttons on your @boardname@. We'll leave it to you to decide what would be amusing.

No additional code is needed on the @boardname@ to use the Bluetooth button service from another device.

```sig
bluetooth.startButtonService();
```

## Example: Starting the Bluetooth button service

The following code shows the Bluetooth button service being started:

```blocks
bluetooth.startButtonService();
```

## Video - Button service demo - Starts at 0:59

http://www.youtube.com/watch?v=aep_GVowKfs

## Advanced
 
For more advanced information on the @boardname@ Bluetooth button service including information on using a smartphone, see the [Lancaster University @boardname@ runtime technical documentation](http://lancaster-university.github.io/microbit-docs/ble/button-service/)

## See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```
