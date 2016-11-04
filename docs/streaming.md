# Streaming

This page describes how to stream data from the @boardname@ to the editor or even to the cloud.

## Before starting...

Make sure you follow the instructions on [how to setup a serial connection](/device/serial) with the @boardname@. 

## A typical scenario

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

## Local download

The log view will automatically start to collect and organize the data it detects. Simply click on the log view to open the various options
to export the data. The simplest option is to download the data as a **CSV file**. This file can easily be opened in programs like Office Excel.

## Cloud upload via Azure

In the data export dialog, there is another option to upload the data to the Azure cloud. This allows to upload small amounts of data 
without any kind setup. The data can be accessed via web services or directly from Office Excel.