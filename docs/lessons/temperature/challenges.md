# temperature challenges

Coding challenges for zoomer.

## Before we get started

Complete the following guided [temperature activity](/lessons/temperature/activity). At the end of the activity, your code should look like this:

```blocks
input.onGesture(Gesture.Shake, () => {
    let temp = input.temperature()
    basic.showNumber(temp)
})
```

## Challenge 1

Let's add the code to display the text `C IS THE TEMP` with a `show string` block. Modify the `show string` block to slowly display the text by an interval of `300`.

```blocks
input.onGesture(Gesture.Shake, () => {
    let temp = input.temperature()
    basic.showNumber(temp)
    basic.showString("C IS THE TEMP")
})
```

* Run the code to see if it works as expected.

## Challenge 2

Let's add code to display the temperature gauge image with a `show LEDs` block.

