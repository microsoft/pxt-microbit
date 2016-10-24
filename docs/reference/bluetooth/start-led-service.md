# Bluetooth LED Service 

### ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the micro:bit has, it must first be [paired with the micro:bit](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the micro:bit and exchange data relating to many of the micro:bit's features.

### ~

The Bluetooth LED service allows another device such as a smartphone to send short text strings or patterns over a Bluetooth connection to a micro:bit for display on its LED matrix. Text will scroll across the micro:bit and the speed at which it scrolls can also be controlled using the Bluetooth LED service. Devices using the LED service may also read the current state of the micro:bit's LED matrix.

So you could, for example, draw a smiley face in a smartphone app and at the press of a button, have it magically appear on your micro:bit on the other side of the room. Or you could program your smartphone to send a message to your micro:bit whenever your phone receives an email, SMS or social media message so you could wear your micro:bit like a smart watch and leave your phone in your bag. 

No additional code is needed on the micro:bit to use the Bluetooth LED service from another device.

```sig
bluetooth.startLEDService();
```

### Example: Starting the Bluetooth LED service

The following code shows the Bluetooth LED service being started:

```blocks
bluetooth.startLEDService();
```

### Video - LED service demo starts at 2:00

http://www.youtube.com/watch?v=aep_GVowKfs

### Advanced
 
For more advanced information on the micro:bit Bluetooth LED service including information on using a smartphone, see the [Lancaster University micro:bit runtime technical documentation](http://lancaster-university.github.io/microbit-docs/ble/led-service/)

### See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [micro:bit Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [micro:bit Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on micro:bit resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```
