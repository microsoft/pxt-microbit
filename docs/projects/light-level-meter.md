# Light Level Meter

Use this program to graph the light level.
Press ``A`` to scroll the value on the screen.

```blocks
let reading = 0
basic.forever(() => {
    reading = input.lightLevel()
    led.plotBarGraph(
        reading,
        255
    )
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(reading)
    }
})
```
