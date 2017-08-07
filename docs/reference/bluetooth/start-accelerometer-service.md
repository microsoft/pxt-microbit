# Bluetooth Accelerometer Service 

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

The Bluetooth accelerometer service allows another device such as a smartphone to wirelessly receive data from the @boardname@'s accelerometer. An accelerometer detects motion. More precisely, it measures acceleration in one or more of three directions which we call X, Y and Z. 

Using the Bluetooth accelerometer service you could, for example, create a smartphone application which makes a loud noise whenever your @boardname@ (or the important thing you've attached it to) is moved. Or you could use your @boardname@ to control the movement of a cartoon character in a game on your smartphone just by tilting the @boardname@ in the direction you want the character to move in.     

No additional code is needed on the @boardname@ to use the Bluetooth accelerometer service from another device.

```sig
bluetooth.startAccelerometerService();
```

## Example: Starting the Bluetooth accelerometer service

The following code shows the Bluetooth accelerometer service being started:

```blocks
bluetooth.startAccelerometerService();
```

## Video - Accelerometer service demo - Starts at 0:18

http://www.youtube.com/watch?v=aep_GVowKfs#t=18s

## Advanced
 
For more advanced information on the @boardname@ Bluetooth accelerometer service including information on using a smartphone, see the [Lancaster University @boardname@ runtime technical documentation](http://lancaster-university.github.io/microbit-docs/ble/accelerometer-service/)

## See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```
