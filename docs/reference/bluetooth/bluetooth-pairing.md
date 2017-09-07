# Bluetooth Pairing 

## ~hint
![](/static/bluetooth/Bluetooth_SIG.png)

For another device like a smartphone to use any of the Bluetooth "services" which the @boardname@ has, it must first be [paired with the @boardname@](/reference/bluetooth/bluetooth-pairing). Once paired, the other device may connect to the @boardname@ and exchange data relating to many of the @boardname@'s features.

## ~

## What is 'pairing'?

'Pairing' is what you have to do to have your @boardname@ trust another device like a smartphone and similarly, have your smartphone trust your @boardname@. Why 'trust'? Well, pairing is all about security. You wouldn't usually want just anyone's smartphone connecting to your @boardname@ and making it do things so by pairing *your* smartphone with *your* @boardname@ you ensure that only your devices can talk to each other.     

Once you've paired your @boardname@ with another device it also means that they are able to exchange information privately, without someone else being able to "see" the data they're exchanging over the air using Bluetooth. This is accomplished by data being [encrypted](https://en.wikipedia.org/wiki/Encryption) and pairing makes it possible for devices who trust each other to encrypt and decrypt data from each other.

# How do you pair your @boardname@ with another device?

Making your @boardname@ pair requires you to follow some simple steps which will be described shortly. What you do with the device you're pairing it to will vary slightly depending on what that device is. We'll look at how it's done with common smartphones and tablets here too.

To get your @boardname@ ready for pairing do the following:

1. Hold down buttons A and B on the front of your @boardname@ together. The front is the side with two buttons and the LED display. Keep the two buttons held down. Don't let go of them yet!
2. While still holding down buttons A and B, press and then release the reset button on the back of the @boardname@. Keep holding down buttons A and B.
3. You should see "PAIRING MODE!" start to scroll across the @boardname@ display. When you see this message start to appear you can release buttons A and B.
4. Eventually you'll see a strange pattern on your @boardname@ display. This is like your @boardname@'s signature. Other people's @boardname@s will probably display a different pattern.

Your @boardname@ is now ready to be paired with the other device. Read the section below which relates to your 'other' device and watch the video too. 

## How do you pair your @boardname@ with a Windows smartphone or tablet?

1. Go into Settings
2. Select Bluetooth
3. Switch your @boardname@ into 'pairing mode' using the steps above
4. Wait until 'PAIRING MODE!' has finished scrolling across the @boardname@ display. You should see your @boardname@ listed on your Windows smartphone with a name something like '@boardname@ [zatig]'. Note that the 5 characters in brackets at the end will vary.
5. On the Windows smartphone, tap the @boardname@ named in the device list. This will initiate the pairing process.
6. The @boardname@ will display a left pointing arrow and the Windows smartphone will pop up a box into which you will be invited to enter a "pin" (Personal Identity Number).
7. Press button A on the @boardname@ and watch carefully as the @boardname@ displays a sequence of 6 random numbers. You may find it easier to write them down than to remember them.
8. Enter the 6 digits which the @boardname@ displayed into your Windows smartphone in the pop-up box provided and then select "done".
9. If you entered the right number the @boardname@ will display a tick / check mark. If you made a mistake it will display a cross or X and you should repeat the process to try again. 

### Video
https://www.youtube.com/watch?v=AoW3mit7jIg


## How do you pair your @boardname@ with an Android smartphone or tablet?

1. Go into Settings
2. Select Bluetooth
3. Switch your @boardname@ into 'pairing mode' using the steps above
4. Wait until 'PAIRING MODE!' has finished scrolling across the @boardname@ display. You should see your @boardname@ listed on your Android smartphone under the heading "Available devices" with a name something like '@boardname@ [zatig]'. Note that the 5 characters in brackets at the end will vary.
5. On the Android smartphone, tap the @boardname@ named in the Available devices list. This will initiate the pairing process.
6. The @boardname@ will display a left pointing arrow and the Android smartphone will pop up a box into which you will be invited to enter a "pin" (Personal Identity Number).
7. Press button A on the @boardname@ and watch carefully as the @boardname@ displays a sequence of 6 random numbers. You may find it easier to write them down than to remember them.
8. Enter the 6 digits which the @boardname@ displayed into your Android smartphone in the pop-up box provided and then select "done".
9. If you entered the right number the @boardname@ will display a tick / check mark. If you made a mistake it will display a cross or X and you should repeat the process to try again. 

### Video
https://www.youtube.com/watch?v=7hLBfdAGkZI

## How do you pair your @boardname@ with an Apple iOS smartphone or tablet?

The steps to pair with an Apple iOS device are different to those followed for an Android or Windows device. To trigger pairing you need an application which will try to interact with your @boardname@ and it's that interaction that triggers the iOS pairing process. There are many you could use but for the purposes of this documentation we'll suggest you install the "nRF Master Control Panel" (nRF MCP) application from Nordic Semiconductor. You'll find it in the Apple app store. It's a really useful Bluetooth application which will help you learn about Bluetooth as well as it having the ability to trigger the pairing process. After installing nRF MCP you should follow these steps to pair with your @boardname@:

1. Switch your @boardname@ into 'pairing mode' using the steps above
2. Wait until 'PAIRING MODE!' has finished scrolling across the @boardname@ display.
3. Launch the nRF MCP application. Your @boardname@ should be listed and have a "Connect" button next to it.
4. Select "Connect" to connect your Apple device to the @boardname@. This will trigger the pairing process.
5. The @boardname@ will display a left pointing arrow and the Apple device will pop up a box into which you will be invited to enter a "pin" (Personal Identity Number).
6. Press button A on the @boardname@ and watch carefully as the @boardname@ displays a sequence of 6 random numbers. You may find it easier to write them down than to remember them.
7. Enter the 6 digits which the @boardname@ displayed into your Apple device in the pop-up box provided and then select "Pair".
8. If you entered the right number the @boardname@ will display a tick / check mark. If you made a mistake it will display a cross or X and you should repeat the process to try again. 

### Video
https://www.youtube.com/watch?v=wslwyAMwMhs


## How often do I need to pair my @boardname@ with my phone?

You do *not* need to pair your @boardname@ and smartphone or tablet every time you use them together. Pairing establishes 'trust' which will be retained until it is somehow lost. When another device wants to talk to your @boardname@ it must connect to it but connecting and pairing are not the same thing.

There are circumstances which will result in pairing data being lost however and when this happens you will need to pair again.  

Currently, flashing new code via a USB cable causes the @boardname@'s Bluetooth pairing data to be lost. Consequently, if you do flash new code to your @boardname@ using a USB cable you will need to pair again.

In contrast if you upload new code to your @boardname@ over Bluetooth, using for example the Samsung @boardname@ application for Android devices, you will not need to pair again.

If you do find yourself needing to pair again you will first need to remove the pairing from your other device (i.e. smartphone or tablet):

* On Android go into Settings/Bluetooth, select the 'cog' next to your @boardname@ and then select FORGET
* On iOS go into Settings/Bluetooth, select your @boardname@ and then select Forget This Device
* On a Windows device go into Settings/Bluetooth. Press and hold the @boardname@ entry on the Windows device. A pop-up will appear with the option "delete". Select "delete" to unpair your @boardname@.

## See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)


```package
bluetooth
```