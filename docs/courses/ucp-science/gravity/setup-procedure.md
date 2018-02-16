# Setup & Procedure

## Setup

1. Plan and design the experiments.
2. Plan and design data collection documents.
3. Program the @boardname@s.
4. Experiment with different data collections scenarios. 

## Code

This project will use to @boardname@s to collect and record data using the Windows 10 MakeCode app as described in the Data Collection - Option 3 at the end of this document.

### “Sender” @boardname@ code

1. Code the first @boardname@ using MakeCode for Microbits.
2. Name the project, “Gravity Sender”.
3. The “on Start” event will display the title and function of the @boardname@ in all caps, “GRAVITY SENDER”.
4. Add comments to the “on Start” event: Name the project, creator, and date created.
5. Set up a radio group using the “radio set group”. Both @boardname@s need the same radio group.
 

```blocks
basic.showString("GRAVITY SENDER")
radio.setGroup(99)
```

6. The “forever” event will constantly monitor the “strength” of the acceleration and send the value to any other @boardname@s that might be receiving radio signals in the same radio group.
7. Open the pull down menu in the acceleration block and and change the “x” value to the “strength” value. This maximizes the x, y, and z dimensions of the acceleration into 1 value.
8. Add a ``led.toggle`` block to indicate that data is coming out

```blocks 
basic.showString("GRAVITY SENDER")
radio.setGroup(99)
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.Strength))
    led.toggle(0, 0)
})
```

