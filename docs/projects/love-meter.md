# love meter

### ~avatar avatar

Use pins and your body to change the display!

### ~

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
