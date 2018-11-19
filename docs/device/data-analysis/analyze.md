# Analyze

When it recognizes that data in the console has a format it can show in a chart, the Data Viewer will display it along with any new values that arrive. It also creates multiple charts if it notices more than one value stream in the incoming data.

If you want to keep the data and work with it later, you can download it and save it to your computer or mobile device.

## Charting value streams

As an example, let's generate some data for two values. The first value `x` makes a line on the chart. The second value is the square of the first value `x**2`shifted by `5`. This second value will show a chart of a parabola.

```blocks
for (let x = 0; x <= 10; x++) {
    serial.writeValue("x", x)
    serial.writeValue("y", (x - 5)**2)
    basic.pause(1000)
}
```

![Charts of line and parabola](/static/mb/device/data-analysis/line-parabola.jpg)

Since we used ``||serial:serial write value||`` for each value, there are two charts, one for the `x` stream and the other for the `y` stream. Also, the values shown in the console window are formatted as name value pairs:

```
x:0
y:25
x:1
y:16
...
```

## Charting by data lines

Instead of writing multiple values separately, we can combine them in an array and write them together at once. Using the last example, let's combine each line and parabola value into an array. 

```blocks
for (let x = 0; x <= 10; x++) {
    serial.writeNumbers([x, (x - 5) ** 2])
    basic.pause(1000)
}
```

![One chart of both line and parabola](/static/mb/device/data-analysis/line-parabola2.jpg)

This time both values are shown on the same chart. We used ``||serial:serial write numbers||`` to send both values at the same time. Instead of being written as name value pairs, the values are combined into one line of comma separated values (CSV). The Data Viewer recognizes the values as one stream and puts multiple data lines on the same chart. The console shows the data in CSV format:

```
0,25
1,16
2,9
3,4
...
```

## Raw data

The data in the console window appears exactly like it's written by your program. The data your program writes is called "raw" data. The Data Viewer reads the data and "cooks" it by deciding how to display it in a way that's useful to you.

You can select and copy the raw data from the console and paste it into another program if you want to work with it outside of the MakeCode editor. Also, there is a copy button next to the console window that let's you easily copy the raw data with one click.

![Copy button for console data](/static/mb/device/data-analysis/copy-button.gif)

## Downloading your data

You can download your data to save it to view in another program. Click the **Download** button above the chart view.

![Download button highlighted](/static/mb/device/data-analysis/download-button.jpg)

The data is formatted again and saved in file with a name like:

``microbit-data-13-20-2018-14-18-15-0700.csv``

The filename contains the date and time when the data was downloaded. If you open the file in an editor you can see how the Data Viewer reformatted it from how it was in the console.

### Download format

The download file will contain your data as lines of CSV. The downloaded data from the first example will look something like this:

```
sep=	
time (source1)	x	time (source1)	y
0	0	0	25
1.018	1	1.026	16
2.049	2	2.045	9
3.062	3	3.059	4
4.064	4	4.074	1
5.078	5	5.078	0
6.115	6	6.112	1
7.097	7	7.112	4
8.131	8	8.128	9
9.145	9	9.145	16
10.148	10	10.16	25
```

The first line says what character is used as the value separator. Characters other than a comma can be used as separators. The Data Viewer choose to use a `TAB` character. The next line contains the headings for the values. These are the names of each value when name value pairs are written to the console. Also, a time value (timestamp) is included for each value. The timestamp is the amount of time since the start of the program when the value was written.

The remaining lines contain the data values and their timestamps. Each line has one occurrence of each value. So, for the example data above, each new `x` and `y` value is put together on the same line.

### Loading into a spreadsheet

Each line of data is placed into a row in the spreadsheet. The separators tell the spreadsheet which column the values go into.

![CSV data in spreadsheet](/static/mb/device/data-analysis/spreadsheet-data.jpg)

### Analyze in the spreadsheet

Spreadsheets are powerful tools for analyzing and looking at relationships in your data. Most spreadsheet programs can do advanced charting too. Here's a chart of our example data. You'll notice that it looks similar to the chart displayed by the MakeCode editor.

![Spreadsheet with chart](/static/mb/device/data-analysis/spreadsheet-chart.jpg)

The spreadsheet knows how to take the headings from the download file and use them as labels for the individual data lines.
