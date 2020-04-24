# Dice

### @explicitHints true

## Introduction @unplugged

Let's turn the @boardname@ into a dice!
(Want to learn how the accelerometer works? [Watch this video](https://youtu.be/byngcwjO51U)).

We need 3 pieces of code: one to detect a throw (shake), another to pick a random number, and then one to show the number.

![A @boardname@ dice](/static/mb/projects/dice.png)

## Step 1

Add an event to run code when a ``||input:shake gesture||`` is detected.

```spy
input.onGesture(Gesture.Shake, function() {

})
```

## Step 2

Put code in the event to ``||basic:show a number||`` when ``||input:on shake||`` happens.

```spy
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(0)
})
```

## Step 3

Pick a ``||math:pick a random||`` number and ``||basic:show||`` it on the screen.

```spy
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(Math.randomRange(0, 10))
})
```

## Step 4

A typical dice shows values from `1` to `6`. Change the minimum and maximum values in ``||math:pick random||`` to ``1`` and ``6``!

```spy
input.onGesture(Gesture.Shake, function() {
    basic.showNumber(Math.randomRange(1, 6))
})
```

## Step 5

Use the simulator to try out your code. Does it show the number you expected?

## Step 6

If you have a @boardname@ connected, click ``|Download|`` and transfer your code to the @boardname@!