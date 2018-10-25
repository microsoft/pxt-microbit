# counter challenges

Coding challenges for the counter.

## Before we get started

Complete the following [guided tutorial](/lessons/counter/activity) At the end of the tutorial, click **keep editing**. Your code should look like this:

```blocks
let count = 0
input.onButtonPressed(Button.A, () => {
    count = count + 1
    basic.showNumber(count)
})
```

## Challenge 1

Let's add the code to `count` when `B` is pressed. Add an event handler with `on button pressed(B)` then add the code to `count`.


```blocks
let count = 0
input.onButtonPressed(Button.A, () => {
    count = count + 1
    basic.showNumber(count)
})
input.onButtonPressed(Button.B, () => {
    count = count - 1
    basic.showNumber(count)
})
```

## Challenge 2

Now let's try to reset the counter when the @boardname@ is shaken. You will need to register an event handler with `on shake`.

