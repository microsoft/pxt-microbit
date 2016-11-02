# running time challenges

My script. #docs

**Challenge 0**

Great job! You have successfully completed the [Running Time tutorial](/lessons/running-time/tutorial) . You have a forever loop that declares a variable in it that holds the running time in milliseconds of the @boardname@ and then shows the seconds on the LED screen.

```
basic.forever(() => {
    let now = input.runningTime()
    basic.showNumber(now / 1000, 150)
})
```

**Challenge 1**

When button A is pressed, reset the time by subtracting the current time from the variable now.

```
basic.forever(() => {
    let now1 = input.runningTime()
    basic.showNumber(now1 / 1000, 150)
})
if (input.buttonIsPressed("A")) {
    let now2 = 0 // ***
}
```

* Run the code to see if it works as expected.
