# Bluetooth Temperature Service 

### ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the micro:bit has, it must first be [paired with the micro:bit](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the micro:bit and exchange data relating to many of the micro:bit's features.

### ~

A micro:bit is able to provide a rough measure of the current environmental temperature. It's an approximation only as in fact the temperature value is inferred from the temperature of its main processor. The Bluetooth temperature service allows another device such as a smartphone to wirelessly find out the micro:bit's current temperature reading or to receive a constant stream of temperature data values. Temperature values are expressed in degrees celsius.

Using the Bluetooth temperature service you could turn your smartphone or tablet into a graphical thermometer using your micro:bit as the sensor. 

No additional code is needed on the micro:bit to use the Bluetooth temperature service from another device.

```sig
bluetooth.startTemperatureService();
```

### Example: Starting the Bluetooth temperature service

The following code shows the Bluetooth temperature service being started:

```blocks
bluetooth.startTemperatureService();
```

### Video - Temperature service demo - Starts at 3:05

http://www.youtube.com/watch?v=aep_GVowKfs

### Advanced
 
For more advanced information on the micro:bit Bluetooth temperature service including information on using a smartphone, see the [Lancaster University micro:bit runtime technical documentation](http://lancaster-university.github.io/microbit-docs/ble/temperature-service/)

### See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [micro:bit Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [micro:bit Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on micro:bit resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)


```package
bluetooth
```

