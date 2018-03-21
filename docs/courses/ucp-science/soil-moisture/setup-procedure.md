# Setup and procedure

## Setup

1. Plan and design the experiments.
2. Plan and design data collection documents.
3. Program the @boardname@s.
4. Experiment with different data collection scenarios.
5. Add enhancements to the program and project.

## Background

This project will use 2 pins on the @boardname@ to measure the voltage between the **3V** pin and the pin **0** as the current travels through the soil. Wires or alligator clips are used to connect to the @boardname@. In the soil nails or larger wires are used as probes in the soil. The nutrients along with the moisture in the soil will allow an electrical current to travel through the soil. The more moisture in the soil the greater the voltage that is measured. Wet soil should have a reading around `1000` on a scale of 0 - 1024. Dry soil will give a reading of around `250`. 

![Connect soil probe to micro:bit pins](/static/courses/ucp-science/soil-moisture/microbit-meter-connect.jpg)

The @boardname@ has a analog to digital converter (ADC). This allows the microbit to read the analog voltage that is sent from the battery power supply (3 volts) through the soil. When the value is received it is converted to a digital value between 0-1024. This can allow the programmer to write the program to make decisions based on the reading returned to the display.

## Code

This project will use a @boardname@ to collect data using the voltage that can be passed through a soil sample.

### on Start event code

1. Open [MakeCode](@homeurl@).
2. Change the name of the project from “Untitled” to "Soil Moisture Tester".
3. Place the show string block in the on start block and put the title ``"SOIL MOISTURE TESTER"`` in the quotes. 
4. Check the display in the Simulator.

## on Button "A" pressed code

1. From the ``||input:Input||`` toolbox add an ``||input:on button "A" pressed||`` block to the code. 
2. From the ``||basic:Basic||`` toolbox add a ``||basic:show number||`` block.
3. From the ``||pins:Pins||`` toolbox add an ``||analog read pin P0||`` block to the end of the the ``||basic:show number||`` block. 
4. This will allow the soil moisture to be tested when the **A** button is pressed.
5. Check the display in the Simulator.
6. Download the project and copy it to the **MICROBIT** drive.
 
```blocks
// Soil Moisture Tester
basic.showString("SOIL MOISTURE TESTER")
// The analog read will return a value of the voltage
// between the 3v pin and the P0. Values will range
// from 0-1024.
input.onButtonPressed(Button.A, () => {
   basic.showNumber(pins.analogReadPin(AnalogPin.P0))
})
```

## Project Testing

1. Connect the alligator clips or wires to pin **0** and **3V**. Clip nails or heavy wires to the other ends of the clips to create the probes.
2. Place the probes in the soil and press the **A** button and read the output on the LED screen.
3. Test different soils and record the readings.
4. Check to make sure it works on the @boardname@.
5. Share the project by clicking the **Share** button at the top of the editor window.
6. Report on the findings from the experiment.

## ~hint

This experiment is modified from the [Soil Moisture](https://makecode.microbit.org/projects/soil-moisture) project.

## ~

## Data Collection

Collect data from several different types of soil and moisture amounts and record it on the Data Collection sheet. Make modifications to the experiment and code as needed. Create a report to share your findings from the experiment.

## Extensions

### Conditional Responses

A conditional statements that would return messages based on the reading received from the probes. 

```
if (condition) then
    display (“WET”)
else if (second condition)
    display (“MOIST”)
    else
Display (“DRY”)
```

### Dry Soil Sound Warning

Add code that would sound an alarm (play music) if the soil dries out below a certain point. The microbit could be left in a pot of soil with plants. It could be programmed to only sample the moisture every hour or so and then play the alarm when it is dry. This would help conserve the battery on the microbit.

<br/>

| | | |
|-|-|-|
| Adapted from "[Soil Moisture Tester](https://drive.google.com/open?id=1Rv4oPoxrggbokczbroQUl-10py3_5fQjVxOvwHR_5I4)" by [C Lyman](http://utahcoding.org) | | [![CC BY-NC-SA](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/) |
