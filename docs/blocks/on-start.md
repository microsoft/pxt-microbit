# On Start

An event that runs when the program Start

```block
basic.onStart(() => {

})
```

The ``on start`` is a special event that runs when the program starts, before any other event. 
Use this event to initialize your program.

## Example

In this example, ``on start`` sets a dimmer brightness on the screen and the button handler shows a string.

```blocks
basic.onStart(() => {
    led.setBrightness(50)
})
input.onButtonPressed(Button.A, () => {
    basic.showString("Hello!")
})
```