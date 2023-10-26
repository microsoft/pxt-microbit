# Setup and procedure

## Setup

* Review the definition of acceleration and discuss the different uses of accelerometers in every-day devices.
* Explore how the micro:bit measures motion along the X, Y and Z axis using the ``||input:acceleration||`` block in MakeCode.
* Code the micro:bit to collect and store acceleration values using the data logger blocks.
* Create a space to race with a start and finish line.
* Group students to race in heats.
* Download the data from the micro:bits and analyze the results.
* Compare student scores to see who the winner is.
* Debrief on the results.

## Code

This project will use the Data Logger extension which only works on the micro:bit v2.

* Create a new project.
* Click on **Extensions** in the Toolbox and add the Data Logger Extension.

![Select Datalogger extension](/static/courses/ucp-science/spoon-race/extension.png)

**Note**: The Data Logger extension allows you to collect data from the micro:bit sensors and store in a file on the micro:bit device. Because of this, it is good for long-running experiments, or experiments where the micro:bit is away from the computer. The micro:bit v2 has 512 KB of flash memory, so be careful of how much data you collect - once you reach the limit, you won’t be able to collect any more!

* Log data every 1 second - from the ``||loops:Loops||`` category, drag an ``||loops:every 500ms||`` block out on the workspace.
* Click on the drop-down menu to change to 1 second (1000 milliseconds).

```blocks
loops.everyInterval(1000, function () {

})
```

* From the ``||datalogger:Data Logger||`` category, drag a ``||datalogger:log data||`` block into the ``||loops:every 1000ms||`` block.
* In the ``||datalogger:log data||`` block, click on the plus (+) icon twice to add 2 more data fields to the log.
* Name these columns: "AX", "AY" and "AZ" to represent the three axis of motion (alternately you can name them more descriptive names like "TiltLeftRight", "TiltForwardBack" or "MoveUpDown").

```blocks
loops.everyInterval(1000, function () {
    datalogger.log(
        datalogger.createCV("AX", 0),
        datalogger.createCV("AY", 0),
        datalogger.createCV("AZ", 0)
    )
})
```

* From the ``||input:Input||`` category, drag three ``||input:acceleration||`` blocks into the ``||datalogger:log data||`` block, replacing the values of 0.
* Using the drop-down menus, change the second and third ``||input:acceleration||`` blocks to y and z.

```blocks
loops.everyInterval(1000, function () {
    datalogger.log(
        datalogger.createCV("AX", input.acceleration(Dimension.X)),
        datalogger.createCV("AY", input.acceleration(Dimension.Y)),
        datalogger.createCV("AZ", input.acceleration(Dimension.Z))
    )
})
```

Notice in the micro:bit simulator, you can start to see simulated data. Click the **Show data** Simulator button. Try moving your mouse cursor over the on-screen micro:bit to simulate movement and see how the accelerometer values that are logged every 1 second change. Click on the Go back button to return to the editor.

![Simulator with logged data](/static/courses/ucp-science/spoon-race/simulator.png)

Now that we are collecting accelerometer data, we need a way to start and stop data collection. To do this, we will use a flag. A flag is a Boolean variable - meaning, that it can only hold true or false values. You can think of a flag as a light switch - it is either on or off. Software developers often use feature flags to enable or disable certain features in a product.

* From the ``||input:Input||`` category, drag two ``||input:on button pressed||`` blocks onto the workspace.
* In one of the ``||input:on button pressed||`` blocks, click on the drop-down menu to change to button B.

```blocks
input.onButtonPressed(Button.A, function () {

})
input.onButtonPressed(Button.B, function () {

})
```

* In the ``||variables:Variables||`` category, click on the **Make a Variable** button.
* Name this variable "IsLogging" and press Ok.
* From the ``||variables:Variables||`` category, drag two ``||variables:Set IsLogging||`` blocks and drop one each into the ``||input:on button A pressed||`` and ``||input:on button B pressed||`` blocks.
* From the ``||logic:Logic||`` category, drag a ``||logic:true||`` block into the Button A ``||variables:Set IsLogging||`` block replacing the 0.
* From the ``||logic:Logic||`` category, drag a ``||logic:false||`` block into the Button B ``||variables:Set IsLogging||`` block replacing the 0.

```blocks
let IsLogging = false
input.onButtonPressed(Button.A, function () {
    IsLogging = true
})
input.onButtonPressed(Button.B, function () {
    IsLogging = false
})
```

* From the ``||logic:Logic||`` category, drag a ``||logic:if true then||`` block out into the ``||loops:every 1000ms||`` block to surround the ``||datalogger:log data||`` block.
* From the ``||variables:Variables||`` category, drag a ``||variables:IsLogging||`` block into the ``||logic:if true then||`` block replacing ``||logic:true||``.

```blocks
let IsLogging = false
loops.everyInterval(1000, function () {
    if (IsLogging) {
        datalogger.log(
            datalogger.createCV("AX", input.acceleration(Dimension.X)),
            datalogger.createCV("AY", input.acceleration(Dimension.Y)),
            datalogger.createCV("AZ", input.acceleration(Dimension.Z))
        )
    }
})
```

