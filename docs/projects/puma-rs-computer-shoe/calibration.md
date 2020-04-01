# Calibration

A calibration worksheet is used to relate speed and stride. This can be performed using a spreadsheet program following these steps:

1. Create a new spreadsheet.
2. In cell ``A1``, create a **Distance** label and enter the length of the track in ``A2``.
3. In cell ``B1`` and ``C1``, enter the **Time** and **Steps** labels.
4. Enter the data recorded for each run in the column ``B`` and ``C``.
5. In cell ``D1``, there **stride time** label.
6. In cell ``D2``, enter the equation ``=C2/B2`` then drag the square on the cell down.
7. In cell ``E1``, enter **speed**.
8. In cell ``E2``, enter the equation ``=$A$2/B2``, then drag the square down.
9. Select the ``D`` and ``E`` columns, click on ``insert`` and select a **scatter** plot.
10. Click on "Add Chart Element", "trendlines", "linear".
11. Click on the trend line and select "display equation".

You should see something like **y = A x + B**, where A and B are number values.