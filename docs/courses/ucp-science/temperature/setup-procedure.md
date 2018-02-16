# Setup & Procedure

## Setup

Plan and design the experiments. (What environment will the data be collected in? Does the microbit need to be protected in a ziplock bag? What is the purpose of the experiment?)
Plan and design data collection documents.
Program the microbits.
Experiment with different data collections scenarios. 

## Code

This project will start with one microbit and program it to use the microbit’s temperature sensor to collect and display the current temperature in Celsius on the microbit’s LED display. The data collected can be recorded manually on a paper with a pencil.

### MakeCode Programming Environment

* Open the MakeCode Microbit environment in a browser at: http://makecode.org and select Microbit.
* Or download and use the Windows 10 MakeCode app. The Windows 10 MakeCode app can be downloaded from the following link.
 https://www.microsoft.com/store/apps/9PJC7SV48LCX 

### Temperature Project 1 - LED display

### on Start event

1. Name the project, ``“Temperature Collection”``.
2. The “on Start” event will display the title and purpose of the microbit in all caps, “TEMPERATURE”. The text is put in the “show string” block. (The title is put in the “on start” event so when the microbit is started up it will show what it is programmed to do. It is done in all CAPS because it is easier to read as it is displayed in the LED display.)

```blocks
basic.showString("TEMPERATURE COLLECTION")
```

### forever event
In the “forever” event temperature data can be continually collected from the microbit’s temperature sensor. The data can be sent to the  display on the LEDs using a “show number ()” block from the Basic toolbox..

```blocks
basic.forever(() => {
    basic.showNumber(input.temperature())
});
```

As data is displayed it can then be recorded on a paper for further analysis.

Data can also be displayed graphically using the “plot bar graph of ( )” block from the LED toolbox. 

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.temperature(), 0
        )
});
```

**Variation.** Instead of using a forever loop, the “A” and “B” buttons could be programmed display the temperature in Celsius and in Fahrenheit.

### Temperature Project 2 - Microbit Windows 10 MakeCode app & a USB connection

The Windows 10 MakeCode app allows data to directly read serial data from your microbit for data logging and other fun experiments. This allow the collection of data in real time which can be downloaded in a CSV file for additional analysis in a spreadsheet.

The Windows 10 MakeCode app can be downloaded from the following link.
https://www.microsoft.com/store/apps/9PJC7SV48LCX 

With the program downloaded from the MakeCode app to the microbit and the USB cable left connected and using the “serial write value” block from the Serial toolbox in the Advanced tool section.

```blocks
basic.forever(() => {
	serial.writeValue("Celsius", input.temperature())
});
```

When the program is running, a purple “Show data Device” button shows up under the Simulator. By clicking on the button the data being observed can monitored and graphed in the “Show data Device” window. 

![show device button](/static/courses/ucp-science/temperature/show-device.png)

Graph is highlighted with the blue box. The “Download” button in the red highlighted box allows the downloading of the recorded data as a CSV file which can be opened in a spreadsheet and analyzed.

![export data](/static/courses/ucp-science/temperature/export.png)
 
### Temperature Project 3 - Remote radio collecting to receiving radio displaying

Two microbits can be used to collect and record data using the radio commands. One microbit can be setup remotely and the other microbit can be used to observe the data. The first microbit can send the data it observes to the second microbit for the observer to record. To set up 2 microbits so they can communicate over the radio they need to be on the same radio group.

#### Radio Sending Code

In the starting of the code the title is displayed, radio group 99 is setup, and the initial “temperature” variable is set to 0.

In the forever loop the temperature is collected from the microbit sensor and stored in the “temperature” variable. The temperature is displayed on the LED display. A radio signal is sent to all microbit radios in group 99. The program pauses for 1000 milliseconds and then loops again.

```blocks
let temperature = 0
basic.showString("TEMPERATURE RADIO REMOTE")
radio.setGroup(99)
basic.forever(() => {
    temperature = input.temperature()
    basic.showNumber(temperature)
    radio.sendNumber(temperature)
    basic.pause(1000)
})
```

#### Radio Receiver Code
In the starting of the code the title is displayed, radio group 99 is setup, and the initial “temperature” variable is set to 0.

In the radio received event, the temperature is received from sending the microbit radio. The receive temperature is then displayed on the LED display. This is repeated whenever a radio signal is received.

```blocks
let temperature = 0
basic.showString("TEMPERATURE RADIO RECEIVER")
radio.setGroup(99)
let temperature = 0
radio.onDataPacketReceived( ({ receivedNumber: temperature }) =>  {
    basic.showNumber(temperature)
})
```

#### Radio Receiver Code with Serial Write

This code is the same as above but one additional line of code is added to write to the word “Celisus” and the temperature to the MakeCode app to the USB serial connection. This is the same as described in the previous  “Microbit Windows 10 MakeCode app & a USB connection” section.

```blocks
let temperature = 0
basic.showString("TEMPERATURE RADIO RECEIVER SERIAL")
radio.setGroup(99)
radio.onDataPacketReceived( ({ receivedNumber: temperature }) =>  {
    basic.showNumber(temperature)
    serial.writeValue("Celisus", temperature)
})
```

## Extensions

**Fahrenheit Conversion.** Modify the code so it returns temperature values in Fahrenheit.  Formula: ``C = (F - 32) / (9/5)``

**Outdoor Weather Station.** Use a radio connection to collect and record the outside temperature.

**Fridge or Deep Freeze Temperature Monitor.**  Use a radio connection to collect and record the outside temperature. It could be set up so it only detects and reports the temperature every minute or a few times an hour. It could be setup to sound an alarm (play a musical sound) if the temperature were to rise above a certain level.

**Temperature at Different Elevations.** Several students could use micorbits to observe the temperature at different elevations where the live at set times to see if there are patterns in temperatures at different elevations or regions.

<br/>

| | | |
|-|-|-|
| Adapted from "[Electricity - Battery Tester](https://drive.google.com/open?id=15Xry9jFsIzHHG7RpaIomLodl9pBjTiKDvtjkd227b7Y)" by [C Lyman](http://utahcoding.org) | | [![CC BY-NC-SA](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/) |

```package
radio
```