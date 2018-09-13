# Analog Pin Tester

Use this program to graph the analog values that are read from pin ``P0``.
Press ``A`` to scroll the value on the screen.

```blocks
let reading = 0
basic.forever(() => {
    reading = pins.analogReadPin(AnalogPin.P0)
    led.plotBarGraph(
        reading,
        1023
    )
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(reading)
    }
})
```
