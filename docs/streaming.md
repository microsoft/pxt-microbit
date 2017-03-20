# @extends

## Before starting... #setup

Make sure you follow the instructions on [how to setup a serial connection](/device/serial) with the @boardname@. 

## A typical scenario #example

A common scenario is to chart some sensor data, such as the acceleration, and analyse it in the editor. 
For example, run this code on your @boardname@.

```blocks
basic.forever(() => {
   led.plotBarGraph(input.acceleration(Dimension.X), 0);
});
```

If your serial connection is working, you will start to see a chart representing that acceleration ``x`` value read from the @boardname@.
Each time ``led.plotBarGraph`` is called, the value is also written to the serial output. The log view automatically detects 
that there is a data stream and displays a graph.
