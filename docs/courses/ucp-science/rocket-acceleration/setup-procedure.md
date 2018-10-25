# Setup and procedure

## Setup

1. Plan and design the experiments.
2. Use the radio and the [MakeCode app][makecode-app] for the data collection method. 
3. Plan and design data collection documents.
4. Program the @boardname@s.
5. Experiment with different data collection scenarios.
6. Report on the findings and observations in the experiments.

## Code and Data Collection

This project will explore 2 different methods of data collection. The first uses a single @boardname@ with the [Windows 10 MakeCode app][makecode-app] to record the data over a serial connection. The second uses the radio on the @boardname@ in the nose cone to transmit the acceleration values back to another @boardname@ connected to the computer to collect and record data using the Windows 10 MakeCode app.

### Option 1: Windows 10 MakeCode app and a USB connection

The [Windows 10 MakeCode app][makecode-app] allows data to be directly read from the @boardname@ when it is attached using USB cable. Data can be sent from the @boardname@ to the Windows 10 MakeCode app using a serial data connection. The data collected over the serial connection can be graphed and the data can be downloaded. The data can be downloaded as a _data.csv_ file. This allows the collection of data in real time. This file can be opened in a spreadsheet for further analysis. Many different kinds of experiments can be performed using this data logging technique.

### Option 2: Remote collecting unit sending to receiving unit over radio

Two @boardname@s can be used to collect and record data using the radio commands. One @boardname@ can be setup remotely and the other @boardname@ can be used to observe the data. The first @boardname@ can send the data it observes to the second @boardname@ for the observer to record. Setup 2 @boardname@s so they can communicate over the radio they need to be on the same radio group. For additional information see the [Data Collection](/courses/ucp-science/data-collection) lesson.

Use 2 @boardname@s to collect the data on one and send it to another that is connect to the Windows 10 MakeCode app using a USB cable the experiment to collect and record data remotely. This allows the collection of acceleration data at a distance.

## Coding the Radios Method

### Sender @boardname@ Code

The sender @boardname@ uses the ``||basic:on start||`` event to set up the title on the  @boardname@ when started and the radio group.

1. Code the first @boardname@ using Windows 10 MakeCode app.
2. Name the project, “Rocket Launch Sender”.
3. The ``||basic:on start||`` event will display the title and function of the @boardname@ in all caps, “ACCEL Z”.
4. Add comments to the ``||basic:on start||`` event: name of the project, creator, and date created.
5. Set up a radio group by giving it a number, or channel, to work on (group `10` is used in this example).

```blocks
// Rocket Acceleration z sender
// by C Lyman
// May 2018
basic.showString("Z ACCEL SENDER")
radio.setGroup(10)
```

Inside the ``||basic:forever||`` loop, the acceleration of ``z`` is recorded and sent as a number over the radio to the receiver @boardname@.

The ``||radio:radio send number||`` block is used to send the acceleration sensed in the ``z`` direction. When the  @boardname@ is face up the ``z`` direction is up and down. The ``x`` direction is right and left. The ``y`` direction is forward and backward. The number is sent to all @boardname@s on the same channel or group.

```blocks
// forever loop to read z acceleration
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.Z))
})
```

### Reciever @boardname@ Code

This receiver @boardname@ uses the ``||basic:on start||`` event to set up the title on the  @boardname@ when started, the radio group.

1. Code the first @boardname@ using Windows 10 MakeCode app for  @boardname@s.
2. Name the project, "Rocket Launch Receiver".
3. The ``||basic:on start||`` event will display the title and function of the  @boardname@ in all caps, "ACCEL Z RECEIVER".
4. Add comments to the ``||basic:on start||`` event: Name the project, creator, and date created.
5. Set up a radio group by giving it a number or channel to work on. (Group 10 is used in this example.)
6. A ``||serial:serial write line||`` is used to send the text ``"Acceleration"``. This opens up the serial port in the Windows 10 MakeCode app so the purple **Show Data Device** button shows up below the simulator in the MakeCode app. Clicking this button allows the observation and downloading of the collected data.

```blocks
basic.showString("ACCEL Z RECEIVER")
radio.setGroup(10)
serial.writeLine("Acceleration")
```

The ``||radio:on received number||`` event reads the number value from the sending @boardname@. The number is then stored in the variable ``receivedNumber``. The last line uses the serial write command to send the text ``"z"`` label and the value of ``receivedNumber`` variable back to the Windows 10 MakeCode app. The data is sampled and send from 10 to 20 times per second.

```blocks
// onRadio receive & write z value to serial
radio.onReceivedNumber(function (receivedNumber) {
    serial.writeValue("z", receivedNumber)
})
```

## Data Analysis

Sample Graphed data in the Windows MakeCode app:

![Graphed data in data viewer](/static/courses/ucp-science/rocket-acceleration/graphed-data.jpg)

Download the data collected and observed using the purple download button.
Sample data from the downloaded _data.csv_ file:

![Spreadsheet view](/static/courses/ucp-science/rocket-acceleration/spreadsheet-view.jpg)

Try graphing the data in different ways in the spreadsheet.

## Rocket Launch Video

Watch the demostration [rocket launch](https://drive.google.com/open?id=10h-uL7ajoS4_M7vZWW5LqdqSgt7PCj7Q) video.

## Questions

1. Can you observe relationships between the different forces of acceleration?
2. Is there a difference between the ``x``, ``y``, and ``z`` acceleration forces measured by a  @boardname@?
3. When is the strength of the signal stronger?
4. What is micro gravity unit of measurement.
5. In a spreadsheet, does graphing few seconds compared to several seconds give a different picture of what is happening?

## Extensions

### Monitoring Freefall

Set up the experiment to collect data when a @boardname@ is drown several feet or meters. 

### Develop Other Hypotheses and Experiments

Research what acceleration on a skateboard at a skatepark or other types of movement as in a car. What about a ride at an amusement park?

```package
radio
```

<br/>

| | | |
|-|-|-|
| Adapted from "[Rocket Acceleration z Radios](https://drive.google.com/open?id=1IyhCPdYQevKh3kHNgukSxlgdvZIKuzmIBjLSRnFS36o)" by [C Lyman](http://utahcoding.org) | | [![CC BY-NC-SA](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/) |

[makecode-app]: https://www.microsoft.com/store/productId/9PJC7SV48LCX