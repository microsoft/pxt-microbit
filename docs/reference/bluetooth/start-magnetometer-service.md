# Bluetooth Magnetometer Service 

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

The Bluetooth magnetometer service allows another device such as a smartphone to wirelessly receive data from the @boardname@'s magnetometer. The magnetometer measures the strength and direction of magnetic fields including the earth's and so it can be used as a digital compass and indicate the way the @boardname@ is pointing relative to magnetic north.

Using the Bluetooth magnetometer service you could, for example, create a smartphone application which displays your direction of travel, updating it in real time.   

No additional code is needed on the @boardname@ to use the Bluetooth magnetometer service from another device.

```sig
bluetooth.startMagnetometerService();
```

## Example: Starting the Bluetooth magnetometer service

The following code shows the Bluetooth magnetometer service being started:

```blocks
bluetooth.startMagnetometerService();
```

## Video - Magnetometer service demo

http://www.youtube.com/watch?v=C_0VL4Gp4_U

## Advanced
 
For more advanced information on the @boardname@ Bluetooth magnetometer service including information on using a smartphone, see the [Lancaster University @boardname@ runtime technical documentation](http://lancaster-university.github.io/microbit-docs/ble/magnetometer-service/)

## See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)


```package
bluetooth
```
