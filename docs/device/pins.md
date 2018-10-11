# micro:bit pins

The micro:bit pins 

![](/static/mb/device/pins-0.png)

The micro:bit has 25 external connections on the edge connector of the board, which we refer to as ‘pins’.  The edge connector is the grey area on the right side of the figure above.

There are five large pins, that are also connected to holes in the board labelled: 0, 1, 2, 3V, and GND. And along the same edge, there are 20 small pins that you can use when plugging the micro:bit into an edge connector.

## Large pins

You can easily attach crocodile clips or 4mm banana plugs to the five large pins.

The first three, labelled 0, 1 and 2 are flexible and can be used for many different things - which means they are often called ‘general purpose input and output’ (shortened to GPIO). These three pins also have the ability to read analogue voltages using something called an analogue-to-digital converter (ADC). They all have the same function:

* **0**: GPIO (general purpose digital input and output) with analogue to digital convertor (ADC).
* **1**: GPIO with ADC
* **2**: GPIO with ADC

The other two large pins (3V and GND) are very different!

## ~hint 

Watch out! The pins labelled 3V and GND relate to the power supply of the board, and they should NEVER be connected together.

## ~

*power input*: If the micro:bit is powered by USB or a battery, then you can use the 3V pin as a *power output* to power peripherals with.

* **3V**: *3 volt power output* or *power input*.  (1) *power output*: If the micro:bit is powered by USB or a battery, then you can use the 3V pin as a power output to power peripherals with; (2) *power input*: If the micro:bit is not being powered by USB or battery, you can use the 3V pin as a power input to power the micro:bit
* **GND**: attaches to ground in order to complete a circuit (required when using the 3V pin)

If you hold the ‘GND’ pin with one hand, you can program the microbit to detect yourself touching the 0,1 or 2 pins with your other hand, giving you three more buttons to experiment with (you just used your body to complete an electrical circuit).

## Small pins

There are 20 small pins numbered sequentially from 3-22 (these pins are not labeled on the micro:bit, however, they are labelled in the picture above).

Unlike the three large pins that are dedicated to being used for external connections, some of the small pins are shared with other components on the micro:bit board. For example, pin 3 is shared with some of the LEDs on the screen of the micro:bit, so if you are using the screen to scroll messages, you can’t use this pin as well.

* **pin 3**: GPIO shared with LED Col 1 of the LED screen; can be used for ADC and digital I/O when the LED screen is turned off.
* **pin 4**: GPIO shared with LED Col 2 of the LED screen; can be used for ADC and digital I/O when the LED screen is turned off.
* **pin 5**: GPIO shared with Button A. This lets you trigger or detect a button "A" click externally. This pin has a pull-up resistor, which means that by default it is at voltage of 3V. To replace button A on the micro:bit with an external button, connect one end of the external button to pin 5 and the other end to GND. When the button is pressed, the voltage on pin 5 is pulled down to 0, which generates a button click event.
* **pin 6**: GPIO shared with LED Col 9 of the LED screen;  can be used for digital I/O when the LED screen is turned off.
* **pin 7**: GPIO shared with LED Col 8 of the LED screen; can be used for digital I/O when the LED screen is turned off.
* **pin 8**: Dedicated GPIO, for sending and sensing digital signals.
* **pin 9**: GPIO shared with LED Col 7 of the LED screen;  can be used for digital I/O when the LED screen is turned off.
* **pin 10**: GPIO shared with LED Col 3 of the LED screen;  can be used for ADC and digital I/O when the LED screen is turned off.
* **pin 11**: GPIO shared with Button B. This lets you trigger or detect a button “B” click externally.
* **pin 12**: this GPIO pin has been reserved to provide support for accessibility.
* **pin 13**: GPIO that is conventionally used for the serial clock (SCK) signal of the 3-wire Serial Peripheral Interface (SPI) bus.
* **pin 14**: GPIO that is conventionally used for the Master In Slave Out (MISO) signal of the SPI bus.
* **pin 15**: GPIO that is conventionally used for the Master Out Slave In (MOSI) signal of the SPI bus.
* **pin 16**: Dedicated GPIO (conventionally also used for SPI ‘Chip Select’ function).
* **pins 17 and 18**: these pins are wired to the 3V supply, like the large ‘3V’ pad.
* **pins 19 and 20**: implement the clock signal (SCL) and data line (SDA) of the I2C bus communication protocol. With I2C, several devices can be connected on the same bus and send/read messages to and from the CPU. Internally, the accelerometer and the compass are connected to i2c.
* **pins 21 and 22**: these pins are wired to the GND pin and serve no other function

## Connecting to the small pins

It is recommended that an edge connector be acquired to connect to the small pins. More information on compatible edge connectors will be available later.

