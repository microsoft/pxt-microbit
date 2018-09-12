# Step counter

![A @boardname@ attached on a foot](/static/mb/projects/step-counter.png)

This project turns the @boardname@ into a simple step-counter.
Each **shake** event increment a **counter** variable.

## ~ hint

If you built a watch in the [make](/projects/watch/make) portion of the of the [Watch](/projects/watch) project, you can use the code from this project with it too.

## ~

## A counter

To build a counter, we will need a variable to store the number of steps.

```blocks
let step = 0
step = 0
```

## Detecting a step

Assuming you attach the @boardname@ to your foot, it will get shaken up when do a step. We can use the ``||input:on shake||`` event to detect a step (it should work most of the time). Let's add the code to increment ``step`` by 1 when @boardname@ is shaken.

```blocks
let step = 0
input.onGesture(Gesture.Shake, function () {
    step += 1
})
step = 0
```

## How many steps so far?

We want to see the number of steps at all time. In a ``||basic:forever||`` loop,
we add a ``||basic:show number||`` block to display the value of ``step``.

```blocks
let step = 0
input.onGesture(Gesture.Shake, function () {
    step += 1
})
basic.forever(function() {
    basic.showNumber(step)
})
step = 0
```

## Display lag

Did you notice there is a lag in the display of steps? 
This is because the ``step`` value can change **while** the @boardname@ is displaying a number.
To remove the lag, add ``||led:stop animation||`` after changing the value of ``step``.

```blocks
let step = 0
input.onGesture(Gesture.Shake, function () {
    step += 1
    led.stopAnimation()
})
basic.forever(function() {
    basic.showNumber(step)
})
step = 0
```