### “Receiver” @boardname@ code
1. Using the [Windows 10 MakeCode app](https://www.microsoft.com/store/productId/9PJC7SV48LCX) setup and code the second @boardname@.
2. This @boardname@ will remain connected to the computer through the USB cable and the Windows 10 MakeCode app to monitor the data being received.
3. Name the project, “Gravity Receiver”.
4. The “on Start” event will display the title and function of the @boardname@ in all caps, “GRAVITY RECEIVER”.
5. Add comments to the “on Start” event: Name the project, creator, and date created.
6. Set up a radio group using the “radio set group”. Both @boardname@s need the same radio group.

```blocks 
basic.showString("GRAVITY RECEIVER")
radio.setGroup(99)
```

7. The “on Radio Received” event will constantly monitor radio signals from the radio group.
8. When a value is received from the group it is stored in the “gravity” variable.
9. The “serial write Value” sends 2 pieces of data back to the MakeCode app through the USB cable. First it sends a label “gravity” and then the value received as gravity from the acceleration method from the first @boardname@. 
10. Add a ``led.toggle`` to indicate that data has been received. Change ``x`` to 1 so that another LED blinks.

```blocks
basic.showString("GRAVITY RECEIVER")
radio.setGroup(99)
radio.onDataPacketReceived( ({ receivedNumber: gravity }) =>  {
    serial.writeValue("gravity", gravity)
    led.toggle(1,0)
})
```

## Monitoring the data

1. With the @boardname@ code downloaded from the MakeCode app to the @boardname@ and the USB cable connected it will start receiving data from the first @boardname@.
2. Under the simulator in the app a purple outlined button shows up “Show data Device”.
 
3. By clicking on the “Show data Device” button a window opens up to the right showing values and graph of the gravity data being received. (The dips in the graph are 3 tosses of the @boardname@ in the air.)
 
4. The “Download” button in the red highlighted box allows the downloading of about the last 20 seconds of recorded data as a CSV file.

![Toss sensor data](/static/courses/ucp-science/gravity/toss.png)
 
5. When the data recorded is downloaded as a CSV spreadsheet file. It is named “data.csv”. (It will usually open in a spreadsheet but sometimes doesn’t and it can be hard to find. A search of the C:\ drive may need to be made to find it.)

![Toss sensor data](/static/courses/ucp-science/gravity/export.png)

Additional analysis and graphing can be done in a spreadsheet.

## Data Collection:

There are several ways to collect data from an experiment. The simplest is having the data display on the LED screen and manually record the data on a paper. Data can also be collected using the Window’s 10 MakeCode app. The third way is using 2 @boardname@s with one observing the data and then radioing the results to a second @boardname@ can allow the remote collection of data. 

For additional information on data collection see [Data Collection](/courses/ucp-science/data-collection).

## Extensions

### Sound Wave Sensor. 

Sound causes vibrations which can be detected with the Microbit accelerator. Connect 2 @boardname@s using radio signals. Data Collection - Option 3. The “Gravity Sender” @boardname@ can be placed on or near a speaker. It will send a signal to the “Gravity Receiver” @boardname@ which can be connected to the Windows 10 MakeCode app. When the “Gravity Receiver” @boardname@ receives a gravity number it is sent to the monitoring data collection using the command “serial write value (“gravity”, gravity)”. The sound can be observed in the “Show data Device”. 

![Sound vibrations](/static/courses/ucp-science/gravity/soundvibrations.png)

#### Standards

* Strand 8.2: Energy is Stored and Transferred in Physical Systems
Objects can store and transfer energy within systems. Energy can be transferred between objects, which involves changes in the object’s energy. There is a direct relationship between an object’s energy, mass, and velocity. Energy can travel in waves and may be harnessed to transmit information.
* Standard 8.2.4
Use computational thinking to describe a simple model for waves that shows the pattern of wave amplitude being related to wave energy. Emphasize describing waves with both quantitative and qualitative thinking. Examples could include using graphs, charts, computer simulations, or physical models to demonstrate amplitude and energy correlation.
* Standard 8.2.5
Develop and use a model to describe the structure of waves and how they are reflected, absorbed, or transmitted through various materials. Emphasize both light and mechanical waves. Examples could include drawings, simulations, and written descriptions of light waves through a prism; mechanical waves through gas vs. liquids vs. solids; or sound waves through different mediums.

### Earthquake Detector. 

Earthquakes cause vibrations which can be detected with the Microbit accelerator. By placing the Gravity Sending” sending @boardname@ on a flat surface and having it “feel” minor changes in acceleration it can detect earthquakes or other vibrations in the earth. Connect 2 @boardname@s using radio signals. Data Collection - Option 3. The “Gravity Sender” @boardname@ can be placed on or near a speaker. It will send a signal to the “Gravity Receiver” @boardname@ which can be connected to the Windows 10 MakeCode app. When the “Gravity Receiver” @boardname@ receives a gravity number it is sent to the monitoring data collection using the command “serial write value (“gravity”, gravity)”. The movement of the object connected to the Earth can be observed in the “Show data Device”. Using a conditional statement that detects changes in the received gravity could be implemented to play “music” sound as an alarm when changes in movement are detected.

![Earthquake vibrations](/static/courses/ucp-science/gravity/earthquake.png)

### Standards

* Strand 7.2: Changes to Earth Over Time 
Earth’s processes are dynamic and interactive, and are the result of energy flowing and matter cycling within and among Earth’s systems. Energy from the sun and Earth’s internal heat are the main sources driving these processes. Plate tectonics is a unifying theory that explains crustal movements of Earth’s surface, how and where different rocks form, the occurrence of earthquakes and volcanoes, and the distribution of fossil plants and animals.
* Standard 7.2.3
Ask questions to identify constraints of specific geologic hazards and evaluate competing design solutions for maintaining the stability of human-engineered structures, such as homes, roads, and bridges. Examples of geologic hazards could include earthquakes, landslides, or floods.
* Standard 7.2.5
Ask questions and analyze and interpret data about the patterns between plate tectonics and:
(1) The occurrence of earthquakes and volcanoes…

### Skate Park Data or Pinewood Derby. 

Use the @boardname@s to record data from a skater at a skate park or acceleration down a ramp like a Pinewood Derby car. 

### Standards

* Standard 8.2.1
Use computational thinking to analyze data about the relationship between the mass and speed of objects and the relative amount of kinetic energy of the objects. Emphasis should be on the quantity of mass and relative speed to the observable effects of the kinetic energy. Examples could include a full cart vs. an empty cart or rolling spheres with different masses down a ramp to measure the effects on stationary masses. 

<br/>

| | | |
|-|-|-|
| Adapted from "[Electricity - Battery Tester](https://drive.google.com/open?id=15Xry9jFsIzHHG7RpaIomLodl9pBjTiKDvtjkd227b7Y)" by [C Lyman](http://utahcoding.org) | | [![CC BY-NC-SA](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/) |
