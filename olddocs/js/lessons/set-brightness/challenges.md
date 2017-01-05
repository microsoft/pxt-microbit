# set brightness challenges

These challenges will allow you to change the brightness of the @boardname@. docs

**Challenge 0**

[This tutorial](/lessons/set-brightness/tutorial) will show you how to set the brightness on the @boardname@.

```
led.setBrightness(255)
led.plotAll()
input.onButtonPressed(Button.A, () => {
    led.setBrightness(64)
})
```

**Challenge 1**

What if we want to turn off all the LEDs? Let's do this by setting the brightness to `0` when button `B` is pressed. Add a condition for `input->on button pressed("B")`.

```
led.setBrightness(255)
led.plotAll()
input.onButtonPressed(Button.A, () => {
    led.setBrightness(64)
})
input.onButtonPressed(Button.B, () => {
}) // ***
```

**Challenge 2**

Inside of the condition `input->on button pressed("B")`, add `led->set brightness(0)` to turn off the LEDs.

```
led.setBrightness(255)
led.plotAll()
input.onButtonPressed(Button.A, () => {
    led.setBrightness(64)
})
input.onButtonPressed(Button.B, () => {
    led.setBrightness(0) // ***
})
```

**Challenge 3**

Now, in the condition `input->on button pressed("B")`, add `basic->pause(1000)` and then set the brightness to a new value!

* `Run` your script to see the LEDs change brightness.