Lastly, let’s add a visual indicator that our micro:bit is logging data.

* From the ``||basic:Basic||`` category, drag a ``||basic:show icon||`` block into the ``||logic:if true then||`` block just above the ``||datalogger:log data||`` block.
* Using the icon drop-down menu select an image that represents data logging to you.
* From the ``||basic:Basic||`` category, drag a ``||basic:clear screen||`` block and drop after the ``||basic:show icon||`` block.

Note that the default behavior of the data logger is to append data to the data log file until you download a new program to the micro:bit. If you would like to wipe all previous data from the data log file, you can add a ``||datalogger:delete log||`` block. This will delete all existing data from the log each time you press button A to start the data collection.

```blocks
let IsLogging = false
input.onButtonPressed(Button.A, function () {
    datalogger.deleteLog()
    IsLogging = true
})
```

Your complete code should look something like this:

```blocks
let IsLogging = false
input.onButtonPressed(Button.A, function () {
    datalogger.deleteLog()
    IsLogging = true
})
input.onButtonPressed(Button.B, function () {
    IsLogging = false
})
loops.everyInterval(1000, function () {
    if (IsLogging) {
        basic.showIcon(IconNames.SmallDiamond)
        basic.clearScreen()
        datalogger.log(
            datalogger.createCV("AX", input.acceleration(Dimension.X)),
            datalogger.createCV("AY", input.acceleration(Dimension.Y)),
            datalogger.createCV("AZ", input.acceleration(Dimension.Z))
        )
    }
})
```

Sample code file: https://makecode.microbit.org/_Ur50YwCAxeEf

Try it out in the simulator by pressing the A button to start collecting data, and press the B button to stop data collection.

![Data collection run in simulator](/static/courses/ucp-science/spoon-race/sim-data.gif)

Download the code onto the micro:bit, and then connect the micro:bit to a battery pack.

## Let’s Race!

After coding the micro:bit, assemble it together on a spoon. You can either place it by itself, or construct some sort of carrier to make it easier to carry with a spoon. Just be sure you can access the A and B buttons.

A micro:bit paper holder that comes with the Go Kit:

![Spoon with a micro:bit and paper holder](/static/courses/ucp-science/spoon-race/spoon-1.jpg)

Affixing the micro:bit to an egg:

![Spoon with egg attached to micro:bit](/static/courses/ucp-science/spoon-race/spoon-2.jpg)

Carrying it loose:

![Spoon with just a micro:bit](/static/courses/ucp-science/spoon-race/spoon-3.jpg)

When you are ready to race, press button A to start the race, and press button B to end the race. Do not press the buttons again until you can download your data from the micro:bit.

## Analyze the Data

After the race, plug your micro:bit back into a computer using the USB cable. Use the file explorer, navigate to the MICROBIT drive, and double click the **MY_DATA.htm** file.

![Finding the MY_DATA.HTM file](/static/courses/ucp-science/spoon-race/my-data-htm.png)

You will see your data from the race in a table format.

![Viewing the MY_DATA.HTM file as a table](/static/courses/ucp-science/spoon-race/my-data-table.png)

You can click to see a visual preview of the data as well.

![Viewing the MY_DATA.HTM file as a graph](/static/courses/ucp-science/spoon-race/my-data-graph.png)

Click the Download button to download your data to a **microbit.csv** file, then open it with Excel. Create a line chart for the data table with time on the X axis.

![Spreadsheet with line chart on x-axis](/static/courses/ucp-science/spoon-race/spreadsheet-1.png)

Perform the following calculations:

* Calculate Time Elapsed: End_Time – Start_Time

![Spreadsheet of elapsed time](/static/courses/ucp-science/spoon-race/spreadsheet-2.png)

* Calculate the difference between the acceleration values for AX, AY and AZ columns: Maximum_Value – Minimum_Value

![Spreadsheet of max/min difference of acceleration](/static/courses/ucp-science/spoon-race/spreadsheet-3.png)

* Calculate the average of the three axis of movement: Average(AX, AY, AZ)

![Spreadsheet of average of 3-axis movement](/static/courses/ucp-science/spoon-race/spreadsheet-4.png)

* Compare each student’s time and average spread of motion results in a table. The student with the shortest time, and the lowest average acceleration value spread wins the race!

![Spreadsheet of time and average variance](/static/courses/ucp-science/spoon-race/spreadsheet-5.png)


See sample result data: https://aka.ms/SpoonRaceExcel

## Debrief

Discuss the results of the experiment:

* What was the pattern for the most successful racers?
* Were there instances where the data collection failed?
* Were there outlier data points in any of the races?
* What could that indicate?
* Are there any other ways you might calculate the winning criteria?

## ~button /courses/ucp-science/spoon-race/resources
NEXT: Resources
## ~

```package
datalogger
```
