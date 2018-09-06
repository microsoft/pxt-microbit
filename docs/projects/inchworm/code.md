# Code

## @description code to make the inchworm alive

## ~avatar avatar

Add code to make the inchworm move.

## ~

## Duration: ~30 minutes

## Step 1: walk forever

In order for the inchworm to move, the @boardname@ needs to command the servo to move between ``0`` and ``180`` degrees at a certain pace. The code below starts the inchworm moving when the **A** button is pressed.

```blocks
input.onButtonPressed(Button.A, () => {
    pins.servoWritePin(AnalogPin.P0, 0);
    basic.pause(500);
    pins.servoWritePin(AnalogPin.P0, 180);
    basic.pause(500);
});
```

## ~ hint

You might notice that the inchworm goes really slow or maybe just won't move at all. Try to improve the design of your legs and teeth until the inchworm can go as fast as possible. Also, trying it on the carpet gives it more grip and helps to avoid skidding.

## ~

## ~button /projects/inchworm/connect
NEXT: Connect
## ~