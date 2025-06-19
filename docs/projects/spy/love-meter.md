# Love Meter

### @explicitHints true

## {Introduction @unplugged}

How much love 😍 are you emitting today? Create a 💓 LOVE METER 💓 machine with your micro:bit!

![Love meter banner message](/static/mb/projects/love-meter/love-meter.gif)

## {Step 1}

Add an input ``||input:on pin pressed||`` function to run code when Pin P0 is pressed on the micro:bit. Type the code below, or drag a code snippet from the ``||input:Input||`` Toolbox category.

```spy
input.onPinPressed(TouchPin.P0, function() {
})
```

## {Step 2}

Write some code to show a number in the ``||input:on pin pressed||`` function, using the basic ``||basic:show number||`` function.

```spy
input.onPinPressed(TouchPin.P0, function() {
    basic.showNumber(0)
})
```

## {Step 3}

Instead of showing 0, use the ``||math:randint||`` function to show a random number between a minimum and maximum value.

```spy
input.onPinPressed(TouchPin.P0, function() {
    basic.showNumber(randint(0, 10))
})
```

## {Step 4}

Everyone knows that love can be measured on a scale of 0 to 100. So, in the ``||math:randint||`` function, change the maximum value to **100**.

```spy
input.onPinPressed(TouchPin.P0, function() {
    basic.showNumber(randint(0, 100))
})
```

## {Step 5}

Now let's be sure to label our Love Machine! Use the basic ``||basic:show string||`` function to show the message "LOVE METER" on the screen of the micro:bit.

```spy
basic.showString("LOVE METER")
input.onPinPressed(TouchPin.P0, function() {
    basic.showNumber(randint(0, 100));
})
```

## {Step 6}

Let's test our code. Press **Pin 0** on the micro:bit on-screen simulator (bottom left). Numbers between 0-25 = 🖤 No Love, 26-50 = 🫶 BFF Love, 51-75 = 💘 Brokenhearted Love, 76-100 = 💖🔥 Fiery Hot Love!

## {Step 7}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@. Once your code has been downloaded, hold the **GND** pin with one hand and touch the **0** pin with the other hand. Your micro:bit 💓 LOVE METER 💓 machine will detect the love current flowing through your body!