# Setup and procedure

## Setup

1. Plan and design the experiments.
2. Plan and design data collection documents.
3. Program the @boardname@s.
4. Experiment with different data collections scenarios. 

## Code

This project will use to @boardname@s to collect and record data using the Windows 10 MakeCode app as described in [Data Collection - Option 3](/courses/ucp-science/data-collection/setup-procedure).

### Sender @boardname@ code

1. Code the first @boardname@ using MakeCode for Microbits.
2. Name the project, “Gravity Sender”.
3. The ``||basic:on start||`` event will display the title and function of the @boardname@ in all caps, `"GRAVITY SENDER"`.
5. Set up a radio group using the “radio set group”. Both @boardname@s need the same radio group.

```blocks
basic.showString("GRAVITY SENDER")
radio.setGroup(99)
```
#### Send the data

6. The ``||basic:forever||`` event will constantly monitor the “strength” of the acceleration and send the value to any other @boardname@s that might be receiving radio signals in the same radio group.
7. Open the pull down menu in the acceleration block and and change the ``x`` value to the ``strength`` value. This maximizes the x, y, and z dimensions of the acceleration into 1 value.
8. Add a ``||led:toggle||`` block to indicate that data is being sent.

```blocks 
basic.showString("GRAVITY SENDER")
radio.setGroup(99)
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.Strength))
    led.toggle(0, 0)
})
```

### Receiver @boardname@ code

1. Using the [Windows 10 MakeCode app](https://www.microsoft.com/store/productId/9PJC7SV48LCX) setup and code the second @boardname@.
2. This @boardname@ will remain connected to the computer through the USB cable and the Windows 10 MakeCode app to monitor the data being received.
3. Name the project, “Gravity Receiver”.
4. The ``||basic:on start||`` event will display the title and function of the @boardname@ in all caps, `"GRAVITY RECEIVER"`.
6. Set up a radio group using the ``||radio:radio set group||``. Both @boardname@s need the same radio group.

```blocks 
basic.showString("GRAVITY RECEIVER")
radio.setGroup(99)
```

#### Code the receive event

7. The ``||radio:on received number||`` event will constantly monitor radio signals from the radio group.
8. When a value is received from the group it is stored in the ``gravity`` variable.
9. The ``||serial:serial write Value||`` sends 2 pieces of data back to the MakeCode app through the USB cable. First it sends a label `"gravity"` and then the value received as gravity from the acceleration method from the first @boardname@. 
10. Add a ``||led:toggle||`` to indicate that it's receiving data. Change ``x`` to `1` so that another LED blinks.

```blocks
basic.showString("GRAVITY RECEIVER")
radio.setGroup(99)
radio.onReceivedNumber(function (receivedNumber) {
    serial.writeValue("gravity", receivedNumber)
    led.toggle(1, 0)
})
```

## Monitoring the data

1. With the @boardname@ code downloaded from the MakeCode app to the @boardname@ and the USB cable connected it will start receiving data from the first @boardname@.
2. Under the simulator in the app a purple outlined button shows up “Show data Device”.
 
3. By clicking on the **Show data Device** button a window opens up to the right showing values and graph of the gravity data being received (the dips in the graph are 3 tosses of the @boardname@ in the air).
 
4. The **Download** button in the red highlighted box allows the downloading of about the last 20 seconds of recorded data as a CSV file.

![Toss sensor data](/static/courses/ucp-science/gravity/toss.png)
 
When the data recorded is downloaded as a CSV spreadsheet file. It is named ``data.csv`` (it will usually open in a spreadsheet but sometimes doesn’t and it can be hard to find. A search of the ``C:\`` drive might be necessary to find it).

![Toss sensor data](/static/courses/ucp-science/gravity/export.png)

Additional analysis and graphing can be done in a spreadsheet.

## Data Collection

There are several ways to collect data from an experiment. The simplest is having the data display on the LED screen and manually record the data on a paper. Data can also be collected using the Window’s 10 MakeCode app. The third way is using 2 @boardname@s with one observing the data and then radioing the results to a second @boardname@ can allow the remote collection of data. 

For additional information on data collection, see the [Data Collection](/courses/ucp-science/data-collection) lesson.

## Extensions

### Sound Wave Sensor

Sound causes vibrations which can be detected with the Microbit accelerator. Connect 2 @boardname@s using radio signals (see [Data Collection - Option 3](/courses/ucp-science/data-collection/setup-procedure)). The “Gravity Sender” @boardname@ can be placed on or near a speaker. It will send a signal to the “Gravity Receiver” @boardname@ which can be connected to the Windows 10 MakeCode app. When the “Gravity Receiver” @boardname@ receives a gravity number it is sent to the monitoring data collection using the method ``serial.writeValue("gravity", gravity)``. The sound can be observed in the **Show data Device**. 

![Sound vibrations](/static/courses/ucp-science/gravity/soundvibrations.png)

### Earthquake Detector

Earthquakes cause vibrations which can be detected with the Microbit accelerator. By placing the "Gravity Sender" @boardname@ on a flat surface and having it “feel” minor changes in acceleration it can detect earthquakes or other vibrations in the earth. Connect 2 @boardname@s using radio signals (see [Data Collection - Option 3](/courses/ucp-science/data-collection/setup-procedure)). The “Gravity Sender” @boardname@ can be placed on or near a speaker. It will send a signal to the “Gravity Receiver” @boardname@ which can be connected to the Windows 10 MakeCode app. When the “Gravity Receiver” @boardname@ receives a gravity number it is sent to the monitoring data collection using the method ``serial.writeValue("gravity", gravity)``. The movement of the object connected to the Earth can be observed in the **Show data Device**. Using a conditional statement that detects changes in the received gravity could be implemented to play “music” sound as an alarm when changes in movement are detected.

![Earthquake vibrations](/static/courses/ucp-science/gravity/earthquake.png)

### Skate Park Data or Pinewood Derby. 

Use the @boardname@s to record data from a skater at a skate park or acceleration down a ramp like a Pinewood Derby car. 

<br/>

| | | |
|-|-|-|
| Adapted from "[Gravity, Motion, and Waves](https://drive.google.com/open?id=1Z8S-W3n1jX6drC8ALj8Wh1Rjc0CyP0Afs3acnIjDYes)" by [C Lyman](http://utahcoding.org) | | [![CC BY-NC-SA](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/) |

```package
radio
```