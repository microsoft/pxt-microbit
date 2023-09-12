# Step Counter

## Count your steps with the micro:bit! @unplugged

![A @boardname@ attached on a foot](/static/mb/projects/step-counter.png)

Turn your @boardname@ into a step counter (also known as a pedometer). We'll use the motion sensor (also known as an accelerometer) to measure when we take a step with the micro:bit.

## {Step 1}

First we need to create a variable to keep track of the number of steps 🦶. A variable is a container for storing values.  
Click on the ``||variables:Variables||`` category in the Toolbox. Click on the **Make a Variable** button. Give your new variable the name "steps" and click Ok.

## {Step 2}

Click on the ``||variables:Variables||`` category in the Toolbox. You'll notice that there are some new blocks that have appeared. Drag a ``||variables:set steps||`` block into the ``||basic:on start||`` block. This sets the value of our ``||variables:steps||`` variable to **0** when our program starts.

```blocks
let steps = 0
```

## {Step 3}

Let's record a step every time our micro:bit shakes. Click on the ``||input:Input||`` category in the Toolbox. Drag an ``||input:on shake||`` block out to the workspace and place it anywhere.

```blocks
input.onGesture(Gesture.Shake, function () {})
```

## {Step 4}

Click on the ``||variables:Variables||`` category in the Toolbox. Drag a ``||variables:change steps||`` block into the ``||input:on shake||`` block. Now every time we shake our micro:bit (or take a step), we will add 1 to the value in our ``||variables:steps||`` variable.

```blocks
let steps = 0
input.onGesture(Gesture.Shake, function () {
    steps += 1
})
```

## {Step 5}

Let's show the number of steps taken. Click on the ``||basic:Basic||`` category in the Toolbox. Drag a ``||basic:show number||`` block into the ``||input:on shake||`` block, underneath the ``||variables:change steps||`` block.

```blocks
let steps = 0
input.onGesture(Gesture.Shake, function () {
    steps += 1
    basic.showNumber(0)
})
```

## {Step 6}

Click on the ``||variables:Variables||`` category in the Toolbox. Drag a ``||variables:steps||`` block into the ``||basic:show number||`` block, replacing the number **0**.

```blocks
let steps = 0
input.onGesture(Gesture.Shake, function () {
    steps += 1
    basic.showNumber(steps)
})
```

## {Step 7}

Let's test your code! Press the white **SHAKE** button on the micro:bit on-screen simulator, or move your cursor quickly back and forth over the simulator. Do you see the number of steps increasing on the micro:bit?  ⭐ Great job! ⭐

## {Step 8}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@. Once your code has been downloaded, attach your micro:bit to a battery pack and put in your sock.  Walk around.  Is the micro:bit counting your steps?

## {Step 9}

Go further - you may notice the micro:bit can't count as fast you might run. That's because there is a delay while the micro:bit is displaying numbers. To correct for this, click on the Hint to see an alternate solution. Learn more about how the @boardname@ acccelerometer works by watching [this video](https://youtu.be/byngcwjO51U).

```blocks
let steps = 0
input.onGesture(Gesture.Shake, function () {
    steps += 1
    led.stopAnimation()
})
basic.forever(function() {
    basic.showNumber(steps)
})
```