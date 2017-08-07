# temperature activity

Measure the temperature on the @boardname@

Welcome! This activity will teach how to measure the temperature on the @boardname@. Let's get started!

We want to display the temperature on shake. In order to do so, we need to register the event `on shake` that will execute whenever the user shakes the @boardname@; in the web browser, click the button labelled "SHAKE" under the simulator to generate a shake event

```blocks
input.onGesture(Gesture.Shake, () => {
    
})
```

Let's measure the temperature and then store in it a variable `temp`. The temperature is measured in **Celsius**, so a value of `29` is equivalent to 29 degrees Celsius.


```blocks
input.onGesture(Gesture.Shake, () => {
    let temp = input.temperature()
})
```

Show the value of `temp` on the screen.

```blocks
input.onGesture(Gesture.Shake, () => {
    let temp = input.temperature()
    basic.showNumber(temp)
})
```

* click run to see if the code works as expected.

## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/temperature/challenges)!

## ~

