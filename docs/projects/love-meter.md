# Love Meter

## Introduction @unplugged

Make a love meter, how sweet! The @boardname@ is feeling the love, then sometimes not so much!
Tell everyone who you are. Show you name on the LEDs.

![Love meter banner message](/static/mb/projects/love-meter/love-meter.gif)

## Step 1

Let's build a **LOVE METER** machine. Place an ``||input:on pin pressed||`` block to run code when pin **0** is pressed. Use ``P0`` from the list of pin inputs.

```blocks
input.onPinPressed(TouchPin.P0, () => {
});
```

## Step 2

Using ``||basic:show number||`` and ``||Math:pick random||`` blocks, show a random number from `0` to `100` when pin **0** is pressed.

```blocks
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(Math.randomRange(0, 100));
});
```
## Step 3

Click on pin **0** in the simulator and see which number is chosen.

## Step 4

Show ``"LOVE METER"`` on the screen when the @boardname@ starts.

```blocks
basic.showString("LOVE METER");
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(Math.randomRange(0, 100));
});
```

## Step 5

Click ``|Download|`` to transfer your code in your @boardname@. Hold the **GND** pin with one hand and press pin **0** with the other hand to trigger this code.
