# @extends

## #exstart

In this example, ``on start`` sets a dimmer brightness on the screen and the button handler shows a string.

```blocks
input.onButtonPressed(Button.A, () => {
    basic.showString("Hello!")
})
led.setBrightness(50)
```
