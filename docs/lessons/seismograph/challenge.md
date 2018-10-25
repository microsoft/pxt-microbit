# Seismograph Challenge

Coding challenges for the seismograph.


## ~avatar avatar

Engineering: In this project, you will build a remote control based on the seismograph @boardname@ activity using a second @boardname@ and micro USB cable.

## ~

## What you'll need:

* @boardname@s (2)
* micro USB cables (2)
* Plate
* Tape
* Scissors

![](/static/mb/lessons/seis_challenge01.png)

## Before we get started

Complete the [seismograph](/lessons/seismograph/activity) activity and your code will look like this:

```blocks
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.Strength) - 1023, 0);
});

```

## ~avatar avatar
Computer Science: Welcome! The activity will teach you how to code the acceleration of the 1st @boardname@ and to visualize the acceleration on the 2nd @boardname@. Let's get started!
## ~

# Computer Science Steps

## 1.
We want to simply detach the blocks from the recent activity. We will use blocks from the activity to create a brand new program to show the way @boardname@ devices communicate through the BLE (Bluetooth low energy) radio.

```shuffle
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.Strength) - 1023, 0);
});

```

## 2.
Let's measure `acceleration (mg)` and then `send number`. `Acceleration` is measured in **milli-gravities**, so a value of -1000 is equivalent to -1g or -9.81m/s^2. We will be able to get the acceleration value (g-force), in the specified "x" dimension. `Send number` will broadcast a number data packet to other @boardname@s connected via radio.

We need add send number block found in the Radio drawer. We will attach send number to acceleration and subtract the gravity from acceleration strength.

Your finished code will look like this:

```blocks
radio.sendNumber(input.acceleration(Dimension.Strength) - 1023);
```

## 3.
We want to display the acceleration forever. In order to do so, we need a `forever` loop. A forever loop will repeat code in the background forever. We need attach forever loop to send number.

Your finished code will look like this:

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.Strength) - 1023);
});

```

## 4.
We want to register code to run when a packet is received over radio. We can implement this code by adding `on data received`block found in the radio drawer.

Your finished code will look like this:

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.Strength) - 1023);
});
radio.onReceivedNumber(function (receivedNumber) {
});

```

## 5.
Finally, we want to chart the acceleration. So we must first implement `plot bar graph`. `Plot Bar Graph` will display a vertical bar graph based on the value and high value. In order to transfer the receive the number from the 1st @boardname@, we must implement `receive number` to constantly display a vertical bar graph based on the value. Remember, the value will equal to the @boardname@'s acceleration in the "x" direction.

Your finished code will look like this:

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.Strength) - 1023);
});
radio.onReceivedNumber(function (receivedNumber) {
    led.plotBarGraph(receivedNumber, 0);
});
```

## ~avatar avatar
Science: Welcome! The activity will teach you how to chart the acceleration of the 1st @boardname@ and to visualize the acceleration on the 2nd @boardname@. Let's get started!
## ~

# Science Steps

## 6.
First, notice that moving the 1st @boardname@ in the simulator in any direction, you will change the acceleration value of the 2nd @boardname@. Also, notice that by moving the @boardname@ simulator, there is a changing acceleration value of the second @boardname@. Second, the flat colored horizontal line will start a waving line on the 2nd @boardname@ to display the value of the strength as measured in milli-gravities. Finally, notice that the LED display will fluctate based on the movement of the 2nd @boardname@ simulator.

![](/static/mb/lessons/seis_challenge02.png)

## 7.

Connect the 2nd @boardname@ to your computer using your USB cable. We should have two @boardname@ devices attached to the computer.

![](/static/mb/lessons/seismograph33.png)

## 8.

Click or tap the **Download** button for the seismograph program to run the program on the 1st @boardname@ and 2nd @boardname@.

## 9.

The black lines should appear directly beneath the colored lines. The black lines measure the @boardname@ acceleration. And the colored lines measures @boardname@ simulator acceleration.

![](/static/mb/lessons/seis_challenge05.png)

Run the acceleration experiment by vigarously moving the plate in any direction or move the object below the @boardname@ (such as a table).

![](/static/mb/lessons/seis_challenge06.png)

Every time the @boardname@ moves in any direction, you generate data points that can be reviewed in Excel later. The more attempts to move the @boardname@, the more data to be reviewed in Excel. Notice that the LED on the 2nd @boardname@ changes to communicate the movement of the 1st @boardname@.

![](/static/mb/lessons/seis_challenge04.png)

Now we are ready to graph or chart the accceleration of the @boardname@. We want a printout of the @boardname@ acceleration graphed in Excel.

## 10.

In order to receive the the data plotted by Excel, click or tap anywhere in the on the chart data.

![](/static/mb/lessons/seis_challenge07.png)

## 11.

You have two options to Analyze Data:

* Local File: Save the data to your local Downloads folder and open it in Excel.
* Stream to Cloud: Upload your data to Microsoft Azure to analyze it.

Click or tap Download data

![](/static/mb/lessons/seismograph9.png)

## 12.

A CSV file will be generated to display the data points collected by the @boardname@. Click or tap on the data Excel file that was downloaded to your local Downloads Folder.

![](/static/mb/lessons/analyze9.png)

## 13.

Select the data that you want to include in your chart. The chart should include the first two columns: time and acceleration.

Click or tap on the first two columns (A, B) to include time and acceleration data from the @boardname@. We only need the first two columns (A, B) because the 2nd @boardname@ changes have been communicated by the 1st @boardname@. So the data points of the seismograph are being recorded on the 1st @boardname@.

## 14.

Click or tap on Insert then select Recommended Charts. We can select a chart that’s just right for the data.

![](/static/mb/analyze3.png)

On the Recommended Charts tab, scroll through the list of chart types that Excel recommends for your data.

We want to select the chart called Line. A line chart is used to display trends over time. We will use the line chart because there are many data points over time.

Click on the chart type to see how your data will look in that format. When you find the chart type that you want, click it, and then click OK.

![](/static/mb/lessons/analyze16.png)

Tip: If you don’t see the line chart, click the All Charts tab to see the line chart.

## 15.

Use the Chart Elements, Chart Styles, and Chart Filters buttons next to the upper-right corner of the chart to add chart elements like axis titles or data labels, to customize the look of your chart

Alternatively, click or tap on the Design Ribbon.

Let's select Style 10 as an example.

![](/static/mb/lessons/analyze19.png)


## ~
* Have fun reviewing your seismograph data and analyzing the acceleration with Excel.
* The first person and second person take shaking or moving the micor:bit in any direction while the other player charts the data on the @boardname@!
* Review and analyze the actual @boardname@ device acceleration data on Excel

```package
radio
```