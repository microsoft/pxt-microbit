# Remote data collection

If you have more than one @boardname@ you can setup one of them to receive data sent by radio from another @boardname@. A remote @boardname@ can take measurements and send them to a board that's connected by USB to a computer. The @boardname@ connected to the computer is the data recorder and writes the recieved data to the serial port.

![Remote micro:bit sending](/static/mb/device/data-analysis/radio-zap.jpg)

## Receiver @boardname@

Connect the @boardname@ to a computer with a USB cable. The data received over radio is sent to the computer with this connection using writes to the serial port. If you have the [Windows 10 MakeCode](https://www.microsoft.com/store/apps/9PJC7SV48LCX) app, you can view the received data with the [Data Viewer](./viewing) in the editor. Otherwise, you need a _serial terminal_ app or some other program that can read from the computer's serial port.

The receiving @boardname@ sets a radio group number on which to listen for incoming messages.

```block
radio.setGroup(99)
```

The receiver then waits to receive a packet (radio message) from the sender which contains the data to record. This happens inside an ``||radio:on radio received||`` block. If the sending @boardname@ is measuring temperature at a remote location (somewhere else in the room maybe), the receiver will write the value received as a temperature measurement to the serial port.

```blocks
radio.setGroup(99)
radio.onDataPacketReceived( ({ receivedNumber }) =>  {
    basic.showNumber(receivedNumber)
    serial.writeValue("TempCelsius", receivedNumber)
})
```

## Remote sender @boardname@

The remote @boardname@ reads its measurement values and sends them to the same radio group as the receiver.

```block
radio.setGroup(99)
```
A typical measurment progam might read a sensor value continously. Depending on how much the values change, the meaurement program could contain the read operation in a loop with a delay interval. In the example here, the delay is one minute between each read of a temperature value. The value is sent on the current radio group with ``||radio:radio send number||``.

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
radio.onDataPacketReceived(({ receivedString: name, receivedNumber: value }) => {
    basic.showString(name + ":")
    basic.showNumber(value)
    serial.writeValue(name, value)
})
```

The receiver program uses just one ``||radio:on radio received||`` event to record the values. The ``name`` and the ``value`` are parameters for the event block so both temperature and light values are received here.

## Multiple remote stations

For more complex data recording situations, you might need to measure sensor values from multiple locations at the same time. This means that there is more than one remote @boardname@ (station) measuring data.

### Separate radio groups

You could add another receiver @boardname@ and set it to a different radio group. This way you can copy the same programs to each sender and receiver and just change the radio group number for the matched boards. This solution, though, means you need an extra receiver board and another computer to record the data from the second station.

### Station identifiers

A different solution from using more than one radio group is to still have just one receiver on one group but make the different stations send identifiers with their values.

This is done with ``||radio:radio send value||`` by adding an identifer to the ``name`` for the ``value``. You can make a good identifier from the ``||control:device name||`` or ``||control:device serial number||`` values. You can put the identifier in as a _prefix_ to the name for the value:

```block
let temperature = 0
let id = control.deviceName()
radio.sendValue(id + "_temperature", temperature)
```

The sender's program with the identifier added:

```blocks
let temperature = 0
let id = control.deviceName()
radio.setGroup(99)
basic.forever(() => {
    temperature = input.temperature()
    basic.showNumber(temperature)
    radio.sendValue(id + "_temperature", temperature)
    basic.pause(60000)
})
```

This way messages from each sending station are recorded as unique values by the receiving program.

### ~hint

**Packet flooding**

If there are too many remote stations (@boardname@s) sending data to one receiver, the receiving @boardname@ might not be able to process all the packets it receives. This floods the receiver with too many messages so that it has to reject them until it has time to handle any new ones.

### ~

## See also

[radio](/reference/radio), [serial write value](/reference/serial/write-value),
[device name](/reference/control/device-name)

```package
radio
```