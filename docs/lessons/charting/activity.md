# Activity 

Measure the acceleration on the @boardname@ in the "x" direction. 

## ~avatar avatar

Welcome! This activity will teach how to use the @boardname@ to chart the acceleration in the "x" direction. Let's get started!


## ~
Let's measure `acceleration (mg)` in the "x" direction. Get the acceleration value (milli g-force), in one of three specified dimensions.


```blocks
input.acceleration(Dimension.X)
```

## ~
Use the plot bar chart to visualize the acceleration on the LED screen of the @boardname@ in the specified range. You implement plot Bar Graph to display a vertical bar graph based on the "value" and "high" value. Then you must insert acceleration in the X dimension to measure the acceleration. 

```blocks
basic.forever(() => {
    led.plotBarGraph(input.acceleration(Dimension.X), 0)
})

```

## ~
Notice that moving the @boardname@ in the simulator from left to right (x direction) changes the values beneath the @boardname@ in a range from 1023 to -1023 as measured in milli-gravities. By hovering over the @boardname@ from left to right, you can observe changing values beneath the @boardname@ simulator. Also, the LEDs shown on the Bar Graph fluctates based on the movement of the @boardname@ simulator in the x direction. The line underneath the @boardname@ simulator reflect the acceleration in the x direction. 

NOTE: The colors of the charts reflect the color of the @boardname@ simulator. In this instance, the @boardname@ is yellow. So the color of the data line reflects the color of the @boardname@

![](/static/mb/data4.png)

## ~
 
Vigorously move the @boardname@ in the @boardname@ simulatator by moving the @boardname@ image from side to side. Every time the @boardname@ moves in the x direction in the simulator,  you are generating data points that can be reviewed in Excel. The more attempts to move the @boardname@ from side to side, the more data being saved in Excel. After you have vigarously moved the @boardname@ simulator from side to side for a sufficient amount of time, you are ready to graph or chart the accceleration of the @boardname@. We want a printout of our acceleration on Excel that can be graphed in Excel. 

## ~

We want to chart the data collected by using a tool in Excel. 

The final part of this experiment is opening and reviewing the data in the Excel CSV file. Simply click on the line beneath the simulator. A CSV file will be generated to display the data points collected by moving the @boardname@ in the X direction. Then click or tap on the data Excel file that was downloaded to your local ``Downloads`` Folder. 


## ~


First, click or tap on the first two columns (A, B) to  include the time of the data being collected; b) the results of acceleration data on the @boardname@  

![](/static/mb/data7.png)

Use the Recommended Charts command on the Insert tab to quickly create a chart that’s just right for your data.

* Select the data that you want to include in your chart.

* Click Insert > Recommended Charts.

![](/static/mb/lessons/chart1.png)

* On the Recommended Charts tab, scroll through the list of chart types that Excel recommends for your data. Pick the **scatter plot**.

## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/charting/challenge)

## ~

