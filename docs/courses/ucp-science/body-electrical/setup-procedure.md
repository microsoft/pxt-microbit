# Setup and procedure

## Setup

1. Plan and design the experiments.
2. Connect the wires to the microbit with connections at pin **0** and the ground pin (**GND**). Pin **0** will detect any electrical current flowing between it and the ground. The human body is always sending out electrical current from the nervous system to the muscles.
3. Coil the stripped ends of the copper wires and tape them to the skin in different areas of the body with the painters tape.
4. Plan and design data collection documents.
5. Program the @boardname@s.
6. Experiment with different data collections scenarios (this experiment could try several different areas of the body. It could also monitor the body sitting or during movements or exercise to observe any differences).
7. Report on the findings and observations in the experiments.

![Micro:bit connected to body wires](/static/courses/ucp-science/body-electrical/body-wires-connect.jpg)

## Code and data collection

This project will use to microbits to collect and record data using the Windows 10 MakeCode app  as described in the [Data Collection](/courses/ucp-science/data-collection/setup-procedure) lesson.

## Option 2 — Microbit Windows 10 MakeCode app and a USB connection

The Windows 10 MakeCode app allows data to be directly read from the microbit when it is attached using USB cable. Data can be sent from the microbit to the Windows 10 MakeCode app  using serial data connection. The data collected over the serial connection can be graphed and the data can be downloaded. A limit of only about the last 20 seconds of data can be downloaded as a ``"data.csv"`` file. This allows the collection of data in real time. This file can be opened in a spreadsheet for further analysis. Many different kinds of experiments can be performed using this data logging technique. 

### on Start event

1. Code the first @boardname@ using Windows 10 MakeCode app for @boardname@.
2. Name the project, "Body Electricity Sender".
3. The ``||basic:on start||`` event will display the title and function of the @boardname@ in all caps, ``"BODY ELECTRICAL"``.
4. Set up a variable ``ekg`` or ``bodyElectricity`` and initialize its starting value to `0`.

### forever event

1. Set the ``ekg`` or ``bodyElectricity`` variable to get its value from the “analog read pin (0)”. This detects and electrical current that is sent through the body between the 2 taped wires connected to the body and the microbit. This is an analog reading that gets converted to a digital number between 0 - 1024.
2. The next line uses a ``||basic:serial write value||`` (``"EKG"`` and the value stored in the ``ekg`` variable) to send the value back to the Windows 10 MakeCode app through the USB connection to the computer and @boardname@.

```blocks 
// Body Electricity
let ekg = 0
basic.showString("EKG")

// forever loop reading data on pin(0)
basic.forever(() => {
    ekg = pins.analogReadPin(AnalogPin.P0)
    serial.writeValue("EKG", ekg)
})
```

### Analyze

Here's a sample of some of the graphed data:

![Sample of data graphed in the data view](/static/courses/ucp-science/body-electrical/sample-graph.jpg)

Download the data collected and observed using the purple **Download** button.
The same data from the ``"data.csv"`` file might look like this in a spreadsheet:

![View of EKG data in spreadsheet](/static/courses/ucp-science/body-electrical/spreadsheet-view.jpg)

Do some more meaurements:

1. Try graphic the data in different ways in the spreadsheet.
2. Try collecting data for another area on the body.

## Option 3 — Remote radio collecting to receiving radio displaying

Two @boardname@s can be used to collect and record data using the radio commands. One @boardname@ can be setup remotely and the other @boardname@ can be used to observe the data. The first @boardname@ can send the data it observes to the second @boardname@ for the observer to record. To set up 2 @boardname@s so they can communicate over the radio they need to be on the same radio group. For additional information look at the [Data Collection](/courses/ucp-science/data-collection/setup-procedure) lesson.

By using 2 @boardname@ to collect the data on one and send it to the second @boardname@ which is connect to the Windows 10 MakeCode app using a USB cable the experiment can collect and record data remotely. This would allow the collection of body electrical data while a person is exercising or moving.

### micro:bit radio sending code

This sender @boardname@ uses the ``||basic:on start||`` event to set up the title on the @boardname@ when started, the radio group, and the ``bodyElectricity`` variable so it can collect and store the data received from the pin **0**.

The ``||basic:forever||`` event read the electricity on pin **0** and stores it in the variable ``bodyElectricity``. It's then sent over the radio to the receiver @boardname@. 
 
```blocks
// Body Electricity Project
basic.showString("EKG")
let bodyElectricty = 0
radio.setGroup(99)

// forever loop that collects body electricity and send it over the radio
basic.forever(() => {
    bodyElectricty = pins.analogReadPin(AnalogPin.P0)
    radio.sendNumber(bodyElectricty)
})
```

### micro:bit radio receiving code

This receiver @boardname@ uses the “on start” event to set up the title on the @boardname@ when started, the radio group, and the ``bodyElectricity`` variable to collect and store the data received.

The ``||radio:on received number||`` event reads the number value sent from the sending @boardname@. The number is then stored in the ``bodyElectricity`` variable. the electricity on pin **0** and stores it in the variable ``bodyElectricity``. The last line uses the serial write command to send the text `"Body Electricity"` label and the value of ``bodyElectricity`` variable back to the Windows 10 MakeCode app. The data is sampled and send from 10 to 20 times per second.
 
```blocks
// Body Electricity Receiver
basic.showString("BODY ELEC")
let bodyElectricty = 0
radio.setGroup(99)

// Radio Receiver event
radio.onReceivedNumber(function (receivedNumber) {
    bodyElectricty = receivedNumber
    serial.writeValue("Body Electricty", bodyElectricty)
})
```

## Questions

1. Can you observe relationships with a heart rate? With breathing? 
2. Is there a difference when connected to muscle and skin with limited muscles underneath?
3. When is the strength of the signal stronger?
4. What is the relationship between the analog reading and the digital output?
5. In a spreadsheet, does graphing few seconds compared to several seconds give a different picture of what is happening?

## Extensions

### Monitoring Exercise

Set up the experiment to collect data while someone is exercising. 

### Develop other hypotheses and experiments

Research what about EKG and other body electrical signals.

<br/>

| | | |
|-|-|-|
| Adapted from "[Body Electrical & Waves](https://drive.google.com/open?id=1KofuOt0v1lmQhQyJux1XWDVoCDeslcjDFysjStFmo1w)" by [C Lyman](http://utahcoding.org) | | [![CC BY-NC-SA](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/) |

```package
radio
```