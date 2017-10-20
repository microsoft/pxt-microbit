# Data logging

The simulator in the MakeCode editor allows you to stream and log data from your programs. It will do this when you write data values using the **[Serial](/reference/serial)** write functions. When you try your code in the simulator, each value you write is saved and collected as a log for you to analyze later if you want.

## Record some data

Let's write some values and see what the simulator records for us. Copy this code into the MakeCode editor and press the `A` button in the simulator.

```blocks
input.onButtonPressed(Button.A, () => {
    for (let i = 0; i <= 10 - 1; i++) {
        serial.writeValue("count", i * 10)
        basic.pause(1000)
    }
})
```

In the simulator, a logging view appears below the board to show the values your program writes. Also, there's a small chart next to it showing how your values are changing over time. Your data and chart have a color code that changes each time you run the program to show that a different data _stream_ is being logged. In this example, our data stream is colored red.

![Data logger](/static/mb/device/data-log.png)

### Plot values on the LEDs

To quickly see and log your data values, use the ``||led:plot bar graph||`` block. It will plot a value with the LEDs and write it to the data log too.

```blocks
input.onButtonPressed(Button.B, () => {
    for (let i = 0; i <= 25 - 1; i++) {
        if (i % 2 > 0) {
            led.plotBarGraph(0, 0)
        } else {
            led.plotBarGraph(i, 24)
        }
        basic.pause(300)
    }
})
```
A number of LEDs will light up to show how much the value is related to the _high_ number in the second arguement. The simualtor and the logging area show this when the loop index is `14` in the code example:

![Bar graph logger](/static/mb/device/bar-graph-log.png)

## Analyze the data

If you click the data logging area in the simulator, a window pops up called **Analyze Data**. Click on **Download data** to save the data file. If you have a spreadsheet program installed, it may open the data file automatically. If not, you can open it later yourself in your spreadsheet program.

![Analyze data window](/static/mb/device/analyze-data.png)

If you look at the contents of this data file in an editor, it will look like this:

```csv
red time, red count, log time, log source, log message
0, 0, 0, red-394085874039518505560.6935929915907719, count:90
1.003, 10
2.001, 20
2.999, 30
3.999, 40
4.998, 50
6.016, 60
7.002, 70
7.997, 80
8.998, 90
```

Each row in the file has different values with commas in between them. This gives the file a certain format called **Comma Separated Value**, or **CSV** as a short name. A row with three data values are written like: _item 1, item 2, item 3_. These three values make a row of three _columns_ in the data file. Sometimes, the first row of a CSV file is used say what data values in the columns mean. These are called column _headers_.

Spreadsheet programs know how to read CSV files and can put each data value into the proper row and column. Let's bring the file into a spreadsheet and see what it looks like.

![See data in spreadsheet](/static/mb/device/spreadsheet-data.png)

You can see that the value of the `count` variable is recorded ten times under the heading called `red count`. Just before it is another column called `red time`. The simulator automatically records the time when a value is written to the logging stream and places it on the same row. Since this stream is called the _red_ stream, the color name is added to the header names for both the recording time and our value.

The other columns in the data file give more information about the value we were streaming to the log.

* `log time`: The time in the logging stream when our value was first recorded.
* `log source`: A unique name to identify this stream in the log file.
* `log message`: A helper note about our value. It's usually full string of the last value.

### Charting

To get a chart of your data, you can just select the columns that contain your values and their recording times. Use the **scatter plot** charting feature of the spreadsheet program to display a nice graph of your data. Here you see the values increasing from `0` to `90` over nine seconds of time.

![Chart the data in spreadsheet](/static/mb/device/spreadsheet-chart.png)

### Multiple values

You can include more than one value in a log stream. Let's say you want to write values to show a parabola when the data is charted in the spreadsheet program. To record data points for the parabola, we write values for **x** from `-10` to `10`. For the cooresponding **y** values, we write `x * x` for each **x** value written.

```blocks
input.onButtonPressed(Button.A, () => {
    for (let i = 0; i <= 21 - 1; i++) {
        let x = i - 10
            serial.writeValue("x", x)
            serial.writeValue("y", x*x)
            basic.pause(1000)
        }
})
```

What you'll see is that the simulator inserted some more columns for the second value written. The data columns for our values are called `green x` and `green y`. There's a `green time` column now for both of the data values. Each value gets its recording time saved.

This time there are two row entries (one for each data value in the logging stream) added next to the data columns for `log time`, `log source`, and `log message`.

If you want to chart with just your data and leave the recording times out, select just the value columns.

![Multiple data values in spreadsheet](/static/mb/device/spreadsheet-multi.png)

## See also

[write value](/reference/serial/write-value), [uart-write-value](/reference/bluetooth/uart-write-value),
[plot bar graph](/reference/led/plot-bar-graph)