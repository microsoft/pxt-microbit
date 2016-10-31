# Bluetooth Accelerometer Service 

### ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the micro:bit has, it must first be [paired with the micro:bit](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the micro:bit and exchange data relating to many of the micro:bit's features.

### ~

The Bluetooth accelerometer service allows another device such as a smartphone to wirelessly receive data from the micro:bit's accelerometer. An accelerometer detects motion. More precisely, it measures acceleration in one or more of three directions which we call X, Y and Z. 

Using the Bluetooth accelerometer service you could, for example, create a smartphone application which makes a loud noise whenever your micro:bit (or the important thing you've attached it to) is moved. Or you could use your micro:bit to control the movement of a cartoon character in a game on your smartphone just by tilting the micro:bit in the direction you want the character to move in.     

No additional code is needed on the micro:bit to use the Bluetooth accelerometer service from another device.

```sig
bluetooth.startAccelerometerService();
```

### Example: Starting the Bluetooth accelerometer service

The following code shows the Bluetooth accelerometer service being started:

```blocks
bluetooth.startAccelerometerService();
```

### Video - Accelerometer service demo - Starts at 0:18

http://www.youtube.com/watch?v=aep_GVowKfs#t=18s

## Apps

### [Bitty Data Logger](http://www.bittysoftware.com/apps/bitty_data_logger.html)

With **Bitty Data Logger** you can capture and chart accelerometer data from your micro:bit over Bluetooth. 
This means you can track and analyse the movement in space of your micro:bit, in terms of its acceleration.

https://www.youtube.com/watch?v=TFmNRWGTBtM

### Advanced
 
For more advanced information on the micro:bit Bluetooth accelerometer service including information on using a smartphone, see the [Lancaster University micro:bit runtime technical documentation](http://lancaster-university.github.io/microbit-docs/ble/accelerometer-service/)

### See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [micro:bit Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [micro:bit Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on micro:bit resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```
