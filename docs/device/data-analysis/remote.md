# Remote data collection

If you have more than one @boardname@ you can setup one of them to receive data sent by radio from other @boardname@s. Remote @boardname@s can take measurements and send them to a board that's connected by USB to a computer. The @boardname@ connected to the computer is the data recorder and writes the received data to the serial port.

![Remote micro:bit sending](/static/mb/device/data-analysis/radio-zap.jpg)

## Receiver @boardname@

Connect the @boardname@ to a computer with a USB cable. The data received over radio is sent to the computer with this connection using writes to the serial port. If you have the [Windows 10 MakeCode](https://www.microsoft.com/store/apps/9PJC7SV48LCX) app, you can view the received data with the [Data Viewer](./viewing) in the editor. Otherwise, you need a _serial terminal_ app or some other program that can read from the computer's serial port.

The receiving @boardname@ sets a radio group number on which to listen for incoming messages.

```block
radio.setGroup(99)
```

The receiver then waits to receive a packet (radio message) from the sender which contains the data to record. This happens inside an ``||radio:on received number||`` block. If the sending @boardname@ is measuring temperature at a remote location (somewhere else in the room maybe), the receiver will write the value received as a temperature measurement to the serial port.

```blocks
radio.setGroup(99)
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
    serial.writeValue("TempCelsius", receivedNumber)
})
```

## Remote sender @boardname@

A remote @boardname@ reads its measurement values and sends them to the same radio group as the receiver.

```block
radio.setGroup(99)
```
A typical measurement program might read a sensor value continuously. Depending on how much the values change, the measurement program could contain the read operation in a loop with a delay interval. In the example here, the delay is one minute between each read of a temperature value. The value is sent on the current radio group with ``||radio:radio send number||``.

```blocks
let temperature = 0
radio.setGroup(99)
basic.forever(() => {
    temperature = input.temperature()
    basic.showNumber(temperature)
    radio.sendNumber(temperature)
    basic.pause(60000)
})
```

## Sending multiple values

The remote @boardname@ in the previous example sent a single value which was temperature. The receiver understands that the incoming value is a temperature measurement. If you want the remote to also send the current amount of light measured, the receiver won't know that this other value isn't a temperature reading.

The sender code is modified to use a value packet instead of just a number message. Here's the sender program sending both temperature and light values with ``||radio:radio send value||``.

```blocks
let temperature = 0
let light = 0
radio.setGroup(99)
basic.forever(() => {
    temperature = input.temperature()
    radio.sendValue("temperature", temperature)
    light = input.lightLevel()
    radio.sendValue("light", light)
    basic.pause(60000)
})
```

Here's the program for the receiver to record both temperature and light:

```blocks
radio.setGroup(99)
radio.onReceivedValue(function (name: string, value: number) {
    basic.showString(name + ":")
    basic.showNumber(value)
    serial.writeValue(name, value)
})
```

The receiver program uses just one ``||radio:on received number||`` event to record the values. The ``name`` and the ``value`` are parameters for the event block so both temperature and light values are received here.

## Multiple remote stations

For more complex data recording situations, you might need to measure sensor values from multiple locations at the same time. This means that there is more than one remote @boardname@ (station) measuring data.

### Separate radio groups

You could add another receiver @boardname@ and set it to a different radio group. This way you can copy the same programs to each sender and receiver and just change the radio group number for the matched boards. This solution, though, means you need an extra receiver board and another computer to record the data from the second station.

### Station identifiers

A different solution from using more than one radio group is to still have just one receiver on one group but make the different stations send identifiers with their values.

This is done with ``||radio:radio set transmit serial number||`` which tells the radio to add the board's serial number to the packet it sends. The serial number is included with the ``name`` and ``value`` so the receiver can know what station it comes from.

```block
radio.setTransmitSerialNumber(true)
```

The sender's program with the identifier added:

```blocks
let temperature = 0
radio.setGroup(99)
radio.setTransmitSerialNumber(true)
basic.forever(() => {
    temperature = input.temperature()
    basic.showNumber(temperature)
    radio.sendValue("temperature", temperature)
    basic.pause(60000)
})
```

The program on the receiver board can use the serial number to make a name value pair that the [Data Viewer](./writing#name-value-pairs) can recognize:

```blocks
let id = 0;
radio.setGroup(99)
radio.onReceivedValue(function (name: string, value: number) {
    id = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    basic.showString(name + ":")
    basic.showNumber(value)
    serial.writeValue(id + "_" + name, value)
})
```

The serial number, ``id``, is used as a _prefix_ for the ``name`` to identify which station the ``value`` came from.

### Extended data recording

If you're recording data to save on a computer for analysis or other uses outside of the MakeCode editor, you can use the ``||radio:radio write received packet to serial||`` block to format it for you. This function will format the data from the received packet into a [JSON](https://en.wikipedia.org/wiki/JSON) string and write it to the serial port, all in one operation. It's used just like this:

```blocks
radio.onReceivedNumber(function (receivedNumber) {
    radio.writeReceivedPacketToSerial();
});
```

The output to the serial port is a line of text with these name value pairs:

* **t** - time: the time when the packet was sent
* **s** - serial: the serial number of the board that sent the packet (if enabled)
* **n** - name: the name for the data value from the string part of the packet
* **v** - value: the data from the number part of the packet

It's sent in this format to the serial port:

```json
{"t":3504,"s":1951284846,"n":"temperature","v":19} 
{"t":3823,"s":1951284846,"n":"temperature","v":20} 
{"t":4143,"s":1951284846,"n":"temperature","v":20} 
{"t":4463,"s":1951284846,"n":"temperature","v":18} 
{"t":4781,"s":1951284846,"n":"temperature","v":21} 
{"t":5102,"s":1951284846,"n":"temperature","v":17} 
```

## See also

[radio](/reference/radio), [serial write value](/reference/serial/write-value),
[write received packet to serial](/reference/radio/write-received-packet-to-serial)

```package
radio
```
