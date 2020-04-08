# Calibration

A calibration worksheet is used to relate speed and stride. This can be performed using a spreadsheet program using the following steps.

## Make a worksheet

Follow these steps to create your calibration worksheet or use the rows from the [sample template](#sample-template).

1. Create a new spreadsheet.
2. In cell ``A1``, create a **Distance** label and enter the length of the track in ``A2``.
3. In cell ``B1`` and ``C1``, enter the **Time** and **Steps** labels.
4. Enter the data recorded for each run in the column ``B`` and ``C``.
5. In cell ``D1``, there **Stride Time** label.
6. In cell ``D2``, enter the equation ``=C2/B2`` then drag the square on the cell down.
7. In cell ``E1``, enter **Speed**.
8. In cell ``E2``, enter the equation ``=$A$2/B2``, then drag the square down.

## Plotting your data

1. Select the ``D`` and ``E`` columns, click on ``Insert`` and select a **Scatter** plot.
2. Click on "Add Chart Element", "Trendlines", "Linear".
3. Click on the trend line and select "Display Equation".

You should see something like **y = A x + B**, where **A** and **B** are number values.

## Worksheet template

You can use this template to help you get started with your calibration worksheet. There are 5 rows with
pre-filled measurement data. Replace the **Distance**, **Time**, and **Steps** values with your own data.
Add or remove measurement rows depending on how much accuracy you want for your calibration.

To put the template into your spreadsheet program, copy all the rows including the header of the sample template. Open a new worksheet and paste in the rows copied from here. Select the first column of the
worksheet and use "Text to Columns" to split the data into seperate columns. Set the comma as the delimiter.

### Sample template

The sample data uses ``feet`` for **Distance** and ``seconds`` for **Time**.

```
Distance,Time,Steps,Stride Time,Speed
100,11.36,16,=C2/B2,=$A$2/B2
100,12.05,18,=C3/B3,=$A$3/B3
100,12.57,18,=C4/B4,=$A$4/B4
100,11.89,17,=C5/B5,=$A$5/B5
100,11.52,17,=C6/B6,=$A$6/B6
```

### Paste in data and plot

![Worksheet and scatter plot](/static/mb/projects/puma-rs-computer-shoe/calibrate-sheet.gif)
