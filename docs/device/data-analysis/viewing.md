# Viewing your data

## Recording data

When your code is writing data, and the editor is recording it, the **Show data** button is displayed in the simulator under the board and simulation controls.

![Show data button](/static/mb/device/data-analysis/show-data.jpg)

## Data view window

If you press the **Show data** button, the editor will switch from the **Blocks** or **JavaScript** view to display a charting window and a text console.

![Data chart and console](/static/mb/device/data-analysis/data-view.jpg)

The console window under the graph will show the data in the format it was written. The chart is the visual representation of the values appearing on the console.

## Time scroll

The chart will display new data as it arrives. The chart will scroll with time to continue to display new values.

![Data chart time scroll](/static/mb/device/data-analysis/time-scroll.gif)

## Data view controls

The chart window shows the data view controls on top of the chart.

![Data view controls](/static/mb/device/data-analysis/data-view-controls.jpg)

Here's what the controls do:

**Return**: The return button switches the view back to previous code window (either Blocks or JavaScript).

![Return button](/static/mb/device/data-analysis/return-button.jpg)


**Source**: Tells you where the data is coming from. If the code writing the data is running in the simulator, then the source is **Simulator**. If your code is running on the @boardname@ and connected by USB, the source is **@boardname@**.

![Source label](/static/mb/device/data-analysis/source-label.jpg)

**Pause**: The pause button will stop the display of new values and stop scrolling. When you resume, the chart starts again with the current value written.

![Pause button](/static/mb/device/data-analysis/pause-button.jpg)

**Resume**: The resume button will start displaying new values after the **Pause** button was pressed.

![Resume button](/static/mb/device/data-analysis/resume-button.jpg)

**Download**: The download button collects the data your code has written and downloads it to your computer as a file called something like _data-11-2018-23-00-0700.csv_. The numbers in the filename are the date and time when the file is created. The file may automatically open in an editor or spreadsheet if one of those programs is associated with _csv_ files.

![Download button](/static/mb/device/data-analysis/download-button.jpg)
