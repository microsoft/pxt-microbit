# Love meter

Make a love meter, how sweet! The @boardname@ is feeling the love, then sometimes not so much!

## Step 1

Let's build a **LOVE METER** machine. Place a ``||input:on pin pressed||`` block to run code
when pin ``P0`` is pressed.

```blocks
input.onPinPressed(TouchPin.P0, () => {
});
```
## Step 2

Using ``||basic:show number||`` and ``||Math:pick random||`` blocks, 
show a random number from 0 to 100 when pin ``P0`` is pressed.

```blocks
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(Math.random(101));
});
```

## Step 3

Show ``"LOVE METER"`` on the screen when the @boardname@ starts.

```blocks
basic.showString("LOVE METER");
input.onPinPressed(TouchPin.P0, () => {
    basic.showNumber(Math.random(101));
});
```

## Step 4

Click ``|Download|`` to transfer your code in your @boardname@. Hold the ``GND`` pin with other hand and press pin ``P0`` with the other hand to trigger this code.
