# night light challenges

Coding challenges for night light.

## Before we get started

Complete the following [guided tutorial](/lessons/night-light/activity), your code should look like this:


```blocks
led.setBrightness(255)
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
input.onButtonPressed(Button.A, () => {
    led.setBrightness(64)
})

```
## Challenge 1



What if we want to turn off all the LEDs? Let's do this by setting the brightness to `0` when button `B` is pressed. Add an event handler with `on button pressed(B)` add `set brightness(0)` to turn off the LEDs.


```blocks
led.setBrightness(255)
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
input.onButtonPressed(Button.A, () => {
    led.setBrightness(64)
})
input.onButtonPressed(Button.B, () => {
    led.setBrightness(0)
})
```


## Challenge 2

Add an event handler with `on shake` to change the LED brightness back to a `255`.
