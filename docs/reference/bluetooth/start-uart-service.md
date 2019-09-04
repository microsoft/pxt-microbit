# Bluetooth UART Service 

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

The Bluetooth UART service allows another device such as a smartphone to exchange any data it wants to with the @boardname@, in small chunks which are intended to be joined together. [UART](https://en.wikipedia.org/wiki/Universal_asynchronous_receiver/transmitter) stands for Universal Asynchronous Receiver Transmitter and is one way in which serial data communications can be performed, usually between two devices connected by a physical, wired connection. The Bluetooth UART service emulates the behaviour of a physical UART system and allows the exchange of a maximum of 20 bytes of data at a time in either direction. 

When this service is used, the @boardname@ sets up a 60 byte buffer and data it receives will be accumulated in the buffer until it is full. When using the UART service from your @boardname@ code, you can indicate a special character which will be used to mean that the entire message in at most three chunks has now been sent by the other, connected device, at which point the @boardname@ will release the entire contents of its buffer to any code trying to read it. In other words this special character, known as a 'delimiter' is used by the device connected to the @boardname@ to mean "I've sent my whole message, you can now use it".

You could use the UART service for many things. It doesn't care what you put in messages which makes it very flexible. You could create a guessing game, with questions and answers passing between @boardname@ and a smartphone or you could connect a camera to the @boardname@ and transmit image data obtained from the edge connector, in chunks over Bluetooth to a smartphone. There are a great many possibilities. 

To use the Bluetooth UART service from another device you'll need additional @boardname@ code which reads and uses data from the UART buffer and / or writes data to the buffer for transmission over Bluetooth to another device.

```sig
bluetooth.startUartService();
```

## Example: Starting the Bluetooth UART service

The following code shows the Bluetooth UART service being started:

```blocks
bluetooth.startUartService();
```

## Video - UART service guessing game

https://www.youtube.com/watch?v=PgGeWddMAZ0

## Advanced
 
For more advanced information on the @boardname@ Bluetooth UART service including information on using a smartphone, see the [Lancaster University @boardname@ runtime technical documentation](http://lancaster-university.github.io/microbit-docs/ble/uart-service/)

## See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```
