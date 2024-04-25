# Code

## @description code to make the inchworm alive

## ~avatar avatar

Add code to make the inchworm move.

## ~

## Duration: ~30 minutes

## Run logic
Before starting coding again, everyone can take a look at this diagram, which represents the operating logic of the car.
![Materials](/static/mb/projects/line-following-robot/run-logic.jpg)

## Step 1: Initialize variables.

``rightSensor``: Infrared sensor on the right
``leftSensor``: Infrared sensor on the left
``flag``: Car's operational state
``lineThreshold``: Trigger threshold, actions are taken when sensor values exceed this value
```blocks
let rightSensor = 0
let leftSensor = 0
let flag = false
let lineThreshold = 600
flag = false
```

## Step 2: Change the car's state.

When button ```A``` is pressed, set the ```flag``` to the opposite state.
```blocks
input.onButtonPressed(Button.A, function () {
    flag = !(flag)
})
```

# Step 3: Line following

Set wheel states accordingly based on sensor values.


```blocks
basic.forever(function () {
    leftSensor = tabbyRobot.line(tabbyRobot.LeftRight.LEFT)
    rightSensor = tabbyRobot.line(tabbyRobot.LeftRight.RGIHT)
    if (flag) {
        if (leftSensor >= lineThreshold && rightSensor >= lineThreshold) {
            tabbyRobot.motorRun(20, 20)
        } else if (leftSensor < lineThreshold && rightSensor >= lineThreshold) {
            tabbyRobot.motorRun(15, 60)
        } else if (leftSensor >= lineThreshold && rightSensor < lineThreshold) {
            tabbyRobot.motorRun(60, 15)
        } else {
            tabbyRobot.motorStop()
        }
    } else {
        tabbyRobot.motorStop()
    }
})
```

# Complete program
```blocks
input.onButtonPressed(Button.A, function () {
    flag = !(flag)
})
let rightSensor = 0
let leftSensor = 0
let flag = false
let lineThreshold = 600
flag = false
basic.forever(function () {
    leftSensor = tabbyRobot.line(tabbyRobot.LeftRight.LEFT)
    rightSensor = tabbyRobot.line(tabbyRobot.LeftRight.RGIHT)
    if (flag) {
        if (leftSensor >= lineThreshold && rightSensor >= lineThreshold) {
            tabbyRobot.motorRun(20, 20)
        } else if (leftSensor < lineThreshold && rightSensor >= lineThreshold) {
            tabbyRobot.motorRun(15, 60)
        } else if (leftSensor >= lineThreshold && rightSensor < lineThreshold) {
            tabbyRobot.motorRun(60, 15)
        } else {
            tabbyRobot.motorStop()
        }
    } else {
        tabbyRobot.motorStop()
    }
})
```

## ~ hint    
After downloading the program, place the car on the track, then press the ```A``` button to start line following.
## ~