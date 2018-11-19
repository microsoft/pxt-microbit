# Device


## ~ hint

**Looking to buy a micro:bit?** See the [list of resellers](https://microbit.org/resellers).

## ~

All the bits and pieces that make up the BBC micro:bit

![](/static/mb/device-0.png)


## LED Screen and Status LED

The red lights are [LEDs](/device/screen) (light emitting diodes) and form a 5 x 5 LED Screen. 
They can be set to on/off and the brightness can be controlled.

The yellow light on the back of the micro:bit is the status LED.
It flashes yellow when the system wants to tell the user that something has happened.

## Buttons

Buttons A and B are a form of input.  When you press a button, it completes an electrical circuit. 
The micro:bit can detect either of its two buttons being pressed/released and be programmed 
to act on these events.

Button R on the back of the micro:bit is a system button. It has different uses. 
When you have downloaded and run your code onto your micro:bit, press Button R to restart and run your program from the beginning.

## USB connection

When you plug in your micro:bit via [USB](/device/usb), it should appear as  a ``MICROBIT`` drive. 

If you accidentally hold down the reset button as you’re plugging in your micro:bit, 
the micro:bit will appear as a MAINTENANCE drive instead of ``MICROBIT``. This is known as maintenance mode.

To continue programming your micro:bit YOU MUST unplug your USB and reconnect it. Check that the drive now shows as ``MICROBIT``.

## ~ hint

Use with caution. If you click on the drive while it shows as ``MAINTENANCE``, 
you can see which version of firmware you have running on your micro:bit. 
Firmware on your micro:bit should be up-to-date already. 
You can find the version of firmware in the 'version.txt' file on the micro:bit. Further information on the firmware can be found here:

https://developer.mbed.org/platforms/Microbit/#firmware

## ~

## Compass

The compass can detect magnetic fields such as the Earth’s magnetic field. 
As the micro:bit has this compass, it is possible to detect the direction it is moving in. 
The micro:bit can detect where it is facing and movement in degrees. 
This data can be used by the micro:bit in a program or be sent to another device.

## Accelerometer

There is an accelerometer on your micro:bit which detects changes in the micro:bit’s speed. 
It converts analogue information into digital form that can be used in micro:bit programs. 
Output is in milli-g. The device will also detect a small number of standard actions e.g. shake, tilt and free-fall.

## Pins

The [pins](/device/pins) can be a form of electrical input or output. 
There are labels for the input/output pins ``P0``, ``P1``, ``P2``, which you can attach external sensors to such as thermometers or moisture detectors.

## Light level

The screen can also be used a light level sensor (it's a really cool trick).

## Runtime

The micro:bit embodies many fundamental concepts in computer science. To learn more, read [the micro:bit - a reactive system](/device/reactive).


Sometimes, your micro:bit may display an error code. For more information, see:

* [the error codes](/device/error-codes)

## How do I connect the micro:bit to my computer?

Your micro:bit can be connected to your computer via a micro USB cable. 
Data can be sent and received between the micro:bit and the computer so programs 
can be downloaded from Windows, Macs and Chromebooks onto the micro:bit via this USB data connection. 
[Click here to read more information on how to run scripts on your micro:bit](/device/usb), 
and [click here to read more about the error messages you might get](/device/error-codes).

## Powering your micro:bit

When your micro:bit is connected to your computer with the micro USB, it doesn’t need another power source.  
When your micro:bit isn’t connected to your computer, tablet or mobile, you will need 2 x AAA 1.5 V batteries to power it.

The pins labelled 3V and GND are the power supply pins. 
You can attach an external device such as a motor to these and power it using the battery or USB.

## Serial Communication

The micro:bit can send and receive data via [serial communication](/device/serial). The serial data can be transferred via USB or BLE.

## Bluetooth Low Energy (BLE) Antenna

You will see the label BLE ANTENNA on the back of your micro:bit. It is for a messaging service, 
so that devices can talk to each other. The micro:bit is a peripheral 
device which can talk to a central device like a smart phone or tablet that has Bluetooth Low Energy (BLE). 
The micro:bit can send signals and receive signals from a central device so another BLE device can 
control the micro:bit or the micro:bit can control another BLE device.

## Technical Information

The micro:bit has been designed to be a bare-board micro controller for use by children aged 11-12. 
More information is available at the [Microbit Foundation web site](https://microbit.org/guide/).
