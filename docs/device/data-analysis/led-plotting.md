# Plotting data with LEDs

To quickly see and record your data values, use the ``||led:plot bar graph||`` block. It will plot a value on the LED screen and write a number to console at the same time.

```blocks
basic.forever(() => {
    let i = 0
    while (i < 25) {
        led.plotBarGraph(i, 25)
        i += 2
        basic.pause(1000)
    }
})
```

Here's a plot of values from `1` to `25`:

```sim
basic.forever(() => {
    let i = 0
    while (i < 25) {
        led.plotBarGraph(i, 25)
        i += 2
        basic.pause(1000)
    }
})
```

## Plot range

A number of LEDs will light up to show how much the value is related to the _high_ number in the second argument. The high number sets the _range_ of values to show. If the high number is set to `16` and you want to plot the value of `8`, then that value is half of the range.

```block
led.plotBarGraph(8, 16)
```
So, about half of the LEDs will light up to represent that number.

```sim
basic.forever(() => {
    basic.clearScreen()
    basic.showString("8 up to 16")
    basic.clearScreen()
    basic.pause(500)
    led.plotBarGraph(8, 16)
    basic.pause(2000)
})
```

## Autoranging

If you don't know what the largest number to plot will be, then you can set the high number to `0`. This lets the largest value plotted be the range value. This is called _autoranging_. To see how it works, make an array of numbers and plot them. Put a large value in the middle of the array with smaller values before and after it. Watch as the same values are plotted with fewer lights after the largest number is plotted.

```blocks
let values = [4,8,12,16,50,4,8,12,16]
for (let i = 0; i < values.length; i++) {
    led.plotBarGraph(values[i], 0)
    basic.pause(1000)
}
```

## Recording plotted values

The ``||led:plot bar graph||`` also sends the number value it's plotting to the console. You can see the output in the Data Viewer. It charts the values and they appear as individual numbers in console.

```blocks
input.onButtonPressed(Button.B, () => {
    for (let i = 0; i < 25; i++) {
        if (i % 2 > 0) {
            led.plotBarGraph(0, 0)
        } else {
            led.plotBarGraph(i, 24)
        }
        basic.pause(500)
    }
})
```

The chart for the the plotted values from the example above:

![Plot LEDs chart result](/static/mb/device/data-analysis/plot-bar-graph.jpg)

The values appear in the console as just one number per line:

```
0
2
0
4
0
6
...
```

## See also

[plot bar graph](/reference/led/plot-bar-graph)

