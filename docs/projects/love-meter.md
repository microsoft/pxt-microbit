# love meter

![](/static/mb/projects/a3-pins.png)

Use pins P0, P1 and P2 to change the display by creating a circuit with your body.

## Step 1

Use [on pin pressed](/reference/input/on-pin-pressed) to show a random number
when pin P0 is pressed (hold the GND pin with other hand):

```blocks
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(Math.random(11));
});
```
## Step 2

Show a string when pin P1 is pressed:

```blocks
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(Math.random(11));
});
input.onPinPressed(TouchPin.P1, () => {
    basic.showString("LOVE?");
});
```

## Step 3

Show a heart when pin P2 is pressed:

```blocks
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(Math.random(11));
});
input.onPinPressed(TouchPin.P1, () => {
    basic.showString("LOVE?");
});
input.onPinPressed(TouchPin.P2, () => {
    basic.showLeds(`
        . # # # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `);
});
```
