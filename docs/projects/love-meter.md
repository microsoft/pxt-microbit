# Love Meter

## {Introduction @unplugged}

How much love 😍 are you emitting today? Create a 💓 LOVE METER 💓 machine with your micro:bit!

![Love meter banner message](/static/mb/projects/love-meter/love-meter.gif)

## {Step 1}

We'll use this ``||input:on pin pressed||`` block to run code when pin **0** on the micro:bit is pressed. From the ``||basic:Basic||`` Toolbox category, drag a ``||basic:show number||`` block and drop into the ``||input:on pin pressed||`` block.

```blocks
input.onPinPressed(TouchPin.P0, function() {
    //@highlight
    basic.showNumber(0)
})
```

## {Step 2}

From the ``||math:Math||`` category, get a ``||Math:pick random||`` block and drop it into the ``||basic:show number||`` block replacing 0.

```blocks
input.onPinPressed(TouchPin.P0, function() {
    //@highlight
    basic.showNumber(randint(0, 100))
})
```

## {Step 3}

Now let's be sure to label our Love Machine! From the ``||basic:Basic||`` Toolbox category, drag an ``||basic:on start||`` block and drop it anywhere on the Workspace. Then get a ``||basic:show string||`` block and place it in the ``||basic:on start||`` block.  Type the words "LOVE METER" into the ``||basic:show string||`` block.

```blocks
//@highlight
basic.showString("LOVE METER")
input.onPinPressed(TouchPin.P0, function() {
    basic.showNumber(randint(0, 100))
})
```

## {Step 4}

Let's test our code. Press **Pin 0** on the micro:bit on-screen simulator (bottom left). Numbers between 0-25 = 🖤 No Love, 26-50 = 🫶 BFF Love, 51-75 = 💘 Brokenhearted Love, 76-100 = 💖🔥 Fiery Hot Love!

## {Step 5}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@. Once your code has been downloaded, hold the **GND** pin with one hand and touch the **0** pin with the other hand. Your micro:bit 💓 LOVE METER 💓 machine will detect the love current flowing through your body!

```blockconfig.global
randint(0, 100)
```

```validation.global
# BlocksExistValidator
```

```template
input.onPinPressed(TouchPin.P0, function() {})
```
