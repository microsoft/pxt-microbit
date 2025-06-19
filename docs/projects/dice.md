# Dice

## {Introduction @unplugged}

Let's create some digital 🎲 dice 🎲 with our micro:bit!

![A microbit dice](/static/mb/projects/dice.png)

## {Step 1}

The ``||input:on shake||`` block runs code when you shake 👋 the @boardname@. From the ``||basic:Basic||`` category, get a ``||basic:show number||`` block and place it inside the ``||input:on shake||`` block to display a number.

```blocks
input.onGesture(Gesture.Shake, function() {
    //@highlight
    basic.showNumber(0)
})
```

## {Step 2}

Press the white **SHAKE** button on the micro:bit on-screen simulator, or move your cursor quickly back and forth over the simulator. Do you see the number 0 appear?  ⭐ Great job! ⭐

## {Step 3}

But we don't want to show 0 on our dice all the time. From the ``||math:Math||`` Toolbox category, drag a ``||Math:pick random||`` block and drop it into the ``||basic:show number||`` block replacing the **0**.

```blocks
input.onGesture(Gesture.Shake, function() {
    //@highlight
    basic.showNumber(randint(0, 10))
})
```

## {Step 4}

A typical dice shows values from 1 to 6 dots. So, in the ``||Math:pick random||`` block, change the minimum value to **1** and the maximum value to **6**.

```blocks
input.onGesture(Gesture.Shake, function() {
    //@highlight
    basic.showNumber(randint(1, 6))
})
```

## {Step 5}

Press the white **SHAKE** button again on the micro:bit simulator. Do you see random numbers between 1 and 6 appear? ⭐ Great job! ⭐

## {Step 6}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@. Once your code has been downloaded, attach your micro:bit to a battery pack and use it as digital 🎲 dice for your next boardgame!

## {Step 7}
Go further - Try adding some Music blocks to make a sound when you shake your dice, or use the micro:bit LED lights to show number values. Want to learn how the micro:bit motion detector or accelerometer works? [Watch this video](https://youtu.be/byngcwjO51U).

```validation.global
# BlocksExistValidator
```

```template
input.onGesture(Gesture.Shake, function() {})
```
