# Setup and procedure

## Setup

* Plan and design the experiments

>What environment will the data be collected in? Does the @boardname@ need to be protected in a ziplock bag? What is the purpose of the experiment?

* Plan and design data collection documents

>Program the @boardname@s. Experiment with different data collection scenarios. 

## Code

This project will start with one @boardname@ and program it to use the @boardname@’s temperature sensor to collect and display the current temperature in Celsius on the @boardname@’s LED display. The data collected can be recorded manually on a paper with a pencil.

### MakeCode programming environment

1. Open the MakeCode editor in a browser at: @homeurl@.
2. Or download and use the [Windows 10 MakeCode](https://www.microsoft.com/store/apps/9PJC7SV48LCX) app.

### Temperature project 1 - LED display

#### on Start event

1. Name the project, "Temperature Collection".
2. The ``||basic:on start||`` event will display the title and purpose of the @boardname@ in all caps, `"TEMPERATURE"`. The text is put in the ``||basic:show string||`` block (the title is put in the ``||basic:on start||`` event so when the @boardname@ is started up it will show what it is programmed to do. It is done in all CAPS because it is easier to read as it is displayed in the LED display).

```blocks
basic.showString("TEMPERATURE COLLECTION")
```

#### forever event

In the ``||basic:forever||`` event temperature data can be continually collected from the @boardname@’s temperature sensor. The data can be sent to the  display on the LEDs using a ``||basic:show number||`` block from the ``||basic:Basic||`` toolbox.

```blocks
basic.forever(() => {
    basic.showNumber(input.temperature())
});
```

As data is displayed it can then be recorded on paper for further analysis.

Data can also be displayed graphically using the ``||led:plot bar graph of||`` block from the ``||led:LED||`` toolbox. 

```blocks
basic.forever(() => {
    led.plotBarGraph(
        input.temperature(), 0
        )
});
```

**Variation:** Instead of using a ``||basic:forever||`` loop, the **A** and **B** buttons could be programmed to display the temperature in either Celsius or Fahrenheit.

### Temperature project 2 - @boardname@ Windows 10 MakeCode app and a USB connection

The Windows 10 MakeCode app allows data to directly read serial data from your @boardname@ for data logging and other fun experiments. This allow the collection of data in real time which can be downloaded in a CSV file for additional analysis in a spreadsheet.

**Get the app:** The Windows 10 MakeCode app can be downloaded here: https://www.microsoft.com/store/apps/9PJC7SV48LCX 

With the program downloaded from the MakeCode app to the @boardname@ and the USB cable left connected and using the ``||serial:serial write value||`` block from the ``|serial:Serial||`` toolbox in the **Advanced** tool section.

```blocks
basic.forever(() => {
	serial.writeValue("Celsius", input.temperature())
});
```

When the program is running, a purple **Show data Device** button shows up under the Simulator. By clicking on the button the data being observed can monitored and graphed in the **Show data Device** window. 

![show device button](/static/courses/ucp-science/temperature/show-device.png)

The graph is highlighted with the blue box. The **Download** button in the red highlighted box allows the downloading of the recorded data as a CSV file which can be opened in a spreadsheet and analyzed.

![export data](/static/courses/ucp-science/temperature/export.png)
 
### Temperature project 3 - Remote radio collecting to receiving radio displaying

Two @boardname@s can be used to collect and record data using the radio commands. One @boardname@ can be setup remotely and the other @boardname@ can be used to observe the data. The first @boardname@ can send the data it observes to the second @boardname@ for the observer to record. To set up two @boardname@s so they can communicate over the radio they need to be on the same radio group.

#### Radio sending code

In the starting of the code the title is displayed, radio group `99` is setup, and the initial ``temperature`` variable is set to `0`.

In the ``||basic:forever||`` loop the temperature is collected from the @boardname@ sensor and stored in the ``temperature``variable. The temperature is displayed on the LED display. A radio signal is sent to all @boardname@ radios in group 99. The program pauses for `1000` milliseconds and then loops again.

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

#### Radio receiver code

In the starting of the code the title is displayed, radio group `99` is setup, and the initial ``temperature`` variable is set to `0`.

In the ``||radio:on received number||`` event, the temperature is received from sending the @boardname@ radio. The receive temperature is then displayed on the LED display. This is repeated whenever a radio signal is received.

```blocks
let temperature = 0
basic.showString("TEMPERATURE RADIO RECEIVER")
radio.setGroup(99)
radio.onReceivedNumber( function(receivedNumber) {
    basic.showNumber(receivedNumber)
})
```

#### Radio receiver code with serial Write

This code is the same as above but one additional line of code is added to write to the word “Celisus” and the temperature to the MakeCode app to the USB serial connection. This is the same as described in the **Project 2** section above.

```blocks
let temperature = 0
basic.showString("TEMPERATURE RADIO RECEIVER SERIAL")
radio.setGroup(99)
radio.onReceivedNumber( function(receivedNumber) {
    basic.showNumber(receivedNumber)
    serial.writeValue("Celisus", receivedNumber)
})
```

## Extensions

### Fahrenheit conversion

Modify the code so it returns temperature values in Fahrenheit. Formula: ``C = (F - 32) / (9/5)``.

### Outdoor weather station

Use a radio connection to collect and record the outside temperature.

### Fridge or deep freeze temperature monitor

Use a radio connection to collect and record the outside temperature. It could be set up so it only detects and reports the temperature every minute or a few times an hour. It could be setup to sound an alarm (play a musical sound) if the temperature were to rise above a certain level.

### Temperature at different elevations

Several students could use micorbits to observe the temperature at different elevations where the live at set times to see if there are patterns in temperatures at different elevations or regions.

<br/>

| | | |
|-|-|-|
| Adapted from "[Temperature Data](https://drive.google.com/open?id=1X6FeANka2qcMC2ZFQgSSxEoHxsQc--6a0Pk9xxMOwE8)" by [C Lyman](http://utahcoding.org) | | [![CC BY-NC-SA](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/) |

```package
radio
```