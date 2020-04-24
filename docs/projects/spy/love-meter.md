# Love Meter

### @explicitHints true

## Introduction @unplugged

Make a **LOVE METER** machine, how sweet! The @boardname@ is feeling the love, then sometimes not so much!

![Love meter banner message](/static/mb/projects/love-meter/love-meter.gif)

## Step 1

Add an event to run code when ``||input:pin 0 is pressed||``. Use the ``P0`` touchpin.

```spy
input.onPinPressed(TouchPin.P0, function() {
});
```

## Step 2

Put code into the ``||input:pin 0 is pressed||`` event to ``||basic:show||`` a ``||Math:random number||``
between `0` to `100` when pin **0** is pressed.

```spy
input.onPinPressed(TouchPin.P0, function() {
    basic.showNumber(Math.randomRange(0, 100));
});
```

## Step 3

Click on pin **0** in the simulator and see which number is chosen.

## Step 4

Insert code to ``||basic:show||`` the ``"LOVE METER"`` message on the screen when the program starts.

```spy
basic.showString("LOVE METER");
input.onPinPressed(TouchPin.P0, function() {
    basic.showNumber(Math.randomRange(0, 100));
});
```

## Step 5

Click ``|Download|`` to transfer your code in your @boardname@. Hold the **GND** pin with one hand
and press pin **0** with the other hand to trigger this code.