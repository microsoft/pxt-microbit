# Challenge 

### ~avatar avatar 

Welcome! The activity will teach you how to use the acceleration of the 1st micro:bit and to visualize the acceleration on the 2nd micro:bit. 
Let's get started!

### ~
Let's measure `acceleration (mg)` and then `send number`. `Acceleration` is measured in **milli-gravities**, so a value of -1000 is equivalent to -1g or -9.81m/s^2. We will be able to get the acceleration value (g-force), in the specified "x" dimension. `Send number` will broadcast a number data packet to other micro:bits connected via radio.

```blocks
radio.sendNumber(input.acceleration(Dimension.X));
```
### ~
We want to display the acceleration forever. In order to do so, we need a `forever` loop. A forever loop will repeat code in the background forever.

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.X));
});


```
### ~
We want to register code to run when a packet is received over radio. We can implement this code by adding `on data received`.

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.X))
})
radio.onDataReceived(() => {
    
})
```
### ~
Finally, we want to chart the acceleration. So we must first implement `plot bar graph`. `Plot Bar Graph` will display a vertical bar graph based on the value and high value. In order to transfer the receive the number from the 1st micro:bit, we must implement `receive number` to constantly display a vertical bar graph based on the value. Remember, the value will equal to the micro:bit's acceleration in the "x" direction.

```blocks
basic.forever(() => {
    radio.sendNumber(input.acceleration(Dimension.X))
})
radio.onDataReceived(() => {
    led.plotBarGraph(radio.receiveNumber(), 1023)
})

```
### ~
Notice that moving the micro:bit the farthest direction in the x direction will be -1023 on the charting beneath the simulator. The second observation will be that the LEDs will be full brightness on the 2nd micro:bit. There is a single LED turned on with the 1st micro:bit. Additionally, the graphs will reflect 0 acceleation for the 1st micro:bit. In this scenario, if you are adjusting the acceleration in the simualator, you are also changing your chart that will be produced.  

![](/static/mb/acc.png)

### ~
NOTE: The colors of the charts reflect the color of the micro:bit simulator. In this instance, the micro:bits are blue and green. So the colors of the line graphs reflect the colors of the micro:bit
 
 ### ~
After running this simulation several seconds by moving the micro:bit side to side in the x direction, you are ready to graph or chart the accceleration of the micro:bit.  We want a printout of our acceleration on Excel. We will graph the fluctuating acceleration of the simulation experiment. 

![](/static/mb/acc2.png)

### ~

Finally, you must open the Excel CSV file by clicking on the `data.csv` file
that was downloaded to Downloads Folder. 

![](/static/mb/data3.png)

Use the Recommended Charts command on the Insert tab to quickly create a chart that’s just right for your data.

* Select the data that you want to include in your chart.

* Click Insert > Recommended Charts.

![](/static/mb/lessons/chart1.png)

* On the Recommended Charts tab, scroll through the list of chart types that Excel recommends for your data. Pick the **scatter plot**.

![](/static/mb/chart_title.png)

* Use the Chart Elements, Chart Styles, and Chart Filters buttons next to the upper-right corner of the chart to add chart elements like axis titles or data labels, to customize the look of your chart

![](/static/mb/elements_styles_filters.png)

### ~
Have fun reviewing your simulation and analyze the acceleration by chart the Excel data using Excel.

* Connect the first micro:bit to your computer using your USB cable and run the charting script on it.
* Connect the second micro:bit to your computer using your USB cable and run the charting script on it.
* The first person and second person take turns tilting the micro:bit in the "x" direction while the other player charts the data on the micro:bit!
* Review and analyze the actual micro:bit device acceleration data on Excel
* Display acceleration with y or z using plot bar graph by changing acceleration from "x" to "y" or "z" 

```package
radio
```
