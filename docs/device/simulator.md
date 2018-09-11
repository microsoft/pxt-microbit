# Simulator

The JavaScript simulator allows you to test and execute most BBC micro:bit programs in the browser.
It allows you to emulate sensor data or user interactions.

```sim
input.onButtonPressed(Button.A, () => {
   basic.showString("A");
});
input.onButtonPressed(Button.B, () => {
   basic.showString("B");
});
input.onPinPressed(TouchPin.P0, () => {
   basic.showString("0");
});
input.onPinPressed(TouchPin.P1, () => {
   basic.showString("1");
});
input.onPinPressed(TouchPin.P2, () => {
   basic.showString("2");
});
input.temperature()
input.compassHeading()
input.lightLevel()
```
